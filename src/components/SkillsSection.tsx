"use client";

import { motion } from "framer-motion";

const primarySkills = [
  { name: "React.js", color: "#61dafb", icon: "⚛", desc: "Expert in hooks, state management, and performant UI architecture." },
  { name: "Node.js", color: "#68a063", icon: "", desc: "Building scalable microservices and real-time event-driven systems." },
  { name: "MongoDB", color: "#47a248", icon: "🍃", desc: "Advanced data modeling and query optimization for high traffic." },
];

const secondarySkills = [
  { name: "Next.js", color: "#a78bfa" },
  { name: "JavaScript", color: "#f7df1e" },
  { name: "TypeScript", color: "#3178c6" },
  { name: "Express", color: "#94a3b8" },
  { name: "Socket.io", color: "#06b6d4" },
  { name: "Tailwind", color: "#38bdf8" },
  { name: "Firebase", color: "#ffca28" },
  { name: "Git", color: "#f05032" },
  { name: "REST APIs", color: "#f472b6" },
  { name: "SEO", color: "#34d399" },
  { name: "Docker", color: "#2496ed" },
  { name: "AWS", color: "#ff9900" },
];

const reversedSecondary = [...secondarySkills].reverse();
const marqueeRow1 = [...secondarySkills, ...secondarySkills];
const marqueeRow2 = [...reversedSecondary, ...secondarySkills];

export default function SkillsSection() {
  return (
    <section id="skills" className="section relative bg-transparent overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header with high-tech aesthetic */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10px" }}
            className="px-4 py-1.5 rounded-full glass border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6"
          >
            Technical Arsenal
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10px" }}
            className="text-4xl md:text-6xl font-black text-white leading-tight"
          >
            Tools I wield with <span className="text-gradient">precision</span>.
          </motion.h2>
        </div>

        {/* ── CORE SPOTLIGHT: High-end interactive cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-4">
          {primarySkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="relative group p-5 rounded-3xl glass-card hover:border-violet-500/30 transition-all duration-500 overflow-hidden"
            >
              {/* Animated corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
              
              <div className="relative z-10">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-2xl transition-transform duration-500 group-hover:scale-110"
                  style={{ background: `linear-gradient(135deg, ${skill.color}40, ${skill.color}10)`, border: `1px solid ${skill.color}40`, color: skill.color }}
                >
                  {skill.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{skill.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light italic">"{skill.desc}"</p>
                
                {/* Visual Mastery Indicator */}
                <div className="mt-8 flex items-center gap-3">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full"
                      style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Mastery</span>
                </div>
              </div>

              {/* Background Glow */}
              <div 
                className="absolute -bottom-10 -left-10 w-40 h-40 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-3xl rounded-full"
                style={{ background: skill.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── SECONDARY MARQUEE: Infinite scrolling icons ── */}
        <div 
          className="relative py-10 overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)'
          }}
        >
          <motion.div 
            animate={{ x: [0, -1035] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 w-fit px-4"
          >
            {marqueeRow1.map((skill, i) => (
              <div 
                key={`row1-${i}`} 
                className="flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                <span className="text-sm font-medium text-white/60 whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </motion.div>
          
          {/* Second row moving opposite */}
          <motion.div 
            animate={{ x: [-1035, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 w-fit px-4 mt-4"
          >
            {marqueeRow2.map((skill, i) => (
              <div 
                key={`row2-${i}`} 
                className="flex items-center gap-3 px-6 py-3 rounded-2xl glass border border-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: skill.color, boxShadow: `0 0 10px ${skill.color}` }} />
                <span className="text-sm font-medium text-white/60 whitespace-nowrap">{skill.name}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Footer info */}
        <div className="mt-20 text-center">
          <p className="text-[#475569] text-xs font-light uppercase tracking-[0.3em]">
            Continuously expanding the stack with emerging tech
          </p>
        </div>
      </div>
    </section>
  );
}
