import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects, contactInfo } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const TAG_COLORS = {
  "blue-text-gradient": { bg: "rgba(47,128,237,0.15)", border: "rgba(86,204,242,0.4)", text: "#56ccf2" },
  "green-text-gradient": { bg: "rgba(17,153,142,0.15)", border: "rgba(56,239,125,0.4)", text: "#38ef7d" },
  "pink-text-gradient": { bg: "rgba(236,0,140,0.15)", border: "rgba(252,103,103,0.4)", text: "#fc6767" },
  "orange-text-gradient": { bg: "rgba(241,39,17,0.15)", border: "rgba(245,175,25,0.4)", text: "#f5af19" },
};

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    if (flipped || !tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    tiltRef.current.style.transform = `perspective(1200px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    if (!tiltRef.current) return;
    tiltRef.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.4, 0.75)}
      className="sm:w-[360px] w-full"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tiltRef}
        style={{
          position: "relative",
          width: "100%",
          height: "490px",
          transformStyle: "preserve-3d",
          transform: flipped ? "perspective(1200px) rotateY(180deg)" : "perspective(1200px) rotateY(0deg)",
          transition: "transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1)",
          cursor: "pointer",
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* ===== FRONT FACE ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
            border: "1px solid rgba(145,94,255,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(145,94,255,0.1)",
          }}
        >
          {/* Gradient top accent */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, #915EFF, #00cea8, #bf61ff)" }} />

          {/* Image */}
          <div style={{ position: "relative", width: "100%", height: "220px" }}>
            <img
              src={image}
              alt={name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {/* Dark gradient over image */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(13,11,46,0.95) 100%)",
            }} />
            {/* GitHub icon */}
            <div
              style={{
                position: "absolute", top: "12px", right: "12px",
                width: "38px", height: "38px", borderRadius: "50%",
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
                border: "1px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={(e) => { e.stopPropagation(); window.open(source_code_link, "_blank"); }}
            >
              <img src={github} alt="code" style={{ width: "18px", height: "18px" }} />
            </div>
            {/* Flip badge */}
            <div style={{
              position: "absolute", bottom: "10px", right: "10px",
              background: "rgba(145,94,255,0.85)", backdropFilter: "blur(4px)",
              borderRadius: "8px", padding: "3px 8px",
            }}>
              <span style={{ color: "#fff", fontSize: "10px", fontWeight: 600 }}>Flip for details ↔</span>
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: "20px 20px 16px" }}>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "21px", marginBottom: "8px" }}>{name}</h3>
            <p style={{ color: "#aaa6c3", fontSize: "13px", lineHeight: "1.6", marginBottom: "16px",
              display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {description}
            </p>
            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {tags.map((tag) => {
                const c = TAG_COLORS[tag.color] || { bg: "rgba(145,94,255,0.15)", border: "rgba(145,94,255,0.4)", text: "#915EFF" };
                return (
                  <span key={tag.name} style={{
                    padding: "3px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                    background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                  }}>
                    #{tag.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* ===== BACK FACE ===== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            overflow: "hidden",
            background: "linear-gradient(135deg, #0a0820 0%, #1a1040 50%, #0d1a30 100%)",
            border: "1px solid rgba(0,206,168,0.35)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(0,206,168,0.1)",
          }}
        >
          {/* Grid overlay */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.07,
            backgroundImage: "linear-gradient(rgba(0,206,168,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,206,168,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }} />

          {/* Top accent */}
          <div style={{ height: "2px", background: "linear-gradient(90deg, #00cea8, #915EFF, #bf61ff)" }} />

          {/* Glow orbs */}
          <div style={{ position: "absolute", top: "20px", right: "20px", width: "100px", height: "100px",
            background: "rgba(145,94,255,0.12)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "30px", left: "20px", width: "80px", height: "80px",
            background: "rgba(0,206,168,0.1)", borderRadius: "50%", filter: "blur(25px)", pointerEvents: "none" }} />

          {/* Corner brackets */}
          {[["top:10px","left:10px","borderLeft:2px solid rgba(0,206,168,0.7)","borderTop:2px solid rgba(0,206,168,0.7)","borderTopLeftRadius:6px"],
            ["top:10px","right:10px","borderRight:2px solid rgba(145,94,255,0.7)","borderTop:2px solid rgba(145,94,255,0.7)","borderTopRightRadius:6px"],
            ["bottom:10px","left:10px","borderLeft:2px solid rgba(145,94,255,0.7)","borderBottom:2px solid rgba(145,94,255,0.7)","borderBottomLeftRadius:6px"],
            ["bottom:10px","right:10px","borderRight:2px solid rgba(0,206,168,0.7)","borderBottom:2px solid rgba(0,206,168,0.7)","borderBottomRightRadius:6px"],
          ].map((styles_, i) => {
            const s = {};
            styles_.forEach(rule => { const [k,v] = rule.split(":"); s[k] = v; });
            return <div key={i} style={{ position: "absolute", width: "24px", height: "24px", ...s }} />;
          })}

          {/* Content */}
          <div style={{ position: "relative", zIndex: 10, padding: "20px", height: "calc(100% - 2px)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ color: "#00cea8", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px", fontWeight: 600 }}>
                Project Details
              </p>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "20px", marginBottom: "12px" }}>{name}</h3>
              <p style={{ color: "#aaa6c3", fontSize: "14px", lineHeight: "1.65" }}>{description}</p>
            </div>

            <div>
              <p style={{ color: "rgba(170,166,195,0.7)", fontSize: "11px", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Tech Stack
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {tags.map((tag) => {
                  const c = TAG_COLORS[tag.color] || { bg: "rgba(145,94,255,0.15)", border: "rgba(145,94,255,0.4)", text: "#915EFF" };
                  return (
                    <span key={tag.name} style={{
                      padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600,
                      background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                    }}>
                      {tag.name}
                    </span>
                  );
                })}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); window.open(source_code_link, "_blank"); }}
                  style={{
                    flex: 1, padding: "10px 16px", borderRadius: "12px", fontWeight: 700,
                    fontSize: "13px", color: "#fff", cursor: "pointer", border: "none",
                    background: "linear-gradient(135deg, #915EFF, #bf61ff)",
                    boxShadow: "0 4px 20px rgba(145,94,255,0.4)",
                  }}
                >
                  View Code ↗
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
                  style={{
                    padding: "10px 14px", borderRadius: "12px", fontSize: "13px",
                    color: "#aaa6c3", cursor: "pointer", fontWeight: 600,
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(145,94,255,0.3)",
                  }}
                >
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Production-grade AI and backend projects. Each card can be{" "}
          <span className="font-semibold" style={{ color: "#a855f7" }}>flipped</span>{" "}
          to reveal full details, tech stack, and links — from LLM safety gateways to
          CI/CD evaluation pipelines.
        </motion.p>
      </div>

      <div className="mt-16 flex flex-wrap gap-8 justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "projects");
