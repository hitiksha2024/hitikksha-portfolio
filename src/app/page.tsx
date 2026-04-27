"use client";

import dynamic from "next/dynamic";
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
  return (
    <>
      {/* Persistent UI */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />

      <main className="relative min-h-screen bg-[#050508] text-white overflow-x-hidden mouse-glow noise">
        {/* Tech symbols — fixed behind everything */}
        <TechBackground />
        {/* Ambient gradient layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Top-left violet blob */}
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-violet-700/5 rounded-full blur-[160px]" />
          {/* Bottom-right cyan blob */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[140px]" />
        </div>

        {/* Page content — each section stacked */}
        <div className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </main>
    </>
  );
}
