import Image from "next/image";
import type { ReactNode } from "react";
import {
  Bot,
  BriefcaseBusiness,
  Code2,
  Coffee,
  Heart,
  Hand,
  Lightbulb,
  Paperclip,
  Rocket,
  Target,
  Users,
} from "lucide-react";

import {
  GridDoodle,
  Sparkle,
} from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";

const values = [
  { icon: Target, label: "Problem solver at heart" },
  { icon: Lightbulb, label: "Love building with modern tech" },
  { icon: Rocket, label: "Always learning" },
  { icon: Heart, label: "Ship real products" },
] as const;

const services = [
  {
    icon: "laptop" as const,
    title: "Full-Stack Development",
    description: "Building fast, responsive and scalable web apps.",
    iconClass:
      "h-[64px] w-[60px] rounded-[47%_53%_45%_55%/52%_44%_56%_48%] bg-pastel-yellow -rotate-2 border-[2px] shadow-[2px_3px_0_#c6a83d]",
  },
  {
    icon: "cloud" as const,
    title: "Cloud & DevOps",
    description: "Deploying, monitoring and scaling applications.",
    iconClass:
      "h-[59px] w-[65px] rounded-[55%_45%_51%_49%/44%_56%_43%_57%] bg-mint rotate-1 border-[2.5px] shadow-[3px_2px_0_#76b9a5]",
  },
  {
    icon: "robot" as const,
    title: "AI Integration",
    description: "Integrating LLMs, automation and intelligent workflows.",
    iconClass:
      "h-[63px] w-[61px] rounded-[42%_58%_48%_52%/57%_45%_55%_43%] bg-soft-pink rotate-2 border-[2px] shadow-[2px_4px_0_#d98b95]",
  },
  {
    icon: "phone" as const,
    title: "Mobile & Web Apps",
    description: "From idea to live product across platforms.",
    iconClass:
      "h-[66px] w-[57px] rounded-[52%_48%_59%_41%/48%_57%_43%_52%] bg-lavender -rotate-1 border-[2.5px] shadow-[3px_3px_0_#a88acd]",
  },
] as const;

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "AWS",
  "Docker",
  "GraphQL",
  "Git",
  "Linux",
  "LangGraph",
  "OpenAI",
  "Qdrant",
  "Pinecone",
] as const;

const techStickerStyles = [
  "border-[1.5px] bg-[#d7ddff] -rotate-[0.5deg] px-4 rounded-[3px_8px_5px_2px] shadow-[2px_3px_0_#aeb9ef]",
  "border-2 bg-[#bcebe5] rotate-[0.35deg] px-5 rounded-[7px_3px_9px_5px] shadow-[3px_2px_0_#88cfc5]",
  "border-[1.5px] bg-soft-pink -rotate-[0.25deg] px-4 rounded-[2px_9px_4px_7px] shadow-[2px_2px_0_#e59da4] [clip-path:polygon(4px_0,100%_0,100%_calc(100%_-_4px),calc(100%_-_4px)_100%,0_100%,0_4px)]",
  "border-2 bg-mint rotate-[0.45deg] px-[18px] rounded-[2px_8px_5px_4px] shadow-[3px_3px_0_#8dcbb6]",
  "border-[1.5px] bg-pastel-yellow -rotate-[0.4deg] px-4 rounded-[3px_10px_2px_7px] shadow-[2px_3px_0_#e4c763]",
  "border-2 bg-[#bdece3] rotate-[0.2deg] px-[17px] rounded-[8px_2px_6px_4px] shadow-[3px_2px_0_#8bcbbf]",
  "border-[1.5px] bg-lavender -rotate-[0.45deg] px-5 rounded-[4px_11px_3px_6px] shadow-[2px_3px_0_#b497d9]",
  "border-2 bg-[#ffe9a8] rotate-[0.3deg] px-[18px] rounded-[9px_3px_7px_2px] shadow-[3px_2px_0_#e5c95f]",
  "border-[1.5px] bg-[#ffc5c9] -rotate-[0.35deg] px-5 rounded-[2px_7px_10px_4px] shadow-[2px_3px_0_#e79da4] [clip-path:polygon(0_0,calc(100%_-_5px)_0,100%_5px,100%_100%,0_100%)]",
  "border-2 bg-pastel-yellow rotate-[0.4deg] px-6 rounded-[7px_2px_4px_9px] shadow-[3px_2px_0_#dfc45e]",
  "border-[1.5px] bg-[#cdbcf1] -rotate-[0.2deg] px-4 rounded-[3px_9px_5px_7px] shadow-[2px_3px_0_#a88bd7]",
  "border-2 bg-soft-pink rotate-[0.3deg] px-[18px] rounded-[8px_4px_2px_6px] shadow-[3px_2px_0_#e59ea5]",
  "border-[1.5px] bg-mint -rotate-[0.35deg] px-6 rounded-[4px_6px_9px_3px] shadow-[2px_2px_0_#8ecbb6]",
  "border-2 bg-[#ffc2c8] rotate-[0.25deg] px-5 rounded-[7px_3px_5px_10px] shadow-[3px_3px_0_#e2959e]",
  "border-[1.5px] bg-[#c9d4ff] -rotate-[0.3deg] px-[17px] rounded-[3px_8px_4px_7px] shadow-[2px_3px_0_#9eaddf] [clip-path:polygon(4px_0,100%_0,100%_100%,0_100%,0_4px)]",
  "border-2 bg-lavender rotate-[0.35deg] px-4 rounded-[9px_4px_7px_2px] shadow-[3px_2px_0_#ad93d4]",
  "border-[1.5px] bg-[#ffe6a0] -rotate-[0.4deg] px-5 rounded-[2px_7px_5px_9px] shadow-[2px_3px_0_#ddc25f]",
  "border-2 bg-[#bce9df] rotate-[0.2deg] px-[18px] rounded-[6px_2px_8px_4px] shadow-[3px_2px_0_#89c7ba]",
] as const;

