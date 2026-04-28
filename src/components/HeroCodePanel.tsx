"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════
   CODE SNIPPETS (Loopable)
═══════════════════════════════════════════ */
const MAIN_CODE_POOL = [
  { tokens: [{ text: "import ", color: "#c678dd" }, { text: "express", color: "#e5c07b" }, { text: " from ", color: "#c678dd" }, { text: "'express';", color: "#98c379" }] },
  { tokens: [{ text: "const ", color: "#c678dd" }, { text: "app", color: "#61afef" }, { text: " = ", color: "#abb2bf" }, { text: "express();", color: "#e5c07b" }] },
  { tokens: [{ text: "app.use(", color: "#abb2bf" }, { text: "cors", color: "#61afef" }, { text: "());", color: "#abb2bf" }] },
  { tokens: [{ text: "app.use(", color: "#abb2bf" }, { text: "express.json", color: "#61afef" }, { text: "());", color: "#abb2bf" }] },
  { tokens: [{ text: "app.post(", color: "#abb2bf" }, { text: "'/login'", color: "#98c379" }, { text: ", async (req, res) => {", color: "#abb2bf" }] },
  { tokens: [{ text: "  const { email } = req.body;", color: "#abb2bf" }] },
  { tokens: [{ text: "  console.log(", color: "#abb2bf" }, { text: "'Login hit'", color: "#98c379" }, { text: ");", color: "#abb2bf" }] },
  { tokens: [{ text: "  res.status(200).send({ ok: true });", color: "#abb2bf" }] },
  { tokens: [{ text: "});", color: "#abb2bf" }] },
];

const SMALL_CODE_POOL = [
  { tokens: [{ text: "const ", color: "#c678dd" }, { text: "UserSchema", color: "#e5c07b" }, { text: " = new Schema({", color: "#abb2bf" }] },
  { tokens: [{ text: "  name: ", color: "#abb2bf" }, { text: "String", color: "#e5c07b" }, { text: ",", color: "#abb2bf" }] },
  { tokens: [{ text: "  email: ", color: "#abb2bf" }, { text: "String", color: "#e5c07b" }, { text: ",", color: "#abb2bf" }] },
  { tokens: [{ text: "  role: ", color: "#abb2bf" }, { text: "String", color: "#e5c07b" }, { text: ",", color: "#abb2bf" }] },
  { tokens: [{ text: "});", color: "#abb2bf" }] },
];

/* ═══════════════════════════════════════════
   DYNAMIC TYPEWRITER COMPONENTS
═══════════════════════════════════════════ */
function DynamicCodeEditor({ pool, maxVisible = 10, startDelay = 0, fontSize = "11px" }: { pool: any[], maxVisible?: number, startDelay?: number, fontSize?: string }) {
  const [lines, setLines] = useState<any[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!isStarted) return;
    const currentLine = pool[currentLineIdx % pool.length];
    const fullText = currentLine.tokens.map((t: any) => t.text).join("");

    if (charIdx < fullText.length) {
      const charTimer = setTimeout(() => setCharIdx(charIdx + 1), 10);
      return () => clearTimeout(charTimer);
    } else {
      const lineTimer = setTimeout(() => {
        setLines(prev => [...prev, { ...currentLine, id: Date.now() }]);
        setCharIdx(0);
        setCurrentLineIdx(prev => prev + 1);
      }, 600);
      return () => clearTimeout(lineTimer);
    }
  }, [isStarted, charIdx, currentLineIdx, pool]);

  const visibleLines = lines.slice(-maxVisible);
  const typingLine = pool[currentLineIdx % pool.length];

  return (
    <div className="flex flex-col gap-1 overflow-hidden" style={{ height: `${maxVisible * 19}px` }}>
      {visibleLines.map((line, idx) => (
        <div key={line.id} className="flex items-start gap-2 h-[18px]">
          <span className="text-[10px] font-mono w-5 text-right opacity-30 select-none">{lines.length - visibleLines.length + idx + 1}</span>
          <div className="font-mono flex whitespace-pre" style={{ fontSize }}>
            {line.tokens.map((t: any, i: number) => <span key={i} style={{ color: t.color }}>{t.text}</span>)}
          </div>
        </div>
      ))}
      <div className="flex items-start gap-2 h-[18px]">
        <span className="text-[10px] font-mono w-5 text-right opacity-30 select-none">{lines.length + 1}</span>
        <div className="font-mono flex whitespace-pre" style={{ fontSize }}>
          <TypewritingChars tokens={typingLine.tokens} charIdx={charIdx} />
          <span className="inline-block w-[6px] h-[13px] bg-violet-400/80 align-middle ml-px hero-cursor-blink" />
        </div>
      </div>
    </div>
  );
}

