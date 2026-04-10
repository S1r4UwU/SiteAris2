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

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(false);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    const hasBooted = localStorage.getItem("prisme_booted");
    if (hasBooted) {
      setBooted(true);
    } else {
      setShowBoot(true);
    }
  }, []);

  useEffect(() => {
    const handler = () => setWizardOpen(true);
    window.addEventListener("open-wizard", handler);
    return () => window.removeEventListener("open-wizard", handler);
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
    </MotionConfig>
  );
}
