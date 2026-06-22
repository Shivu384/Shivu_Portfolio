import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { education } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";

// CSS 3D flip card for education
const HolographicCard = () => {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (flipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 12;
    const rotY = (x / rect.width) * 12;
    cardRef.current.querySelector(".card-inner").style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  const handleMouseLeave = () => {
    if (flipped || !cardRef.current) return;
    cardRef.current.querySelector(".card-inner").style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div
      ref={cardRef}
      className="w-full max-w-2xl mx-auto"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="card-inner relative w-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "280px",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Holographic gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b2e] via-[#1a1040] to-[#0a0820]" />
          <div className="absolute inset-0 opacity-30"
            style={{
              background: "linear-gradient(135deg, transparent 0%, rgba(145,94,255,0.3) 30%, rgba(0,206,168,0.2) 60%, transparent 100%)",
            }}
          />

          {/* Grid lines overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "linear-gradient(rgba(145,94,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(145,94,255,0.5) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* Glowing corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-[#915EFF] rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-[#00cea8] rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-[#00cea8] rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-[#915EFF] rounded-br-2xl" />

          {/* Content */}
          <div className="relative z-10 p-8 h-full flex flex-col justify-between min-h-[280px]">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#00cea8] animate-pulse" />
                <span className="text-[#00cea8] text-xs uppercase tracking-widest font-semibold">
                  Education Record
                </span>
              </div>
              <h3 className="text-white text-2xl font-bold leading-tight">
                {education.degree}
              </h3>
              <p className="text-[#915EFF] text-lg font-semibold mt-2">
                {education.institution}
              </p>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-secondary text-sm">{education.duration}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[#ffd700] text-sm">★</span>
                  <span className="text-white font-bold">CGPA: {education.cgpa}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-secondary text-xs">Click to flip →</span>
              </div>
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#00cea8]/20 via-[#0d0b2e] to-[#915EFF]/20" />
          <div className="absolute inset-0 border-2 border-[#00cea8]/40 rounded-2xl" />

          <div className="relative z-10 p-8 h-full flex flex-col justify-center gap-6 min-h-[280px]">
            <h3 className="text-[#00cea8] text-xl font-bold">Key Highlights</h3>
            <ul className="space-y-3">
              {[
                "B.Tech – Computer Science & Engineering",
                "KIET Group of Institutions, Ghaziabad",
                "Duration: 2023 – Present",
                `CGPA: ${education.cgpa} / 10.0`,
                "Focus: Agentic AI, LLMs, Backend Development",
                "Location: Ghaziabad, Uttar Pradesh",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#915EFF] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <span className="text-secondary text-xs">← Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My Academic Journey</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Education.</h2>
      </motion.div>

      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.9)}
        className="mt-16"
      >
        <HolographicCard />
      </motion.div>
    </>
  );
};

export default SectionWrapper(Education, "education");
