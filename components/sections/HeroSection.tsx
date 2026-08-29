"use client";

import React from "react";

import { HeroArtwork } from "@/components/illustrations/HeroArtwork";
import { ComicButton } from "@/components/ui/ComicButton";
import { SketchTag } from "@/components/ui/SketchTag";
import { SITE_INFO } from "@/lib/constants";
import { Sparkle, StarDoodle, HalftoneDots } from "@/components/svg/Doodles";
import { useInquiryModal } from "@/components/context/InquiryContext";

export function HeroSection() {
  const { openInquiry } = useInquiryModal();

  return (
    <section
      className="relative min-h-[700px] bg-cream py-10 md:py-20 overflow-hidden"
      id="home"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.07) 0.8px, transparent 0.8px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Decorative Mint Wedge on Left */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-[clamp(16px,3vw,48px)] border-r-2 border-ink bg-mint [clip-path:polygon(0_0,100%_0,50%_100%,0_100%)] max-md:hidden"
      />

      {/* Decorative Background Doodles */}
      <HalftoneDots className="absolute bottom-6 left-12 w-28 h-28 max-lg:hidden" />
      <Sparkle className="absolute top-8 left-[38%] w-7 h-7 text-[#7653D8] -rotate-12 max-md:hidden" />
      <StarDoodle className="absolute bottom-12 right-12 w-8 h-8 text-[#F9E37D] rotate-12 max-md:hidden" />

      <div className="mx-auto w-[calc(100%_-_32px)] max-w-[1440px] grid grid-cols-1 lg:grid-cols-[0.9fr_1.25fr] items-center gap-10 lg:gap-14 px-2 sm:px-4 md:px-8">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col items-start max-lg:items-center max-lg:text-center">
          {/* Small Purple/Lavender Tag */}
          <div className="mb-6">
            <SketchTag
              className="text-base sm:text-lg px-4 py-1.5"
              color="lavender"
              label={SITE_INFO.tagline}
              variant="a"
            />
          </div>

          {/* Main Heading */}
          <h1 className="m-0 font-hand text-[clamp(3.2rem,5.5vw,5.5rem)] leading-[0.94] tracking-[0.01em] text-[#17172A]">
            <span className="block">We build digital</span>
            <span className="block">products that</span>
            <span className="block">
              <span className="relative inline-block px-1">
                <span className="relative z-10">work.</span>
                {/* Hand-drawn yellow marker highlight stroke */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-6 w-[110%] -left-[5%] -z-10 overflow-visible"
                  preserveAspectRatio="none"
                  viewBox="0 0 120 28"
                >
                  <path
                    d="M4 14 C 30 6, 85 10, 116 12 M 10 20 C 45 16, 80 18, 112 17"
                    fill="none"
                    stroke="#F9E37D"
                    strokeLinecap="round"
                    strokeWidth="12"
                  />
                  <path
                    d="M6 24 C 35 22, 75 25, 114 23"
                    fill="none"
                    stroke="#17172A"
                    strokeLinecap="round"
                    strokeWidth="2.2"
                  />
                </svg>
              </span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 mb-0 font-hand text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-muted max-w-[500px]">
            {SITE_INFO.subtext}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 max-[420px]:w-full max-[420px]:flex-col max-sm:w-full max-sm:flex-col">
            <ComicButton
              className="max-[420px]:w-full max-sm:w-full"
              onClick={() => openInquiry("Web Development")}
              size="lg"
              variant="pink"
              withArrow
            >
              Start Your Project
            </ComicButton>
            <ComicButton
              className="max-sm:w-full"
              href={SITE_INFO.links.viewWork}
              size="lg"
              variant="white"
            >
              View Our Work
            </ComicButton>
          </div>
        </div>

        {/* Right Content - Enlarged Hero Video */}
        <div className="relative z-10 w-full flex justify-center max-lg:mt-6">
          <HeroArtwork />
        </div>
      </div>
    </section>
  );
}
