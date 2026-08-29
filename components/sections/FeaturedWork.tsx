"use client";

import React, { useState } from "react";
import { BusinessLandingPageSvg, ECommerceStoreSvg, AIDashboardSvg } from "@/components/svg/ProjectThumbnails";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ComicButton } from "@/components/ui/ComicButton";
import { SketchTag, SketchTagColor, SketchTagVariant } from "@/components/ui/SketchTag";
import { SketchFrame } from "@/components/ui/SketchFrame";
import { SketchBorder } from "@/components/ui/SketchBorder";
import { PROJECTS, PROJECT_TABS, SITE_INFO } from "@/lib/constants";
import { Sparkle, StarDoodle } from "@/components/svg/Doodles";

export function FeaturedWork() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const thumbnailComponents = {
    "landing-page": BusinessLandingPageSvg,
    ecommerce: ECommerceStoreSvg,
    dashboard: AIDashboardSvg,
  };

  const filteredProjects = activeTab === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => {
        const categoryStr = p.category as string;
        const tagStr = p.tag as string;
        if (activeTab === "Websites") return categoryStr === "Websites" || tagStr === "Website";
        if (activeTab === "Web Apps") return categoryStr === "Web Apps" || tagStr === "Web App";
        if (activeTab === "E-Commerce") return categoryStr === "E-Commerce" || tagStr === "E-Commerce";
        if (activeTab === "AI Projects") return categoryStr === "AI Projects";
        return true;
      });

  const cardRotations = ["-rotate-[0.35deg] hover:rotate-0", "rotate-[0.25deg] hover:rotate-0", "-rotate-[0.15deg] hover:rotate-0"];
  const frameVariants = ["a", "b", "c"] as const;
  const tagVariants: SketchTagVariant[] = ["a", "b", "c"];
  const tagColors: SketchTagColor[] = ["mint", "yellow", "lavender", "pink", "cream"];

  return (
    <section
      className="relative bg-cream py-16 md:py-24 px-4 overflow-hidden"
      id="work"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Decorative Doodles */}
      <Sparkle className="absolute top-10 left-[6%] w-8 h-8 text-[#7653D8] -rotate-12 max-md:hidden" />
      <StarDoodle className="absolute top-14 right-[8%] w-8 h-8 text-[#F9E37D] rotate-12 max-md:hidden" />

      <div className="mx-auto max-w-[1280px]">
        {/* Section Heading */}
        <SectionHeading
          subtitle="A selection of high-impact web apps, modern websites and AI systems I've built."
          title="Selected Work"
          tone="purple"
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {PROJECT_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                className={`
                  relative isolate px-5 py-2.5 font-hand text-base sm:text-lg font-black transition-all
                  cursor-pointer leading-none
                  ${
                    isActive
                      ? "text-[#17172A] -translate-y-0.5"
                      : "text-[#17172A]/80 hover:text-[#17172A] hover:-translate-y-0.5"
                  }
                `}
                key={tab}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 50"
                >
                  {isActive && (
                    <path
                      d="M 4,6 C 28,2 72,4 96,2.5 C 98.5,14 97,36 96,46 C 74,48 26,46 3,47.5 C 1.5,34 3.5,18 4,6 Z"
                      fill="#7653D8"
                      transform="translate(2, 2.5)"
                    />
                  )}
                  <path
                    d="M 4,6 C 28,2 72,4 96,2.5 C 98.5,14 97,36 96,46 C 74,48 26,46 3,47.5 C 1.5,34 3.5,18 4,6 Z"
                    fill={isActive ? "#F6B8B8" : "#FFFDFC"}
                    stroke="#17172A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Grid / Mobile Snap Carousel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-md:flex max-md:overflow-x-auto max-md:snap-x max-md:snap-mandatory max-md:pb-6 max-md:pt-2">
          {filteredProjects.map((project, index) => {
            const SvgThumbnail = thumbnailComponents[project.type as keyof typeof thumbnailComponents];
            const frameVariant = frameVariants[index % frameVariants.length];

            return (
              <SketchFrame
                className={`
                  group flex flex-col p-5 transition-all duration-200
                  hover:-translate-y-1.5 cursor-default
                  max-md:min-w-[85vw] max-md:snap-center
                  ${cardRotations[index % cardRotations.length]}
                `}
                doubleLine
                fill="white"
                key={project.id}
                shadow="purple"
                shadowX={5}
                shadowY={6}
                variant={frameVariant}
              >
                {/* Project Image Frame with Sketch Outline */}
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden bg-[#FFF8E8] mb-5"
                  style={{
                    borderRadius: "16px 22px 18px 24px / 22px 16px 24px 18px",
                  }}
                >
                  <SvgThumbnail className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  
                  {/* Hand-drawn SketchBorder on image */}
                  <SketchBorder strokeWidth={2} variant={frameVariant} />

                  {/* Category Tag Overlay */}
                  <div className="absolute top-3 left-3">
                    <SketchTag
                      color={
                        project.tag === "Website"
                          ? "mint"
                          : project.tag === "E-Commerce"
                          ? "yellow"
                          : "lavender"
                      }
                      label={project.tag}
                      variant={tagVariants[index % tagVariants.length]}
                    />
                  </div>
                </div>

                {/* Project Info */}
                <h3 className="font-hand text-[1.75rem] font-bold leading-tight text-[#17172A] mb-2">
                  {project.title}
                </h3>

                <p className="text-[0.98rem] font-bold text-muted leading-relaxed mb-5 flex-grow">
                  {project.description}
                </p>

                {/* Tech Tags with SketchTag */}
                <div className="flex flex-wrap gap-2 pt-3 border-t-2 border-dashed border-[#17172A]/15">
                  {project.tags.map((t, idx) => (
                    <SketchTag
                      color={tagColors[idx % tagColors.length]}
                      key={idx}
                      label={t}
                      variant={tagVariants[idx % tagVariants.length]}
                    />
                  ))}
                </div>
              </SketchFrame>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-14 flex justify-center">
          <ComicButton
            href={SITE_INFO.links.viewWork}
            size="lg"
            variant="pink"
            withArrow
          >
            View All Projects
          </ComicButton>
        </div>
      </div>
    </section>
  );
}
