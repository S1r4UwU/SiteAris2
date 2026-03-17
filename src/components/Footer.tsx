"use client";

const MARQUEE_TEXT =
  "ARIS CYBERSECURITY \u00B7 PARIS, FRANCE \u00B7 2026 \u00B7 PROPULSÉ PAR CrowdStrike + SentinelOne + Elastic SIEM \u00B7 ISO 27001 \u00B7 RGPD \u00B7 DORA \u00B7 TOUTES LES INFRASTRUCTURES MÉRITENT UNE PROTECTION DE CLASSE ENTREPRISE \u00B7 ";

export default function Footer() {
  const year = new Date().getFullYear();
  const marqueeDouble = MARQUEE_TEXT + MARQUEE_TEXT;

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
            ARIS<span className="text-cyber-green">_</span>
          </span>
          <span className="font-vt text-[18px] text-white/20 ml-3">v2.6.1</span>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-hidden mb-12">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "marquee-slow 60s linear infinite" }}
          >
            <span className="font-vt text-[16px] text-[#2A2A2A]">
              {marqueeDouble}
            </span>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <p className="font-grotesk text-[13px] text-text-secondary leading-[1.7] max-w-xs">
              Cybersécurité de classe entreprise pour les TPE/PME françaises.
              Plug & Play.
            </p>
          </div>

          <div>
            <span className="font-vt text-[14px] text-text-tertiary/60 uppercase block mb-4">
              SERVICES
            </span>
            <ul className="space-y-2">
              {[
                "Anti-Ransomware",
                "Audit Express",
                "Pack RGPD",
                "SOC Managé",
                "Bastion Zero-Trust",
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
                "Infrastructure",
                "Certifications",
                "Conditions générales",
                "Politique de confidentialité",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
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
              CONTACT
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@aris.cyber"
                  className="font-mono text-[12px] text-text-secondary hover:text-text transition-colors duration-200"
                >
                  contact@aris.cyber
                </a>
              </li>
              <li>
                <a
                  href="tel:+33100000000"
                  className="font-mono text-[12px] text-text-secondary hover:text-text transition-colors duration-200"
                >
                  +33 1 00 00 00 00
                </a>
              </li>
              <li className="font-grotesk text-[13px] text-text-secondary">
                Paris, France
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
            © {year} ARIS CYBERSECURITY. TOUS DROITS RÉSERVÉS.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-vt text-[14px] text-text-tertiary/30">
              SYSTÈMES OPÉRATIONNELS
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-600 font-mono mt-2 text-center">
          BUILT BY ARIS SYSTEMS · POWERED BY CROWDSTRIKE + ELASTIC SIEM ·
          HOSTED IN FRANCE · NO DATA LEAVES EU · v2.6.1
        </p>

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
