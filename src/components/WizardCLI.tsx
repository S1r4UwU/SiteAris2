"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

/* ── Stripe Payment Links (replace with real links from your Stripe dashboard) ── */
const STRIPE_LINKS: Record<string, string> = {
  "anti-ransomware": "https://buy.stripe.com/REPLACE_ANTI_RANSOMWARE",
  "audit-express": "https://buy.stripe.com/REPLACE_AUDIT_EXPRESS",
  "conformite-rgpd": "https://buy.stripe.com/REPLACE_PACK_RGPD",
  "soc-manage": "https://buy.stripe.com/REPLACE_SOC_MANAGE",
  "bastion": "https://buy.stripe.com/REPLACE_BASTION",
};

const PACK_DATA: Record<string, { name: string; price: string; period: string; desc: string }> = {
  "anti-ransomware": { name: "ANTI-RANSOMWARE", price: "490€", period: "/mois", desc: "EDR/XDR managé, isolation automatique, analyse comportementale" },
  "audit-express": { name: "AUDIT EXPRESS", price: "1 200€", period: "unique", desc: "Scan de vulnérabilités, pentest light, rapport exécutif + plan de remédiation" },
  "conformite-rgpd": { name: "PACK RGPD", price: "350€", period: "/mois", desc: "DPO externalisé, registre des traitements, gestion des consentements" },
  "soc-manage": { name: "SOC MANAGÉ", price: "890€", period: "/mois", desc: "SIEM cloud-native, threat intelligence, réponse à incident automatisée" },
  "bastion": { name: "BASTION", price: "290€", period: "/mois", desc: "VPN Zero-Trust, MFA adaptatif, gestion des accès privilégiés" },
};

type Step = 0 | 1 | 2 | 3 | 4; // 0-3 = questions, 4 = result

interface WizardCLIProps {
  open: boolean;
  onClose: () => void;
}

function getRecommendation(parkSize: string, need: string, hadIncident: string): string {
  if (need === "audit") return "audit-express";
  if (need === "rgpd") return "conformite-rgpd";
  if (need === "protection") {
    if (parkSize === "large") return "soc-manage";
    if (parkSize === "medium") return "anti-ransomware";
    return "anti-ransomware";
  }
  if (need === "unknown") {
    if (hadIncident === "yes") return "audit-express";
    return "audit-express";
  }
  return "audit-express";
}

function TypingText({ text, speed = 20, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      setDisplayed(text);
      onDone?.();
      return;
    }
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone, shouldReduce]);

  return <>{displayed}</>;
}

