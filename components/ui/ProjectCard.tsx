import Image from "next/image";

import { PaperPlane, Sparkle } from "@/components/illustrations/DoodleDecoration";
import type { Project } from "@/types/content";

const projectGeometry = {
  1: {
    path: "M6 2C28 .5 63 1.6 91 2.8c4 .2 5.7 2.7 5.6 7.2-.5 22 .8 49.5-.4 76.8-.2 5.8-3.5 8.5-9 9.2-23.8 3.1-51 2-77.1.8-5.7-.3-7.7-3.4-7.1-9 2.6-26.4-1.2-52.2.2-76C3.5 6.6 4.6 3.2 6 2Z",
    shadow: "#a8dccb",
    shadowX: 1.25,
    shadowY: 2.1,
    rotation: "-rotate-[0.6deg] hover:-rotate-[0.08deg]",
    framePath: "M4 5C27 2 67 4 96 3c1 24-.3 58 1 91-25 3-68 1-93 2C2 70 4 31 4 5Z",
    frameClip: "polygon(2% 3%, 98% 2%, 99% 96%, 3% 98%)",
    frameRotation: "rotate-[0.25deg]",
    accent: "mint" as const,
  },
  2: {
    path: "M4 3C27 1 58 2.1 87 1.2c7-.2 10 3.1 10.2 9.1.7 20.3-.4 46.8.4 72.8.2 7.8-2.2 11.6-8.4 12.3-22.7 2.5-50.2.2-77.6.9-6.4.2-9-2.8-8.8-8.6.9-24.4-.6-51.5-.1-75.1.1-5.1.3-8 1.3-9.6Z",
    shadow: "#d7ba63",
    shadowX: 1.55,
    shadowY: 1.75,
    rotation: "rotate-[0.35deg] hover:rotate-[0.04deg]",
    framePath: "M3 4C30 3 60 4 91 2c5-.3 7 3 7 8-.2 24 1 54-.4 84-29 2-62-.6-93 1C2 69 4 32 3 4Z",
    frameClip: "polygon(2% 3%, 97% 2%, 99% 93%, 96% 98%, 2% 96%)",
    frameRotation: "-rotate-[0.2deg]",
    accent: "yellow" as const,
  },
  3: {
    path: "M8 2C28 .4 63 1.4 90 2.4c5 .2 7.1 3 7.3 8.2.7 22-.5 47.4.4 72.9.3 8-3.1 12.2-9.2 12.8-25.3 2.4-52.4-.2-77.2.5-5.8.2-8.3-2.7-8.3-8.4-.2-25.2.9-50.6-.2-75.4C2.6 6.9 4.4 3.3 8 2Z",
    shadow: "#c7a7e9",
    shadowX: 1.6,
    shadowY: 2.15,
    rotation: "-rotate-[0.25deg] hover:rotate-0",
    framePath: "M5 3C28 1 67 4 95 3c2 25-.3 58 1 87 .1 4-2 6-6 6-27-1-57 1-85-.2C3 70 5 31 5 3Z",
    frameClip: "polygon(2% 2%, 98% 3%, 99% 92%, 95% 98%, 3% 96%)",
    frameRotation: "rotate-[0.15deg]",
    accent: "lavender" as const,
  },
} as const;

const tagShapes = [
  "M3 8C22 3 73 5 96 3c1 22 0 58 1 88-24 5-68 1-94 4C1 70 3 31 3 8Z",
  "M6 4C30 2 68 4 93 3c4 20 1 59 3 88-28 3-61 5-91 1C6 66 2 29 6 4Z",
  "M8 4H92c1 10 1 22 6 27-5 9-5 31 0 39-5 7-5 14-6 23H7c1-9 1-17-5-23 5-10 5-27 0-38C7 23 7 13 8 4Z",
  "M3 5C25 7 66 1 96 5l-3 87c-24-2-58 3-90-1C5 65 1 31 3 5Z",
  "M4 5C29 2 63 4 91 3l7 12-8 4c2 22 2 48 3 72-27 3-58 1-89 3C2 69 5 31 4 5Z",
  "M3 7C28 3 69 5 97 2c-2 28 3 60 0 92-26-2-66 3-94-1C1 66 4 31 3 7Z",
  "M2 5C29 4 69 6 98 3v88c-26 2-66-1-95 3C1 65 3 31 2 5Z",
  "M7 3C29 1 70 4 92 2c5 19 2 58 5 87-24 6-67 2-91 5C2 70 4 28 7 3Z",
] as const;

const tagFills = ["#bfebd9", "#d8c2f2", "#ffe58f", "#f7c3c5", "#c9d8ff", "#bce9df", "#ffd8dd", "#e1cff7"] as const;
const tagTransforms = ["-rotate-[0.6deg] px-3", "rotate-[0.35deg] px-3.5", "-rotate-[0.25deg] px-3", "rotate-[0.5deg] px-4", "-rotate-[0.35deg] px-3", "rotate-[0.2deg] px-4", "-rotate-[0.15deg] px-3", "rotate-[0.4deg] px-3.5"] as const;

