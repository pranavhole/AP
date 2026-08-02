import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import type { CardVariant, ProcessTone } from "@/types/content";

const toneClasses: Record<ProcessTone, string> = {
  yellow: "bg-[#fff8d7]",
  mint: "bg-[#dff8ef]",
  pink: "bg-[#fbd2d4]",
};

const variantClasses: Record<CardVariant, string> = {
  1: "[rotate:-2deg]",
  2: "rounded-[54%_46%_50%_50%] [rotate:1deg]",
  3: "rounded-[46%_54%_55%_45%] [rotate:-1deg]",
  4: "rounded-[52%_48%_43%_57%] [rotate:2deg]",
};

export function ProcessSection() {
  return (
    <section
      className="border-y-[2.5px] border-ink bg-pastel-yellow py-[72px] [background-image:url('/doodles/dot-field.svg'),url('/doodles/paper-grain.svg')] [background-size:24px_24px,180px_180px] max-[560px]:pt-[62px] max-[560px]:pb-[70px]"
      id="process"
    >
      <div className="mx-auto w-[calc(100%_-_40px)] max-w-[1280px] max-md:w-[calc(100%_-_28px)]">
        <SectionHeading>How We Work</SectionHeading>
        <ol
          className="mt-[58px] grid list-none grid-cols-4 p-0 max-[900px]:grid-cols-2 max-[900px]:gap-x-5 max-[900px]:gap-y-[88px] max-[560px]:mt-12 max-[560px]:grid-cols-1 max-[560px]:gap-[42px]"
          role="list"
        >
          {processSteps.map((step, index) => (
            <li
              className="relative grid min-w-0 justify-items-center text-center"
              key={step.title}
            >
              <Reveal
                className="relative grid w-full justify-items-center"
                delay={index * 0.08}
              >
                <span
                  className={`grid aspect-square w-[132px] place-items-center rounded-[48%_52%_45%_55%] border-[2.5px] border-ink shadow-[4px_5px_0_rgb(17_17_17_/_14%)] max-[560px]:w-[118px] [&_svg]:w-[74px] ${toneClasses[step.tone]} ${variantClasses[step.variant]}`}
                >
                  <SketchIcon name={step.icon} />
                </span>
                <h3 className="mt-[18px] mb-1 font-hand text-[1.85rem] leading-none">
                  {step.title}
                </h3>
                <p className="m-0 font-extrabold">{step.description}</p>
                {index < processSteps.length - 1 ? (
                  <HandDrawnArrow
                    className={`absolute top-[43px] left-[calc(50%_+_75px)] w-[calc(100%_-_150px)] min-w-[62px] max-[560px]:static max-[560px]:mt-[22px] max-[560px]:w-[72px] max-[560px]:min-w-0 max-[560px]:[rotate:90deg] max-[560px]:translate-0 ${
                      index === 1
                        ? "max-[900px]:top-[calc(100%_+_22px)] max-[900px]:left-[-10px] max-[900px]:w-[clamp(82px,10vw,90px)] max-[900px]:min-w-0 max-[900px]:[rotate:135deg] max-[900px]:-translate-x-1/2 max-[560px]:static max-[560px]:mt-[22px] max-[560px]:w-[72px] max-[560px]:[rotate:90deg] max-[560px]:translate-x-0"
                        : ""
                    }`}
                  />
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
