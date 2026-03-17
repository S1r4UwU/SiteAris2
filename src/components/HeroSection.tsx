"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordScramble } from "./ScrambleText";
import GridBackground from "./GridBackground";
import ThreatMonitor from "./ThreatMonitor";
import AnimatedStats from "./AnimatedStats";

export default function HeroSection() {
  const headingStyle: React.CSSProperties = {
    fontSize: "clamp(48px, 6vw, 88px)",
    letterSpacing: "-0.03em",
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-10"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.2em] text-text-tertiary uppercase">
              Systèmes opérationnels — France
            </span>
          </motion.div>

          <motion.h1
            className="max-w-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span
              className="block font-geist font-semibold text-white leading-[1.08]"
              style={headingStyle}
            >
              LA{" "}
              <WordScramble
                word="SÉCURITÉ"
                delay={600}
                iterations={4}
              />{" "}
              DE CLASSE
            </span>
            <span
              className="block font-geist font-semibold text-white leading-[1.08]"
              style={headingStyle}
            >
              ENTREPRISE.
            </span>
            <span
              className="block font-geist font-semibold text-white leading-[1.08] mt-2"
              style={headingStyle}
            >
              MAINTENANT EN PLUG &{" "}
              <WordScramble
                word="PLAY."
                delay={900}
                iterations={3}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="mt-8 max-w-2xl font-geist text-base md:text-lg text-text-secondary leading-relaxed"
          >
            Choisissez votre pack. Payez en ligne. Votre infrastructure est
            sécurisée en moins de 24h. Pas de commercial, pas de devis à
            rallonge. La cybersécurité enfin accessible aux TPE/PME.
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

          <ThreatMonitor />

          <AnimatedStats />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
    </section>
  );
}
