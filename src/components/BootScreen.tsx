"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "PRISME-ONE SECURITY v1.0",
  "© 2026 PRISME-ONE — FRANCE",
  "[████████████████████] CHARGEMENT MODULES...",
  "✓ SCAN ENGINE — OK",
  "✓ NETWORK AUDIT — OK",
  "✓ OSINT MODULE — OPÉRATIONNEL",
  "> INITIALISATION COMPLÈTE",
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setDone(true);
      }
    }, 120);

    timerRef.current = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 500);
    }, 2800);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [onComplete]);

  const skip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setExiting(true);
    setTimeout(onComplete, 100);
  };

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="boot"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: "#000000" }}
        >
          <div className="max-w-[560px] w-full px-8">
            {lines.map((line, i) => (
              <div
                key={i}
                className="text-[15px] leading-[2] text-white/90"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                {line.startsWith("✓") ? (
                  <>
                    <span className="text-[#00FF46]">✓</span>
                    {line.slice(1)}
                  </>
                ) : (
                  line
                )}
              </div>
            ))}

            {done && (
              <span
                className="inline-block w-2 h-2 rounded-full mt-3"
                style={{
                  background: "#00FF46",
                  animation: "blink-cursor 1s step-end infinite",
                }}
              />
            )}
          </div>

          <button
            onClick={skip}
            aria-label="Passer l'écran de démarrage"
            className="fixed bottom-8 right-8 text-[11px] tracking-[0.15em] text-white/15 hover:text-white/40 transition-colors uppercase"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            SKIP
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
