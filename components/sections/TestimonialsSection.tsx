"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SketchFrame } from "@/components/ui/SketchFrame";
import { OrganicBlob } from "@/components/ui/OrganicBlob";
import { SketchIconButton } from "@/components/ui/SketchIconButton";
import { Sparkle, StarDoodle } from "@/components/svg/Doodles";

const testimonials = [
  {
    id: 1,
    quote:
      "Pranav delivered an amazing website that exceeded our expectations.",
    name: "John Doe",
    role: "Founder, StartupX",
    avatarColor: "#F9E37D",
  },
  {
    id: 2,
    quote:
      "Working with Pranav was smooth from day one. He built our complete SaaS MVP in record time with immaculate attention to detail.",
    name: "Sarah Jenkins",
    role: "Co-Founder, SaaSify",
    avatarColor: "#DCC8F6",
  },
  {
    id: 3,
    quote:
      "The AI automation features Pranav integrated doubled our team's operational efficiency. He is a truly talented full-stack consultant.",
    name: "Alex Rivera",
    role: "Head of Product, Apex AI",
    avatarColor: "#CFEBD8",
  },
];

function ClientAvatarSvg() {
  return (
    <svg
      aria-hidden="true"
      className="w-full h-full"
      viewBox="0 0 80 80"
    >
      {/* Shirt / body */}
      <path
        d="M16 74 C 16 54, 26 48, 40 48 C 54 48, 64 54, 64 74 Z"
        fill="#FFFDFC"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      {/* Head */}
      <circle cx="40" cy="34" fill="#F7D9BB" r="14" stroke="#17172A" strokeWidth="2" />
      {/* Hair */}
      <path
        d="M26 30 C 26 16, 54 16, 54 30 C 54 22, 50 16, 40 15 C 30 16, 26 22, 26 30 Z"
        fill="#17172A"
      />
      {/* Eyes */}
      <circle cx="35" cy="33" fill="#17172A" r="1.8" />
      <circle cx="45" cy="33" fill="#17172A" r="1.8" />
      {/* Smile */}
      <path
        d="M36 39 Q 40 44 44 39"
        fill="none"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <section
      className="relative bg-cream py-16 md:py-24 px-4 overflow-hidden"
      id="testimonials"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Decorative Doodles */}
      <Sparkle className="absolute top-12 left-[10%] w-8 h-8 text-[#17172A] -rotate-12 max-md:hidden" />
      <StarDoodle className="absolute top-16 right-[12%] w-8 h-8 text-[#F9E37D] rotate-12 max-md:hidden" />

      <div className="mx-auto max-w-[900px]">
        {/* Heading */}
        <SectionHeading
          subtitle="Real feedback from founders and teams I've partnered with."
          title="What Clients Say"
          tone="pink"
        />

        {/* Hand-Drawn Paper Note / Card */}
        <div className="relative mt-10">
          <SketchFrame
            className="p-8 sm:p-12 text-center -rotate-[0.35deg]"
            doubleLine
            fill="soft-yellow"
            shadow="yellow"
            shadowX={6}
            shadowY={7}
            variant="c"
          >
            {/* Hand-Drawn Quote Mark Icon */}
            <div className="mx-auto mb-3 flex justify-center">
              <svg
                aria-hidden="true"
                className="w-12 h-10 text-[#7653D8] opacity-60"
                viewBox="0 0 48 36"
              >
                <path
                  d="M 6,24 C 6,14 12,6 22,4 L 24,8 C 18,10 14,15 15,20 L 22,20 L 22,34 L 6,34 Z"
                  fill="#7653D8"
                  stroke="#17172A"
                  strokeWidth="2"
                />
                <path
                  d="M 28,24 C 28,14 34,6 44,4 L 46,8 C 40,10 36,15 37,20 L 44,20 L 44,34 L 28,34 Z"
                  fill="#7653D8"
                  stroke="#17172A"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="m-0">
              <p className="font-hand text-[clamp(1.3rem,2.2vw,1.85rem)] font-extrabold text-[#17172A] leading-relaxed">
                &ldquo;{current.quote}&rdquo;
              </p>
            </blockquote>

            {/* Client Info & Organic Avatar */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <OrganicBlob
                className="w-14 h-14"
                color={current.avatarColor}
                shadow="ink"
                variant="b"
              >
                <ClientAvatarSvg />
              </OrganicBlob>
              
              <div className="text-left">
                <strong className="block font-hand text-xl font-black text-[#17172A] leading-tight">
                  {current.name}
                </strong>
                <span className="text-sm font-bold text-muted">
                  {current.role}
                </span>
              </div>
            </div>
          </SketchFrame>

          {/* Prev / Next Hand-Drawn Navigation Buttons */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <SketchIconButton
              ariaLabel="Previous testimonial"
              blobIndex={0}
              className="w-12 h-12"
              onClick={handlePrev}
              shadow="pink"
              variant="pink"
            >
              <ChevronLeft size={22} strokeWidth={2.8} />
            </SketchIconButton>

            {/* Hand-Drawn Pagination Dots */}
            <div className="flex items-center gap-2.5" role="tablist">
              {testimonials.map((t, idx) => (
                <button
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`
                    transition-all cursor-pointer border-2 border-[#17172A]
                    ${
                      idx === currentIndex
                        ? "w-8 h-3.5 rounded-full bg-[#7653D8] shadow-[1.5px_1.5px_0_#17172A]"
                        : "w-3.5 h-3.5 rounded-full bg-[#FFFDFC] hover:bg-[#FFF0B0] shadow-[1px_1px_0_#17172A]"
                    }
                  `}
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  type="button"
                />
              ))}
            </div>

            <SketchIconButton
              ariaLabel="Next testimonial"
              blobIndex={1}
              className="w-12 h-12"
              onClick={handleNext}
              shadow="pink"
              variant="pink"
            >
              <ChevronRight size={22} strokeWidth={2.8} />
            </SketchIconButton>
          </div>
        </div>
      </div>
    </section>
  );
}
