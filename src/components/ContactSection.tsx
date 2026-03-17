"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, ArrowRight } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-radial-[at_center] from-white/[0.03] to-transparent rounded-full" />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div
            className="inline-flex items-center justify-center w-14 h-14 mb-8"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Terminal size={22} className="text-text-tertiary" />
          </div>

          <span className="font-vt text-[16px] text-text-tertiary uppercase block mb-6">
            {"// INITIALISER_CONTACT"}
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-grotesk font-bold text-text mx-auto"
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              letterSpacing: "-0.025em",
              maxWidth: "700px",
              textWrap: "balance",
            }}
          >
            Prêt à sécuriser votre infrastructure ?
          </motion.h2>

          <p className="mt-6 font-grotesk text-[15px] text-text-secondary leading-[1.7] max-w-lg mx-auto">
            Notre équipe d&apos;ingénieurs configure votre environnement en moins de 24
            heures. Pas de rendez-vous commercial, pas d&apos;attente.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@aris.cyber"
              className="group inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase px-8 py-4 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
              style={{ border: "1px solid #EDEDED" }}
            >
              OUVRIR UN TICKET
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <a
              href="tel:+33100000000"
              className="inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase px-8 py-4 text-text-secondary hover:text-text transition-all duration-200"
              style={{ border: "1px solid rgba(255,255,255,0.2)" }}
            >
              +33 1 00 00 00 00
            </a>
          </div>

          <p className="mt-8 font-vt text-[16px] text-text-muted">
            Déploiement moyen : 18h · Satisfaction client : 98.4% · Support 24/7
          </p>

          <div className="mt-10 font-mono text-[11px] text-text-tertiary/50 tracking-[0.1em]">
            <span className="text-cyber-green/50">$</span> ssh
            deploy@aris.cyber — Temps de réponse moyen : 2h
          </div>
        </motion.div>
      </div>
    </section>
  );
}
