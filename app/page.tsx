import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AboutBanner } from "@/components/sections/AboutBanner";
import { CTASection } from "@/components/sections/CTASection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Reveal } from "@/components/ui/Reveal";
import { SkipLink } from "@/components/ui/SkipLink";

export default function Home() {
  return (
    <div className="page-shell">
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <TrustStrip />
        <Reveal>
          <ServicesSection />
        </Reveal>
        <Reveal>
          <ProcessSection />
        </Reveal>
        <Reveal>
          <FeaturedWork />
        </Reveal>
        <Reveal>
          <AboutBanner />
        </Reveal>
        <Reveal>
          <CTASection />
        </Reveal>
      </main>
      <Footer />
    </div>
  );
}
