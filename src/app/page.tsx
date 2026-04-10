"use client";

import { useState, useEffect } from "react";
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

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(false);

  useEffect(() => {
    const hasBooted = localStorage.getItem("prisme_booted");
    if (hasBooted) {
      setBooted(true);
    } else {
      setShowBoot(true);
    }
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
    <>
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
    </>
  );
}
