"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 900px 600px at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      <motion.div
        className="absolute w-[600px] h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent top-1/3 left-0 z-0"
        animate={{ x: ["-600px", "calc(100vw + 600px)"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 6,
        }}
      />

      <motion.div
        className="absolute w-[1px] h-[400px] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent left-1/4 top-0 z-0"
        animate={{ y: ["-400px", "calc(100vh + 400px)"] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 8,
          delay: 4,
        }}
      />
    </div>
  );
}
