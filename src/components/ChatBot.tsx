"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ───
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  role: "user" | "model";
  parts: { text: string }[];
}

// ─── Suggestions with icons ───
const SUGGESTIONS = [
  { emoji: "📱", text: "What's Hitiksha's tech stack?" },
  { emoji: "🚀", text: "Tell me about her key projects" },
  { emoji: "💼", text: "How many years of experience does she have?" },
  { emoji: "🤝", text: "Is she available for hire?" },
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hey there! 👋 I'm Hitiksha's AI — ask me anything about her projects, skills, or experience!",
  timestamp: new Date(),
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// ─── Shared fetch logic ───
async function streamResponse(
  message: string,
  history: ChatHistory[],
  assistantId: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, history }),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || "Something went wrong. Try again!");
    }
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    if (!reader) throw new Error("No reader");
    let fullText = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullText += decoder.decode(value, { stream: true });
      setMessages((prev) =>
        prev.map((m) => (m.id === assistantId ? { ...m, content: fullText } : m))
      );
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Something went wrong 🙏";
    setMessages((prev) =>
      prev.map((m) => (m.id === assistantId ? { ...m, content: msg } : m))
    );
  } finally {
    setIsLoading(false);
  }
}

// ─── Main Component ───
export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    const area = inputRef.current;
    if (area) {
      area.style.height = "auto";
      area.style.height = `${area.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 400);
  }, [isOpen]);

  // Show tooltip after delay
  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(true), 4000);
    return () => clearTimeout(t);
  }, []);

  const buildHistory = useCallback((): ChatHistory[] => {
    return messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({
        role: m.role === "user" ? ("user" as const) : ("model" as const),
        parts: [{ text: m.content }],
      }));
  }, [messages]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    const userMsg: Message = { id: generateId(), role: "user", content: trimmed, timestamp: new Date() };
    const aId = generateId();
    setMessages((prev) => [...prev, userMsg, { id: aId, role: "assistant", content: "", timestamp: new Date() }]);
    setInput("");
    setIsLoading(true);
    await streamResponse(trimmed, buildHistory(), aId, setMessages, setIsLoading);
  }, [input, isLoading, buildHistory]);

  const handleSuggestion = (text: string) => {
    if (isLoading) return;
    const userMsg: Message = { id: generateId(), role: "user", content: text, timestamp: new Date() };
    const aId = generateId();
    const history = buildHistory();
    setMessages((prev) => [...prev, userMsg, { id: aId, role: "assistant", content: "", timestamp: new Date() }]);
    setIsLoading(true);
    streamResponse(text, history, aId, setMessages, setIsLoading);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) { setShowTooltip(false); }
  };

  const showWelcome = messages.length <= 1;

  return (
    <>
      {/* ─── FAB with orbit rings + tooltip ─── */}
      <div className="fixed bottom-6 right-6 z-[1000] flex items-center gap-3">
        {/* Tooltip label */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="chatbot-tooltip"
              onClick={toggleChat}
              style={{ cursor: "auto" }}
            >
              <span className="text-[13px] font-semibold text-white whitespace-nowrap">
                Chat with Hitiksha&apos;s AI
              </span>
              <span className="text-sm">✨</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main button */}
        <motion.button
          id="chatbot-toggle"
          onClick={toggleChat}
          className="relative w-[60px] h-[60px] rounded-full flex items-center justify-center text-white"
          style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)", cursor: "auto" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 300, damping: 18 }}
        >
          {/* Orbit ring 1 */}
          {!isOpen && (
            <motion.div
              className="absolute w-[76px] h-[76px] rounded-full border border-violet-400/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
            </motion.div>
          )}
          {/* Orbit ring 2 */}
          {!isOpen && (
            <motion.div
              className="absolute w-[92px] h-[92px] rounded-full border border-cyan-400/15"
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <div className="absolute -bottom-[3px] right-0 w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
            </motion.div>
          )}
          {/* Pulse */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(135deg, #7c3aed, #4f46e5)" }}
              animate={{ scale: [1, 1.6], opacity: [0.3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 3 }}
            />
          )}
          {/* Icon */}
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg key="x" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </motion.svg>
            ) : (
              <motion.svg key="c" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chatbot-window"
            initial={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(8px)" }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="fixed bottom-[100px] right-4 sm:right-6 z-[999] w-[calc(100vw-2rem)] sm:w-[420px] h-[580px] rounded-3xl overflow-hidden flex flex-col chatbot-window"
          >
            {/* Animated gradient border (via pseudo in CSS) */}

            {/* ─── Header ─── */}
            <div className="chatbot-header px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {/* Animated avatar with rotating ring */}
                <div className="relative">
                  <motion.div
                    className="absolute -inset-[3px] rounded-2xl"
                    style={{ background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #f472b6, #7c3aed)" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black bg-[#0a0a18]">
                    <span className="text-gradient">H</span>
                  </div>
                </div>
                <div>
                  <div className="text-[14px] font-bold text-white flex items-center gap-1.5">
                    Hitiksha&apos;s AI
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="text-sm"
                    >✨</motion.span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    </div>
                    <span className="text-[10px] text-emerald-400/90 font-semibold tracking-wide">Online now</span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                style={{ cursor: "auto" }}
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ─── Welcome Screen OR Messages ─── */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              {showWelcome ? (
                <WelcomeScreen onSuggestion={handleSuggestion} isLoading={isLoading} />
              ) : (
                <div className="px-4 py-4 space-y-3">
                  {messages.filter(m => m.id !== "welcome").map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`flex items-end gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {/* AI avatar */}
                      {msg.role === "assistant" && (
                        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black mb-0.5"
                          style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}>
                          H
                        </div>
                      )}
                      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-[13px] leading-[1.65] ${
                        msg.role === "user"
                          ? "chatbot-user-msg rounded-br-lg"
                          : "chatbot-ai-msg rounded-bl-lg"
                      }`}>
                        {msg.role === "assistant" && msg.content === "" ? (
                          <ThinkingIndicator />
                        ) : (
                          <div className="whitespace-pre-wrap break-words">
                            {formatMessage(msg.content)}
                          </div>
                        )}
                      </div>
                      {/* User avatar */}
                      {msg.role === "user" && (
                        <div className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold mb-0.5 bg-violet-600/30 text-violet-300 border border-violet-500/20">
                          You
                        </div>
                      )}
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* ─── Input Area ─── */}
            <div className="chatbot-input-area px-4 py-3 shrink-0">
              <div className="chatbot-input-wrapper flex items-center gap-2 rounded-2xl px-4 py-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about Hitiksha..."
                  disabled={isLoading}
                  rows={1}
                  className="flex-1 bg-transparent text-white/90 text-[13px] placeholder:text-white/40 outline-none resize-none max-h-32 py-2 font-[inherit] leading-relaxed disabled:opacity-50 scrollbar-hide"
                  style={{ cursor: "auto" }}
                />
                <motion.button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  className="chatbot-send-btn w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 disabled:opacity-25"
                  style={{ cursor: "auto" }}
                  data-active={!!(input.trim() && !isLoading)}
                  aria-label="Send message"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Welcome Screen ───
function WelcomeScreen({ onSuggestion, isLoading }: { onSuggestion: (t: string) => void; isLoading: boolean }) {
  return (
    <div className="flex flex-col items-center px-5 py-5">
      {/* Animated AI Avatar */}
      <motion.div
        className="relative mb-4"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Glow behind */}
        <div className="absolute inset-0 w-16 h-16 rounded-full bg-violet-500/20 blur-xl" />
        {/* Outer rotating ring */}
        <motion.div
          className="w-16 h-16 rounded-full p-[2px]"
          style={{ background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #f472b6, #7c3aed)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full bg-[#0c0c1a] flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
        </motion.div>
        {/* Status dot */}
        <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#0c0c1a] flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="text-[18px] font-bold text-white mb-1.5"
      >
        Hey there! I&apos;m Hitiksha&apos;s AI ✨
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-[13px] text-white/40 text-center mb-6 max-w-[280px] leading-relaxed"
      >
        Ask me anything about Hitiksha&apos;s skills, projects, or experience.
      </motion.p>

      {/* Suggestion Chips — Vertical List */}
      <div className="w-full flex flex-col gap-2 mt-3">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={s.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ x: 5, backgroundColor: "rgba(124, 58, 237, 0.08)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestion(s.text)}
            disabled={isLoading}
            className="chatbot-suggestion-row group flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 disabled:opacity-50 border border-white/[0.05] bg-white/[0.02]"
            style={{ cursor: "auto" }}
          >
            <div className="chatbot-suggestion-icon-mini w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-violet-500/5 border border-violet-500/10 group-hover:bg-violet-500/20 group-hover:border-violet-500/30 transition-all duration-300 shrink-0">
              {s.emoji}
            </div>
            <span className="text-[12.5px] font-medium text-white/60 group-hover:text-white transition-colors duration-300 text-left leading-tight">
              {s.text}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Thinking Indicator ───
function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
          />
        ))}
      </div>
      <motion.span
        className="text-[11px] text-white/30 font-medium"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        thinking...
      </motion.span>
    </div>
  );
}

// ─── Format Message ───
function formatMessage(content: string): React.ReactNode {
  if (!content) return null;
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    const formatted = parts.map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={j} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });

    if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
      return (
        <div key={i} className="flex gap-2 ml-0.5 my-0.5">
          <span className="text-violet-400 shrink-0 mt-0.5">•</span>
          <span>{formatted.map((p) => (typeof p === "string" ? p.replace(/^[-•]\s*/, "") : p))}</span>
        </div>
      );
    }
    if (/^\d+\.\s/.test(line.trim())) {
      const num = line.trim().match(/^(\d+)\./)?.[1];
      return (
        <div key={i} className="flex gap-2 ml-0.5 my-0.5">
          <span className="text-cyan-400 shrink-0 font-mono text-[11px] mt-0.5">{num}.</span>
          <span>{formatted.map((p) => (typeof p === "string" ? p.replace(/^\d+\.\s*/, "") : p))}</span>
        </div>
      );
    }
    return <span key={i}>{formatted}{i < lines.length - 1 && <br />}</span>;
  });
}
