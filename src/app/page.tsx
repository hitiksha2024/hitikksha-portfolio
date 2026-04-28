"use client";

import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import TechBackground from "@/components/TechBackground";

// Client-only components
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [bloom, setBloom] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Smooth fast progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger soft bloom effect at the end
          setTimeout(() => setBloom(true), 150);
          setTimeout(() => {
            setLoaded(true);
            document.body.style.overflow = "auto";
          }, 700);
          return 100;
        }
        return prev + (Math.random() * 18);
      });
    }, 100);

    // Aggressive scroll reset to top on refresh
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    };

    forceScrollTop();
    const t1 = setTimeout(forceScrollTop, 50);
    const t2 = setTimeout(forceScrollTop, 150);

    // Clear hash to prevent jumping to sections
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <AnimatePresence>
        {!loaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            className="fixed inset-0 z-[300] bg-[#050508] flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Cinematic Background Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.05)_0%,transparent_70%)]" />

            <div className="relative flex items-center justify-center">
              {/* Spinning Energy Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute w-32 h-32 rounded-full border border-violet-500/20 border-t-violet-500/60"
              />

              {/* Progress Circle (Bloom styled) */}
              <svg className="w-28 h-28 -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="52"
                  stroke="rgba(255,255,255,0.03)"
                  strokeWidth="1"
                  fill="transparent"
                />
                <motion.circle
                  cx="56"
                  cy="56"
                  r="52"
                  stroke="url(#bloomGrad)"
                  strokeWidth="3"
                  fill="transparent"
                  strokeDasharray="326.7"
                  initial={{ strokeDashoffset: 326.7 }}
                  animate={{ 
                    strokeDashoffset: 326.7 - (326.7 * progress) / 100,
                    filter: progress === 100 ? "blur(4px)" : "blur(0px)"
                  }}
                  transition={{ duration: 0.3 }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="bloomGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Attractive Logo H */}
              <motion.div
                animate={bloom ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1 }}
                className="absolute"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-2xl font-black text-white shadow-[0_0_30px_rgba(124,58,237,0.3)] relative overflow-hidden group">
                  <span className="relative z-10">H</span>
                  {/* Glass Shimmer */}
                  <motion.div 
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  />
                </div>
              </motion.div>

              {/* Soft Bloom Flash */}
              <AnimatePresence>
                {bloom && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 4 }}
                    exit={{ opacity: 0 }}
                    className="absolute z-20 w-40 h-40 rounded-full bg-gradient-to-br from-violet-400 to-cyan-300 blur-3xl opacity-40"
                  />
                )}
              </AnimatePresence>
            </div>
            
            {/* Soft Text */}
            <motion.div 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-12 flex flex-col items-center gap-2"
            >
              <span className="text-[10px] uppercase tracking-[0.6em] text-white/40 font-bold">
                {progress < 100 ? "Initializing" : "Welcome"}
              </span>
              <div className="text-xs font-mono text-violet-400/60">{Math.round(progress)}%</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden noise">
        <TechBackground />
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-700/5 rounded-full blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: loaded ? 1 : 0, filter: loaded ? "blur(0px)" : "blur(10px)" }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <HeroSection loaded={loaded} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </motion.div>
      </main>
    </>
  );
}
