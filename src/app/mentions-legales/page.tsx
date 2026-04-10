import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales — PRISME-ONE",
  description: "Mentions légales du site prisme-one.com",
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen" style={{ background: "#050505" }}>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6"
        style={{ background: "rgba(0,0,0,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <Link href="/" className="font-vt text-[24px] text-[#EDEDED]">
          PRISME<span style={{ color: "#00FF41" }}>_</span>
        </Link>
      </header>

      <main className="pt-32 pb-24 px-6 mx-auto max-w-3xl">
        <span className="block font-vt text-[16px] uppercase mb-4" style={{ color: "#555" }}>
          {"// MENTIONS_LÉGALES"}
        </span>
        <h1 className="font-vt text-[36px] mb-10" style={{ color: "#EDEDED" }}>
          Mentions légales
        </h1>

        <div className="space-y-8 font-mono text-[13px] leading-[2]" style={{ color: "#888" }}>
          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>1. Éditeur du site</h2>
            <p>
              Le site prisme-one.com est édité par :<br />
              <strong style={{ color: "#EDEDED" }}>PRISME-ONE</strong><br />
              Statut : Micro-entreprise<br />
              SIRET : [À COMPLÉTER]<br />
              Email : contact@prisme-one.com<br />
              Responsable de la publication : [À COMPLÉTER]
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>2. Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              <strong style={{ color: "#EDEDED" }}>Vercel Inc.</strong><br />
              440 N Barranca Ave #4133, Covina, CA 91723, USA<br />
              Site web : vercel.com
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>3. Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble du contenu de ce site (textes, images, code source, éléments graphiques)
              est la propriété exclusive de PRISME-ONE, sauf mention contraire. Toute reproduction,
              représentation ou diffusion, même partielle, est interdite sans autorisation écrite préalable.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>4. Protection des données</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous
              disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données
              personnelles. Pour toute demande : contact@prisme-one.com.<br /><br />
              Consultez notre{" "}
              <Link href="/confidentialite" className="underline" style={{ color: "#00FF41" }}>
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>5. Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement
              (préférence boot screen). Aucun cookie de tracking ou publicitaire n&apos;est déposé.
            </p>
          </section>
        </div>

        <div className="mt-16 font-mono text-[11px]" style={{ color: "#333" }}>
          Dernière mise à jour : avril 2026
        </div>
      </main>
    </div>
  );
}
