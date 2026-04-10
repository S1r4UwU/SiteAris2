"use client";

const MARQUEE_TEXT =
  "PRISME-ONE · FRANCE · 2026 · PENTEST · AUDIT · RÉPONSE AUX INCIDENTS · OSINT · SÉCURITÉ RÉSEAU · DÉVELOPPEMENT SÉCURISÉ · SERVICES IT";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#030303" }}>
      {/* Gradient separator */}
      <div
        className="h-px"
        style={{
          borderImage:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent) 1",
          borderTop: "1px solid",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        {/* Logo + version */}
        <div className="mb-8">
          <span className="font-vt text-[64px] text-text leading-none">
            PRISME<span className="text-cyber-green">_</span>
          </span>
          <span className="font-vt text-[18px] text-white/20 ml-3">v1.0</span>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-hidden mb-12">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee-slow 60s linear infinite" }}
          >
            <span className="font-vt text-[16px] text-[#2A2A2A] shrink-0">
              {MARQUEE_TEXT}&nbsp;·&nbsp;
            </span>
            <span className="font-vt text-[16px] text-[#2A2A2A] shrink-0">
              {MARQUEE_TEXT}&nbsp;·&nbsp;
            </span>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <p className="font-grotesk text-[13px] text-text-secondary leading-[1.7] max-w-xs">
              Cybersécurité et services informatiques sur mesure pour les
              PME & ETI françaises. Un interlocuteur unique, des résultats
              concrets.
            </p>
          </div>

          <div>
            <span className="font-vt text-[14px] text-text-tertiary/60 uppercase block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2">
              {[
                "Test d'intrusion",
                "Audit de sécurité",
                "Réponse aux incidents",
                "Sécurité réseau",
                "Services IT",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#offres"
                    className="font-grotesk text-[13px] text-text-secondary hover:text-text transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-vt text-[14px] text-text-tertiary/60 uppercase block mb-4">
              ENTREPRISE
            </span>
            <ul className="space-y-2">
              {[
                { label: "Infrastructure", href: "#infrastructure" },
                { label: "Méthodologie", href: "#infrastructure" },
                { label: "Mentions légales", href: "/mentions-legales" },
                { label: "Conditions générales", href: "/cgv" },
                { label: "Confidentialité", href: "/confidentialite" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-grotesk text-[13px] text-text-secondary hover:text-text transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-vt text-[14px] text-text-tertiary/60 uppercase block mb-4">
              CONTACT
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@prisme-one.com"
                  className="font-mono text-[12px] text-text-secondary hover:text-text transition-colors duration-200"
                >
                  contact@prisme-one.com
                </a>
              </li>
              <li className="font-grotesk text-[13px] text-text-secondary">
                France · Intervention nationale
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span className="font-vt text-[14px] text-text-tertiary/30">
            © {year} PRISME-ONE. TOUS DROITS RÉSERVÉS.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-vt text-[14px] text-text-tertiary/30">
              SYSTÈMES OPÉRATIONNELS
            </span>
          </div>
        </div>

        <div
          className="mt-4 text-center font-mono text-gray-700 text-xs select-none"
          aria-hidden="true"
        >
          ——————————————————————————————————————————————————
        </div>
      </div>
    </footer>
  );
}