function TypewritingChars({ tokens, charIdx }: { tokens: any[], charIdx: number }) {
  let count = 0;
  return (
    <>
      {tokens.map((t, i) => {
        const start = count;
        count += t.text.length;
        if (start >= charIdx) return null;
        const visibleLen = Math.min(charIdx - start, t.text.length);
        return <span key={i} style={{ color: t.color }}>{t.text.slice(0, visibleLen)}</span>;
      })}
    </>
  );
}

/* ═══════════════════════════════════════════
   DECORATIVE ASSETS
═══════════════════════════════════════════ */
const TECH_ICONS = [
  { text: "JS", left: "5%", top: "15%", color: "#eab308", opacity: 0.3 },
  { text: "TS", left: "40%", top: "5%", color: "#3b82f6", opacity: 0.2 },
  { text: "node", left: "85%", top: "10%", color: "#4ade80", opacity: 0.25 },
  { text: "express", left: "38%", top: "65%", color: "#94a3b8", opacity: 0.15 },
  { text: "mongoDB", left: "75%", top: "85%", color: "#4ade80", opacity: 0.2 },
  { text: "⚛", left: "60%", top: "20%", color: "#61dafb", opacity: 0.25 },
  { text: "</>", left: "92%", top: "35%", color: "#a78bfa", opacity: 0.3 },
  { text: "{ }", left: "88%", top: "70%", color: "#64748b", opacity: 0.2 },
];

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function HeroCodePanel() {
  return (
    <div className="relative w-full h-full flex items-center justify-center md:justify-end md:pr-12 lg:pr-24 -mt-4">

      {/* ── Background Circuit/Glow Layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
      </div>

      {/* ── Floating Tech Icons (Hidden on mobile) ── */}
      <div className="hidden md:block">
        {TECH_ICONS.map((icon, i) => (
          <div
            key={i}
            className="absolute font-mono font-bold select-none"
            style={{
              left: icon.left,
              top: icon.top,
              color: icon.color,
              opacity: icon.opacity,
              fontSize: i % 2 === 0 ? "14px" : "12px",
              animation: `float-${i % 3 === 0 ? "a" : i % 3 === 1 ? "b" : "c"} ${7 + i}s ease-in-out infinite`,
            }}
          >
            {icon.text}
          </div>
        ))}
      </div>

      {/* ═══ PANELS CONTAINER ═══ */}
      <div className="relative z-[12] w-full max-w-[640px] px-4 md:px-6">

        {/* ═══ MAIN PANEL — Typewriter Code ═══ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(8, 7, 25, 0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px rgba(124, 58, 237, 0.1)",
            animation: "float-a 9s ease-in-out infinite",
            willChange: "transform, opacity",
          }}
        >
          {/* Top Bar */}
          <div className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-3 border-b border-white/5">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f57]/40" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#febc2e]/40" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28c840]/40" />
            <span className="ml-2 md:ml-4 text-[9px] md:text-[10px] font-mono opacity-20 uppercase tracking-widest">server.js</span>
          </div>

          {/* Code Area */}
          <div className="p-4 md:p-10 md:pl-12">
            <DynamicCodeEditor pool={MAIN_CODE_POOL} maxVisible={13} startDelay={1800} fontSize="clamp(9px, 1.5vw, 11px)" />
          </div>

          {/* Corner Decor */}
          <div className="absolute bottom-4 right-4 w-8 md:w-12 h-8 md:h-12 opacity-5 pointer-events-none">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </motion.div>

        {/* ═══ SECONDARY PANEL — Typewriter Code (Responsive placement) ═══ */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute -right-2 md:-right-2 -bottom-10 md:-bottom-16 w-[60%] md:w-[48%] z-[14]"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl" style={{
            background: "rgba(10, 8, 30, 0.85)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(96, 165, 250, 0.15)",
            animation: "float-b 8s ease-in-out infinite",
            willChange: "transform, opacity",
          }}>
            {/* Header */}
            <div className="px-3 md:px-4 py-2 md:py-3 border-b border-white/5 flex items-center justify-between">
              <span className="text-blue-400 font-mono text-xs md:text-sm font-bold opacity-80">&lt;/&gt;</span>
              <span className="text-[8px] md:text-[9px] font-mono opacity-20 uppercase tracking-tighter">model.ts</span>
            </div>

            {/* Code Area */}
            <div className="p-3 md:p-5">
              <DynamicCodeEditor pool={SMALL_CODE_POOL} maxVisible={5} startDelay={2400} fontSize="clamp(8px, 1.2vw, 10px)" />
            </div>

            {/* Status */}
            <div className="px-3 md:px-4 py-1.5 md:py-2 border-t border-white/5 flex items-center gap-2">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-400/40 animate-pulse" />
              <span className="text-[7px] md:text-[8px] font-mono text-blue-400/50 uppercase tracking-widest">Active Connection</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
