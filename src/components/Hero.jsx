import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { BrainCanvas } from "./canvas";

const TypewriterText = ({ texts }) => {
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const fullText = texts[currentText];
    let timeout;
    if (!isDeleting && charIndex < fullText.length) {
      timeout = setTimeout(() => { setCharIndex((c) => c + 1); setDisplayText(fullText.slice(0, charIndex + 1)); }, 65);
    } else if (!isDeleting && charIndex === fullText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => { setCharIndex((c) => c - 1); setDisplayText(fullText.slice(0, charIndex - 1)); }, 35);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentText((c) => (c + 1) % texts.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentText, texts]);

  return (
    <span style={{ color: "#00d4aa" }}>
      {displayText}
      <span style={{ animation: "blink 1s step-end infinite" }}>|</span>
    </span>
  );
};

const Hero = () => {
  const roles = [
    "Agentic AI Engineer",
    "GenAI / LLM Developer",
    "Backend Engineer (FastAPI)",
    "Voice AI Specialist",
    "RAG Pipeline Engineer",
  ];

  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>

      {/* ─── 3D Brain Canvas — right half ─── */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "55%", height: "100%", zIndex: 1,
      }}>
        <BrainCanvas />
      </div>

      {/* ─── Dark gradient from left over canvas ─── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(90deg, #050816 35%, #05081688 65%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* ─── Top & bottom vignette ─── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: "linear-gradient(180deg, #050816cc 0%, transparent 15%, transparent 85%, #050816cc 100%)",
        pointerEvents: "none",
      }} />

      {/* ─── Hero Content ─── */}
      <div className={`absolute inset-0 z-[3] flex items-center ${styles.paddingX}`}
        style={{ maxWidth: "1280px", margin: "0 auto", left: 0, right: 0 }}>

        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px", maxWidth: "680px" }}>

          {/* Vertical accent */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "8px" }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "50%",
              background: "#a855f7",
              boxShadow: "0 0 20px #a855f7, 0 0 40px #a855f780",
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }} />
            <div style={{
              width: "2px", height: "280px",
              background: "linear-gradient(to bottom, #a855f7, rgba(168,85,247,0))",
            }} />
          </div>

          <div>
            {/* Tag */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ color: "#a855f7", fontSize: "12px", textTransform: "uppercase",
                letterSpacing: "0.3em", fontWeight: 600, marginBottom: "12px" }}
            >
              ✦ AI / ML / Backend Portfolio
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={styles.heroHeadText}
              style={{ color: "#fff", lineHeight: 1.1 }}
            >
              Hi, I'm{" "}
              <span style={{
                backgroundImage: "linear-gradient(135deg, #a855f7, #ec4899, #00d4aa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
              }}>
                Shivam
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={styles.heroSubText}
              style={{ color: "#d1d5db", marginTop: "10px" }}
            >
              I'm a <TypewriterText texts={roles} />
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ color: "#9ca3af", fontSize: "15px", lineHeight: "1.75", marginTop: "14px", maxWidth: "480px" }}
            >
              Specializing in Python, Django, Generative AI & Voice Agents.
              Building intelligent systems that shape the future.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ marginTop: "28px", display: "flex", gap: "14px", flexWrap: "wrap" }}
            >
              <a
                href="#about"
                style={{
                  padding: "12px 24px", borderRadius: "12px", fontWeight: 700,
                  fontSize: "14px", color: "#fff", textDecoration: "none",
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  boxShadow: "0 4px 30px rgba(124,58,237,0.5)",
                  transition: "all 0.3s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 40px rgba(124,58,237,0.7)"; }}
                onMouseLeave={(e) => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 30px rgba(124,58,237,0.5)"; }}
              >
                Explore My Work →
              </a>
              <a
                href="#contact"
                style={{
                  padding: "12px 24px", borderRadius: "12px", fontWeight: 700,
                  fontSize: "14px", color: "#a855f7", textDecoration: "none",
                  background: "rgba(168,85,247,0.08)",
                  border: "1px solid rgba(168,85,247,0.4)",
                  backdropFilter: "blur(8px)",
                  transition: "all 0.3s",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => { e.target.style.background = "rgba(168,85,247,0.2)"; e.target.style.borderColor = "#a855f7"; }}
                onMouseLeave={(e) => { e.target.style.background = "rgba(168,85,247,0.08)"; e.target.style.borderColor = "rgba(168,85,247,0.4)"; }}
              >
                Get In Touch
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              style={{ marginTop: "36px", display: "flex", gap: "32px" }}
            >
              {[
                { label: "Technologies", value: "12+", color: "#a855f7" },
                { label: "Projects", value: "5+", color: "#00d4aa" },
                { label: "Certifications", value: "3+", color: "#f472b6" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ textAlign: "center" }}>
                  <p style={{
                    fontSize: "26px", fontWeight: 800,
                    backgroundImage: `linear-gradient(135deg, ${color}, #ffffff)`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  }}>{value}</p>
                  <p style={{ color: "#6b7280", fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ─── Scroll indicator ─── */}
      <div style={{
        position: "absolute", bottom: "32px", left: "50%", transform: "translateX(-50%)",
        zIndex: 4, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      }}>
        <a href="#about" style={{ textDecoration: "none" }}>
          <div style={{
            width: "32px", height: "56px", borderRadius: "20px",
            border: "2px solid rgba(168,85,247,0.6)",
            boxShadow: "0 0 15px rgba(168,85,247,0.3)",
            display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "6px",
          }}>
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatType: "loop" }}
              style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: "linear-gradient(135deg, #a855f7, #00d4aa)",
              }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
