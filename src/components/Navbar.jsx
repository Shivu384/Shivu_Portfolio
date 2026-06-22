import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrolled(scrollTop > 80);
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-20 transition-all duration-500 ${
          scrolled
            ? "bg-[#050816]/70 backdrop-blur-xl border-b border-[#915EFF]/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            {/* 3D-style logo badge */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#915EFF] to-[#00cea8] flex items-center justify-center shadow-[0_0_20px_rgba(145,94,255,0.5)] group-hover:shadow-[0_0_30px_rgba(145,94,255,0.8)] transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-black text-sm">SA</span>
            </div>
            <motion.p
              className="text-white text-[18px] font-bold cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              Shivam{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00cea8]">
                Arora
              </span>
            </motion.p>
          </Link>

          {/* Desktop nav links */}
          <ul className="list-none hidden sm:flex flex-row gap-8 items-center">
            {navLinks.map((nav) => (
              <motion.li
                key={nav.id}
                className="relative cursor-pointer"
                onClick={() => setActive(nav.title)}
                whileHover={{ y: -2 }}
              >
                <a
                  href={`#${nav.id}`}
                  className={`text-[15px] font-medium transition-all duration-300 ${
                    active === nav.title
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-[#915EFF] to-[#00cea8]"
                      : "text-secondary hover:text-white"
                  }`}
                >
                  {nav.title}
                </a>
                {/* Active underline */}
                {active === nav.title && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#915EFF] to-[#00cea8] rounded-full"
                  />
                )}
              </motion.li>
            ))}
            {/* Resume button */}
            <motion.a
              href="https://github.com/Shivu384"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#915EFF] to-[#bf61ff] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(145,94,255,0.6)] transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub ↗
            </motion.a>
          </ul>

          {/* Mobile menu toggle */}
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <motion.img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
              whileTap={{ scale: 0.9 }}
            />

            <AnimatePresence>
              {toggle && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 bg-[#0a0820]/95 backdrop-blur-xl absolute top-20 right-4 min-w-[180px] z-10 rounded-2xl border border-[#915EFF]/30 shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                >
                  <ul className="list-none flex flex-col gap-5">
                    {navLinks.map((nav) => (
                      <li
                        key={nav.id}
                        className={`font-medium cursor-pointer text-[16px] ${
                          active === nav.title ? "text-[#915EFF]" : "text-secondary"
                        } hover:text-white transition-colors`}
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                      >
                        <a href={`#${nav.id}`}>{nav.title}</a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#915EFF] via-[#bf61ff] to-[#00cea8] transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </nav>
    </>
  );
};

export default Navbar;