function PaperLabel({
  children,
  tone = "pink",
}: {
  children: ReactNode;
  tone?: "pink" | "yellow" | "lavender";
}) {
  const toneClass = {
    pink:
      "rounded-[4px_9px_3px_7px/6px_4px_8px_5px] bg-soft-pink shadow-[2px_2px_0_#111,5px_4px_0_#9d7a91] -rotate-[0.5deg]",
    yellow:
      "rounded-[7px_3px_6px_4px/4px_7px_5px_6px] bg-pastel-yellow shadow-[2px_2px_0_#111,4px_4px_0_#b99e3f] rotate-[0.4deg]",
    lavender:
      "rounded-[3px_8px_5px_4px/7px_4px_6px_5px] bg-lavender shadow-[2px_2px_0_#111,5px_4px_0_#9c80c4] -rotate-[0.35deg]",
  }[tone];

  return (
    <div
      className={`relative z-[5] w-fit whitespace-nowrap border-[2px] border-ink px-6 py-2 font-hand text-xl leading-none tracking-[0.035em] uppercase max-md:px-4 max-md:text-base max-[390px]:text-[0.92rem] max-[390px]:tracking-0 ${toneClass}`}
    >
      {children}
    </div>
  );
}

export function AboutBanner() {
  return (
    <section
      className="bg-cream py-8 [background-image:radial-gradient(circle_at_18%_27%,rgb(17_17_17_/_4%)_0_0.7px,transparent_0.9px),radial-gradient(circle_at_72%_64%,rgb(118_83_216_/_3%)_0_0.8px,transparent_1px)] [background-position:7px_13px,41px_29px] [background-size:127px_149px,181px_163px] max-md:py-5"
      id="about"
    >
      <div
        className="relative mx-auto w-[calc(100%_-_56px)] max-w-[1440px] overflow-hidden rounded-[28px_42px_34px_48px/35px_27px_46px_31px] border-[3px] border-ink bg-[#e3cdf7] px-12 pt-14 pb-12 shadow-[3px_3px_0_#111,8px_9px_0_rgb(118_83_216_/_42%)] [background-image:url('/doodles/paper-grain.svg'),radial-gradient(rgba(118,83,216,0.11)_0.75px,transparent_0.9px)] [background-position:0_0,13px_21px] [background-size:180px_180px,17px_19px] max-xl:px-8 max-md:w-[calc(100%_-_32px)] max-md:rounded-[24px_42px_34px_26px/31px_25px_39px_28px] max-md:px-4 max-md:pt-12 max-md:pb-6"
        style={handDrawnBorderStyle("about-page", "bold")}
      >
        <div className="pointer-events-none absolute top-2 left-4 z-[5] h-12 w-36 -rotate-[12deg] border-2 border-ink bg-[#ffd7dd] opacity-95 [clip-path:polygon(4%_12%,96%_0,100%_84%,94%_100%,5%_91%,0_18%)] [background-image:linear-gradient(90deg,transparent_19%,#db4772_20%,#db4772_23%,transparent_24%),linear-gradient(0deg,transparent_19%,#db4772_20%,#db4772_23%,transparent_24%)] [background-size:22px_22px] max-md:h-9 max-md:w-28" />
        <div className="pointer-events-none absolute top-0 right-0 z-[1] h-48 w-56 opacity-35 [background-image:radial-gradient(rgb(118_83_216_/_45%)_0_0.8px,transparent_1px)] [background-size:13px_15px] [mask-image:linear-gradient(225deg,#000,transparent_72%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-40 w-52 opacity-20 [background-image:radial-gradient(rgb(118_83_216_/_42%)_0_0.75px,transparent_1px)] [background-size:17px_14px] [mask-image:linear-gradient(45deg,#000,transparent_75%)]" />
        <Paperclip className="pointer-events-none absolute top-7 right-[22%] z-[4] h-10 w-10 rotate-[18deg] text-purple opacity-70 max-md:hidden" strokeWidth={2.4} />
        <Sparkle className="absolute top-9 right-16 z-[4] w-9 rotate-[7deg] text-ink max-md:right-5 max-md:w-7" />
        <Sparkle className="absolute top-[22%] left-[31%] z-[4] w-6 -rotate-[13deg] text-purple max-lg:hidden" />

        <div className="relative z-[2] grid grid-cols-[minmax(300px,390px)_1fr] gap-12 max-xl:grid-cols-[minmax(260px,330px)_1fr] max-xl:gap-8 max-lg:grid-cols-1 max-lg:gap-3">
          <div className="relative row-span-2 min-h-[520px] self-end max-xl:min-h-[470px] max-lg:row-auto max-lg:mx-auto max-lg:min-h-[430px] max-lg:w-full max-lg:max-w-[500px] max-md:min-h-[350px]">
            <div className="absolute right-[4%] bottom-[4%] left-[2%] h-[76%] rounded-[47%_53%_42%_58%/56%_44%_58%_42%] bg-pastel-yellow [rotate:-3deg]" />
            <Image
              alt="Illustrated Pranav Hole standing confidently with crossed arms in a purple hoodie"
              className="absolute inset-0 z-[2] h-full w-full object-cover object-center motion-safe:animate-[sticker-float_5s_ease-in-out_infinite] motion-reduce:animate-none"
              height={1024}
              sizes="(max-width: 768px) 88vw, (max-width: 1024px) 500px, 390px"
              src="/images/developer-about-crossed.png"
              width={1536}
            />
            <svg aria-hidden="true" className="absolute top-[22%] -left-1 z-[3] h-12 w-12 rotate-[-8deg] fill-none stroke-ink stroke-[2.5]" viewBox="0 0 50 50">
              <path d="M7 31c-4-7-4-12-2-18M18 24c-1-9 2-15 5-20M30 27c4-7 8-10 13-12" strokeLinecap="round" />
            </svg>
          </div>

          <div className="pt-5 max-lg:pt-0">
            <div className="relative mb-8 w-fit max-md:mb-6">
              <h2 className="font-hand text-[clamp(3.6rem,6vw,6.5rem)] leading-[0.88] tracking-[-0.02em]">About Me</h2>
              <svg aria-hidden="true" className="absolute -bottom-5 left-0 h-6 w-full overflow-visible text-purple" preserveAspectRatio="none" viewBox="0 0 320 24">
                <path d="M6 12c72 5 153-5 307 1M18 17c68 3 173-4 278 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
              </svg>
              <span aria-hidden="true" className="absolute -top-5 -right-14 rotate-[8deg] font-hand text-5xl text-purple">〽</span>
            </div>
            <p className="mb-3 flex items-center gap-3 font-hand text-[clamp(1.65rem,2.5vw,2.3rem)] leading-tight">
              Hi, I&apos;m Pranav Hole
              <Hand aria-hidden="true" className="h-8 w-8 rotate-[12deg] fill-pastel-yellow text-ink" strokeWidth={2.2} />
            </p>
            <p className="max-w-[760px] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-[1.65] font-bold">
              Full Stack Developer passionate about building scalable digital products, AI applications and useful software experiences.
              <span className="mt-2 block">I transform ideas into products that users actually love.</span>
            </p>
          </div>

          <div
            className="relative mt-2 rotate-[0.15deg] rounded-[26px_38px_24px_34px/32px_24px_39px_27px] border-[2.5px] border-ink bg-mint px-10 pt-14 pb-7 shadow-[2px_2px_0_#111,6px_7px_0_#6b45b8] max-md:rotate-[0.1deg] max-md:px-5 max-md:pt-12 max-md:pb-5"
            style={handDrawnBorderStyle("about-values", "bold")}
          >
            <div className="absolute -top-5 left-[53%] -translate-x-1/2 max-md:left-[48%]">
              <PaperLabel>A little bit about me</PaperLabel>
            </div>
            <ul className="space-y-1">
              {values.map(({ icon: Icon, label }, index) => (
                <li className="grid grid-cols-[48px_1fr] items-center gap-4 border-b-2 border-dashed border-ink/15 py-3 last:border-0 max-md:grid-cols-[40px_1fr] max-md:gap-3" key={label}>
                  <span className={`grid place-items-center border-2 border-ink ${["h-11 w-12 rounded-[48%_52%_43%_57%/55%_44%_56%_45%] bg-soft-pink -rotate-3 shadow-[2px_3px_0_#cb7e89]", "h-12 w-10 rounded-[55%_45%_52%_48%/44%_56%_43%_57%] bg-pastel-yellow rotate-2 shadow-[3px_2px_0_#d1b54f]", "h-[42px] w-12 rounded-[42%_58%_48%_52%/57%_45%_55%_43%] bg-cream -rotate-1 shadow-[2px_4px_0_#bba]", "h-[46px] w-11 rounded-[58%_42%_46%_54%/46%_58%_42%_54%] bg-soft-pink rotate-3 shadow-[3px_3px_0_#cc7d88]"][index]}`}>
                    <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={2.3} />
                  </span>
                  <span className="font-hand text-[clamp(1.15rem,1.8vw,1.45rem)] leading-tight">{label}</span>
                </li>
              ))}
            </ul>
            <HandDrawnBorder seed="about-values" strength="bold" />
          </div>
        </div>

        <div className="relative z-[2] mt-10 grid grid-cols-4 gap-6 max-lg:mt-7 max-lg:grid-cols-2 max-md:gap-4">
          <article
            className="relative -rotate-[0.35deg] rounded-[22px_15px_30px_34px/18px_24px_27px_32px] border-[2.5px] border-ink bg-pastel-yellow p-6 text-center shadow-[2px_2px_0_#111,6px_7px_0_#d1ae34] transition-[translate,rotate,box-shadow] duration-200 hover:-translate-y-1 hover:-rotate-[0.8deg] hover:shadow-[7px_8px_0_#111] max-md:min-h-[170px] max-md:p-4"
            style={handDrawnBorderStyle("about-stat-experience", "regular")}
          >
            <BriefcaseBusiness aria-hidden="true" className="mx-auto mb-2 h-10 w-10 -rotate-3" strokeWidth={2.4} />
            <strong className="block font-hand text-5xl leading-none max-md:text-4xl">3+</strong>
            <span className="mt-2 block font-hand text-lg leading-tight">Years Experience</span>
            <HandDrawnBorder seed="about-stat-experience" />
          </article>

          <article
            className="relative rotate-[0.25deg] rounded-[17px_34px_21px_28px/25px_18px_31px_23px] border-[3px] border-ink bg-mint px-5 py-7 text-center shadow-[3px_2px_0_#111,7px_5px_0_#5aa996] transition-[translate,rotate,box-shadow] duration-200 hover:-translate-y-1 hover:rotate-[0.65deg] hover:shadow-[7px_6px_0_#111] max-md:min-h-[178px] max-md:p-4"
            style={handDrawnBorderStyle("about-stat-projects", "bold")}
          >
            <Code2 aria-hidden="true" className="mx-auto mb-1 h-11 w-11 rotate-2" strokeWidth={2.5} />
            <strong className="block font-hand text-[3.35rem] leading-none max-md:text-4xl">20+</strong>
            <span className="mt-2 block font-hand text-lg leading-tight">Projects Completed</span>
            <HandDrawnBorder seed="about-stat-projects" strength="bold" />
          </article>

          <article
            className="relative rotate-[0.3deg] rounded-[14px_20px_27px_39px/20px_16px_34px_29px] border-[2px] border-ink bg-soft-pink p-[26px] text-center shadow-[-2px_2px_0_#111,-5px_7px_0_#ca7480] transition-[translate,rotate,box-shadow] duration-200 hover:-translate-y-1 hover:rotate-[0.6deg] hover:shadow-[-6px_8px_0_#111] max-md:min-h-[174px] max-md:p-4"
            style={handDrawnBorderStyle("about-stat-clients", "regular")}
          >
            <Users aria-hidden="true" className="mx-auto mb-2 h-10 w-10 -rotate-1" strokeWidth={2.35} />
            <strong className="block font-hand text-[3.15rem] leading-none max-md:text-4xl">10+</strong>
            <span className="mt-2 block font-hand text-lg leading-tight">Happy Clients</span>
            <HandDrawnBorder seed="about-stat-clients" />
          </article>

          <article
            className="relative -rotate-[0.2deg] rounded-[29px_40px_24px_33px/25px_31px_22px_28px] border-[2.5px] border-ink bg-[#d9c6f3] px-7 py-6 text-center shadow-[2px_2px_0_#111,7px_5px_0_#9c78cc] transition-[translate,rotate,box-shadow] duration-200 hover:-translate-y-1 hover:-rotate-[0.55deg] hover:shadow-[8px_6px_0_#111] max-md:min-h-[168px] max-md:p-4"
            style={handDrawnBorderStyle("about-stat-coffee", "bold")}
          >
            <Coffee aria-hidden="true" className="mx-auto mb-1 h-10 w-10 rotate-3" strokeWidth={2.5} />
            <strong className="block font-hand text-[3.5rem] leading-none max-md:text-4xl">∞</strong>
            <span className="mt-2 block font-hand text-lg leading-tight">Cups of Coffee</span>
            <HandDrawnBorder seed="about-stat-coffee" strength="bold" />
          </article>
        </div>

        <div className="relative z-[2] mt-11 grid grid-cols-[1.08fr_1fr] items-stretch gap-10 max-lg:grid-cols-1 max-lg:gap-11">
          <article
            className="relative rotate-[0.1deg] rounded-[34px_20px_31px_46px/28px_24px_42px_35px] border-[2.5px] border-ink bg-cream px-8 pt-12 pb-7 shadow-[2px_2px_0_#111,5px_6px_0_#7653d8] max-md:rotate-[0.08deg] max-md:px-5 max-md:pt-11"
            style={handDrawnBorderStyle("about-services", "bold")}
          >
            <div className="absolute -top-5 left-[48%] -translate-x-1/2"><PaperLabel tone="lavender">What I do</PaperLabel></div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 max-md:grid-cols-1 max-md:gap-0">
              {services.map((service) => (
                <div className="grid grid-cols-[68px_1fr] items-center gap-4 border-b-2 border-dashed border-ink/15 py-3 last:border-0 md:[&:nth-last-child(-n+2)]:border-0" key={service.title}>
                  <span className={`grid place-items-center border-ink ${service.iconClass}`}>
                    <SketchIcon className="h-9 w-9" name={service.icon} />
                  </span>
                  <span>
                    <strong className="block font-hand text-xl leading-tight">{service.title}</strong>
                    <span className="mt-1 block text-[0.95rem] leading-snug font-bold">{service.description}</span>
                  </span>
                </div>
              ))}
            </div>
            <HandDrawnBorder seed="about-services" strength="bold" />
          </article>

          <article
            className="relative -rotate-[0.08deg] rounded-[18px_43px_29px_24px/27px_32px_38px_20px] border-[2.5px] border-ink bg-cream px-8 pt-12 pb-8 shadow-[2px_2px_0_#111,4px_7px_0_#7653d8] max-md:-rotate-[0.05deg] max-md:px-5 max-md:pt-11"
            style={handDrawnBorderStyle("about-tech", "bold")}
          >
            <div className="absolute -top-5 left-[52%] -translate-x-1/2"><PaperLabel tone="yellow">Tech I work with</PaperLabel></div>
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-4">
              {technologies.map((technology, index) => (
                <li
                  className={`relative border-ink py-2 font-hand text-[1.05rem] leading-none transition-[translate,rotate] duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-safe:animate-[sticker-float_5s_ease-in-out_infinite] motion-reduce:animate-none ${techStickerStyles[index]}`}
                  key={technology}
                  style={{ animationDelay: `${(index % 6) * -0.42}s` }}
                >
                  {technology}
                  <HandDrawnBorder seed={`about-tech-${technology}`} strength="subtle" />
                </li>
              ))}
            </ul>
            <Bot aria-hidden="true" className="absolute right-6 bottom-4 h-7 w-7 rotate-[8deg] text-purple/50" />
            <HandDrawnBorder seed="about-tech" strength="bold" />
          </article>
        </div>

        <GridDoodle className="pointer-events-none absolute right-8 bottom-4 z-[1] w-24 rotate-[6deg] text-purple/35 max-md:hidden" />
        <HandDrawnBorder seed="about-page" strength="bold" />
      </div>
    </section>
  );
}
