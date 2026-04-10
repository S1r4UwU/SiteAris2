"use client";

import { useState, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import BootScreen from "@/components/BootScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import ComplianceBadges from "@/components/ComplianceBadges";
import BentoGrid from "@/components/BentoGrid";
import ArchitectureSection from "@/components/ArchitectureSection";
import InfraSection from "@/components/InfraSection";
import TrustSignals from "@/components/TrustSignals";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WizardCLI from "@/components/WizardCLI";
import ServiceDrawer from "@/components/ServiceDrawer";
import { PACKS } from "@/data/packs";
import { getPackBySlug } from "@/data/packs";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);
  const [drawerPackId, setDrawerPackId] = useState<string | null>(null);

  useEffect(() => {
    const hasBooted = localStorage.getItem("prisme_booted");
    if (hasBooted) {
      setBooted(true);
    } else {
      setShowBoot(true);
    }
  }, []);

  useEffect(() => {
    const openWizard = () => setWizardOpen(true);
    const openDrawer = (e: Event) => {
      const id = (e as CustomEvent).detail;
      if (id) setDrawerPackId(id);
    };
    window.addEventListener("open-wizard", openWizard);
    window.addEventListener("open-drawer", openDrawer);
    return () => {
      window.removeEventListener("open-wizard", openWizard);
      window.removeEventListener("open-drawer", openDrawer);
    };
  }, []);

  const handleBootComplete = () => {
    localStorage.setItem("prisme_booted", "true");
    setBooted(true);
    setShowBoot(false);
  };

  if (showBoot && !booted) {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (!booted) return null;

  const drawerPack = drawerPackId ? getPackBySlug(drawerPackId) ?? null : null;

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        <HeroSection />
        <Marquee />
        <ComplianceBadges />
        <BentoGrid />
        <ArchitectureSection />
        <InfraSection />
        <TrustSignals />
        <ContactSection />
      </main>
      <Footer />
      <WizardCLI open={wizardOpen} onClose={() => setWizardOpen(false)} />
      {drawerPack && (
        <ServiceDrawer
          pack={drawerPack}
          onClose={() => setDrawerPackId(null)}
          onDeploy={() => { setDrawerPackId(null); setWizardOpen(true); }}
        />
      )}
    </MotionConfig>
  );
}
