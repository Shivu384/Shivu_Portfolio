import { BrowserRouter } from "react-router-dom";

import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Tech,
  Works,
  Education,
  Certifications,
  GitHubContributions,
  StarsCanvas,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative z-0" style={{ background: "#050816" }}>

        {/* ─── Fixed ambient glow orbs ─────────────────────── */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "10%", left: "15%",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", top: "55%", right: "8%",
            width: "400px", height: "400px",
            background: "radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", bottom: "15%", left: "5%",
            width: "350px", height: "350px",
            background: "radial-gradient(circle, rgba(244,114,182,0.05) 0%, transparent 70%)",
            borderRadius: "50%", filter: "blur(40px)",
          }} />
        </div>

        {/* ─── Hero ─────────────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Navbar />
          <Hero />
        </div>

        {/* ─── Main Sections ────────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <About />
          <Education />
          <Experience />
          <Tech />
          <Works />
          <Certifications />
          <GitHubContributions />
        </div>

        {/* ─── Contact + Stars ──────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Contact />
          <StarsCanvas />
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;
