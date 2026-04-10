"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Search, Shield, Eye, Zap } from "lucide-react";

const APPROACH_ITEMS = [
  {
    icon: Search,
    title: "AUDIT & DIAGNOSTIC",
    description:
      "Analyse complète de votre surface d'attaque. Scan de vulnérabilités, test d'intrusion, cartographie réseau. Rapport clair avec plan d'action priorisé.",
    details: [
      "Scan de vulnérabilités interne et externe",
      "Cartographie complète de votre surface d'attaque",
      "Test d'intrusion adapté à votre périmètre",
      "Rapport exécutif avec plan d'action priorisé",
    ],
    tag: "PHASE 1",
  },
  {
    icon: Shield,
    title: "PROTECTION ACTIVE",
    description:
      "Déploiement d'outils de sécurité adaptés à votre infrastructure. Solutions open-source et professionnelles, configurées sur mesure.",
    details: [
      "EDR/XDR sur postes et serveurs critiques",
      "Configuration firewall et segmentation réseau",
      "Mise en place SIEM pour corrélation d'événements",
      "Durcissement des configurations systèmes",
    ],
    tag: "PHASE 2",
  },
  {
    icon: Eye,
    title: "VEILLE & OSINT",
    description:
      "Surveillance continue de vos actifs exposés. Renseignement en sources ouvertes pour anticiper les menaces ciblant votre secteur.",
    details: [
      "Monitoring continu de vos domaines et IPs exposés",
      "Détection de fuites de données (dark web)",
      "Veille sectorielle sur les menaces émergentes",
      "Alertes en temps réel sur les nouvelles vulnérabilités",
    ],
    tag: "CONTINU",
  },
  {
    icon: Zap,
    title: "RÉPONSE AUX INCIDENTS",
    description:
      "Plan d'intervention en cas de compromission. Investigation, confinement, remédiation et rapport post-incident détaillé.",
    details: [
      "Confinement immédiat de la menace",
      "Investigation forensique et analyse d'impact",
      "Remédiation et restauration des systèmes",
      "Rapport post-incident et recommandations",
    ],
    tag: "URGENCE",
  },
];

export default function InfraSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activePhase, setActivePhase] = useState(0);
  const phaseRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = phaseRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) setActivePhase(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    phaseRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (index: number) => {
    phaseRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section
      id="infrastructure"
      ref={ref}
      className="relative py-24 md:py-32"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-radial-[at_center] from-white/[0.02] to-transparent rounded-full" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="font-grotesk text-[11px] tracking-[0.12em] text-text-tertiary uppercase block mb-4">
            Notre approche
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-grotesk text-3xl md:text-5xl font-bold text-text"
            style={{ letterSpacing: "-0.04em" }}
          >
            Méthodique. Pragmatique.
          </motion.h2>
          <p className="mt-4 font-grotesk text-[15px] text-text-secondary leading-[1.7] max-w-lg">
            Une approche structurée en phases, adaptée à la taille et aux
            risques réels de votre entreprise.
          </p>
        </div>

        {/* Desktop: sticky scroll layout */}
        <div className="hidden md:flex gap-16">
          <div className="w-[260px] shrink-0">
            <div className="sticky top-28">
              <nav className="flex flex-col gap-1">
                {APPROACH_ITEMS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToPhase(i)}
                    className="group flex items-center gap-3 px-4 py-3 text-left transition-all duration-300"
                    style={{
                      borderLeft:
                        activePhase === i
                          ? "2px solid #EDEDED"
                          : "2px solid transparent",
                    }}
                  >
                    <item.icon
                      size={16}
                      strokeWidth={1.5}
                      style={{
                        color: activePhase === i ? "#EDEDED" : "#555",
                        transition: "color 0.3s",
                      }}
                    />
                    <span
                      className="font-grotesk text-[13px] font-medium"
                      style={{
                        color: activePhase === i ? "#EDEDED" : "#555",
                        transition: "color 0.3s",
                      }}
                    >
                      {item.title}
                    </span>
                  </button>
                ))}
              </nav>

              <div
                className="mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="font-grotesk text-[11px] tracking-[0.08em] text-text-muted uppercase">
                  {APPROACH_ITEMS[activePhase].tag}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1">
            {APPROACH_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                ref={(el) => {
                  phaseRefs.current[i] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.12,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="py-16 first:pt-0"
                style={{
                  minHeight: "50vh",
                  borderTop:
                    i > 0
                      ? "1px solid rgba(255,255,255,0.06)"
                      : undefined,
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-text-tertiary"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="font-grotesk text-[11px] tracking-[0.08em] text-text-tertiary/60 uppercase">
                    {item.tag}
                  </span>
                </div>

                <h3
                  className="font-grotesk font-bold text-text mb-4"
                  style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
                >
                  {item.title}
                </h3>

                <p className="font-grotesk text-[15px] text-text-secondary leading-[1.7] max-w-xl mb-8">
                  {item.description}
                </p>

                <div className="space-y-3">
                  {item.details.map((detail, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="font-mono text-[12px] text-text-muted mt-0.5 shrink-0">
                        +
                      </span>
                      <span className="font-grotesk text-[14px] text-text-secondary/80 leading-[1.6]">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: stacked layout */}
        <div
          className="md:hidden grid grid-cols-1 gap-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          {APPROACH_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.12,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="bg-card p-8 flex flex-col gap-5"
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 flex items-center justify-center text-text-tertiary"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  <item.icon size={18} strokeWidth={1.5} />
                </div>
                <span className="font-grotesk text-[11px] tracking-[0.08em] text-text-tertiary/60 uppercase">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-grotesk text-[14px] font-semibold text-text">
                {item.title}
              </h3>
              <p className="font-grotesk text-[14px] text-text-secondary leading-[1.7]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
