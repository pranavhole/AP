import React from "react";
import { Sparkle, StarDoodle } from "@/components/svg/Doodles";
import { MarkerUnderline, MarkerUnderlineColor } from "./MarkerUnderline";

export function SectionHeading({
  title,
  subtitle,
  highlight,
  tone = "yellow",
  className = "",
}: {
  title: string;
  subtitle?: string;
  highlight?: string;
  tone?: MarkerUnderlineColor;
  className?: string;
}) {
  return (
    <div className={`relative mx-auto mb-10 w-fit text-center ${className}`}>
      {/* Decorative sparkles & stars */}
      <Sparkle className="absolute -top-5 -left-9 w-7 h-7 -rotate-12 text-[#17172A] max-md:hidden" />
      <StarDoodle className="absolute -top-4 -right-9 w-7 h-7 rotate-12 text-[#F9E37D] max-md:hidden" />

      <h2 className="relative z-10 font-hand text-[clamp(2.5rem,4.5vw,4.2rem)] leading-none text-[#17172A]">
        {title}
        {highlight && (
          <span className="relative inline-block ml-2 px-1">
            <span className="relative z-10">{highlight}</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 h-3 -z-10 rounded-sm opacity-80 bg-[#F9E37D]"
            />
          </span>
        )}
      </h2>

      {/* Hand-drawn marker underline */}
      <MarkerUnderline color={tone} />

      {subtitle && (
        <p className="mt-6 text-[clamp(1rem,1.4vw,1.2rem)] font-bold text-muted max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
