"use client";

import { motion } from "framer-motion";
import { 
  Rocket, 
  Server, 
  Radio, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  Layers, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Cpu,
  Gauge,
  Workflow
} from "lucide-react";

interface ServiceItem {
  id: string;
  stepNumber: string;
  title: string;
  badge: string;
  metric: string;
  desc: string;
  icon: typeof Rocket;
  accent: string;
  glow: string;
  deliverables: string[];
  tech: string[];
  ctaLabel: string;
}

const services: ServiceItem[] = [
  {
    id: "mvp-dev",
    stepNumber: "01",
    title: "Full-Stack Web & MVP Development",
    badge: "Startups & Founders",
    metric: "2-4 Weeks Sprint To Launch",
    desc: "Transform your product vision into a production-grade web application. Rapid sprint execution with clean, future-proof code that scales from day one.",
    icon: Rocket,
    accent: "#a78bfa",
    glow: "rgba(167, 139, 250, 0.2)",
    deliverables: [
      "End-to-end full-stack web applications (React, Next.js, Node.js)",
      "Secure user authentication (JWT, OAuth 2.0) & Role-Based Access Control",
      "Stripe / Razorpay payment gateway integration & billing workflows",
      "Production deployment with cloud hosting, custom domain & automated CI/CD"
    ],
    tech: ["Next.js", "React.js", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    ctaLabel: "Build an MVP with Hitiksha",
  },
  {
    id: "backend-arch",
    stepNumber: "02",
    title: "Scalable Backend & API Engineering",
    badge: "High Throughput",
    metric: "99.9% Uptime Architecture",
    desc: "Robust microservices and RESTful APIs engineered for high concurrency, rock-solid data integrity, and lightning-fast query execution under heavy traffic.",
    icon: Server,
    accent: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.2)",
    deliverables: [
      "RESTful API design with clean OpenAPI/Swagger documentation",
      "MongoDB database modeling, indexing & aggregation pipeline tuning",
      "High-speed caching, endpoint rate-limiting & security headers",
      "Third-party integrations (Twilio, SendGrid, Firebase, AWS S3)"
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Docker", "AWS"],
    ctaLabel: "Architect Scalable APIs",
  },
  {
    id: "realtime-systems",
    stepNumber: "03",
    title: "Real-Time Engines & WebSockets",
    badge: "Instant Event Sync",
    metric: "<50ms Live Event Engine",
    desc: "Build dynamic, bidirectional communication platforms that keep users actively engaged: live chat, matchmaking, instant notifications, and status streams.",
    icon: Radio,
    accent: "#f472b6",
    glow: "rgba(244, 114, 182, 0.2)",
    deliverables: [
      "Low-latency real-time bidirectional event sync using Socket.io",
      "In-app chat systems, presence indicators & live push notifications",
      "Matchmaking algorithms & concurrent room state management",
      "Auto-reconnect logic and resilient event state synchronization"
    ],
    tech: ["Socket.io", "Node.js", "Express", "WebSockets", "MongoDB"],
    ctaLabel: "Build Real-Time Features",
  },
  {
    id: "frontend-polish",
    stepNumber: "04",
    title: "UI/UX Modernization & Speed Tuning",
    badge: "Pixel-Perfect & Fast",
    metric: "90+ Core Web Vitals Score",
    desc: "Transform clunky, slow web applications into slick, ultra-responsive digital experiences with fluid micro-interactions, responsive UX, and top performance.",
    icon: Sparkles,
    accent: "#34d399",
    glow: "rgba(52, 211, 153, 0.2)",
    deliverables: [
      "Fluid, GPU-accelerated micro-interactions (Framer Motion 60FPS)",
      "100% mobile-first, cross-browser responsive fidelity on all viewports",
      "Bundle size optimization, image CDN tuning & Core Web Vitals audit",
      "Accessible, modular component systems using modern Tailwind CSS"
    ],
    tech: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    ctaLabel: "Modernize Your Platform",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Discovery & Scope",
    desc: "We align on your product requirements, user flows, tech stack, and deliver a crystal-clear roadmap with fixed milestones.",
  },
  {
    step: "02",
    title: "Agile Sprints",
    desc: "Rapid development in weekly cycles. You get working, clickable demos each week so there's zero guesswork.",
  },
  {
    step: "03",
    title: "QA & Hardening",
    desc: "Comprehensive testing: API security, DB query optimization, mobile responsiveness, and cross-browser checks.",
  },
  {
    step: "04",
    title: "Deploy & Support",
    desc: "Flawless live production deployment, complete documentation handover, and dedicated post-launch support.",
  },
];

const guarantees = [
  {
    icon: Zap,
    title: "Rapid Sprint Delivery",
    desc: "Agile milestones and weekly demos so you always see working software and meet your go-to-market deadlines.",
    accent: "#a78bfa",
  },
  {
    icon: Layers,
    title: "Production-Grade Code",
    desc: "Clean, self-documenting code built on solid architecture so you never need an expensive rewrite down the road.",
    accent: "#22d3ee",
  },
  {
    icon: MessageSquare,
    title: "Direct & Clear Updates",
    desc: "Direct developer access with zero agency bureaucracy. Transparent communication with < 12hr reply times.",
    accent: "#f472b6",
  },
  {
    icon: ShieldCheck,
    title: "Post-Launch Warranty",
    desc: "Dedicated support for bug fixes, performance tuning, and smooth handover to your in-house team.",
    accent: "#34d399",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { y: 30, opacity: 0, filter: "blur(6px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function ServicesSection() {
  const scrollToContact = (projectType?: string) => {
    const el = document.querySelector("#contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (projectType) {
        window.dispatchEvent(new CustomEvent("select-project-type", { detail: projectType }));
      }
    }
  };

  return (
    <section id="services" className="section relative overflow-hidden bg-transparent">
      {/* Subtle section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto h-px mb-20 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(6,182,212,0.4), transparent)",
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-cyan-600/8 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-violet-500/30 bg-violet-950/20 mb-5 shadow-[0_0_20px_rgba(124,58,237,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-300 font-bold uppercase">
              CAPABILITIES // WHAT I DELIVER
            </span>
          </motion.div>

          <motion.h2 variants={fadeUp} className="section-title text-white mb-6">
            High-Impact Engineering for{" "}
            <span className="text-gradient">Startups & Companies</span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[#94a3b8] text-base md:text-lg leading-relaxed font-light mb-8 max-w-2xl mx-auto">
            Whether you need a full <span className="text-white font-medium">MVP built from scratch</span>, scalable <span className="text-cyan-300 font-medium">backend APIs</span>, or a dedicated <span className="text-violet-300 font-medium">full-stack engineer</span> for your sprint — I deliver battle-tested software designed to scale.
          </motion.p>

          {/* Value Proposition Pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#cbd5e1]">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/5 bg-white/[0.02]">
              <Clock size={13} className="text-violet-400" />
              <span>Rapid Sprint Execution</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/5 bg-white/[0.02]">
              <Cpu size={13} className="text-cyan-400" />
              <span>Modern MERN & Next.js Stack</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-white/5 bg-white/[0.02]">
              <Gauge size={13} className="text-emerald-400" />
              <span>90+ Performance & Clean Architecture</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── 4 Main Services Grid (Bento Style with Richer Visuals) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative group rounded-3xl glass-card p-7 md:p-9 flex flex-col justify-between overflow-hidden border border-white/8 hover:border-white/25 transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
              >
                {/* Background glow accent on hover */}
                <div
                  className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                  style={{ background: service.accent }}
                />

                {/* Subtle top edge border gradient */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)` }}
                />

                <div>
                  {/* Card Header: Icon + Step + Badge */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${service.accent}25, ${service.accent}08)`,
                          border: `1px solid ${service.accent}35`,
                          color: service.accent,
                        }}
                      >
                        <Icon size={26} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64748b] block">
                          SOLUTION {service.stepNumber}
                        </span>
                        <span
                          className="text-xs font-mono font-semibold"
                          style={{ color: service.accent }}
                        >
                          {service.badge}
                        </span>
                      </div>
                    </div>

                    {/* Metric Tag */}
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70 whitespace-nowrap hidden sm:inline-block">
                      {service.metric}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#94a3b8] text-sm md:text-base leading-relaxed font-light mb-6">
                    {service.desc}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="space-y-3 mb-6 pt-5 border-t border-white/5">
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#64748b] font-semibold">
                      Deliverables & Scope
                    </div>
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-[#cbd5e1]">
                        <CheckCircle2
                          size={16}
                          className="shrink-0 mt-0.5"
                          style={{ color: service.accent }}
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Pills & Direct Action */}
                <div className="pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/[0.03] text-white/60 border border-white/5 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToContact(service.title)}
                    className="flex items-center gap-1.5 text-xs font-bold transition-all group/cta ml-auto px-4 py-2 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
                    style={{ color: service.accent }}
                  >
                    <span>{service.ctaLabel}</span>
                    <ArrowRight size={13} className="group-hover/cta:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── 4-Step Collaborative Workflow (From Idea to Launch) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="rounded-3xl glass p-8 md:p-12 border border-white/10 relative overflow-hidden mb-20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Workflow size={18} className="text-violet-400" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-violet-400 font-bold">
              THE WORKFLOW
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
            How we turn your idea into working software
          </h3>
          <p className="text-sm md:text-base text-[#94a3b8] font-light max-w-xl mb-10">
            A transparent, agile process designed to ship high-quality features with speed and zero friction.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflowSteps.map((wf, idx) => (
              <div
                key={wf.step}
                className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-violet-500/30 transition-all group"
              >
                <div className="text-3xl font-black font-mono text-white/10 group-hover:text-violet-400/30 transition-colors mb-3">
                  {wf.step}
                </div>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                  {wf.title}
                </h4>
                <p className="text-xs text-[#94a3b8] leading-relaxed font-light">
                  {wf.desc}
                </p>

                {/* Connecting arrow for larger screens */}
                {idx < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-white/20">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Client Confidence / Why Work With Me ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10px" }}
          className="rounded-3xl glass p-8 md:p-10 border border-white/10 relative overflow-hidden mb-16"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase font-mono tracking-[0.3em] text-cyan-400 font-bold block mb-2">
              WHY CHOOSE HITIKSHA
            </span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              The Engineering & Freelance Advantage
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((item, i) => {
              const GIcon = item.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${item.accent}18`, color: item.accent }}
                  >
                    <GIcon size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Project Discussion Banner (Call to Action) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden p-8 md:p-12 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.18) 0%, rgba(6,182,212,0.12) 100%)",
            border: "1px solid rgba(124, 58, 237, 0.3)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Subtle glow orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/25 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 mb-4 font-bold">
              KICKOFF YOUR PROJECT
            </span>

            <h3 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
              Have an idea or need an experienced developer?
            </h3>

            <p className="text-[#cbd5e1] text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
              Let&apos;s collaborate to design, develop, and launch high-performance digital products on time and within budget.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollToContact("Freelance MVP / Project")}
                className="btn-primary px-8 py-3.5 text-sm md:text-base font-bold shadow-[0_0_25px_rgba(124,58,237,0.4)] cursor-pointer"
              >
                Start a Project Discussion <ArrowRight size={16} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-outline px-7 py-3.5 text-sm md:text-base cursor-pointer"
              >
                Browse Past Deployments
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
