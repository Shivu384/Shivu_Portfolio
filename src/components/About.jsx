import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Inside About, add a wrapper div if needed:



const ServiceCard = ({ index, title, icon }) => {
  const cardRef = React.useRef(null);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='xs:w-[250px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      }}
      onMouseLeave={() => {
        if (cardRef.current) {
          cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
      }}
      style={{ transition: 'transform 0.1s ease-out' }}
    >
      <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
      >
        I'm a passionate Backend Developer, AI Engineer, and Machine Learning Engineer currently pursuing B.Tech in Computer Science at KIET Group of Institutions. I specialize in building intelligent systems using Python, Django, and advanced ML frameworks. My expertise includes Generative AI, Voice AI, and Conversational AI development using ElevenLabs, Deepgram, and LLMs. I'm skilled in creating RESTful APIs, implementing workflow automation, containerized deployments with Docker, and building ML models for real-world applications. I thrive on solving complex challenges through clean code, smart algorithms, and innovative AI solutions.
      </motion.p>

      <div className='mt-20 flex flex-wrap gap-10 justify-center'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
