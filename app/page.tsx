import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { SkipLink } from "@/components/ui/SkipLink";
import { Reveal } from "@/components/ui/Reveal";
import { WavyDivider } from "@/components/ui/WavyDivider";
import { InquiryProvider } from "@/components/context/InquiryContext";

export default function Home() {
  return (
    <InquiryProvider>
      <div className="w-full overflow-clip bg-cream">
        <SkipLink />
        <Header />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <TrustStrip />
          
          {/* Hero / Trust → Services */}
          <WavyDivider
            bottomColor="#CFEBD8"
            height={32}
            topColor="#FFF8E8"
            variant="gentle"
          />

          <Reveal>
            <ServicesSection />
          </Reveal>

          {/* Services → Selected Work */}
          <WavyDivider
            bottomColor="#FFF8E8"
            height={32}
            topColor="#CFEBD8"
            variant="paper"
          />

          <Reveal>
            <FeaturedWork />
          </Reveal>

          {/* Selected Work → Process */}
          <WavyDivider
            bottomColor="#DCC8F6"
            height={32}
            topColor="#FFF8E8"
            variant="sketch"
          />

          <Reveal>
            <ProcessSection />
          </Reveal>

          {/* Process → Testimonials */}
          <WavyDivider
            bottomColor="#FFF8E8"
            height={32}
            topColor="#DCC8F6"
            variant="soft"
          />

          <Reveal>
            <TestimonialsSection />
          </Reveal>

          {/* Testimonials → CTA */}
          <WavyDivider
            bottomColor="#CFEBD8"
            height={32}
            topColor="#FFF8E8"
            variant="asymmetric"
          />

          <Reveal>
            <CTASection />
          </Reveal>

          {/* CTA → Footer */}
          <WavyDivider
            bottomColor="#F6B8B8"
            height={32}
            topColor="#CFEBD8"
            variant="gentle"
          />
        </main>
        <Footer />
      </div>
    </InquiryProvider>
  );
}
