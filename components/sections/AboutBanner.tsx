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
import { createHandDrawnBorder } from "@/lib/create-hand-drawn-border";

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
      "h-[64px] w-[60px] -rotate-2",
  },
  {
    icon: "cloud" as const,
    title: "Cloud & DevOps",
    description: "Deploying, monitoring and scaling applications.",
    iconClass:
      "h-[59px] w-[65px] rotate-1",
  },
  {
    icon: "robot" as const,
    title: "AI Integration",
    description: "Integrating LLMs, automation and intelligent workflows.",
    iconClass:
      "h-[63px] w-[61px] rotate-2",
  },
  {
    icon: "phone" as const,
    title: "Mobile & Web Apps",
    description: "From idea to live product across platforms.",
    iconClass:
      "h-[66px] w-[57px] -rotate-1",
  },
] as const;

const serviceIconPapers = [
  { fill: "#ffe58f", path: "M48 3C70 2 93 16 96 40c4 28-12 51-39 56C30 101 8 85 4 60 0 33 18 7 48 3Z", shadow: "#c6a83d", x: 2.2, y: 3.2 },
  { fill: "#bfebd9", path: "M42 2C69-2 94 18 97 43c3 24-13 47-39 53C31 102 5 86 3 58 1 33 15 7 42 2Z", shadow: "#76b9a5", x: 2.8, y: 2.2 },
  { fill: "#f7c3c5", path: "M54 2C79 5 96 25 95 50c-1 26-20 45-46 46C23 97 3 80 4 52 5 24 27-1 54 2Z", shadow: "#d98b95", x: 2, y: 3.4 },
  { fill: "#d8c2f2", path: "M43 2C66-1 89 13 95 36c8 29-5 54-30 60-27 7-51-7-59-32C-2 38 15 7 43 2Z", shadow: "#a88acd", x: 2.7, y: 2.8 },
] as const;

