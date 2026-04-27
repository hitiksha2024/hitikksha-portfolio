"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const LinkedinIcon = ({ className, size }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contact() {
  return (
    <section className="relative w-full py-24 pb-32 z-10" id="contact">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-gray-400 font-light mb-12">
            Looking to collaborate or have a position available? I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="mailto:hitiksha57@gmail.com"
              className="flex items-center gap-3 px-8 py-4 rounded-full glass hover:bg-white/10 hover:border-primary/50 transition-all group"
            >
              <Mail className="text-primary group-hover:scale-110 transition-transform" size={24} />
              <span className="text-white font-medium">hitiksha57@gmail.com</span>
            </a>

            <a 
              href="https://linkedin.com/in/hitiksha-pandav"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(155,135,245,0.4)] transition-all group"
            >
              <LinkedinIcon className="group-hover:scale-110 transition-transform" size={24} />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </motion.div>
      </div>
      
      {/* Footer Text */}
      <div className="absolute bottom-6 w-full text-center text-gray-500 text-sm font-light">
        © {new Date().getFullYear()} Hitiksha Pandav. All rights reserved.
      </div>
    </section>
  );
}
