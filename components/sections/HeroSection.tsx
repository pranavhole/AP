import { ArrowRight } from "lucide-react";

import { HeroArtwork } from "@/components/illustrations/HeroArtwork";
import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { RoughButton } from "@/components/ui/RoughButton";
import { ScribbleUnderline } from "@/components/ui/ScribbleUnderline";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";

export function HeroSection() {
  const hero = pageContent.hero;

  return (
    <section
      className="relative min-h-[650px] border-ink bg-cream [background-image:url('/doodles/paper-grain.svg'),radial-gradient(rgba(17,17,17,0.08)_0.7px,transparent_0.7px)] [background-size:180px_180px,13px_13px] max-md:min-h-0"
      id="home"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-0 w-[clamp(20px,4vw,62px)] border-r-2 border-ink bg-mint [clip-path:polygon(0_0,100%_0,54%_100%,0_100%)] max-md:w-5"
      />
      <div className="mx-auto grid min-h-[650px] w-[calc(100%_-_40px)] max-w-[1280px] grid-cols-[minmax(0,1fr)_minmax(470px,0.95fr)] items-center gap-[30px] pt-[54px] pb-[38px] max-[1024px]:grid-cols-[0.95fr_1.05fr] max-md:block max-md:min-h-0 max-md:w-[calc(100%_-_28px)] max-md:pt-10 max-md:pb-3">
        <div className="relative z-[4] pl-[clamp(20px,3vw,48px)] max-md:pl-3.5">
          <p
            className="relative mb-7 w-fit rounded-[var(--hand-radius)] border-2 border-transparent bg-lavender px-3.5 pt-[7px] pb-[5px] font-hand text-[clamp(0.95rem,1.4vw,1.25rem)] font-extrabold shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_rgb(118_83_216_/_55%)] [rotate:-0.7deg] max-md:mb-[22px]"
            style={handDrawnBorderStyle("hero-eyebrow", "subtle")}
          >
            {hero.eyebrow}
            <HandDrawnBorder seed="hero-eyebrow" strength="subtle" />
          </p>
          <h1 className="m-0 grid font-hand text-[clamp(3.5rem,5.4vw,5.75rem)] leading-[0.92] tracking-[0.01em] max-[1024px]:text-[clamp(3rem,5vw,4.5rem)] max-md:text-[clamp(3.05rem,14.5vw,4.3rem)] max-md:leading-[0.94]">
            <span>{hero.headingLines[0]}</span>
            <span>{hero.headingLines[1]}</span>
            <span>
              {hero.headingLines[2]}{" "}
              <span className="relative inline-block w-fit">
                <mark className="relative z-[1] px-[0.05em] text-inherit [background:linear-gradient(transparent_35%,var(--yellow)_35%_91%,transparent_91%)]">
                  {hero.highlightedWord}
                </mark>
                <ScribbleUnderline className="absolute right-[-5px] bottom-[-9px] left-0 w-[108%]" />
              </span>
            </span>
          </h1>
          <p className="mt-7 mb-0 font-hand text-[clamp(1.35rem,2.2vw,2rem)] font-bold max-md:mt-6 max-md:text-[1.35rem]">
            {hero.support}
          </p>
          <div className="mt-10 flex flex-wrap gap-5 max-md:mt-[30px] max-md:grid max-md:gap-3.5">
            <RoughButton
              borderSeed="button-start-project"
              href={contactLinks.startProject}
            >
              Start Your Project <ArrowRight aria-hidden="true" size={20} />
            </RoughButton>
            <RoughButton
              borderSeed="button-view-work"
              href="#work"
              variant="paper"
            >
              View My Work
            </RoughButton>
          </div>
        </div>
        <HeroArtwork />
      </div>
    </section>
  );
}
