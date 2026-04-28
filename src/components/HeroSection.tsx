"use client";

import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef } from "react";
import HeroCodePanel from "./HeroCodePanel";

const LINES = [
  { word: "HITIKSHA", offset: 0 },
  { word: "PANDAV", offset: 8 },
];

const letterVariants: Variants = {
  hidden: { 
    y: "110%", 
    opacity: 0, 
    scale: 0.85,
    filter: "blur(8px)"
  },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
      delay: 0.1 + i * 0.045,
    },
  }),
};

const fadeUp: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    }
  }
};

export default function HeroSection({ loaded }: { loaded?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 0.25], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const orbScrollY = useTransform(scrollYProgress, [0, 0.4], ["0%", "-18%"]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex items-center overflow-hidden bg-transparent"
    >
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ x: [0, 20, 0], y: [0, -15, 0], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/8 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 20, 0], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px]"
        />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-between w-full pt-32 pb-16 relative z-10"
      >
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={loaded ? "visible" : "hidden"}
          className="w-full lg:w-[55%] flex flex-col"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
            <span className="section-label text-[10px] text-cyan-400 tracking-[0.4em] font-bold">ESTABLISHING_HANDSHAKE // PORTFOLIO_V2.0</span>
          </motion.div>

          <div className="mb-6 select-none relative">
            <div className="flex flex-col" style={{ lineHeight: 1.05 }}>
              {LINES.map(({ word, offset }) => (
                <div key={word} className="flex">
                  {word.split("").map((char, i) => (
                    <div
                      key={`${word}-${i}`}
                      className="relative overflow-visible px-[0.05em]"
                      style={{ paddingBottom: "0.1em" }}
                    >
                      <motion.span
                        custom={offset + i}
                        variants={letterVariants}
                        className="inline-block text-[clamp(2.8rem,7.5vw,6.5rem)] font-black tracking-[-0.04em]"
                        style={{
                          background: "linear-gradient(135deg, #fff 0%, #c4b5fd 45%, #a78bfa 75%, #22d3ee 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                          willChange: "transform",
                        }}
                      >
                        {char}
                      </motion.span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <motion.div variants={fadeUp} className="mb-4">
            <span className="text-xl md:text-2xl font-light text-[#94a3b8] tracking-wide">
              MERN Stack <span className="text-white font-medium">Developer</span>
            </span>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="max-w-lg mb-8 space-y-3"
          >
            <p className="text-lg md:text-xl font-semibold text-white/90 leading-tight">
              Building digital experiences that <span className="text-violet-400">resonate</span> and architectures that <span className="text-cyan-400">scale</span>.
            </p>
            <p className="text-[#64748b] text-sm md:text-base leading-relaxed font-light border-l border-white/10 pl-5">
              1.5+ years shipping real-world products — from fintech platforms to real-time apps — with React, Node.js, MongoDB & a relentless attention to detail.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 0 20px rgba(124,58,237,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary text-sm md:text-base px-8 py-3.5"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              Explore Deployments <span>→</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2, background: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline text-sm md:text-base px-8 py-3.5"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let&apos;s Connect
            </motion.button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex gap-10 pt-8 border-t border-white/5"
          >
            {[
              { value: "1.5+", label: "Years Exp." },
              { value: "06+", label: "Live Projects" },
              { value: "10+", label: "Tech Stack" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl md:text-3xl font-bold text-gradient-violet">{stat.value}</div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-[#475569] font-bold mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="w-full lg:w-[45%] mt-16 lg:mt-0 lg:hidden block pointer-events-none">
          <div className="scale-[0.85] md:scale-100 origin-center">
            <HeroCodePanel />
          </div>
        </div>

        <div className="hidden lg:block lg:w-[45%]" aria-hidden />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={loaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="absolute top-0 right-0 h-full w-[48%] pointer-events-none z-[5] hidden lg:block"
        style={{
          y: orbScrollY,
          maskImage: "radial-gradient(ellipse 95% 85% at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 85% at center, black 30%, rgba(0,0,0,0.4) 60%, transparent 95%)",
        }}
      >
        <div className="w-full h-full relative">
          <HeroCodePanel />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[10px] uppercase tracking-[0.6em] text-violet-400 font-bold">DISCOVER</span>
        <div className="relative w-[1px] h-10 overflow-hidden">
          <div className="absolute inset-0 bg-white/10" />
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-violet-400 to-transparent shadow-[0_0_8px_rgba(124,58,237,0.5)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
