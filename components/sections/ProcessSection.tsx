import React from "react";
import { LightbulbIcon, PencilIcon, CodeIcon, RocketIcon, GrowthIcon } from "@/components/svg/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OrganicBlob, OrganicBlobVariant, OrganicBlobColor } from "@/components/ui/OrganicBlob";
import { PROCESS_STEPS } from "@/lib/constants";
import { Sparkle, StarDoodle } from "@/components/svg/Doodles";

export function ProcessSection() {
  const iconComponents = {
    lightbulb: LightbulbIcon,
    pencil: PencilIcon,
    code: CodeIcon,
    launch: RocketIcon,
    growth: GrowthIcon,
  };

  const blobVariants: OrganicBlobVariant[] = ["a", "b", "c", "d", "e"];
  const blobColors: OrganicBlobColor[] = ["mint", "yellow", "lavender", "pink", "soft-green"];

  const stepOffsets = [
    "lg:translate-y-[2px]",
    "lg:-translate-y-[3px]",
    "lg:translate-y-[1px]",
    "lg:-translate-y-[2px]",
    "lg:translate-y-[3px]",
  ];

  return (
    <section
      aria-labelledby="process-heading"
      className="relative bg-lavender py-16 md:py-24 px-4 overflow-hidden"
      id="process"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.07) 0.8px, transparent 0.8px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Decorative background doodles */}
      <Sparkle className="absolute top-10 right-[12%] w-9 h-9 text-[#F6B8B8] rotate-12 max-md:hidden" />
      <StarDoodle className="absolute bottom-12 left-[10%] w-8 h-8 text-[#FFF0B0] -rotate-12 max-md:hidden" />

      <div className="mx-auto max-w-[1280px]">
        {/* Section Heading */}
        <SectionHeading
          id="process-heading"
          subtitle="A structured, transparent workflow designed to take your idea from concept to scalable reality."
          title="Our Process"
          tone="yellow"
        />

        {/* 5-Step Process Timeline */}
        <div className="relative mt-14">
          {/* Desktop Connecting Hand-Drawn Dashed Path */}
          <div
            aria-hidden="true"
            className="absolute top-16 left-[6%] right-[6%] h-8 -z-0 max-lg:hidden overflow-visible"
          >
            <svg
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 40"
            >
              <path
                d="M 20,20 C 140,14 260,26 380,18 C 500,24 620,15 740,22 C 860,17 940,23 980,19"
                fill="none"
                stroke="#17172A"
                strokeDasharray="6 8"
                strokeLinecap="round"
                strokeWidth="2.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = iconComponents[step.icon as keyof typeof iconComponents];
              const blobVariant = blobVariants[index % blobVariants.length];
              const blobColor = blobColors[index % blobColors.length];
              const offsetClass = stepOffsets[index % stepOffsets.length];

              return (
                <li
                  className={`flex flex-col items-center text-center group transition-transform duration-200 ${offsetClass}`}
                  itemScope
                  itemType="https://schema.org/HowToStep"
                  key={step.step}
                >
                  {/* Step Number Tag */}
                  <span className="font-hand text-xs font-black uppercase tracking-wider text-[#17172A] bg-[#FFF8E8] border-2 border-[#17172A] px-3 py-0.5 rounded-md mb-3 shadow-[1.5px_1.5px_0_#17172A]">
                    Step 0{step.step}
                  </span>

                  {/* Organic Icon Blob */}
                  <div className="mb-4 transition-transform duration-200 group-hover:-translate-y-1.5 group-hover:scale-105">
                    <OrganicBlob
                      className="w-22 h-22"
                      color={blobColor}
                      shadow="purple"
                      variant={blobVariant}
                    >
                      <Icon className="w-10 h-10 text-[#17172A]" />
                    </OrganicBlob>
                  </div>

                  {/* Step Title */}
                  <h3
                    className="font-hand text-[1.85rem] font-bold leading-tight text-[#17172A] mb-1"
                    itemProp="name"
                  >
                    {step.step}. {step.title}
                  </h3>

                  {/* Step Description */}
                  <p
                    className="text-[0.95rem] font-bold text-muted max-w-[190px] leading-snug"
                    itemProp="text"
                  >
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
