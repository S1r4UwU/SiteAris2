export interface PackData {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  iconName: string;
  featured?: boolean;
  metrics: { label: string; value: string }[];
  features: string[];
  description: string;
  stack: string[];
  stripeLink: string;
}

export const PACKS: PackData[] = [
  {
    id: "anti-ransomware",
    name: "ANTI-RANSOMWARE",
    tagline: "Protection périmétrique",
    price: "490€",
    period: "/mois",
    iconName: "ShieldAlert",
    featured: true,
    metrics: [
      { label: "Déploiement", value: "24H" },
      { label: "Niveau menace", value: "ÉLEVÉ" },
      { label: "Postes inclus", value: "≤ 50" },
      { label: "Réactivité", value: "< 4H" },
    ],
    features: [
      "EDR/XDR managé sur tous les postes et serveurs",
      "Isolation automatique des machines compromises",
      "Analyse comportementale en temps réel",
      "Rapport d'incident mensuel détaillé",
      "Support ouvré + astreinte critique 7j/7",
    ],
    description:
      "Protection complète contre les ransomwares et malwares avancés. Déploiement d'agents EDR/XDR sur votre parc (jusqu'à 50 postes inclus), avec isolation automatique des machines compromises et analyse comportementale en temps réel. Prise en charge en moins de 4h ouvrées, rapports mensuels détaillés et astreinte critique 7j/7 incluse.",
    stack: ["Wazuh", "Elastic SIEM", "Suricata", "Python"],
    stripeLink: "https://buy.stripe.com/REPLACE_ANTI_RANSOMWARE",
  },
  {
    id: "audit-express",
    name: "AUDIT EXPRESS",
    tagline: "Analyse de surface d'attaque",
    price: "1 200€",
    period: "unique",
    iconName: "ScanSearch",
    metrics: [
      { label: "Durée", value: "72H" },
      { label: "Profondeur", value: "L3" },
    ],
    features: [
      "Scan de vulnérabilités externe et interne",
      "Test d'intrusion automatisé (pentest light)",
      "Rapport exécutif + plan de remédiation",
      "Score de maturité cyber sur 100",
    ],
    description:
      "Audit de sécurité express en 72h. Scan de vulnérabilités (externe et interne), test d'intrusion automatisé, et livraison d'un rapport exécutif clair avec plan de remédiation priorisé et score de maturité cyber.",
    stack: ["Nmap", "Burp Suite", "Metasploit", "Kali Linux"],
    stripeLink: "https://buy.stripe.com/REPLACE_AUDIT_EXPRESS",
  },
  {
    id: "conformite-rgpd",
    name: "PACK RGPD",
    tagline: "Conformité réglementaire",
    price: "350€",
    period: "/mois",
    iconName: "FileWarning",
    metrics: [
      { label: "Déploiement", value: "48H" },
      { label: "Couverture", value: "100%" },
    ],
    features: [
      "DPO externalisé",
      "Registre des traitements automatisé",
      "Gestion des consentements (CMP)",
      "Formation équipe incluse",
    ],
    description:
      "Mise en conformité RGPD complète. Prise en charge du rôle de DPO externalisé, mise en place du registre des traitements, déploiement d'une solution de gestion des consentements, et formation de vos équipes aux bonnes pratiques.",
    stack: ["OWASP", "Python", "Next.js"],
    stripeLink: "https://buy.stripe.com/REPLACE_PACK_RGPD",
  },
  {
    id: "soc-manage",
    name: "SOC MANAGÉ",
    tagline: "Centre opérationnel de sécurité",
    price: "890€",
    period: "/mois",
    iconName: "ServerCog",
    metrics: [
      { label: "Déploiement", value: "48H" },
      { label: "Niveau menace", value: "CRITIQUE" },
      { label: "Rétention logs", value: "12 MOIS" },
      { label: "Alertes", value: "<15MIN" },
    ],
    features: [
      "SIEM cloud-native avec corrélation avancée",
      "Threat Intelligence feeds intégrés",
      "Réponse à incident automatisée (SOAR)",
      "Tableau de bord temps réel",
      "1 interlocuteur unique, opérateur certifié",
    ],
    description:
      "Centre opérationnel de sécurité managé. SIEM cloud-native avec corrélation avancée, intégration de feeds Threat Intelligence, réponse automatisée aux incidents et tableau de bord temps réel. Un interlocuteur unique et certifié, dédié à votre infrastructure.",
    stack: ["Elastic SIEM", "Wazuh", "Suricata", "Python"],
    stripeLink: "https://buy.stripe.com/REPLACE_SOC_MANAGE",
  },
  {
    id: "bastion",
    name: "BASTION",
    tagline: "Accès zero-trust",
    price: "290€",
    period: "/mois",
    iconName: "Lock",
    metrics: [
      { label: "Déploiement", value: "24H" },
      { label: "Protocoles", value: "ALL" },
    ],
    features: [
      "VPN Zero-Trust (remplacement VPN classique)",
      "MFA adaptatif sur tous les accès",
      "Gestion des accès privilégiés (PAM)",
      "Journalisation complète des sessions",
    ],
    description:
      "Architecture Zero-Trust complète. Remplacement de votre VPN classique par un accès conditionnel, MFA adaptatif, gestion des accès privilégiés (PAM) et journalisation intégrale de toutes les sessions.",
    stack: ["Linux", "Wireshark", "Python"],
    stripeLink: "https://buy.stripe.com/REPLACE_BASTION",
  },
];

export function getPackBySlug(slug: string): PackData | undefined {
  return PACKS.find((p) => p.id === slug);
}

export function getAllPackSlugs(): string[] {
  return PACKS.map((p) => p.id);
}
