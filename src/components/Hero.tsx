"use client";

import { motion } from "framer-motion";
import { ArrowDown, Code2, Globe, Rocket } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 pb-10" id="hero">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between z-10 w-full">
        
        {/* Left Side: Text Content */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col justify-center mt-10 lg:mt-0 text-center lg:text-left drop-shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-2 mb-4"
          >
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-medium tracking-wide flex items-center gap-2">
              <Code2 size={16} /> Welcome to my world
            </span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Hi, I&apos;m <br />
            <span className="text-gradient">Hitiksha Pandav</span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-2xl text-gray-300 font-light mb-6 flex items-center justify-center lg:justify-start gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            MERN Stack Developer
          </motion.h2>

          <motion.p 
            className="text-base md:text-lg text-gray-400 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            I build scalable, real-world web applications with clean UI and smooth UX. 
            Transforming complex problems into elegant, premium digital experiences.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <a 
              href="#projects" 
              className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 group"
            >
              Explore My Work
              <Rocket size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 rounded-full border border-white/20 hover:border-white/50 bg-black/30 backdrop-blur-md text-white font-medium transition-all hover:bg-white/5"
            >
              Contact Me
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side: Spacer for 3D Character */}
        <div className="w-full lg:w-1/2 h-[50vh] lg:h-[80vh] pointer-events-none" />
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      >
        <span className="text-xs uppercase tracking-widest text-gray-400">Scroll</span>
        <ArrowDown size={16} className="text-primary animate-bounce" />
      </motion.div>
    </section>
  );
}