const valueIconPapers = [
  { fill: "#f7c3c5", path: "M48 3C72 0 94 15 96 41c2 27-14 50-41 55C29 100 7 84 4 59 1 32 20 6 48 3Z", shadow: "#cb7e89" },
  { fill: "#ffe58f", path: "M43 1C69-2 91 18 94 45c3 25-10 47-35 51-25 4-49-12-54-38C3 35 16 5 43 1Z", shadow: "#d1b54f" },
  { fill: "#fff9e9", path: "M55 3C81 6 97 27 93 54c-3 26-24 43-49 41C18 93 1 73 5 47 9 20 29 0 55 3Z", shadow: "#b9af91" },
  { fill: "#f7c3c5", path: "M40 3C65-3 91 13 96 39c5 27-11 51-37 57C32 102 7 85 3 59-4 34 14 9 40 3Z", shadow: "#cc7d88" },
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

function PaperSvg({
  path,
  fill,
  shadow,
  shadowX,
  shadowY,
  strokeWidth = 2.5,
  textureId,
}: {
  path: string;
  fill: string;
  shadow: string;
  shadowX: number;
  shadowY: number;
  strokeWidth?: number;
  textureId?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      {textureId ? (
        <defs>
          <pattern height="5.7" id={textureId} patternUnits="userSpaceOnUse" width="6.3">
            <circle cx="1.2" cy="1.6" fill="#7653d8" opacity="0.11" r="0.13" />
            <circle cx="4.9" cy="4.1" fill="#111111" opacity="0.065" r="0.1" />
          </pattern>
        </defs>
      ) : null}
      <path d={path} fill={shadow} transform={`translate(${shadowX} ${shadowY})`} />
      <path
        d={path}
        fill={fill}
        stroke="#111111"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
      {textureId ? <path d={path} fill={`url(#${textureId})`} /> : null}
      <path
        d={path}
        fill="none"
        opacity="0.2"
        stroke="#111111"
        strokeDasharray="0.45 1.15"
        strokeLinecap="round"
        strokeWidth="0.75"
        transform="translate(0.16 -0.12)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function AboutPaperShape() {
  return <PaperSvg fill="#e3cdf7" path="M6.2.65C24.3.15 43.7.82 63.4.42c15.8-.33 27.8-.42 31.2.58 3.2.94 4.46 2.15 4.55 4.15.53 19.5-.18 39.3.36 59.2.39 16.4.12 27.9-1.5 32.25-1.08 2.9-3.65 3.22-7.2 3.08-25.1-.9-49.4.42-78.6-.1-7.8-.14-10.3-.82-10.55-4.32C.4 73.5 1.25 47.2.58 21.15.3 9.95 1.45 2.22 6.2.65Z" shadow="#7653d8" shadowX={0.62} shadowY={0.72} strokeWidth={2.8} textureId="about-sheet-grain" />;
}

function ValuesPaperShape() {
  return <PaperSvg fill="#bfebd9" path="M5.1 2.1C25.4.85 49.8 1.7 76.6 1.05c12.8-.32 18.8.75 20.3 4.35 1.35 15.4.35 36.8 1.2 58.2.55 14.2-.15 25.6-2.7 31.3-16.8 2.7-40.2 1.2-63.9 2.1-15.8.6-25.1-.65-28.25-4.15C1.5 69.4 2.35 42.7 1.8 14.3c-.16-6.1.75-10.05 3.3-12.2Z" shadow="#6b45b8" shadowX={0.9} shadowY={1.65} textureId="values-paper-grain" />;
}

function YellowStatsPaper() {
  return <PaperSvg fill="#ffe58f" path="M8.2 2.1C30.4.8 67.1 1.6 91.8 2.5c4.1.15 5.65 2.8 5.55 7.15-.45 22.5.85 50.4-.25 78.3-.2 5.25-2.75 7.85-8.4 8.35-23.9 2.1-53.7 1-78.3-.35-5.25-.3-7.5-3.15-7.25-8.9 1.15-25.4-.5-51.6.2-75.9.15-5.25 1.9-7.85 4.85-9.05Z" shadow="#c9a52f" shadowX={1.6} shadowY={2.8} />;
}

function GreenStatsPaper() {
  return <PaperSvg fill="#bfebd9" path="M5.25 3.4C27.8 1.2 61.7 2.3 88.2 1.05c6.2-.3 9.3 2.45 9.7 8.7 1.1 20.9-.55 47.1.45 74.2.25 6.9-2.8 10.35-8.7 11.45-22.8 2.1-51.6.15-77.55.9-5.6.15-8.1-2.35-8.65-7.95C1.05 63.7 2.8 32.6 2.15 12.9c-.2-5.3.85-8.15 3.1-9.5Z" shadow="#5aa996" shadowX={2.15} shadowY={2.1} strokeWidth={2.9} />;
}

function PinkStatsPaper() {
  return <PaperSvg fill="#f7c3c5" path="M4.2 2.35C28.7.9 60.2 1.8 91.1 2.1c4.05.05 6.25 2.35 6.4 6.5.75 22.1-.65 48.8.45 76.2.25 6.2-3.55 9.8-10.2 10.5-21.7 2.25-49.8.7-76.6 1.35-6.6.15-9.05-3.4-8.5-9.45 1.35-22.9-.8-50.65-.35-75.9.1-5.15.45-7.85 1.9-8.95Z" shadow="#ca7480" shadowX={-1.55} shadowY={2.7} strokeWidth={2.2} />;
}

function PurpleStatsPaper() {
  return <PaperSvg fill="#d9c6f3" path="M7.4 2.25C27.8.5 64.5 1.7 89.9 1.2c5.4-.1 7.35 3.35 7.9 8.4 1.05 19.2-.35 45.4.5 72.85.25 8.2-2.65 12.25-8.45 13.1-23.8 2.7-52.1.45-78.15.75-5.35.05-8.05-3.05-8.25-8.65-.75-24.1.45-50.5-.4-75.25-.2-5.7 1.2-8.75 4.35-10.15Z" shadow="#9c78cc" shadowX={1.95} shadowY={2.45} strokeWidth={2.65} />;
}

function ServicesPaperShape() {
  return <PaperSvg fill="#fff9e9" path="M6.4 1.5C28.4.35 52.8 1.25 76.7.65c11.1-.3 17.45.75 19.8 3.5 1.5 19.1.25 42.4 1.3 66.6.55 12.1-.2 20.6-2.65 25.45-19.4 1.9-44.2.45-68.2 1.2-14.3.45-22.3-.5-24.65-3.15C.75 68.5 2.1 38.6 1.55 12.45c-.15-5.85 1.45-9.55 4.85-10.95Z" shadow="#7653d8" shadowX={0.95} shadowY={1.85} textureId="services-paper-grain" />;
}

function TechPaperShape() {
  return <PaperSvg fill="#fff9e9" path="M4.35 2.05C27.2.5 58.6 1.1 90.2 1.65c5.15.1 7.3 3.05 7.65 8.1 1.2 20.7-.55 45.2.3 70.9.3 9.3-1.9 13.85-7.35 15.3-23.6 2.6-52.8.1-79.2.8-6.55.2-9.15-2.55-8.85-8.5 1.2-24.5-.75-50.9-.25-75.95.1-5.45.45-8.75 1.85-10.25Z" shadow="#7653d8" shadowX={0.8} shadowY={2.2} strokeWidth={2.65} textureId="tech-paper-grain" />;
}

function TechnologyStickerShape({ seed, fill }: { seed: string; fill: string }) {
  const geometry = createHandDrawnBorder(seed, "regular");

  return <PaperSvg fill={fill} path={geometry.path} shadow="#111111" shadowX={2.2} shadowY={4} strokeWidth={1.7} />;
}

const techStickerStyles = [
  "-rotate-[0.55deg] px-4",
  "rotate-[0.38deg] px-5",
  "-rotate-[0.28deg] px-[15px]",
  "rotate-[0.47deg] px-[18px]",
  "-rotate-[0.43deg] px-4",
  "rotate-[0.22deg] px-[17px]",
  "-rotate-[0.48deg] px-5",
  "rotate-[0.32deg] px-[18px]",
  "-rotate-[0.37deg] px-5",
  "rotate-[0.42deg] px-6",
  "-rotate-[0.24deg] px-4",
  "rotate-[0.33deg] px-[18px]",
  "-rotate-[0.38deg] px-6",
  "rotate-[0.27deg] px-5",
  "-rotate-[0.32deg] px-[17px]",
  "rotate-[0.37deg] px-4",
  "-rotate-[0.42deg] px-5",
  "rotate-[0.23deg] px-[18px]",
] as const;

const techStickerFills = [
  "#d7ddff",
  "#bcebe5",
  "#f7c3c5",
  "#bfebd9",
  "#ffe58f",
  "#bdece3",
  "#d8c2f2",
  "#ffe9a8",
  "#ffc5c9",
  "#ffe58f",
  "#cdbcf1",
  "#f7c3c5",
  "#bfebd9",
  "#ffc2c8",
  "#c9d4ff",
  "#d8c2f2",
  "#ffe6a0",
  "#bce9df",
] as const;

function PaperLabel({
  children,
  tone = "pink",
}: {
  children: ReactNode;
  tone?: "pink" | "yellow" | "lavender";
}) {
  const toneClass = {
    pink: "-rotate-[0.5deg]",
    yellow: "rotate-[0.4deg]",
    lavender: "-rotate-[0.35deg]",
  }[tone];
  const shape = {
    pink: { fill: "#f7c3c5", path: "M3 7C21 1 72 4 96 2c2 19 1 61 2 89-24 6-70 1-94 4C1 72 3 29 3 7Z", shadow: "#9d7a91" },
    yellow: { fill: "#ffe58f", path: "M5 3C29 6 67 1 95 5c3 20 0 57 2 87-28 2-63 6-94 1C5 66 1 30 5 3Z", shadow: "#b99e3f" },
    lavender: { fill: "#d8c2f2", path: "M2 6C27 2 69 5 97 2c-1 28 3 60 0 92-25-2-66 3-94-1C1 66 4 31 2 6Z", shadow: "#9c80c4" },
  }[tone];

  return (
    <div
      className={`relative z-[5] isolate w-fit whitespace-nowrap bg-transparent px-6 py-2 font-hand text-xl leading-none tracking-[0.035em] uppercase max-md:px-4 max-md:text-base max-[390px]:text-[0.92rem] max-[390px]:tracking-0 ${toneClass}`}
    >
      <PaperSvg fill={shape.fill} path={shape.path} shadow={shape.shadow} shadowX={1.25} shadowY={2.4} strokeWidth={2} />
      <span className="relative z-[1]">{children}</span>
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
        className="relative isolate mx-auto w-[calc(100%_-_56px)] max-w-[1440px] overflow-hidden bg-transparent px-12 pt-14 pb-12 max-xl:px-8 max-md:w-[calc(100%_-_32px)] max-md:px-4 max-md:pt-12 max-md:pb-6"
      >
        <AboutPaperShape />
        <div className="pointer-events-none absolute top-2 left-4 z-[5] h-12 w-36 -rotate-[12deg] border-2 border-ink bg-[#ffd7dd] opacity-95 [clip-path:polygon(4%_12%,96%_0,100%_84%,94%_100%,5%_91%,0_18%)] [background-image:linear-gradient(90deg,transparent_19%,#db4772_20%,#db4772_23%,transparent_24%),linear-gradient(0deg,transparent_19%,#db4772_20%,#db4772_23%,transparent_24%)] [background-size:22px_22px] max-md:h-9 max-md:w-28" />
        <div className="pointer-events-none absolute top-0 right-0 z-[1] h-48 w-56 opacity-35 [background-image:radial-gradient(rgb(118_83_216_/_45%)_0_0.8px,transparent_1px)] [background-size:13px_15px] [mask-image:linear-gradient(225deg,#000,transparent_72%)]" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-40 w-52 opacity-20 [background-image:radial-gradient(rgb(118_83_216_/_42%)_0_0.75px,transparent_1px)] [background-size:17px_14px] [mask-image:linear-gradient(45deg,#000,transparent_75%)]" />
        <Paperclip className="pointer-events-none absolute top-7 right-[22%] z-[4] h-10 w-10 rotate-[18deg] text-purple opacity-70 max-md:hidden" strokeWidth={2.4} />
        <Sparkle className="absolute top-9 right-16 z-[4] w-9 rotate-[7deg] text-ink max-md:right-5 max-md:w-7" />
        <Sparkle className="absolute top-[22%] left-[31%] z-[4] w-6 -rotate-[13deg] text-purple max-lg:hidden" />

        <div className="relative z-[2] grid grid-cols-[minmax(260px,0.88fr)_minmax(300px,1fr)_minmax(430px,1.25fr)] items-start gap-x-8 gap-y-8 max-xl:grid-cols-[minmax(235px,0.82fr)_minmax(270px,0.95fr)_minmax(370px,1.2fr)] max-xl:gap-x-6 max-lg:grid-cols-1 max-lg:gap-3">
          <div className="relative row-span-2 min-h-[500px] self-stretch max-xl:min-h-[455px] max-lg:row-auto max-lg:mx-auto max-lg:min-h-[430px] max-lg:w-full max-lg:max-w-[500px] max-md:min-h-[350px]">
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

          <div className="pt-9 max-xl:pt-7 max-lg:pt-0">
            <div className="relative mb-8 w-fit max-md:mb-6">
              <h2 className="font-hand text-[clamp(3.6rem,4.6vw,5rem)] leading-[0.88] tracking-[-0.02em]">About Me</h2>
              <svg aria-hidden="true" className="absolute -bottom-5 left-0 h-6 w-full overflow-visible text-purple" preserveAspectRatio="none" viewBox="0 0 320 24">
                <path d="M6 12c72 5 153-5 307 1M18 17c68 3 173-4 278 0" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="4" />
              </svg>
              <span aria-hidden="true" className="absolute -top-5 -right-14 rotate-[8deg] font-hand text-5xl text-purple">〽</span>
            </div>
            <p className="mb-3 flex items-center gap-3 font-hand text-[clamp(1.65rem,2.5vw,2.3rem)] leading-tight">
              Hi, I&apos;m Pranav Hole
              <Hand aria-hidden="true" className="h-8 w-8 rotate-[12deg] fill-pastel-yellow text-ink" strokeWidth={2.2} />
            </p>
            <p className="max-w-[540px] text-[clamp(1.05rem,1.35vw,1.25rem)] leading-[1.65] font-bold">
              Full Stack Developer passionate about building scalable digital products, AI applications and useful software experiences.
              <span className="mt-2 block">I transform ideas into products that users actually love.</span>
            </p>
          </div>

          <div
            className="relative isolate mt-2 min-h-[330px] rotate-[0.15deg] bg-transparent px-9 pt-14 pb-7 max-xl:px-7 max-md:min-h-0 max-md:rotate-[0.1deg] max-md:px-5 max-md:pt-12 max-md:pb-5"
          >
            <ValuesPaperShape />
            <div className="absolute -top-5 left-[53%] -translate-x-1/2 max-md:left-[48%]">
              <PaperLabel>A little bit about me</PaperLabel>
            </div>
            <ul className="relative z-[1] space-y-1">
              {values.map(({ icon: Icon, label }, index) => (
                <li className="grid grid-cols-[48px_1fr] items-center gap-4 border-b-2 border-dashed border-ink/15 py-3 last:border-0 max-md:grid-cols-[40px_1fr] max-md:gap-3" key={label}>
                  <span className={`relative isolate grid place-items-center ${["h-11 w-12 -rotate-3", "h-12 w-10 rotate-2", "h-[42px] w-12 -rotate-1", "h-[46px] w-11 rotate-3"][index]}`}>
                    <PaperSvg fill={valueIconPapers[index].fill} path={valueIconPapers[index].path} shadow={valueIconPapers[index].shadow} shadowX={2.2} shadowY={3} strokeWidth={2} />
                    <Icon aria-hidden="true" className="relative z-[1] h-7 w-7" strokeWidth={2.3} />
                  </span>
                  <span className="font-hand text-[clamp(1.15rem,1.8vw,1.45rem)] leading-tight">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-[2/4] grid grid-cols-4 gap-5 max-lg:col-auto max-lg:mt-7 max-lg:grid-cols-2 max-md:gap-4">
            <article
              className="relative isolate min-h-[180px] -rotate-[0.35deg] bg-transparent p-5 text-center transition-[translate,rotate] duration-200 hover:-translate-y-1 hover:-rotate-[0.8deg] max-md:min-h-[170px] max-md:p-4"
            >
              <YellowStatsPaper />
              <BriefcaseBusiness aria-hidden="true" className="relative z-[1] mx-auto mb-2 h-9 w-9 -rotate-3" strokeWidth={2.4} />
              <strong className="relative z-[1] block font-hand text-[2.8rem] leading-none max-md:text-4xl">3+</strong>
              <span className="relative z-[1] mt-2 block font-hand text-lg leading-tight">Years Experience</span>
            </article>

            <article
              className="relative isolate min-h-[184px] rotate-[0.25deg] bg-transparent px-4 py-5 text-center transition-[translate,rotate] duration-200 hover:-translate-y-1 hover:rotate-[0.65deg] max-md:min-h-[178px] max-md:p-4"
            >
              <GreenStatsPaper />
              <Code2 aria-hidden="true" className="relative z-[1] mx-auto mb-1 h-10 w-10 rotate-2" strokeWidth={2.5} />
              <strong className="relative z-[1] block font-hand text-[3rem] leading-none max-md:text-4xl">20+</strong>
              <span className="relative z-[1] mt-2 block font-hand text-lg leading-tight">Projects Completed</span>
            </article>

            <article
              className="relative isolate min-h-[178px] rotate-[0.3deg] bg-transparent p-5 text-center transition-[translate,rotate] duration-200 hover:-translate-y-1 hover:rotate-[0.6deg] max-md:min-h-[174px] max-md:p-4"
            >
              <PinkStatsPaper />
              <Users aria-hidden="true" className="relative z-[1] mx-auto mb-2 h-9 w-9 -rotate-1" strokeWidth={2.35} />
              <strong className="relative z-[1] block font-hand text-[2.85rem] leading-none max-md:text-4xl">10+</strong>
              <span className="relative z-[1] mt-2 block font-hand text-lg leading-tight">Happy Clients</span>
            </article>

            <article
              className="relative isolate min-h-[176px] -rotate-[0.2deg] bg-transparent px-5 py-5 text-center transition-[translate,rotate] duration-200 hover:-translate-y-1 hover:-rotate-[0.55deg] max-md:min-h-[168px] max-md:p-4"
            >
              <PurpleStatsPaper />
              <Coffee aria-hidden="true" className="relative z-[1] mx-auto mb-1 h-9 w-9 rotate-3" strokeWidth={2.5} />
              <strong className="relative z-[1] block font-hand text-[3.1rem] leading-none max-md:text-4xl">∞</strong>
              <span className="relative z-[1] mt-2 block font-hand text-lg leading-tight">Cups of Coffee</span>
            </article>
          </div>

        </div>

        <div className="relative z-[2] mt-10 grid grid-cols-[1.08fr_1fr] items-stretch gap-10 max-lg:grid-cols-1 max-lg:gap-11">
          <article
            className="relative isolate rotate-[0.1deg] bg-transparent px-8 pt-12 pb-7 max-md:rotate-[0.08deg] max-md:px-5 max-md:pt-11"
          >
            <ServicesPaperShape />
            <div className="absolute -top-5 left-[48%] -translate-x-1/2"><PaperLabel tone="lavender">What I do</PaperLabel></div>
            <div className="relative z-[1] grid grid-cols-2 gap-x-8 gap-y-5 max-md:grid-cols-1 max-md:gap-0">
              {services.map((service, index) => (
                <div className="grid grid-cols-[68px_1fr] items-center gap-4 border-b-2 border-dashed border-ink/15 py-3 last:border-0 md:[&:nth-last-child(-n+2)]:border-0" key={service.title}>
                  <span className={`relative isolate grid place-items-center ${service.iconClass}`}>
                    <PaperSvg fill={serviceIconPapers[index].fill} path={serviceIconPapers[index].path} shadow={serviceIconPapers[index].shadow} shadowX={serviceIconPapers[index].x} shadowY={serviceIconPapers[index].y} strokeWidth={2} />
                    <SketchIcon className="relative z-[1] h-9 w-9" name={service.icon} />
                  </span>
                  <span>
                    <strong className="block font-hand text-xl leading-tight">{service.title}</strong>
                    <span className="mt-1 block text-[0.95rem] leading-snug font-bold">{service.description}</span>
                  </span>
                </div>
              ))}
            </div>
          </article>

          <article
            className="relative isolate -rotate-[0.08deg] bg-transparent px-8 pt-12 pb-8 max-md:-rotate-[0.05deg] max-md:px-5 max-md:pt-11"
          >
            <TechPaperShape />
            <div className="absolute -top-5 left-[52%] -translate-x-1/2"><PaperLabel tone="yellow">Tech I work with</PaperLabel></div>
            <ul className="relative z-[1] flex flex-wrap justify-center gap-x-4 gap-y-4">
              {technologies.map((technology, index) => (
                <li
                  className={`relative isolate py-2 font-hand text-[1.05rem] leading-none transition-[translate,rotate] duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:rotate-0 motion-safe:animate-[sticker-float_5s_ease-in-out_infinite] motion-reduce:animate-none ${techStickerStyles[index]}`}
                  key={technology}
                  style={{ animationDelay: `${(index % 6) * -0.42}s` }}
                >
                  <TechnologyStickerShape fill={techStickerFills[index]} seed={`about-tech-${technology}`} />
                  <span className="relative z-[1]">{technology}</span>
                </li>
              ))}
            </ul>
            <Bot aria-hidden="true" className="absolute right-6 bottom-4 h-7 w-7 rotate-[8deg] text-purple/50" />
          </article>
        </div>

        <GridDoodle className="pointer-events-none absolute right-8 bottom-4 z-[1] w-24 rotate-[6deg] text-purple/35 max-md:hidden" />
      </div>
    </section>
  );
}
