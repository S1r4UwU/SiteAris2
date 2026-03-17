"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-card"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          <div className="md:col-span-1">
            <span className="font-mono text-base font-bold tracking-[0.3em] text-text">
              ARIS<span className="text-cyber-green">_</span>
            </span>
            <p className="mt-3 font-geist text-xs text-text-secondary leading-relaxed max-w-xs">
              Cybersécurité de classe entreprise pour les TPE/PME françaises.
              Plug & Play.
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/60 uppercase block mb-4">
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
                    className="font-geist text-xs text-text-secondary hover:text-text transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/60 uppercase block mb-4">
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
                    className="font-geist text-xs text-text-secondary hover:text-text transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-text-tertiary/60 uppercase block mb-4">
              CONTACT
            </span>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:contact@aris.cyber"
                  className="font-mono text-xs text-text-secondary hover:text-text transition-colors duration-200"
                >
                  contact@aris.cyber
                </a>
              </li>
              <li>
                <a
                  href="tel:+33100000000"
                  className="font-mono text-xs text-text-secondary hover:text-text transition-colors duration-200"
                >
                  +33 1 00 00 00 00
                </a>
              </li>
              <li className="font-geist text-xs text-text-secondary">
                Paris, France
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary/40">
            © {year} ARIS CYBERSECURITY. TOUS DROITS RÉSERVÉS.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.1em] text-text-tertiary/40">
              SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
