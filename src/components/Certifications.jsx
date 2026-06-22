import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { certifications } from "../constants";
import { textVariant, fadeIn } from "../utils/motion";

// Pure CSS 3D spinning medal card — no WebGL
const CertCard = ({ index, name, issuer, icon }) => {
  const [flipped, setFlipped] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const accentColors = ["#ffd700", "#c0c0c0", "#cd7f32"]; // gold, silver, bronze
  const accent = accentColors[index % accentColors.length];

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.3, 0.75)}
      className="group"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative w-[260px] cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : hovered ? "rotateY(-8deg) rotateX(3deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)",
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* FRONT */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "linear-gradient(145deg, #0d0b2e 0%, #1a1040 100%)",
          }}
        >
          {/* Outer glow border */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: hovered ? `0 0 30px ${accent}55, inset 0 0 20px ${accent}11` : "none",
              border: `1px solid ${hovered ? accent + "66" : "rgba(145,94,255,0.25)"}`,
              borderRadius: "16px",
              transition: "all 0.4s",
            }}
          />

          {/* Medal artwork area */}
          <div className="relative p-6 pb-4 flex flex-col items-center">
            {/* Gold ring */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center relative mb-3"
              style={{
                background: `radial-gradient(circle at 35% 35%, ${accent}dd, ${accent}66)`,
                boxShadow: `0 0 30px ${accent}66, 0 4px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2)`,
              }}
            >
              {/* Inner dark circle */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(145deg, #12103a, #1d1a55)",
                  boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)",
                }}
              >
                <img
                  src={icon}
                  alt={name}
                  className="w-12 h-12 object-contain"
                  style={{ filter: "brightness(1.1)" }}
                />
              </div>

              {/* Shine effect */}
              <div
                className="absolute top-2 left-3 w-8 h-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-sm" style={{ color: accent }}>★</span>
              ))}
            </div>

            {/* Name */}
            <h3 className="text-white font-bold text-[15px] text-center leading-tight mb-1 px-2">
              {name}
            </h3>
            <p className="text-[12px] font-medium mb-3" style={{ color: accent }}>
              {issuer}
            </p>

            {/* Flip hint */}
            <div
              className="text-[10px] uppercase tracking-widest transition-all duration-300"
              style={{ color: hovered ? accent : "rgba(145,94,255,0.5)" }}
            >
              Tap to flip →
            </div>
          </div>

          {/* Bottom strip */}
          <div
            className="h-1 w-full"
            style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          />
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center p-6 gap-4"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #1a1040, #0a0820)",
            border: `1px solid ${accent}44`,
          }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ background: `${accent}22`, border: `1px solid ${accent}55` }}
          >
            🏅
          </div>
          <h3 className="text-white font-bold text-[16px] text-center">{name}</h3>
          <p style={{ color: accent }} className="text-sm font-semibold">{issuer}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Verified Certificate</span>
          </div>
          <p className="text-secondary text-[11px] text-center mt-1">← Click to flip back</p>
        </div>
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>My Achievements</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Certifications.</h2>
      </motion.div>

      <div className="mt-16 flex flex-wrap gap-8 justify-center">
        {certifications.map((cert, index) => (
          <CertCard key={cert.name} index={index} {...cert} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Certifications, "certifications");
