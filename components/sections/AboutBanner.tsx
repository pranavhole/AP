import React from "react";
import { DeveloperAvatar } from "@/components/svg/DeveloperAvatar";
import { ComicButton } from "@/components/ui/ComicButton";
import { TagPill } from "@/components/ui/TagPill";
import { SITE_INFO } from "@/lib/constants";
import { Sparkle, StarDoodle, Squiggle } from "@/components/svg/Doodles";

export function AboutBanner() {
  return (
    <section
      className="relative bg-cream py-16 md:py-24 px-4 border-b-2 border-[#17172A] overflow-hidden"
      id="about"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Decorative Doodles */}
      <Sparkle className="absolute top-10 left-[10%] w-8 h-8 text-[#7653D8] -rotate-12 max-md:hidden" />
      <StarDoodle className="absolute bottom-12 right-[12%] w-8 h-8 text-[#F9E37D] rotate-12 max-md:hidden" />
      <Squiggle className="absolute top-1/2 right-[5%] w-16 h-8 text-[#17172A] max-lg:hidden" />

      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] items-center gap-12 lg:gap-16">
          {/* Left Column: Comic Developer Bust SVG */}
          <div className="flex justify-center">
            <div className="relative isolate w-full max-w-[340px] aspect-square">
              <DeveloperAvatar className="w-full h-full filter drop-shadow-[6px_6px_0_rgba(23,23,42,0.18)]" />
              
              {/* Floating Hand-drawn Badge */}
              <div className="absolute -bottom-2 -right-2 bg-[#CFEBD8] border-2 border-[#17172A] px-4 py-1.5 rounded-xl font-hand text-base font-black rotate-3 shadow-[3px_3px_0_#17172A]">
                Full-Stack & AI 🚀
              </div>
            </div>
          </div>

          {/* Right Column: About Content */}
          <div className="flex flex-col items-start max-lg:items-center max-lg:text-center">
            {/* Heading */}
            <div className="relative mb-6">
              <h2 className="font-hand text-[clamp(2.8rem,4.5vw,4.2rem)] leading-none text-[#17172A]">
                About Me
              </h2>
              {/* Yellow Underline */}
              <svg
                aria-hidden="true"
                className="absolute -right-2 -bottom-3 -left-2 h-5 w-[calc(100%+16px)] overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 20"
              >
                <path
                  d="M2 8 C 30 14, 65 3, 98 8"
                  fill="none"
                  stroke="#F9E37D"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
            </div>

            {/* Main Copy */}
            <p className="font-hand text-[clamp(1.25rem,1.8vw,1.6rem)] font-bold text-[#17172A] leading-relaxed mb-4">
              I&apos;m a Full-Stack Developer focused on building clean, scalable and useful digital products.
            </p>

            <p className="text-[1.05rem] font-bold text-muted leading-relaxed mb-6">
              I work across modern web development, backend systems, cloud infrastructure and AI-powered applications. Whether taking a product from zero to one or supercharging an existing codebase, I focus on velocity, maintainability, and real business outcomes.
            </p>

            {/* 3 Skill Chips */}
            <div className="flex flex-wrap gap-2.5 mb-8">
              {SITE_INFO.aboutSkills.map((skill, idx) => (
                <TagPill
                  color={idx === 0 ? "mint" : idx === 1 ? "lavender" : "yellow"}
                  key={skill}
                  label={skill}
                />
              ))}
            </div>

            {/* CTA */}
            <ComicButton
              href={SITE_INFO.links.buildTogether}
              size="lg"
              variant="pink"
              withArrow
            >
              Let&apos;s Build Together
            </ComicButton>
          </div>
        </div>
      </div>
    </section>
  );
}
