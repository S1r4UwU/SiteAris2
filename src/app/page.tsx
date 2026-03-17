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
