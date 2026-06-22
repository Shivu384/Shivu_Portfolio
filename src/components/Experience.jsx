import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "rgba(13, 11, 46, 0.85)",
        color: "#fff",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(145, 94, 255, 0.25)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(145,94,255,0.2)",
      }}
      contentArrowStyle={{ borderRight: "7px solid rgba(145, 94, 255, 0.4)" }}
      date={experience.date}
      dateClassName="text-secondary font-medium"
      iconStyle={{
        background: experience.iconBg,
        boxShadow: "0 0 0 4px #915EFF, 0 0 30px rgba(145,94,255,0.5)",
        border: "2px solid rgba(145,94,255,0.6)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      {/* Glowing top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-[#915EFF] via-[#00cea8] to-[#bf61ff]" />

      <div>
        <h3 className="text-white text-[22px] font-bold">{experience.title}</h3>
        <p
          className="text-[#915EFF] text-[16px] font-semibold mt-1"
          style={{ margin: 0 }}
        >
          {experience.company_name}
        </p>
        {experience.location && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-[#00cea8]">📍</span>
            <p className="text-secondary text-[13px]">{experience.location}</p>
          </div>
        )}
      </div>

      <ul className="mt-5 list-none space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-4 tracking-wider relative"
          >
            <span className="absolute left-0 top-[6px] w-2 h-2 rounded-full bg-gradient-to-r from-[#915EFF] to-[#00cea8]" />
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="rgba(145, 94, 255, 0.3)">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
