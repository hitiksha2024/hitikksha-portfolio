"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React.js", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "MongoDB", level: 85 },
  { name: "Next.js", level: 85 },
  { name: "JavaScript", level: 95 },
  { name: "Socket.io", level: 80 },
  { name: "Firebase", level: 75 },
  { name: "REST APIs", level: 90 },
  { name: "Git", level: 85 },
  { name: "SEO", level: 70 },
];

export default function Skills() {
  return (
    <section className="relative w-full py-24 z-10" id="skills">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            My core technology stack for building scalable, high-performance applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center text-center group transition-all hover:bg-white/5 hover:border-primary/50 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors z-10">
                {skill.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
