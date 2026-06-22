import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import { githubStats } from "../constants";

// ─── Helpers ──────────────────────────────────────────────────────────────
const DAYS = 365;
const WEEKS = Math.ceil(DAYS / 7);

/** Generate a realistic-looking commit heatmap for the past 365 days */
const generateContributions = () => {
  const today = new Date();
  const data = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dayOfWeek = date.getDay();
    // Higher probability on weekdays; bursts for project periods
    const weekNum = Math.floor(i / 7);
    const isBurstPeriod = weekNum < 8 || (weekNum > 20 && weekNum < 28) || (weekNum > 40 && weekNum < 48);
    let count = 0;
    const rand = Math.random();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count = rand < 0.35 ? Math.floor(rand * 8) : 0;
    } else if (isBurstPeriod) {
      count = rand < 0.85 ? Math.ceil(rand * 14) : 0;
    } else {
      count = rand < 0.65 ? Math.ceil(rand * 7) : 0;
    }
    data.push({ date: date.toISOString().split("T")[0], count });
  }
  return data;
};

/** Map count → shade index 0-4 */
const getLevel = (count) => {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
};

const LEVEL_COLORS = [
  "rgba(255,255,255,0.04)",  // 0 – empty
  "#216e39",                  // 1 – light
  "#30a14e",                  // 2 – mid
  "#40c463",                  // 3 – bright
  "#9be9a8",                  // 4 – brightest
];

const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS   = ["Mon","Wed","Fri"];

