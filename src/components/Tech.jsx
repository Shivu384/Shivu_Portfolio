import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";

const TechCard = ({ index, technology }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      className="group"
    >
      <div className="w-[100px] sm:w-[120px] h-[100px] sm:h-[120px] bg-tertiary rounded-xl p-4 flex flex-col items-center justify-center hover:bg-[#1d1a35] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#915EFF]/50 border border-secondary/20 hover:border-[#915EFF]/50">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-3 flex items-center justify-center relative">
          {!imgError ? (
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#915EFF] to-[#bf61ff] rounded-lg flex items-center justify-center text-white font-bold text-lg">
              {technology.name.charAt(0)}
            </div>
          )}
        </div>
        <p className="text-white text-[10px] sm:text-[11px] font-medium text-center leading-tight group-hover:text-[#915EFF] transition-colors duration-300">
          {technology.name}
        </p>
      </div>
    </motion.div>
  );
};

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Technologies I work with
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Skills.
        </h2>
      </motion.div>
      
      <div className='mt-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 sm:gap-6 max-w-5xl mx-auto'>
        {technologies.map((technology, index) => (
          <TechCard
            key={technology.name}
            index={index}
            technology={technology}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
