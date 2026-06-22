import React, { useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// CSS 3D tilt service card
const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);

  const accentMap = ["#a855f7", "#00d4aa", "#f472b6", "#fb923c"];
  const accent = accentMap[index % accentMap.length];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateZ(12px)`;
    cardRef.current.style.boxShadow = `0 25px 60px rgba(0,0,0,0.6), 0 0 40px ${accent}44`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
    cardRef.current.style.boxShadow = `0 8px 30px rgba(0,0,0,0.4)`;
  };

  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="xs:w-[250px] w-full"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
          border: `1px solid ${accent}44`,
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          minHeight: "290px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
          padding: "32px 24px",
        }}
      >
        {/* Top gradient strip */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        {/* Glow blob */}
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "80px", height: "80px",
          background: `${accent}22`, borderRadius: "50%", filter: "blur(20px)", pointerEvents: "none" }} />

        {/* Icon circle */}
        <div style={{
          width: "84px", height: "84px", borderRadius: "50%",
          background: `radial-gradient(circle at 35% 35%, ${accent}33, ${accent}11)`,
          border: `2px solid ${accent}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 25px ${accent}44`,
          position: "relative",
        }}>
          <img src={icon} alt={title} style={{ width: "48px", height: "48px", objectFit: "contain" }} />
          {/* Shine */}
          <div style={{ position: "absolute", top: "8px", left: "12px", width: "20px", height: "20px",
            background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        {/* Title */}
        <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, textAlign: "center" }}>{title}</h3>

        {/* Divider */}
        <div style={{ width: "100%", height: "1px",
          background: `linear-gradient(90deg, transparent, ${accent}55, transparent)` }} />

        <p style={{ color: `${accent}cc`, fontSize: "11px", textTransform: "uppercase",
          letterSpacing: "0.25em", fontWeight: 600 }}>Expertise</p>

        {/* Bottom gradient strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "3px",
          background: `linear-gradient(90deg, transparent, ${accent}88, transparent)` }} />
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
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm an <span style={{ color: "#a855f7", fontWeight: 600 }}>Agentic AI &amp; GenAI Engineer</span> building
        production-grade LLM applications, multi-agent systems, and AI infrastructure. Experienced in
        FastAPI, AI safety guardrails, evaluation pipelines, and scalable backend architectures.
        I specialize in Voice AI (Deepgram, ElevenLabs, Whisper), RAG pipelines, Prompt Engineering,
        and multi-agent orchestration. Currently pursuing B.Tech in Computer Science at
        KIET Group of Institutions, Ghaziabad (CGPA: 8.2).
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-8 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