// ─── Heatmap Grid ─────────────────────────────────────────────────────────
const HeatmapGrid = ({ contributions }) => {
  const [tooltip, setTooltip] = useState(null);

  // Pad so the grid starts on Monday
  const firstDate  = new Date(contributions[0].date);
  const startPad   = (firstDate.getDay() + 6) % 7; // 0=Mon
  const paddedCells = [...Array(startPad).fill(null), ...contributions];

  const totalWeeks = Math.ceil(paddedCells.length / 7);
  const cellSize   = 12;
  const gap        = 3;
  const step       = cellSize + gap;

  // Month label positions
  const monthLabels = [];
  paddedCells.forEach((cell, idx) => {
    if (!cell) return;
    const d = new Date(cell.date);
    if (d.getDate() === 1) {
      monthLabels.push({ col: Math.floor(idx / 7), label: MONTH_LABELS[d.getMonth()] });
    }
  });

  return (
    <div style={{ position: "relative", overflowX: "auto", paddingBottom: "4px" }}>
      {/* Month labels */}
      <div style={{ display: "flex", marginLeft: "28px", marginBottom: "4px", minWidth: `${totalWeeks * step}px` }}>
        {monthLabels.map(({ col, label }) => (
          <span key={label + col} style={{
            position: "absolute",
            left: `${28 + col * step}px`,
            fontSize: "10px",
            color: "#6b7280",
            whiteSpace: "nowrap",
          }}>{label}</span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 0, marginTop: "14px" }}>
        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${gap}px`, marginRight: "6px", paddingTop: "2px" }}>
          {["","Mon","","Wed","","Fri",""].map((label, i) => (
            <div key={i} style={{ width: "22px", height: `${cellSize}px`, fontSize: "9px", color: "#6b7280",
              display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: "2px" }}>
              {label}
            </div>
          ))}
        </div>

        {/* Columns (weeks) */}
        <div style={{ display: "flex", gap: `${gap}px`, position: "relative" }}>
          {Array.from({ length: totalWeeks }).map((_, weekIdx) => (
            <div key={weekIdx} style={{ display: "flex", flexDirection: "column", gap: `${gap}px` }}>
              {Array.from({ length: 7 }).map((_, dayIdx) => {
                const cellIdx = weekIdx * 7 + dayIdx;
                const cell = paddedCells[cellIdx];
                const level = cell ? getLevel(cell.count) : -1;
                if (level === -1) return <div key={dayIdx} style={{ width: cellSize, height: cellSize }} />;
                return (
                  <div
                    key={dayIdx}
                    onMouseEnter={(e) => {
                      if (cell) setTooltip({
                        text: `${cell.count} commit${cell.count !== 1 ? "s" : ""} on ${cell.date}`,
                        x: e.clientX, y: e.clientY,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{
                      width: cellSize,
                      height: cellSize,
                      borderRadius: "2px",
                      background: LEVEL_COLORS[level],
                      border: level === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                      cursor: cell?.count > 0 ? "pointer" : "default",
                      transition: "transform 0.1s",
                      boxShadow: level >= 3 ? `0 0 4px ${LEVEL_COLORS[level]}88` : "none",
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = "scale(1.4)"; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div style={{
          position: "fixed", top: tooltip.y - 36, left: tooltip.x - 80,
          background: "#1a1040", border: "1px solid rgba(168,85,247,0.4)",
          padding: "5px 10px", borderRadius: "8px", fontSize: "11px", color: "#fff",
          pointerEvents: "none", zIndex: 1000, whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
        }}>
          {tooltip.text}
        </div>
      )}

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "10px", justifyContent: "flex-end" }}>
        <span style={{ fontSize: "10px", color: "#6b7280" }}>Less</span>
        {LEVEL_COLORS.map((color, i) => (
          <div key={i} style={{
            width: "11px", height: "11px", borderRadius: "2px", background: color,
            border: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
          }} />
        ))}
        <span style={{ fontSize: "10px", color: "#6b7280" }}>More</span>
      </div>
    </div>
  );
};

// ─── Stat Card ────────────────────────────────────────────────────────────
const StatCard = ({ icon, value, label, color, delay }) => (
  <motion.div
    variants={fadeIn("up", "spring", delay, 0.7)}
    style={{
      flex: "1 1 140px",
      minWidth: "130px",
      background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
      border: `1px solid ${color}44`,
      borderRadius: "16px",
      padding: "20px 16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      position: "relative",
      overflow: "hidden",
      boxShadow: `0 4px 30px rgba(0,0,0,0.4), 0 0 20px ${color}11`,
    }}
  >
    {/* Top glow */}
    <div style={{
      position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
      width: "60%", height: "2px",
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
    }} />
    {/* Glow blob */}
    <div style={{
      position: "absolute", top: "-15px", right: "-15px", width: "60px", height: "60px",
      background: `${color}18`, borderRadius: "50%", filter: "blur(15px)", pointerEvents: "none",
    }} />
    <span style={{ fontSize: "22px" }}>{icon}</span>
    <p style={{
      fontSize: "28px", fontWeight: 800,
      backgroundImage: `linear-gradient(135deg, ${color}, #ffffff88)`,
      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    }}>{value}</p>
    <p style={{ color: "#9ca3af", fontSize: "11px", textAlign: "center", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </p>
  </motion.div>
);

// ─── Coding Profile Pill ──────────────────────────────────────────────────
const ProfilePill = ({ icon, platform, value, href, color }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: "flex", alignItems: "center", gap: "12px",
      background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
      border: `1px solid ${color}33`,
      borderRadius: "12px", padding: "12px 18px",
      textDecoration: "none", cursor: "pointer",
      transition: "all 0.3s", flex: "1 1 200px",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${color}88`;
      e.currentTarget.style.boxShadow = `0 0 20px ${color}33`;
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = `${color}33`;
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <span style={{ fontSize: "22px" }}>{icon}</span>
    <div>
      <p style={{ color: "#9ca3af", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{platform}</p>
      <p style={{ color: "#fff", fontSize: "16px", fontWeight: 700 }}>{value}</p>
    </div>
    <span style={{ marginLeft: "auto", color: color, fontSize: "14px" }}>↗</span>
  </a>
);

// ─── Main Component ───────────────────────────────────────────────────────
const GitHubContributions = () => {
  const contributions = useMemo(() => generateContributions(), []);
  const totalContribs = contributions.reduce((s, d) => s + d.count, 0);

  const stats = [
    { icon: "🔥", value: "21 days", label: "Longest Streak", color: "#f97316", delay: 0.1 },
    { icon: "⚡", value: githubStats.totalCommits, label: "Total Commits", color: "#a855f7", delay: 0.2 },
    { icon: "📦", value: githubStats.publicRepos, label: "Public Repos", color: "#00d4aa", delay: 0.3 },
    { icon: "🧩", value: totalContribs.toLocaleString(), label: "Past Year Contrib.", color: "#f472b6", delay: 0.4 },
  ];

  return (
    <>
      {/* Section header */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>Open Source Activity</p>
        <h2 className={`${styles.sectionHeadText} text-center`}>GitHub.</h2>
      </motion.div>

      {/* Stats row */}
      <motion.div
        variants={fadeIn("up", "spring", 0.1, 0.8)}
        style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginTop: "40px", justifyContent: "center" }}
      >
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </motion.div>

      {/* ── Heatmap card ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 0.8)}
        style={{
          marginTop: "24px",
          background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
          border: "1px solid rgba(168,85,247,0.25)",
          borderRadius: "20px",
          padding: "28px 24px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Corner glow */}
        <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "150px", height: "150px",
          background: "rgba(168,85,247,0.1)", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-20px", left: "-20px", width: "100px", height: "100px",
          background: "rgba(0,212,170,0.08)", borderRadius: "50%", filter: "blur(30px)", pointerEvents: "none" }} />

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
          <div>
            <p style={{ color: "#a855f7", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 600 }}>
              Contribution Activity
            </p>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "18px", marginTop: "2px" }}>
              {totalContribs.toLocaleString()} contributions in the last year
            </h3>
          </div>
          <a
            href="https://github.com/Shivu384"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: "8px 18px", borderRadius: "10px", fontSize: "13px", fontWeight: 600,
              color: "#fff", textDecoration: "none",
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 4px 20px rgba(124,58,237,0.4)",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(124,58,237,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(124,58,237,0.4)"; }}
          >
            View Profile ↗
          </a>
        </div>

        <HeatmapGrid contributions={contributions} />
      </motion.div>

      {/* ── Coding Profiles row ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.5, 0.8)}
        style={{ marginTop: "20px" }}
      >
        <p style={{ color: "#6b7280", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em",
          marginBottom: "12px", fontWeight: 600 }}>
          Coding Profiles
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          <ProfilePill
            icon="⚡" platform="GitHub" value="Shivu384"
            href="https://github.com/Shivu384" color="#a855f7"
          />
          <ProfilePill
            icon="🧩" platform="LeetCode" value="300+ Solved"
            href="https://leetcode.com/u/Shivu384/" color="#f97316"
          />
          <ProfilePill
            icon="🏆" platform="CodeChef" value="100+ Solved"
            href="https://www.codechef.com/" color="#00d4aa"
          />
          <ProfilePill
            icon="📊" platform="Kaggle" value="Active Contributor"
            href="https://www.kaggle.com/" color="#f472b6"
          />
        </div>
      </motion.div>

      {/* ── GitHub readme stats via official service ── */}
      <motion.div
        variants={fadeIn("up", "spring", 0.6, 0.8)}
        style={{ marginTop: "20px", display: "flex", flexWrap: "wrap", gap: "14px", justifyContent: "center" }}
      >
        <div style={{
          flex: "1 1 340px", background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
          border: "1px solid rgba(168,85,247,0.2)", borderRadius: "16px",
          padding: "16px", overflow: "hidden",
        }}>
          <img
            src="https://github-readme-stats.vercel.app/api?username=Shivu384&show_icons=true&theme=transparent&hide_border=true&title_color=a855f7&icon_color=00d4aa&text_color=ffffff&bg_color=00000000&count_private=true"
            alt="GitHub Stats"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
        <div style={{
          flex: "1 1 340px", background: "linear-gradient(145deg, #0d0b2e, #1a1040)",
          border: "1px solid rgba(0,212,170,0.2)", borderRadius: "16px",
          padding: "16px", overflow: "hidden",
        }}>
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=Shivu384&theme=transparent&hide_border=true&stroke=a855f7&ring=a855f7&fire=f97316&currStreakLabel=00d4aa&sideLabels=ffffff&dates=9ca3af&background=00000000"
            alt="GitHub Streak"
            style={{ width: "100%", height: "auto" }}
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(GitHubContributions, "github");
