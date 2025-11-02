import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { education } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My academic journey
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Education.
        </h2>
      </motion.div>

      <motion.div
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-20 flex justify-center px-4'
      >
        <div className='bg-tertiary p-8 sm:p-10 rounded-2xl max-w-3xl w-full shadow-card'>
          <div className='flex flex-col items-center text-center'>
            <h3 className='text-white text-[28px] font-bold mb-2'>
              {education.degree}
            </h3>
            <p className='text-secondary text-[20px] font-semibold mb-4'>
              {education.institution}
            </p>
            <div className='flex flex-wrap justify-center gap-6 text-secondary'>
              <div className='flex items-center gap-2'>
                <span className='text-white font-medium'>📅</span>
                <span>{education.duration}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-white font-medium'>⭐</span>
                <span>CGPA: {education.cgpa}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, "");