export default function WizardCLI({ open, onClose }: WizardCLIProps) {
  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState({ parkSize: "", need: "", incident: "", email: "" });
  const [typing, setTyping] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [fallbackMsg, setFallbackMsg] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resetInactivity = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      setShowFallback(true);
    }, 30000);
  }, []);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setAnswers({ parkSize: "", need: "", incident: "", email: "" });
    setTyping(true);
    setShowFallback(false);
    setFallbackMsg("");
    setEmailInput("");
    setProcessing(false);
    resetInactivity();
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [open, resetInactivity]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      resetInactivity();

      if (typing || processing) return;

      if (step === 0) {
        const key = e.key.toUpperCase();
        if (["A", "B", "C"].includes(key)) {
          const val = key === "A" ? "small" : key === "B" ? "medium" : "large";
          setAnswers((a) => ({ ...a, parkSize: val }));
          setTyping(true);
          setStep(1);
        }
      } else if (step === 1) {
        const key = e.key.toUpperCase();
        if (["A", "B", "C", "D"].includes(key)) {
          const map: Record<string, string> = { A: "audit", B: "protection", C: "rgpd", D: "unknown" };
          setAnswers((a) => ({ ...a, need: map[key] }));
          setTyping(true);
          setStep(2);
        }
      } else if (step === 2) {
        const key = e.key.toUpperCase();
        if (["O", "N"].includes(key)) {
          setAnswers((a) => ({ ...a, incident: key === "O" ? "yes" : "no" }));
          setTyping(true);
          setStep(3);
        }
      } else if (step === 3) {
        if (e.key === "Enter") {
          setAnswers((a) => ({ ...a, email: emailInput }));
          setProcessing(true);
          setTyping(true);
          setTimeout(() => {
            setProcessing(false);
            setStep(4);
          }, 1500);
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, step, typing, processing, emailInput, onClose, resetInactivity]);

  const selectOption = (stepNum: Step, value: string) => {
    resetInactivity();
    if (typing || processing) return;

    if (stepNum === 0) {
      setAnswers((a) => ({ ...a, parkSize: value }));
      setTyping(true);
      setStep(1);
    } else if (stepNum === 1) {
      setAnswers((a) => ({ ...a, need: value }));
      setTyping(true);
      setStep(2);
    } else if (stepNum === 2) {
      setAnswers((a) => ({ ...a, incident: value }));
      setTyping(true);
      setStep(3);
    }
  };

  const submitEmail = () => {
    resetInactivity();
    setAnswers((a) => ({ ...a, email: emailInput }));
    setProcessing(true);
    setTyping(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(4);
    }, 1500);
  };

  const recommendation = getRecommendation(answers.parkSize, answers.need, answers.incident);
  const pack = PACK_DATA[recommendation];
  const stripeLink = STRIPE_LINKS[recommendation];

  const sendFallback = () => {
    if (!fallbackMsg.trim()) return;
    const subject = encodeURIComponent("Demande via prisme-one.com");
    const body = encodeURIComponent(fallbackMsg);
    window.location.href = `mailto:contact@prisme-one.com?subject=${subject}&body=${body}`;
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-[640px] overflow-hidden"
          style={{
            background: "#060606",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(0,255,65,0.05)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-4 h-10 shrink-0"
            style={{ background: "#0A0A0A", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
              <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary ml-2">
              PRISME — DIAGNOSTIC RAPIDE
            </span>
            <button
              onClick={onClose}
              className="ml-auto text-text-tertiary hover:text-text transition-colors p-1"
              aria-label="Fermer le diagnostic"
            >
              <X size={14} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 min-h-[360px] max-h-[70vh] overflow-y-auto">
            {showFallback ? (
              <FallbackForm
                value={fallbackMsg}
                onChange={setFallbackMsg}
                onSubmit={sendFallback}
                onBack={() => setShowFallback(false)}
              />
            ) : (
              <>
                {/* Init line */}
                <div className="font-mono text-[12px] text-cyber-green/70 mb-6">
                  $ prisme-scan --init
                </div>

                {/* Step 0 */}
                {step >= 0 && (
                  <QuestionBlock
                    visible
                    label="[1/4] Quelle est la taille de votre parc ?"
                    done={step > 0}
                    typing={step === 0 && typing}
                    onTypingDone={() => setTyping(false)}
                    answer={answers.parkSize === "small" ? "[A] 1-10 postes" : answers.parkSize === "medium" ? "[B] 11-50 postes" : answers.parkSize === "large" ? "[C] 50+ postes" : ""}
                  >
                    {step === 0 && !typing && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <OptionBtn label="A" text="1-10 postes" onClick={() => selectOption(0, "small")} />
                        <OptionBtn label="B" text="11-50 postes" onClick={() => selectOption(0, "medium")} />
                        <OptionBtn label="C" text="50+ postes" onClick={() => selectOption(0, "large")} />
                      </div>
                    )}
                  </QuestionBlock>
                )}

                {/* Step 1 */}
                {step >= 1 && (
                  <QuestionBlock
                    visible
                    label="[2/4] Quel est votre besoin principal ?"
                    done={step > 1}
                    typing={step === 1 && typing}
                    onTypingDone={() => setTyping(false)}
                    answer={answers.need === "audit" ? "[A] Audit / pentest" : answers.need === "protection" ? "[B] Protection continue" : answers.need === "rgpd" ? "[C] Conformité RGPD" : answers.need === "unknown" ? "[D] Je ne sais pas" : ""}
                  >
                    {step === 1 && !typing && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <OptionBtn label="A" text="Audit / pentest" onClick={() => selectOption(1, "audit")} />
                        <OptionBtn label="B" text="Protection continue" onClick={() => selectOption(1, "protection")} />
                        <OptionBtn label="C" text="Conformité RGPD" onClick={() => selectOption(1, "rgpd")} />
                        <OptionBtn label="D" text="Je ne sais pas" onClick={() => selectOption(1, "unknown")} />
                      </div>
                    )}
                  </QuestionBlock>
                )}

                {/* Step 2 */}
                {step >= 2 && (
                  <QuestionBlock
                    visible
                    label="[3/4] Avez-vous déjà subi un incident de sécurité ?"
                    done={step > 2}
                    typing={step === 2 && typing}
                    onTypingDone={() => setTyping(false)}
                    answer={answers.incident === "yes" ? "[O] Oui" : answers.incident === "no" ? "[N] Non" : ""}
                  >
                    {step === 2 && !typing && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        <OptionBtn label="O" text="Oui" onClick={() => selectOption(2, "yes")} />
                        <OptionBtn label="N" text="Non" onClick={() => selectOption(2, "no")} />
                      </div>
                    )}
                  </QuestionBlock>
                )}

                {/* Step 3 — Email */}
                {step >= 3 && step < 4 && !processing && (
                  <div className="mt-5">
                    <div className="font-vt text-[16px] text-text-tertiary mb-2">
                      {">"} [4/4] Votre email professionnel :
                    </div>
                    <div className="font-vt text-[13px] text-text-muted mb-3">
                      (Appuyez sur Entrée pour passer)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] text-cyber-green/60">{">"}</span>
                      <input
                        type="email"
                        value={emailInput}
                        onChange={(e) => { setEmailInput(e.target.value); resetInactivity(); }}
                        onKeyDown={(e) => { if (e.key === "Enter") submitEmail(); }}
                        placeholder="nom@entreprise.fr"
                        autoFocus
                        className="flex-1 bg-transparent font-mono text-[13px] text-text outline-none placeholder:text-text-muted/50"
                      />
                    </div>
                    <button
                      onClick={submitEmail}
                      className="mt-4 font-mono text-[11px] tracking-[0.1em] uppercase px-5 py-2.5 text-text-secondary hover:text-text transition-colors"
                      style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      ANALYSER →
                    </button>
                  </div>
                )}

                {/* Processing */}
                {processing && (
                  <div className="mt-5">
                    <div className="font-mono text-[12px] text-cyber-green/70">
                      <TypingText text="$ prisme-scan --analyze --recommend..." speed={15} />
                    </div>
                    <div className="mt-2 font-vt text-[14px] text-text-muted">
                      Analyse en cours...
                    </div>
                  </div>
                )}

                {/* Step 4 — Result */}
                {step === 4 && pack && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-5"
                  >
                    <div className="font-mono text-[12px] text-cyber-green mb-4">
                      ✓ Analyse terminée — Pack recommandé :
                    </div>

                    <div
                      className="p-5"
                      style={{ border: "1px solid rgba(0,255,65,0.2)", background: "rgba(0,255,65,0.03)" }}
                    >
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="font-vt text-[20px] text-text">{pack.name}</span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-mono text-[22px] font-bold text-white">{pack.price}</span>
                          <span className="font-vt text-[14px] text-text-tertiary">{pack.period}</span>
                        </div>
                      </div>
                      <p className="font-grotesk text-[13px] text-text-secondary leading-relaxed mb-5">
                        {pack.desc}
                      </p>

                      {answers.incident === "yes" && (
                        <div
                          className="mb-4 px-3 py-2 font-vt text-[14px] text-[#FF5F57]"
                          style={{ border: "1px solid rgba(255,95,87,0.3)", background: "rgba(255,95,87,0.05)" }}
                        >
                          ⚠ Incident détecté — intervention prioritaire recommandée
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <a
                          href={stripeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase px-6 py-3.5 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
                          style={{ border: "1px solid #EDEDED" }}
                        >
                          SOUSCRIRE
                          <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                        </a>
                        <a
                          href={`mailto:contact@prisme-one.com?subject=${encodeURIComponent(`Demande : ${pack.name}`)}&body=${encodeURIComponent(`Bonjour,\n\nJe suis intéressé par le pack ${pack.name} (${pack.price} ${pack.period}).\n\nTaille du parc : ${answers.parkSize}\nBesoin : ${answers.need}\nIncident passé : ${answers.incident}\n${answers.email ? `Email : ${answers.email}` : ""}\n\nMerci.`)}`}
                          className="inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.1em] uppercase px-6 py-3.5 text-text-secondary hover:text-text transition-all duration-200"
                          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                        >
                          CONTACTER D&apos;ABORD
                        </a>
                      </div>
                    </div>

                    <button
                      onClick={() => { setStep(0); setAnswers({ parkSize: "", need: "", incident: "", email: "" }); setTyping(true); setEmailInput(""); }}
                      className="mt-4 font-mono text-[11px] text-text-tertiary/50 hover:text-text-tertiary transition-colors"
                    >
                      ← Recommencer le diagnostic
                    </button>
                  </motion.div>
                )}

                {/* Fallback hint */}
                {step < 4 && !showFallback && (
                  <div className="mt-8 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                    <button
                      onClick={() => setShowFallback(true)}
                      className="font-mono text-[10px] text-text-tertiary/40 hover:text-text-tertiary/70 transition-colors"
                    >
                      Préférez écrire ? Appuyez sur ESC ou cliquez ici →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Sub-components ── */

function QuestionBlock({
  visible,
  label,
  done,
  typing,
  onTypingDone,
  answer,
  children,
}: {
  visible: boolean;
  label: string;
  done: boolean;
  typing: boolean;
  onTypingDone: () => void;
  answer: string;
  children?: React.ReactNode;
}) {
  if (!visible) return null;

  return (
    <div className="mb-5">
      <div className="font-vt text-[16px] text-text-tertiary">
        {">"} {typing ? <TypingText text={label} speed={18} onDone={onTypingDone} /> : label}
      </div>
      {done && answer && (
        <div className="font-mono text-[12px] text-cyber-green mt-1 ml-4">
          → {answer}
        </div>
      )}
      {children}
    </div>
  );
}

function OptionBtn({ label, text, onClick }: { label: string; text: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="font-mono text-[12px] px-4 py-2 text-text-secondary hover:text-text hover:bg-white/5 transition-all duration-150"
      style={{ border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <span className="text-cyber-green mr-1.5">[{label}]</span> {text}
    </button>
  );
}

function FallbackForm({
  value,
  onChange,
  onSubmit,
  onBack,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <div className="font-mono text-[12px] text-cyber-green/70 mb-4">
        $ prisme --contact --freeform
      </div>
      <div className="font-vt text-[16px] text-text-tertiary mb-4">
        Décrivez votre besoin librement :
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        rows={5}
        placeholder="Ex: J'ai 15 postes, je cherche un audit de sécurité..."
        className="w-full bg-transparent font-mono text-[13px] text-text outline-none resize-none placeholder:text-text-muted/50 p-3"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      />
      <div className="flex gap-3 mt-4">
        <button
          onClick={onSubmit}
          className="font-mono text-[11px] tracking-[0.1em] uppercase px-6 py-3 bg-text text-bg hover:bg-transparent hover:text-text transition-all duration-200"
          style={{ border: "1px solid #EDEDED" }}
        >
          ENVOYER →
        </button>
        <button
          onClick={onBack}
          className="font-mono text-[11px] tracking-[0.1em] uppercase px-6 py-3 text-text-tertiary hover:text-text transition-colors"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          ← RETOUR AU DIAGNOSTIC
        </button>
      </div>
    </div>
  );
}
