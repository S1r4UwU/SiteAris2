import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité — PRISME-ONE",
  description: "Politique de confidentialité et protection des données personnelles.",
};

export default function Confidentialite() {
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
          {"// POLITIQUE_CONFIDENTIALITÉ"}
        </span>
        <h1 className="font-vt text-[36px] mb-10" style={{ color: "#EDEDED" }}>
          Politique de confidentialité
        </h1>

        <div className="space-y-8 font-mono text-[13px] leading-[2]" style={{ color: "#888" }}>
          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>1. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données personnelles est :<br />
              <strong style={{ color: "#EDEDED" }}>PRISME-ONE</strong><br />
              Email : contact@prisme-one.com
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>2. Données collectées</h2>
            <p>
              Nous collectons uniquement les données nécessaires au traitement de votre demande :<br />
              — Adresse email (si fournie via le formulaire de diagnostic)<br />
              — Taille du parc informatique<br />
              — Besoin exprimé<br />
              — Message libre (si formulaire de contact)<br /><br />
              Aucune donnée n&apos;est collectée automatiquement (pas de cookies de tracking,
              pas d&apos;analytics tiers).
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>3. Finalité</h2>
            <p>
              Les données collectées sont utilisées uniquement pour :<br />
              — Répondre à votre demande de diagnostic ou de contact<br />
              — Établir un devis personnalisé<br />
              — Assurer le suivi de la prestation
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>4. Durée de conservation</h2>
            <p>
              Les données de contact sont conservées pendant 12 mois à compter du dernier
              échange. Les données contractuelles sont conservées conformément aux
              obligations légales (5 ans).
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>5. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants :<br />
              — Droit d&apos;accès à vos données personnelles<br />
              — Droit de rectification<br />
              — Droit à l&apos;effacement<br />
              — Droit à la portabilité<br />
              — Droit d&apos;opposition au traitement<br /><br />
              Pour exercer ces droits : contact@prisme-one.com
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>6. Sous-traitants</h2>
            <p>
              — <strong style={{ color: "#EDEDED" }}>Vercel Inc.</strong> : hébergement du site<br />
              — <strong style={{ color: "#EDEDED" }}>Resend</strong> : envoi d&apos;emails transactionnels<br />
              — <strong style={{ color: "#EDEDED" }}>Stripe</strong> : traitement des paiements<br /><br />
              Ces sous-traitants sont conformes au RGPD.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>7. Réclamation</h2>
            <p>
              En cas de réclamation, vous pouvez contacter la CNIL :<br />
              Commission Nationale de l&apos;Informatique et des Libertés<br />
              3 Place de Fontenoy, 75007 Paris<br />
              www.cnil.fr
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
