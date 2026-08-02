import { ArrowRight } from "lucide-react";

import { PaperPlane } from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { CardVariant, ServiceTone } from "@/types/content";

const toneClasses: Record<ServiceTone, string> = {
  yellow: "bg-pastel-yellow",
  mint: "bg-mint",
  pink: "bg-soft-pink",
  lavender: "bg-lavender",
};

const variantClasses: Record<CardVariant, string> = {
  1: "[--card-shadow:#d8bd56] [rotate:-1.2deg] [--card-mobile-tilt:-0.65deg] max-[600px]:[rotate:var(--card-mobile-tilt)]",
  2: "[--card-shadow:#79bda7] [rotate:1.05deg] [--card-mobile-tilt:0.55deg] max-[600px]:[rotate:var(--card-mobile-tilt)]",
  3: "[--card-shadow:#c97880] [rotate:-0.95deg] [--card-mobile-tilt:-0.5deg] max-[600px]:[rotate:var(--card-mobile-tilt)]",
  4: "[--card-shadow:#9275ba] [rotate:1.15deg] [--card-mobile-tilt:0.6deg] max-[600px]:[rotate:var(--card-mobile-tilt)]",
};

export function ServicesSection() {
  return (
    <section
      className="relative bg-cream pt-[78px] pb-[90px] max-[600px]:pt-16 max-[600px]:pb-[72px]"
      id="services"
    >
      <div className="mx-auto w-[calc(100%_-_40px)] max-w-[1280px] max-md:w-[calc(100%_-_28px)]">
        <SectionHeading decoration={<span>〽</span>}>
          Services I Offer
        </SectionHeading>
        <PaperPlane className="absolute top-[42px] right-[max(5vw,40px)] w-24 [rotate:-9deg] max-[600px]:top-7 max-[600px]:right-3.5 max-[600px]:w-[68px]" />
        <div className="mt-[62px] grid grid-cols-4 gap-[clamp(18px,2.2vw,30px)] max-[1000px]:grid-cols-2 max-[600px]:mt-12 max-[600px]:grid-cols-1 max-[600px]:gap-[22px] max-[600px]:px-[3px]">
          {services.map((service) => {
            const seed = `service-${service.title
              .toLowerCase()
              .replaceAll(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`;

            return (
              <article
                className={`group relative flex min-h-[286px] flex-col items-center rounded-[var(--hand-radius)] border-[2.5px] border-transparent px-[22px] pt-[34px] pb-[23px] text-center shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--card-shadow)] transition-[translate_180ms_ease,rotate_180ms_ease,box-shadow_180ms_ease] hover:-translate-y-[5px] hover:[rotate:0deg] hover:shadow-[7px_8px_0_rgb(17_17_17_/_22%)] max-[600px]:min-h-[248px] ${toneClasses[service.tone]} ${variantClasses[service.variant]}`}
                key={service.title}
                style={handDrawnBorderStyle(seed, "bold")}
              >
                <span className="grid h-[68px] w-[75px] place-items-center [&_svg]:w-[58px] [&_svg]:transition-transform [&_svg]:duration-200 group-hover:[&_svg]:-translate-y-[3px]">
                  <SketchIcon name={service.icon} />
                </span>
                <h3 className="mt-[19px] mb-2 font-hand text-[1.75rem] leading-none">
                  {service.title}
                </h3>
                <p className="m-0 font-extrabold text-[#3f3f3f]">
                  {service.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-auto grid aspect-square w-[42px] place-items-center rounded-[50%_44%_52%_48%] border-2 border-ink bg-white/40"
                >
                  <ArrowRight size={22} strokeWidth={2.6} />
                </span>
                <HandDrawnBorder seed={seed} strength="bold" />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
