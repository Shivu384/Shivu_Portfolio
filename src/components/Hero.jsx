import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";

const Hero = () => {
  const [currentCode, setCurrentCode] = useState(0);
  
  const codeSnippets = [
    { lang: "python", code: "def build_ai_system():\n    return intelligence" },
    { lang: "django", code: "class AIView(View):\n    def post(self):\n        return AI()" },
    { lang: "js", code: "const createAI = () => {\n  return 'Innovation';\n}" },
    { lang: "genai", code: "def generate_content(prompt):\n    return model.generate(\n        prompt=prompt\n    )" },
    { lang: "genai", code: "class GenAIAgent:\n    def create(self):\n        return AI.innovate()" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [codeSnippets.length]);

  return (
    <section className={`relative w-full h-screen mx-auto overflow-hidden`}>
      <div className='absolute inset-0 flex items-center'>
        <div
          className={`w-full max-w-7xl mx-auto ${styles.paddingX} flex flex-col md:flex-row items-center gap-8 md:gap-12 z-10`}
        >
          <div className='flex flex-col md:flex-row items-start gap-5 md:gap-8 flex-1'>
            <div className='hidden md:flex flex-col justify-center items-center mt-5'>
              <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
              <div className='w-1 h-80 violet-gradient' />
            </div>

            <div className='flex-1 z-20'>
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className={`${styles.heroHeadText} text-white`}>
                  Hi, I'm <span className='text-[#915EFF]'>Shivam</span>
                </h1>
                <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                  I'm a Backend Developer, AI Engineer, and Machine Learning Engineer <br className='sm:block hidden' />
                  specializing in Python, Django, Generative AI and Voice Agents .
                </p>
              </motion.div>
            </div>
          </div>

          <div className='hidden lg:flex flex-1 items-center justify-center relative max-w-lg'>
            <motion.div
              key={currentCode}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className='w-full bg-black-100/90 backdrop-blur-sm rounded-2xl p-6 border border-secondary/30 shadow-2xl'
            >
              <div className='flex gap-2 mb-4 items-center'>
                <div className='w-3 h-3 rounded-full bg-red-500'></div>
                <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                <div className='w-3 h-3 rounded-full bg-green-500'></div>
                <span className='ml-4 text-secondary text-xs uppercase tracking-wider'>{codeSnippets[currentCode].lang}</span>
              </div>
              <pre className='text-green-400 text-sm font-mono overflow-x-auto'>
                <code className='whitespace-pre'>{codeSnippets[currentCode].code}</code>
              </pre>
            </motion.div>
            
            <div className='absolute -z-10 w-96 h-96 bg-[#915EFF] rounded-full blur-[140px] opacity-15 animate-pulse'></div>
          </div>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
