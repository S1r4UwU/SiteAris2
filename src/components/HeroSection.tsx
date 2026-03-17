"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordScramble } from "./ScrambleText";
import GridBackground from "./GridBackground";
import ThreatMonitor from "./ThreatMonitor";
import AnimatedStats from "./AnimatedStats";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-start overflow-hidden">
      <GridBackground />

      {/* Radial halo behind title — offset left */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 1000px 600px at 20% 50%, rgba(255,255,255,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl w-full px-6 pt-36 md:pt-44 pb-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
          {/* Left column — Title + CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col items-start max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-10"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
              <span className="font-vt text-[16px] text-text-tertiary uppercase">
                Systèmes opérationnels — France
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="font-grotesk font-bold text-white leading-[0.95] text-left"
              style={{
                fontSize: "clamp(72px, 9vw, 130px)",
                letterSpacing: "-0.04em",
                textShadow:
                  "0 0 80px rgba(255,255,255,0.08), 0 0 160px rgba(255,255,255,0.04)",
              }}
            >
              LA{" "}
              <WordScramble word="SÉCURITÉ" delay={600} iterations={4} />
              <br />
              PLUG &{" "}
              <WordScramble word="PLAY." delay={900} iterations={3} />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-8 max-w-[520px] font-grotesk text-[15px] text-text-secondary leading-[1.7]"
            >
              Choisissez votre pack. Payez en ligne. Votre infrastructure est
              sécurisée en moins de 24h. La cybersécurité enfin accessible aux TPE/PME.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#offres"
                className="group relative inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase px-8 py-4 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
                style={{ border: "1px solid #EDEDED" }}
              >
                VOIR LES PACKS
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#infrastructure"
                className="inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase px-8 py-4 text-text-secondary hover:text-text transition-all duration-200"
                style={{ border: "1px solid rgba(255,255,255,0.2)" }}
              >
                NOTRE INFRASTRUCTURE
              </a>
            </motion.div>
          </motion.div>

          {/* Right column — Floating elements (desktop only) */}
          <div className="hidden md:flex flex-col gap-6 relative w-[280px] shrink-0 pt-8">
            {/* Element A — System card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="w-[220px] p-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <span className="font-vt text-[16px] text-text-tertiary block mb-2">
                STATUT RÉSEAU
              </span>
              <div className="font-vt text-[16px] text-cyber-green mb-1">
                {"██████████"} 100%
              </div>
              <div className="font-vt text-[16px] text-text-muted">
                MENACES BLOQUÉES : 1,247
              </div>
              <div className="font-vt text-[16px] text-text-muted">
                DERNIÈRE MAJ : 2s
              </div>
            </motion.div>

            {/* Element B — LIVE badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="inline-flex items-center gap-2 self-end mr-4"
            >
              <span
                className="w-2 h-2 rounded-full bg-cyber-green"
                style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
              />
              <span className="font-vt text-[16px] text-cyber-green">
                SOC OPÉRATIONNEL
              </span>
            </motion.div>

            {/* Element C — CLI line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="mt-auto font-mono text-[11px] text-text-tertiary"
            >
              $ aris-cli scan --target=network --deep
              <span style={{ animation: "blink-cursor 1s step-end infinite" }}>▋</span>
            </motion.div>
          </div>
        </div>

        {/* Dashboard SOC */}
        <ThreatMonitor />

        {/* Animated stats */}
        <AnimatedStats />
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
