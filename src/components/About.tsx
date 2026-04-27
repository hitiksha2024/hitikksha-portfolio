"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative w-full py-24 z-10" id="about">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto overflow-hidden relative"
        >
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white relative z-10">
            About <span className="text-gradient">Me</span>
          </h2>
          
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed font-light relative z-10">
            <p>
              I am a passionate <strong className="text-white font-medium">Full Stack Developer</strong> with over 1.5 years 
              of professional experience building real-world web applications. My journey started as an intern right after 
              graduation and evolved into a Software Engineer role where I thrive on solving complex problems.
            </p>
            <p>
              At ELaunch Solution Pvt. Ltd., I focus on creating scalable architectures, developing robust backend logic, 
              and crafting clean, responsive user interfaces. I believe in a <em>clean code mindset</em> and strive to build 
              products that perform flawlessly while delivering a premium user experience.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
