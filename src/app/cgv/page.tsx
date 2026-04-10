import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales — PRISME-ONE",
  description: "Conditions générales de vente des services PRISME-ONE.",
};

export default function CGV() {
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
          {"// CONDITIONS_GÉNÉRALES"}
        </span>
        <h1 className="font-vt text-[36px] mb-10" style={{ color: "#EDEDED" }}>
          Conditions générales de vente
        </h1>

        <div className="space-y-8 font-mono text-[13px] leading-[2]" style={{ color: "#888" }}>
          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>1. Objet</h2>
            <p>
              Les présentes conditions générales régissent les prestations de services
              en cybersécurité et informatique proposées par PRISME-ONE, micro-entreprise
              {/* ⚠️ OBLIGATOIRE — Remplir le SIRET AVANT mise en production */}
              immatriculée sous le numéro SIRET [À COMPLÉTER AVANT PUBLICATION].
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>2. Services</h2>
            <p>
              PRISME-ONE propose des prestations de test d&apos;intrusion, audit de sécurité,
              réponse aux incidents, sécurité réseau, conformité RGPD, et services
              informatiques. Le détail de chaque prestation est décrit dans le devis
              ou le pack souscrit.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>3. Tarifs et paiement</h2>
            <p>
              Les prix sont indiqués en euros TTC (TVA non applicable, art. 293 B du CGI).
              Le paiement s&apos;effectue par carte bancaire via la plateforme sécurisée Stripe,
              ou par virement bancaire selon les modalités convenues.
              Les abonnements sont facturés mensuellement et résiliables sous 30 jours.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>4. Délais</h2>
            <p>
              Les délais de déploiement indiqués sur le site sont estimatifs et dépendent
              de la complexité de l&apos;infrastructure client. Un planning détaillé est
              communiqué après le diagnostic initial.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>5. Confidentialité</h2>
            <p>
              PRISME-ONE s&apos;engage à traiter toutes les informations relatives au
              client et à son infrastructure avec la plus stricte confidentialité.
              Un accord de confidentialité (NDA) peut être signé sur demande avant
              toute intervention.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>6. Garantie satisfait ou remboursé</h2>
            <p>
              PRISME-ONE propose une garantie satisfait ou remboursé sous 7 jours
              calendaires à compter de la livraison du livrable principal (rapport
              d&apos;audit, déploiement initial, etc.), à condition que le client signale
              par écrit une non-conformité au périmètre défini dans le devis signé.
              Cette garantie ne couvre pas les demandes de modification hors périmètre
              initial. Le remboursement porte sur le montant de la prestation concernée,
              hors frais déjà engagés pour des licences tierces.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>7. Responsabilité</h2>
            <p>
              PRISME-ONE s&apos;engage à mettre en œuvre tous les moyens nécessaires
              à la bonne exécution de ses prestations. La responsabilité de PRISME-ONE
              est limitée au montant de la prestation concernée.
            </p>
          </section>

          <section>
            <h2 className="font-vt text-[18px] mb-3" style={{ color: "#EDEDED" }}>8. Droit applicable</h2>
            <p>
              Les présentes conditions sont régies par le droit français. Tout litige
              sera soumis aux tribunaux compétents.
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
