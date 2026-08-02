import { Sparkle } from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/process";

const processPapers = [
  { fill: "#fff9e9", shadow: "#c7a949", path: "M48 2C72 0 94 16 96 42c2 27-15 49-41 54C29 100 7 83 4 58 1 32 20 6 48 2Z" },
  { fill: "#bfebd9", shadow: "#68a891", path: "M43 2C69-2 92 17 95 44c3 25-11 47-35 52-26 5-50-11-55-37C1 35 16 6 43 2Z" },
  { fill: "#f7c3c5", shadow: "#c7757e", path: "M54 2C80 5 97 26 94 53c-3 26-23 43-49 42C19 94 2 74 5 48 8 21 29 0 54 2Z" },
  { fill: "#bfe8dc", shadow: "#6aab99", path: "M40 3C65-3 91 13 96 39c5 27-11 51-37 57C32 102 7 85 3 59-3 34 14 9 40 3Z" },
] as const;

const arrowPaths = [
  "M3 22c20-5 38 5 58-1 11-3 19-9 29-7m-9-8 10 8-9 10",
  "M2 17c17 8 35-2 53 2 14 3 21 8 34 2m-8-8 9 8-10 7",
  "M3 23c18-9 34 2 53-3 14-4 21-10 35-8m-9-7 10 7-8 10",
] as const;

function ProcessSheet() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <pattern height="4.8" id="process-sheet-grain" patternUnits="userSpaceOnUse" width="5.4">
          <circle cx="1" cy="1.4" fill="#8b661e" opacity="0.11" r="0.12" />
          <circle cx="4" cy="3.5" fill="#111" opacity="0.05" r="0.1" />
        </pattern>
      </defs>
      <path d="M3 2.2C21 .4 42 1.7 62 .8c18-.8 30-.1 34 2.7 2.2 18.8.8 40.5 1.8 64.5.7 16.4-.1 25.8-3 28.5-24.4 2.5-50.5 0-77.5 1.4-9.8.5-14.3-.5-15.8-3.8C.2 69.8 1.7 38.4 1 12 1 6.3 1.5 3.2 3 2.2Z" fill="#7653d8" opacity=".58" transform="translate(.55 1.45)" />
      <path d="M3 2.2C21 .4 42 1.7 62 .8c18-.8 30-.1 34 2.7 2.2 18.8.8 40.5 1.8 64.5.7 16.4-.1 25.8-3 28.5-24.4 2.5-50.5 0-77.5 1.4-9.8.5-14.3-.5-15.8-3.8C.2 69.8 1.7 38.4 1 12 1 6.3 1.5 3.2 3 2.2Z" fill="#ffe58f" stroke="#111" strokeLinejoin="round" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
      <path d="M3 2.2C21 .4 42 1.7 62 .8c18-.8 30-.1 34 2.7 2.2 18.8.8 40.5 1.8 64.5.7 16.4-.1 25.8-3 28.5-24.4 2.5-50.5 0-77.5 1.4-9.8.5-14.3-.5-15.8-3.8C.2 69.8 1.7 38.4 1 12 1 6.3 1.5 3.2 3 2.2Z" fill="url(#process-sheet-grain)" />
    </svg>
  );
}

