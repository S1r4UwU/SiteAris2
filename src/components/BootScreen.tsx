"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "ARIS CYBERSECURITY SYSTEMS v2.6.1",
  "Copyright (C) 2024-2026 ARIS Corp. All rights reserved.",
  "",
  "Initializing threat detection modules....... [OK]",
  "Loading EDR engine v4.2........................ [OK]",
  "Connecting to SOC infrastructure.............. [OK]",
  "Verifying certificates (SHA-256).............. [OK]",
  "Firewall rules loaded (2,847 entries)......... [OK]",
  "Zero-trust network access configured......... [OK]",
  "",
  "SYSTÈME PRÊT. BIENVENUE.",
];

const PROMPT = "> Appuyer sur ENTRÉE pour déployer_";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [flash, setFlash] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setShowPrompt(true);
      }
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleEnter = useCallback(() => {
    if (!showPrompt || exiting) return;
    setExiting(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 60);
    setTimeout(() => onComplete(), 100);
  }, [showPrompt, exiting, onComplete]);

  useEffect(() => {
    const handler = (e: KeyboardEvent | MouseEvent) => {
      if (e.type === "keydown" || e.type === "click") handleEnter();
    };
    window.addEventListener("keydown", handler);
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("click", handler);
    };
  }, [handleEnter]);

  const skip = () => {
    setExiting(true);
    onComplete();
  };

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#000000" }}
        >
          {flash && (
            <div className="fixed inset-0 bg-white z-[10000]" />
          )}

          <div className="max-w-[640px] w-full px-8">
            {lines.map((line, i) => {
              if (!line) {
                return (
                  <div key={i} className="font-mono text-[13px] leading-[1.9] text-white/90"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {"\u00A0"}
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className="font-mono text-[13px] leading-[1.9] text-white/90"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {line.includes("[OK]") ? (
                    <>
                      {line.replace("[OK]", "")}
                      <span className="text-cyber-green">[OK]</span>
                    </>
                  ) : (
                    line
                  )}
                </div>
              );
            })}

            {showPrompt && (
              <div
                className="mt-6 font-mono text-[13px] text-white"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  animation: "blink-cursor 1s step-end infinite",
                }}
              >
                {PROMPT}
              </div>
            )}
          </div>

          <button
            onClick={skip}
            className="fixed bottom-8 right-8 font-mono text-[10px] tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors uppercase"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            SKIP
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
