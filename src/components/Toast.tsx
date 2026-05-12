"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export default function Toast({ message, type, isVisible, onClose }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%", scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
          exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 z-[100] min-w-[320px]"
        >
          <div className={`
            relative overflow-hidden p-4 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-xl
            ${type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"}
          `}>
            {/* Ambient Glow */}
            <div className={`absolute inset-0 opacity-20 pointer-events-none ${type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"}`} />
            
            <div className={`p-2 rounded-xl ${type === "success" ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
              {type === "success" ? <CheckCircle2 size={20} /> : <XCircle size={20} /> }
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>

            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>

            {/* Progress Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 5, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-0.5 ${type === "success" ? "bg-emerald-500/50" : "bg-red-500/50"}`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
