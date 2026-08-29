import React from "react";
import { LaptopIcon, CartIcon, MobileIcon, AIChipIcon } from "@/components/svg/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComicButton } from "@/components/ui/ComicButton";
import { OrganicBlob, OrganicBlobVariant } from "@/components/ui/OrganicBlob";
import { SketchFrame } from "@/components/ui/SketchFrame";
import { SketchBorderVariant } from "@/components/ui/SketchBorder";
import { SERVICES, SITE_INFO } from "@/lib/constants";
import { Sparkle, CurvedArrow, PaperPlaneDoodle } from "@/components/svg/Doodles";

export function ServicesSection() {
  const iconComponents = {
    laptop: LaptopIcon,
    cart: CartIcon,
    mobile: MobileIcon,
    "ai-chip": AIChipIcon,
  };

  const cardVariants: SketchBorderVariant[] = ["a", "b", "c", "d"];
  const blobVariants: OrganicBlobVariant[] = ["a", "b", "c", "d"];
  const blobColors = ["mint", "soft-yellow", "lavender", "pink"] as const;

  const cardRotations = [
    "-rotate-[0.6deg] hover:rotate-0",
    "rotate-[0.4deg] hover:rotate-0",
    "-rotate-[0.25deg] hover:rotate-0",
    "rotate-[0.55deg] hover:rotate-0",
  ];

  return (
    <section
      className="relative bg-mint py-16 md:py-24 px-4 overflow-hidden"
      id="services"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Decorative Doodles */}
      <Sparkle className="absolute top-12 left-[8%] w-8 h-8 text-[#17172A] -rotate-12 max-md:hidden" />
      <Sparkle className="absolute top-20 right-[10%] w-9 h-9 text-[#F6B8B8] rotate-12 max-md:hidden" />
      <PaperPlaneDoodle className="absolute top-8 right-6 w-24 h-16 max-lg:hidden -rotate-6" />

      <div className="mx-auto max-w-[1280px]">
        {/* Section Heading */}
        <SectionHeading
          subtitle="Modern web architecture, scalable systems & smart automation tailored to your business."
          title="What I Can Help You With"
          tone="yellow"
        />

        {/* 4 Cards Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7 max-[640px]:grid-cols-1">
          {SERVICES.map((service, index) => {
            const Icon = iconComponents[service.icon as keyof typeof iconComponents];
            const frameVariant = cardVariants[index % cardVariants.length];
            const blobVariant = blobVariants[index % blobVariants.length];
            const blobColor = blobColors[index % blobColors.length];

            return (
              <SketchFrame
                className={`
                  group flex flex-col items-center p-7 text-center transition-transform duration-200
                  hover:-translate-y-1.5 cursor-default min-h-[310px]
                  ${cardRotations[index % cardRotations.length]}
                `}
                doubleLine
                fill="white"
                key={service.id}
                shadow="ink"
                shadowX={5}
                shadowY={6}
                variant={frameVariant}
              >
                {/* Organic Icon Bubble */}
                <div className="mb-5 transition-transform duration-200 group-hover:scale-105">
                  <OrganicBlob
                    className="w-18 h-18"
                    color={blobColor}
                    shadow="ink"
                    variant={blobVariant}
                  >
                    <Icon className="w-9 h-9 text-[#17172A]" />
                  </OrganicBlob>
                </div>

                {/* Service Title */}
                <h3 className="font-hand text-[1.65rem] font-bold leading-tight text-[#17172A] mb-3">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-[0.95rem] font-bold leading-relaxed text-muted mb-5 flex-grow">
                  {service.description}
                </p>

                {/* Hand-drawn small line near bottom */}
                <svg
                  aria-hidden="true"
                  className="w-14 h-2 opacity-30 group-hover:opacity-80 transition-opacity"
                  viewBox="0 0 60 8"
                >
                  <path
                    d="M 2,4 C 20,2 40,6 58,3"
                    fill="none"
                    stroke="#17172A"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                </svg>
              </SketchFrame>
            );
          })}
        </div>

        {/* CTA below cards with dashed arrow */}
        <div className="mt-14 flex flex-col items-center justify-center relative">
          <div className="relative inline-flex items-center">
            {/* Dashed curved arrow pointing toward CTA */}
            <div className="absolute -top-8 -left-16 hidden sm:flex items-center -rotate-12">
              <CurvedArrow className="w-12 h-10 text-[#17172A]" direction="down" />
            </div>

            <ComicButton
              href={SITE_INFO.links.startProject}
              size="lg"
              variant="pink"
              withArrow
            >
              Explore All Services
            </ComicButton>
          </div>
        </div>
      </div>
    </section>
  );
}
