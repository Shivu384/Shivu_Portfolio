import React from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

import { styles } from "../styles";
import { certifications } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const CertificationCard = ({ index, certification }) => (
  <Tilt className='xs:w-[300px] w-full'>
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-8 min-h-[200px] flex flex-col justify-center items-center'
      >
        <img
          src={certification.icon}
          alt={certification.name}
          className='w-16 h-16 object-contain mb-4'
        />
        <h3 className='text-white text-[18px] font-bold text-center mb-2'>
          {certification.name}
        </h3>
        <p className='text-secondary text-[14px] text-center'>
          {certification.issuer}
        </p>
      </div>
    </motion.div>
  </Tilt>
);

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Continuous learning
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Certifications.
        </h2>
      </motion.div>

      <div className='mt-20 flex flex-wrap justify-center gap-8 sm:gap-10'>
        {certifications.map((certification, index) => (
          <CertificationCard
            key={certification.name}
            index={index}
            certification={certification}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "");

