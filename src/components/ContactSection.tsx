"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Send, AlertCircle, Copy, Check, Clock, Globe, ShieldCheck } from "lucide-react";
import { useState, useRef, MouseEvent, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Toast from "./Toast";

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

/* ── Magnetic link wrapper ── */
function MagneticLink({
  children,
  href,
  target,
  rel,
  className,
}: {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.25);
    y.set(dy * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const PROJECT_TYPES = [
  "🚀 Freelance MVP / Project",
  "💼 Full-Time Hiring",
  "⚡ Backend & APIs",
  "👋 General Inquiry",
];

const getPlaceholder = (type: string) => {
  if (type.includes("Freelance")) {
    return "Hi Hitiksha, I'd like to discuss a freelance project / MVP. Here are a few details regarding the scope, requirements, and timeline...";
  }
  if (type.includes("Full-Time")) {
    return "Hi Hitiksha, we have an exciting full-time software engineering role at our company and would love to explore working together...";
  }
  if (type.includes("Backend")) {
    return "Hi Hitiksha, I'd like to consult on backend architecture, API engineering, or system scalability for our application...";
  }
  return "Hi Hitiksha, I'd love to connect regarding an opportunity or discuss potential collaboration...";
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [projectType, setProjectType] = useState("🚀 Freelance MVP / Project");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; visible: boolean }>({
    message: "",
    type: "success",
    visible: false,
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) {
        if (detail.includes("Backend") || detail.includes("API")) {
          setProjectType("⚡ Backend & APIs");
        } else if (detail.includes("Hiring") || detail.includes("Full-Time")) {
          setProjectType("💼 Full-Time Hiring");
        } else {
          setProjectType("🚀 Freelance MVP / Project");
        }
        // Focus the name input; placeholder will guide the message
        nameInputRef.current?.focus();
      }
    };
    window.addEventListener("select-project-type", handler);
    return () => window.removeEventListener("select-project-type", handler);
  }, []);

  const focusForm = () => {
    nameInputRef.current?.focus();
    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyEmail = (e: MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("pandavhitiksha@gmail.com");
    setCopied(true);
    setToast({
      message: "Email copied to clipboard!",
      type: "success",
      visible: true,
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_default";
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "your_public_key";

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      to_name: "Hitiksha",
      project_type: projectType,
      message: `[Category: ${projectType}]\n\n${form.message}`,
      reply_to: form.email,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setSent(true);
          setForm({ name: "", email: "", message: "" });
          setLoading(false);
          setToast({
            message: "Message sent successfully! I'll get back to you within 12 hours.",
            type: "success",
            visible: true,
          });
          setTimeout(() => setSent(false), 4000);
        },
        (err) => {
          setLoading(false);
          console.error("FAILED...", err);
          setError("Failed to send message. Please email me directly at pandavhitiksha@gmail.com");
          setToast({
            message: "Something went wrong. Please email directly.",
            type: "error",
            visible: true,
          });
        }
      );
  };

  return (
    <section id="contact" className="section relative overflow-hidden bg-transparent">
      {/* Ambient Glows */}
      <div className="absolute right-0 top-1/3 -translate-y-1/2 w-80 h-80 bg-cyan-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Section divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-5xl mx-auto h-px mb-20 origin-center"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.3), rgba(6,182,212,0.3), transparent)",
        }}
      />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            <span className="section-label">ENDPOINT // GET IN TOUCH</span>
          </motion.div>

          <motion.h2 variants={itemVariants} className="section-title text-white">
            Ready to collaborate? <span className="text-gradient">Let&apos;s talk.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[#94a3b8] mt-4 max-w-lg mx-auto font-light text-base">
            Whether you have a freelance project, need an MVP built, or want to discuss a full-time software engineering role — I&apos;m ready to connect.
          </motion.p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Contact Info & Reassurances (5 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="md:col-span-5 space-y-4"
          >
            {/* Email Card with Quick Copy */}
            <motion.div variants={itemVariants}>
              <div
                onClick={focusForm}
                className="w-full p-5 glass rounded-2xl border border-white/5 hover:border-violet-500/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:scale-105 transition-all duration-300">
                      <Mail size={22} />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider mb-0.5">
                        Direct Email
                      </div>
                      <div className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">
                        pandavhitiksha@gmail.com
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* LinkedIn */}
            <motion.div variants={itemVariants}>
              <MagneticLink
                href="https://www.linkedin.com/in/hitiksha-pandav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-105 transition-all duration-300">
                  <LinkedinIcon />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider mb-0.5">
                    LinkedIn Profile
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    linkedin.com/in/hitiksha-pandav
                  </div>
                </div>
              </MagneticLink>
            </motion.div>

            {/* GitHub */}
            <motion.div variants={itemVariants}>
              <MagneticLink
                href="https://github.com/hitiksha-pandav"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 glass rounded-2xl border border-white/5 hover:border-pink-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:bg-pink-500/20 group-hover:scale-105 transition-all duration-300">
                  <GithubIcon />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider mb-0.5">
                    GitHub Codebase
                  </div>
                  <div className="text-sm font-semibold text-white group-hover:text-pink-300 transition-colors">
                    github.com/hitiksha-pandav
                  </div>
                </div>
              </MagneticLink>
            </motion.div>

            {/* Client Reassurances Block */}
            <motion.div
              variants={itemVariants}
              className="p-5 glass rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3"
            >
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider font-mono">
                  Active Freelance & Role Availability
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#94a3b8] pt-2 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-emerald-400 shrink-0" />
                  <span>Response time: Under 12 hours guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={13} className="text-cyan-400 shrink-0" />
                  <span>Available for remote contracts worldwide</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={13} className="text-violet-400 shrink-0" />
                  <span>Direct developer contract & NDA protection</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Interactive Form (7 cols) */}
          <motion.form
            id="contact-form"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="md:col-span-7 p-7 md:p-8 rounded-3xl glass-card border border-white/10 space-y-5"
          >
            {/* Project / Collaboration Type Filter Pills */}
            <div>
              <label className="text-xs text-[#94a3b8] font-mono uppercase tracking-wider mb-2.5 block">
                How would you like to collaborate?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PROJECT_TYPES.map((type) => {
                  const isSelected = projectType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`px-3 py-2 text-xs rounded-xl font-medium text-left transition-all duration-300 border cursor-pointer ${
                        isSelected
                          ? "bg-violet-600/30 border-violet-500/60 text-white shadow-[0_0_15px_rgba(124,58,237,0.25)]"
                          : "bg-white/[0.02] border-white/5 text-[#94a3b8] hover:border-white/15 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-[#64748b] mb-1.5 block font-mono">YOUR NAME</label>
                <input
                  ref={nameInputRef}
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Alex Smith"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-xs text-[#64748b] mb-1.5 block font-mono">YOUR EMAIL</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="alex@company.com"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#64748b] mb-1.5 block font-mono">YOUR MESSAGE</label>
              <textarea
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={getPlaceholder(projectType)}
                rows={5}
                className="input-field resize-none"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2"
              >
                <AlertCircle size={15} /> {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(124,58,237,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className={`btn-primary w-full justify-center relative overflow-hidden py-3.5 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10 flex items-center gap-2 justify-center font-bold text-sm">
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Dispatching...
                  </span>
                ) : sent ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center gap-2"
                  >
                    ✓ Sent! Expect a reply soon.
                  </motion.span>
                ) : (
                  <>
                    Send Inquiry <Send size={15} />
                  </>
                )}
              </span>
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-32 border-t border-white/5 pt-12 pb-6 text-center"
      >
        <p className="text-[#475569] text-[11px] font-mono uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} Hitiksha Pandav — Full Stack & Freelance Engineer
        </p>
      </motion.div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.visible}
        onClose={() => setToast({ ...toast, visible: false })}
      />
    </section>
  );
}
