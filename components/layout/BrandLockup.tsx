import React from "react";
import { siteConfig } from "@/config/site";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a
      aria-label={`${siteConfig.name} home`}
      className={`group inline-flex items-center gap-3 leading-none no-underline text-[#17172A] transition-transform hover:-translate-y-0.5 ${compact ? "scale-95" : ""}`}
      href="#home"
    >
      {/* Hand-drawn DT Monogram Badge */}
      <span className="relative isolate grid h-11 w-11 flex-none place-items-center -rotate-2">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
        >
          {/* Offset shadow */}
          <path
            d="M 6,6 C 30,2 72,4 94,3 C 97,24 95,76 96,94 C 72,97 26,95 4,96 C 2,74 4,24 6,6 Z"
            fill="#7653D8"
            transform="translate(2.5, 3.5)"
          />
          {/* Main badge fill */}
          <path
            d="M 6,6 C 30,2 72,4 94,3 C 97,24 95,76 96,94 C 72,97 26,95 4,96 C 2,74 4,24 6,6 Z"
            fill="#FFF0B0"
            stroke="#17172A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.4"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <strong className="font-hand text-2xl font-black text-[#17172A] tracking-tight">
          {siteConfig.initials}
        </strong>
      </span>

      <span className="grid gap-[2px]">
        <b className="font-hand text-[1.1rem] font-black tracking-wide text-[#17172A] max-[430px]:text-[0.95rem]">
          {siteConfig.name.toUpperCase()}
        </b>
        <small className="font-bold text-[0.68rem] text-muted max-[430px]:hidden">
          {siteConfig.role}
        </small>
      </span>
    </a>
  );
}
