"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { PackData } from "@/data/packs";

interface ServiceDrawerProps {
  pack: PackData | null;
  onClose: () => void;
  onDeploy: () => void;
}

export default function ServiceDrawer({ pack, onClose, onDeploy }: ServiceDrawerProps) {
  if (!pack) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9997]"
        style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />
      <motion.aside
        key="drawer-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 right-0 bottom-0 z-[9998] w-full max-w-[520px] overflow-y-auto"
        style={{ background: "#060606", borderLeft: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Title bar */}
        <div
          className="sticky top-0 flex items-center justify-between px-6 h-14 z-10"
          style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary">
            PRISME — {pack.name}
          </span>
          <button
            onClick={onClose}
            className="text-text-tertiary hover:text-text transition-colors p-1"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {pack.featured && (
            <span
              className="inline-block font-vt text-[14px] uppercase px-2 py-1 mb-5 text-cyber-green"
              style={{ border: "1px solid #00FF41" }}
            >
              RECOMMANDÉ
            </span>
          )}

          <h2 className="font-vt text-[28px] text-text mb-1">{pack.name}</h2>
          <p className="font-vt text-[16px] text-text-tertiary uppercase mb-6">{pack.tagline}</p>

          <div className="flex items-baseline gap-2 mb-8">
            <span className="font-mono text-[28px] font-bold text-white">{pack.price}</span>
            <span className="font-vt text-[16px] text-text-tertiary">{pack.period}</span>
          </div>

          <p className="font-grotesk text-[14px] text-text-secondary leading-[1.8] mb-8">
            {pack.description}
          </p>

          {/* Metrics */}
          <div
            className="grid gap-px mb-8"
            style={{
              gridTemplateColumns: `repeat(${Math.min(pack.metrics.length, 2)}, 1fr)`,
              background: "rgba(255,255,255,0.06)",
            }}
          >
            {pack.metrics.map((m) => (
              <div key={m.label} className="bg-bg px-4 py-3">
                <span className="block font-vt text-[20px] text-text">{m.value}</span>
                <span className="block font-vt text-[13px] text-text-tertiary uppercase">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-8">
            <span className="font-vt text-[14px] text-text-tertiary uppercase block mb-4">
              {"// FONCTIONNALITÉS"}
            </span>
            <div className="space-y-2.5">
              {pack.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="font-vt text-[14px] text-[#3A3A3A] mt-0.5 shrink-0">[+]</span>
                  <span className="font-grotesk text-[13px] text-text-secondary leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div className="mb-8">
            <span className="font-vt text-[14px] text-text-tertiary uppercase block mb-3">
              {"// STACK TECHNIQUE"}
            </span>
            <div className="flex flex-wrap gap-2">
              {pack.stack.map((t) => (
                <span
                  key={t}
                  className="font-vt text-[14px] text-text-tertiary px-3 py-1"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={onDeploy}
              className="group w-full inline-flex items-center justify-center gap-3 font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-4 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
              style={{ border: "1px solid #EDEDED" }}
            >
              LANCER LE DIAGNOSTIC
              <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
