"use client";

import React, { useState } from "react";
import { Sparkle, StarDoodle, Squiggle, CurvedArrow, HalftoneDots, EmphasisLines } from "@/components/svg/Doodles";
import { SketchBorder } from "@/components/ui/SketchBorder";

export function HeroArtwork() {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="relative isolate flex items-center justify-center w-full max-w-[850px] mx-auto min-h-[420px] md:min-h-[520px] lg:min-h-[600px]">
      {/* Abstract pale yellow blob behind video */}
      <svg
        aria-hidden="true"
        className="absolute -inset-6 md:-inset-12 -z-20 w-[118%] h-[118%] overflow-visible"
        viewBox="0 0 500 420"
      >
        {/* Distorted shadow blob */}
        <path
          d="M 60,80 C 120,20 380,30 440,90 C 490,150 480,300 410,360 C 340,410 140,400 80,340 C 20,280 10,130 60,80 Z"
          fill="#E2C95B"
          transform="translate(10, 14)"
        />
        {/* Main pastel yellow organic blob */}
        <path
          d="M 60,80 C 120,20 380,30 440,90 C 490,150 480,300 410,360 C 340,410 140,400 80,340 C 20,280 10,130 60,80 Z"
          fill="#FFF0B0"
          stroke="#17172A"
          strokeLinejoin="round"
          strokeWidth="3"
        />
      </svg>

      {/* Dotted halftone patch */}
      <HalftoneDots className="absolute -top-8 -right-8 w-28 h-28 max-md:hidden -z-10" />

      {/* Decorative stars and sparkles */}
      <StarDoodle className="absolute -top-6 left-6 w-9 h-9 text-[#F9E37D] -rotate-12 animate-pulse" />
      <Sparkle className="absolute top-12 -left-8 w-9 h-9 text-[#7653D8] rotate-12" />
      <Sparkle className="absolute -bottom-6 right-12 w-10 h-10 text-[#F6B8B8] -rotate-6" />
      <Squiggle className="absolute -bottom-10 left-12 w-16 h-9 text-[#17172A]" />
      <EmphasisLines className="absolute top-4 right-4 w-12 h-12 text-[#17172A] rotate-45" />

      {/* Hand-drawn curved arrow pointing toward video */}
      <div className="absolute -bottom-12 -left-14 max-lg:hidden flex items-center gap-1.5 -rotate-12">
        <CurvedArrow className="w-16 h-14 text-[#17172A]" direction="right" />
        <span className="font-hand text-lg font-black text-[#17172A] bg-[#CFEBD8] border-2 border-[#17172A] px-3 py-1 rounded-xl shadow-[2.5px_2.5px_0_#17172A]">
          Watch Intro!
        </span>
      </div>

      {/* Video / Animated Hero container with increased height & width */}
      <div
        className="relative w-full max-h-[640px] overflow-hidden bg-[#FFF8E8] -rotate-[0.3deg] shadow-[4px_4px_0_rgba(23,23,42,0.1)]"
        style={{
          borderRadius: "26px 20px 28px 19px / 20px 28px 19px 26px",
        }}
      >
        {!videoError ? (
          <video
            aria-hidden="true"
            autoPlay
            className="w-full h-auto max-h-[640px] object-contain block"
            loop
            muted
            onError={() => setVideoError(true)}
            playsInline
            preload="metadata"
          >
            <source src="/hero-video.webm" type="video/webm" />
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/i_want_to_redesign_this_in_s.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="flex flex-col items-center justify-center p-14 min-h-[420px] text-center bg-[#FFF8E8]">
            <div className="w-20 h-20 rounded-full border-2 border-[#17172A] bg-[#F9E37D] grid place-items-center mb-4 shadow-[3px_3px_0_#17172A]">
              <span className="font-hand text-3xl font-black">DT</span>
            </div>
            <p className="font-hand text-3xl font-black text-[#17172A]">Hero Animation</p>
            <p className="text-base font-bold text-muted mt-1">Full-Stack & AI Solutions in Motion</p>
          </div>
        )}

        {/* Hand-drawn Sketch Border Overlay */}
        <SketchBorder strokeWidth={2.5} variant="b" />
      </div>
    </div>
  );
}
