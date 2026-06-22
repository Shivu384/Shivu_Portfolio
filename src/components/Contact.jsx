import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { contactInfo } from "../constants";

const NeonInput = ({ label, children }) => (
  <label className="flex flex-col group">
    <span className="text-white font-medium mb-2 text-sm uppercase tracking-wider group-focus-within:text-[#915EFF] transition-colors duration-300">
      {label}
    </span>
    {children}
  </label>
);

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: contactInfo.name,
          from_email: form.email,
          to_email: contactInfo.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          setSent(true);
          setForm({ name: "", email: "", message: "" });
          setTimeout(() => setSent(false), 4000);
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Something went wrong. Please try again.");
        }
      );
  };

  const inputClass =
    "bg-[#0d0b2e]/80 backdrop-blur-sm py-4 px-5 text-white rounded-xl outline-none font-medium text-sm transition-all duration-300 border border-[#915EFF]/20 focus:border-[#915EFF] focus:shadow-[0_0_20px_rgba(145,94,255,0.2)] placeholder:text-secondary/60 hover:border-[#915EFF]/40";

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden mb-10">
      {/* Form Panel */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl p-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(145deg, rgba(13,11,46,0.95), rgba(26,16,64,0.9))",
          border: "1px solid rgba(145,94,255,0.25)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Background glow blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#915EFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#00cea8]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Top accent */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#915EFF]/60 to-transparent" />

        <p className={styles.sectionSubText}>Get in Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* Quick contact info */}
        <div className="mt-6 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "📧", label: contactInfo.email, href: `mailto:${contactInfo.email}` },
            { icon: "📱", label: contactInfo.phone, href: `tel:${contactInfo.phone}` },
            { icon: "📍", label: contactInfo.location, href: null },
          ].map(({ icon, label, href }) => (
            <div key={label} className="flex items-center gap-2 text-secondary text-sm">
              <span>{icon}</span>
              {href ? (
                <a href={href} className="hover:text-[#915EFF] transition-colors duration-200 truncate">
                  {label}
                </a>
              ) : (
                <span className="truncate">{label}</span>
              )}
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="mb-6 flex gap-3">
          {[
            { href: contactInfo.github, emoji: "⚡", label: "GitHub", hover: "#915EFF" },
            { href: contactInfo.linkedin, emoji: "💼", label: "LinkedIn", hover: "#0077b5" },
            { href: contactInfo.leetcode, emoji: "🔧", label: "LeetCode", hover: "#ffa116" },
          ].map(({ href, emoji, label, hover }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-3 py-2 rounded-xl border border-[#915EFF]/20 bg-[#915EFF]/5 hover:border-[#915EFF]/60 transition-all duration-300 hover:scale-105"
            >
              <span>{emoji}</span>
              <span className="text-secondary text-xs group-hover:text-white transition-colors">{label}</span>
            </a>
          ))}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
          <NeonInput label="Your Name">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className={inputClass}
              required
            />
          </NeonInput>

          <NeonInput label="Your Email">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className={inputClass}
              required
            />
          </NeonInput>

          <NeonInput label="Your Message">
            <textarea
              rows={6}
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className={`${inputClass} resize-none`}
              required
            />
          </NeonInput>

          <button
            type="submit"
            disabled={loading}
            className="relative w-fit px-8 py-4 rounded-xl font-bold text-white text-sm tracking-wider transition-all duration-300 overflow-hidden group disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #915EFF, #bf61ff)",
              boxShadow: "0 0 30px rgba(145,94,255,0.3)",
            }}
          >
            <span className="relative z-10">
              {loading ? "Sending..." : sent ? "✓ Message Sent!" : "Send Message →"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00cea8] to-[#915EFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>
        </form>
      </motion.div>

      {/* Earth Globe */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