function CurvedProcessArrow({ index }: { index: number }) {
  return (
    <svg aria-hidden="true" className="absolute top-[52px] left-[calc(50%_+_78px)] h-10 w-[calc(100%_-_156px)] min-w-[64px] overflow-visible max-[560px]:static max-[560px]:mt-5 max-[560px]:h-[66px] max-[560px]:w-12 max-[560px]:min-w-0 max-[560px]:rotate-90" preserveAspectRatio="none" viewBox="0 0 96 34">
      <path d={arrowPaths[index]} fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function ProcessSection() {
  return (
    <section className="relative bg-cream py-7 [background-image:url('/doodles/paper-grain.svg')] [background-size:180px_180px] max-[560px]:py-5" id="process">
      <div className="relative isolate mx-auto w-[calc(100%_-_40px)] max-w-[1440px] px-12 pt-[62px] pb-[66px] max-md:w-[calc(100%_-_28px)] max-md:px-5 max-[560px]:pt-14 max-[560px]:pb-12">
        <ProcessSheet />
        <div className="relative mx-auto w-fit rotate-[0.2deg]">
          <h2 className="relative z-[1] font-hand text-[clamp(2.7rem,4vw,4rem)] leading-none">How We Work</h2>
          <svg aria-hidden="true" className="absolute -right-2 -bottom-5 -left-3 h-7 w-[calc(100%+20px)]" preserveAspectRatio="none" viewBox="0 0 100 20"><path d="M3 8c29 5 61-4 94 0M12 14c25 2 49-3 77-1" fill="none" stroke="#7653d8" strokeLinecap="round" strokeWidth="3.5" /></svg>
        </div>

        <svg aria-hidden="true" className="absolute top-16 left-[6%] h-16 w-20 -rotate-12 max-[700px]:hidden" viewBox="0 0 80 60"><path d="M9 13c-6 11 2 17 14 16-14 5-12 18 1 18 14 0 19-11 18-25" fill="none" stroke="#111" strokeLinecap="round" strokeWidth="2.5" /></svg>
        <Sparkle className="absolute bottom-14 left-[4%] w-7 -rotate-6 text-purple" />
        <Sparkle className="absolute right-[4%] bottom-14 w-10 rotate-12 text-[#e9476e]" />
        <span aria-hidden="true" className="absolute top-16 right-[8%] rotate-12 font-hand text-5xl">〽</span>

        <ol className="mt-[66px] grid list-none grid-cols-4 p-0 max-[900px]:grid-cols-2 max-[900px]:gap-x-5 max-[900px]:gap-y-[76px] max-[560px]:mt-14 max-[560px]:grid-cols-1 max-[560px]:gap-8" role="list">
          {processSteps.map((step, index) => (
            <li className="relative grid min-w-0 justify-items-center text-center" key={step.title}>
              <Reveal className="relative grid w-full justify-items-center" delay={index * 0.08}>
                <span className={`relative isolate grid aspect-square w-[138px] place-items-center ${["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"][index]} max-[560px]:w-[122px] [&_svg:last-child]:relative [&_svg:last-child]:z-[1] [&_svg:last-child]:w-[78px]`}>
                  <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
                    <path d={processPapers[index].path} fill={processPapers[index].shadow} transform="translate(3 4)" />
                    <path d={processPapers[index].path} fill={processPapers[index].fill} stroke="#111" strokeLinejoin="round" strokeWidth="2.4" />
                    <path d={processPapers[index].path} fill="none" opacity=".18" stroke="#111" strokeDasharray="1 2" strokeWidth=".8" transform="translate(.3 -.2)" />
                  </svg>
                  <SketchIcon name={step.icon} />
                </span>
                <h3 className="mt-4 mb-1 font-hand text-[1.9rem] leading-none">{step.title}</h3>
                <p className="font-extrabold">{step.description}</p>
                {index < processSteps.length - 1 ? <CurvedProcessArrow index={index} /> : null}
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="pointer-events-none absolute right-10 bottom-2 h-12 w-32 rotate-[8deg] border-2 border-ink bg-[#ffd1da] opacity-90 [clip-path:polygon(4%_10%,96%_0,100%_84%,91%_100%,3%_91%,0_18%)] [background-image:linear-gradient(90deg,transparent_21%,#d94672_22%,#d94672_25%,transparent_26%),linear-gradient(0deg,transparent_21%,#d94672_22%,#d94672_25%,transparent_26%)] [background-size:20px_20px] max-[700px]:h-9 max-[700px]:w-24" />
      </div>
    </section>
  );
}
