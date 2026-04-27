"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React.js", color: "#61dafb", bg: "rgba(97,218,251,0.1)", delay: 0 },
  { name: "Node.js", color: "#68a063", bg: "rgba(104,160,99,0.1)", delay: 0.05 },
  { name: "MongoDB", color: "#47a248", bg: "rgba(71,162,72,0.1)", delay: 0.1 },
  { name: "Next.js", color: "#a78bfa", bg: "rgba(167,139,250,0.1)", delay: 0.15 },
  { name: "JavaScript", color: "#f7df1e", bg: "rgba(247,223,30,0.1)", delay: 0.2 },
  { name: "Socket.io", color: "#06b6d4", bg: "rgba(6,182,212,0.1)", delay: 0.25 },
  { name: "Firebase", color: "#ffca28", bg: "rgba(255,202,40,0.1)", delay: 0.3 },
  { name: "REST APIs", color: "#f472b6", bg: "rgba(244,114,182,0.1)", delay: 0.35 },
  { name: "Git", color: "#f05032", bg: "rgba(240,80,50,0.1)", delay: 0.4 },
  { name: "SEO", color: "#34d399", bg: "rgba(52,211,153,0.1)", delay: 0.45 },
];

const floatAnims = ["float-a", "float-b", "float-c", "float-a", "float-b", "float-c",
  "float-a", "float-b", "float-c", "float-a"];

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="section-label block mb-3">Tech Arsenal</span>
          <h2 className="section-title text-white">
            Tools I wield with <span className="text-gradient">precision</span>
          </h2>
        </motion.div>

        {/* Orb Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: skill.delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.1, y: -8 }}
              className="card-shine group relative flex flex-col items-center justify-center p-6 rounded-2xl glass border border-white/5 hover:border-white/15 transition-all duration-300 cursor-none"
              style={{
                animation: `${floatAnims[i]} ${4 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {/* Glow blob on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{ background: skill.bg }}
              />

              {/* Colored dot */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-3 relative z-10 shadow-lg"
                style={{
                  background: skill.bg,
                  border: `1px solid ${skill.color}30`,
                  boxShadow: `0 0 15px ${skill.color}30`,
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    background: skill.color,
                    boxShadow: `0 0 10px ${skill.color}`,
                  }}
                />
              </div>

              <span className="text-sm font-semibold text-[#cbd5e1] group-hover:text-white transition-colors relative z-10 text-center">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-[#475569] text-sm mt-16 font-light"
        >
          + REST API design, authentication flows, deployment & DevOps basics
        </motion.p>
      </div>
    </section>
  );
}
