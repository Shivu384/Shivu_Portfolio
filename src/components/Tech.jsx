import React, { useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";

// CSS-only 3D tech card — no WebGL, no context issues
const TechCard = ({ index, technology }) => {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Assign unique accent colors per tech for visual richness
  const accentColors = [
    "#3776ab", // Python blue
    "#092e20", // Django green → use bright
    "#336791", // SQL blue
    "#ff6f00", // TensorFlow orange
    "#f7931e", // Scikit orange
    "#150458", // Pandas → use teal
    "#013243", // NumPy → use blue
    "#42a5c7", // Seaborn
    "#11557c", // Matplotlib
    "#f37626", // Jupyter orange
    "#007acc", // VSCode blue
    "#f05032", // Git red/orange
  ];
  const brightAccents = [
    "#4ea8de", "#4ade80", "#60a5fa", "#fb923c",
    "#facc15", "#34d399", "#38bdf8", "#67e8f9",
    "#a78bfa", "#f97316", "#22d3ee", "#f87171",
  ];
  const accent = brightAccents[index % brightAccents.length];

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.06, 0.6)}
      className="group"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0, y: 0 }); }}
      style={{ perspective: "800px" }}
    >
      <div
        className="relative w-[110px] h-[130px] rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-3 p-3"
        style={{
          transform: hovered
            ? `rotateX(${-mousePos.y * 10}deg) rotateY(${mousePos.x * 10}deg) translateZ(10px)`
            : "rotateX(0) rotateY(0) translateZ(0)",
          transition: hovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
          background: hovered
            ? `linear-gradient(145deg, ${accent}22, #0f0d28)`
            : "linear-gradient(145deg, #12103a, #0a0820)",
          border: `1px solid ${hovered ? accent : "rgba(145,94,255,0.15)"}`,
          boxShadow: hovered
            ? `0 0 25px ${accent}55, 0 10px 40px rgba(0,0,0,0.6), inset 0 1px 0 ${accent}33`
            : "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {/* Animated glow dot in corner */}
        <div
          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
          style={{
            background: accent,
            boxShadow: hovered ? `0 0 8px ${accent}` : "none",
            opacity: hovered ? 1 : 0.4,
            transition: "all 0.3s",
          }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center relative"
          style={{
            background: hovered ? `${accent}18` : "rgba(255,255,255,0.04)",
            border: `1px solid ${hovered ? accent + "44" : "rgba(255,255,255,0.06)"}`,
            transition: "all 0.3s",
            transform: hovered ? "scale(1.1) translateZ(5px)" : "scale(1)",
          }}
        >
          {!imgError ? (
            <img
              src={technology.icon}
              alt={technology.name}
              className="w-9 h-9 object-contain"
              style={{ filter: hovered ? "brightness(1.2) saturate(1.3)" : "brightness(0.85)" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-xl font-bold" style={{ color: accent }}>
              {technology.name.charAt(0)}
            </span>
          )}
        </div>

        {/* Name */}
        <p
          className="text-[10px] font-semibold text-center leading-tight"
          style={{
            color: hovered ? accent : "#8a85b8",
            transition: "color 0.3s",
          }}
        >
          {technology.name}
        </p>

        {/* Bottom glow bar */}
        <div
          className="absolute bottom-0 left-4 right-4 h-[1px] rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
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
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills.</h2>
      </motion.div>

      {/* Decorative divider */}
      <div className="flex items-center gap-4 mt-4 max-w-xs mx-auto">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#915EFF]" />
        <div className="w-2 h-2 rounded-full bg-[#915EFF] animate-pulse" />
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#915EFF]" />
      </div>

      <div className="mt-14 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-4 sm:gap-5 max-w-5xl mx-auto">
        {technologies.map((technology, index) => (
          <TechCard key={technology.name} index={index} technology={technology} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