function TechnologyPaperTag({ index, label }: { index: number; label: string }) {
  const variant = index % tagShapes.length;
  return (
    <li className={`relative isolate py-[5px] font-hand text-sm font-bold leading-none ${tagTransforms[variant]}`}>
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d={tagShapes[variant]} fill="#111" opacity=".3" transform={`translate(${1.4 + (variant % 3) * 0.35} ${3 + (variant % 2)})`} />
        <path d={tagShapes[variant]} fill={tagFills[variant]} stroke="#111" strokeLinejoin="round" strokeWidth="1.7" vectorEffect="non-scaling-stroke" />
      </svg>
      {label}
    </li>
  );
}

function CardDecoration({ variant }: { variant: Project["variant"] }) {
  if (variant === 1) {
    return <><span aria-hidden="true" className="absolute top-4 left-5 font-mono text-2xl font-black text-purple">&lt;/&gt;</span><Sparkle className="absolute right-4 bottom-5 w-8 rotate-12 text-purple" /></>;
  }
  if (variant === 2) {
    return <><Sparkle className="absolute top-3 left-4 w-7 -rotate-12 text-ink" /><PaperPlane className="absolute right-4 bottom-5 w-11 rotate-[-18deg]" /></>;
  }
  return <><span aria-hidden="true" className="absolute top-4 right-5 rotate-6 font-hand text-3xl">♫</span><svg aria-hidden="true" className="absolute right-4 bottom-5 h-8 w-24 text-purple" viewBox="0 0 100 30"><path d="M2 18h10l3-7 5 15 6-22 6 23 6-12 5 4h8l4-8 4 13 5-20 7 22 5-12 4 4h13" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg></>;
}

export function ProjectCard({ project }: { project: Project }) {
  const geometry = projectGeometry[project.variant];
  const content = (
    <>
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs><pattern height="6" id={`project-grain-${project.variant}`} patternUnits="userSpaceOnUse" width="7"><circle cx="2" cy="2" fill="#111" opacity=".065" r=".11" /><circle cx="5" cy="4.5" fill="#d4a84f" opacity=".1" r=".1" /></pattern></defs>
        <path d={geometry.path} fill={geometry.shadow} transform={`translate(${geometry.shadowX} ${geometry.shadowY})`} />
        <path d={geometry.path} fill="#fffdf5" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d={geometry.path} fill={`url(#project-grain-${project.variant})`} />
      </svg>
      <div className={`relative aspect-[16/9.2] w-full ${geometry.frameRotation}`}>
        <div className="absolute inset-[6px] overflow-hidden bg-[#1b1537]" style={{ clipPath: geometry.frameClip }}>
          <Image alt={project.imageAlt} className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none" fill sizes="(max-width: 639px) 84vw, (max-width: 1023px) 44vw, 390px" src={project.image} />
        </div>
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d={geometry.framePath} fill="#111" opacity=".26" transform="translate(.8 1.5)" />
          <path d={geometry.framePath} fill="none" stroke="#fff9e9" strokeWidth="5" vectorEffect="non-scaling-stroke" />
          <path d={geometry.framePath} fill="none" stroke="#111" strokeLinejoin="round" strokeWidth="2.1" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <h3 className={`mx-1 mt-4 mb-1 font-hand text-[clamp(1.4rem,2vw,1.75rem)] leading-none ${project.variant === 2 ? "ml-3" : project.variant === 3 ? "mt-3" : ""}`}>{project.title}</h3>
      <p className="mx-1 min-h-[44px] text-[0.98rem] leading-snug font-bold text-muted">{project.description}</p>
      <ul aria-label={`${project.title} technologies`} className="mx-1 mt-3 flex list-none flex-wrap gap-x-2.5 gap-y-2 p-0">
        {project.tags.map((tag, index) => <TechnologyPaperTag index={(project.variant - 1) * 3 + index} key={tag} label={tag} />)}
      </ul>
      <CardDecoration variant={project.variant} />
    </>
  );

  const classes = `group relative isolate block min-h-[420px] px-5 pt-5 pb-6 text-ink no-underline transition-[transform_200ms_ease] motion-safe:hover:-translate-y-[5px] motion-reduce:transition-none max-[600px]:min-h-[405px] max-[600px]:px-4 ${geometry.rotation}`;
  return project.url ? (
    <a aria-label={`View ${project.title} project (opens in a new tab)`} className={classes} href={project.url} rel="noopener noreferrer" target="_blank">{content}</a>
  ) : (
    <article className={classes}>{content}</article>
  );
}
