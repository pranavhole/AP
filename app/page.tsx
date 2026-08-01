import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutBanner } from "@/components/sections/AboutBanner";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { SkipLink } from "@/components/ui/SkipLink";

export default function Home() {
  return (
    <div className="page-shell">
      <SkipLink />
      <Header />
      <main id="main-content">
        <HeroSection />
        <TrustStrip />
        <ServicesSection />
        <ProcessSection />
        <FeaturedWork />
        <AboutBanner />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
