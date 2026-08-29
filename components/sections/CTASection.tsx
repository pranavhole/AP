"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { ComicButton } from "@/components/ui/ComicButton";
import { SITE_INFO } from "@/lib/constants";
import { PaperPlaneDoodle, Sparkle, StarDoodle, EmphasisLines } from "@/components/svg/Doodles";
import { useInquiryModal } from "@/components/context/InquiryContext";

export function CTASection() {
  const { openInquiry } = useInquiryModal();

  return (
    <section
      className="relative bg-mint py-16 md:py-24 px-4 overflow-hidden"
      id="contact"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Decorative Doodles */}
      <Sparkle className="absolute top-8 right-[15%] w-8 h-8 text-[#7653D8] rotate-12 max-md:hidden" />
      <StarDoodle className="absolute bottom-8 right-[8%] w-8 h-8 text-[#F9E37D] -rotate-12 max-md:hidden" />
      <EmphasisLines className="absolute top-10 left-[18%] w-8 h-8 text-[#17172A] -rotate-12 max-lg:hidden" />

      <div className="mx-auto max-w-[1100px]">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-8 lg:gap-12">
          {/* Left: Hand-Drawn Paper Plane with Dotted Flight Trail */}
          <div className="flex justify-center max-lg:order-2">
            <PaperPlaneDoodle className="w-32 h-24 lg:w-44 lg:h-32 text-[#17172A] -rotate-6 filter drop-shadow-[2px_2px_0_rgba(23,23,42,0.1)]" />
          </div>

          {/* Center: Heading & Copy */}
          <div className="text-center lg:text-left max-lg:order-1">
            <div className="relative inline-block">
              <h2 className="font-hand text-[clamp(2.5rem,4.5vw,4.2rem)] leading-none text-[#17172A] m-0">
                {SITE_INFO.ctaHeading}
              </h2>
              {/* Hand-drawn yellow marker accent on 'mind?' */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-2 -left-2 right-0 h-4 w-[calc(100%+16px)] -z-10 overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 200 16"
              >
                <path
                  d="M 4,8 C 60,3 130,11 196,7"
                  fill="none"
                  stroke="#F9E37D"
                  strokeLinecap="round"
                  strokeWidth="8"
                />
              </svg>
            </div>
            
            <p className="mt-5 mb-0 font-hand text-[clamp(1.2rem,1.8vw,1.6rem)] font-bold text-muted">
              {SITE_INFO.ctaSubtext}
            </p>
          </div>

          {/* Right: Hand-Drawn Comic Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 justify-center items-center max-lg:order-3">
            <ComicButton
              className="w-full sm:w-auto"
              onClick={() => openInquiry()}
              size="lg"
              variant="pink"
            >
              Let&apos;s Talk <MessageCircle className="fill-[#DCC8F6]" size={20} strokeWidth={2.5} />
            </ComicButton>
            <ComicButton
              className="w-full sm:w-auto"
              href={SITE_INFO.links.viewWork}
              size="lg"
              variant="white"
            >
              View Our Work
            </ComicButton>
          </div>
        </div>
      </div>
    </section>
  );
}
