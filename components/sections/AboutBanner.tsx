import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { GridDoodle } from "@/components/illustrations/DoodleDecoration";
import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";

export function AboutBanner() {
  return (
    <section className="bg-cream pt-[18px] pb-7" id="about">
      <div
        className="relative mx-auto grid min-h-[190px] w-[calc(100%_-_40px)] max-w-[1280px] grid-cols-[260px_1fr_auto] items-center gap-[30px] overflow-hidden rounded-[var(--hand-radius)] border-[2.5px] border-transparent bg-lavender pt-7 pr-9 pb-6 shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_rgb(118_83_216_/_25%)] [background-image:url('/doodles/paper-grain.svg'),radial-gradient(rgba(17,17,17,0.08)_0.7px,transparent_0.7px)] [background-size:180px_180px,13px_13px] max-[900px]:grid-cols-[190px_1fr] max-[900px]:pr-6 max-md:w-[calc(100%_-_28px)] max-[600px]:grid-cols-1 max-[600px]:gap-3 max-[600px]:p-[18px] max-[600px]:text-left"
        style={handDrawnBorderStyle("about-banner", "bold")}
      >
        <div className="relative h-[185px] w-[260px] self-end max-[900px]:w-[190px] max-[600px]:mx-auto max-[600px]:mt-[-12px] max-[600px]:h-[150px] max-[600px]:w-[180px]">
          <Image
            alt="Illustrated developer with curly hair, round glasses, and a purple hoodie"
            className="object-contain object-bottom"
            fill
            sizes="(max-width: 600px) 180px, (max-width: 900px) 190px, 260px"
            src="/images/developer-about.png"
          />
        </div>

        <div className="relative z-[2]">
          <h2 className="mb-2 w-fit border-b-[3px] border-ink font-hand text-4xl leading-none max-[600px]:mx-auto">
            {pageContent.about.heading}
          </h2>
          <p className="m-0 max-w-[670px] text-[1.05rem] leading-[1.55] font-bold max-[600px]:text-center">
            {pageContent.about.body}
          </p>
        </div>

        <RoughButton
          borderSeed="button-build-together"
          className="relative z-[2] whitespace-nowrap max-[900px]:col-start-2 max-[900px]:w-fit max-[600px]:col-auto max-[600px]:w-full"
          href={contactLinks.buildTogether}
          variant="yellow"
        >
          Let&apos;s Build Together
          <ArrowRight aria-hidden="true" size={20} />
        </RoughButton>

        <GridDoodle className="absolute top-[9px] right-[26px] w-[92px] [rotate:5deg] max-[600px]:right-2.5 max-[600px]:w-16" />
        <HandDrawnBorder seed="about-banner" strength="bold" />
      </div>
    </section>
  );
}
