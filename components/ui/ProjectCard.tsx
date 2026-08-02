import Image from "next/image";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { Project } from "@/types/content";

const variantClasses = {
  1: "[--card-shadow:#a3d7c5] [rotate:-0.35deg] max-md:[rotate:0deg]",
  2: "[--card-shadow:#d6bd72] [rotate:0.3deg] max-md:[rotate:0deg]",
  3: "[--card-shadow:#b99bdb] [rotate:-0.2deg] max-md:[rotate:0deg]",
} as const;

export function ProjectCard({ project }: { project: Project }) {
  const cardSeed = `project-${project.slug}`;
  const imageSeed = `${cardSeed}-image`;
  const cardStyle = handDrawnBorderStyle(cardSeed, "bold");
  const content = (
    <>
      <div
        className="relative aspect-[16/8.6] w-full overflow-hidden rounded-[var(--hand-radius)] border-2 border-transparent bg-[#1b1537]"
        style={handDrawnBorderStyle(imageSeed, "subtle")}
      >
        <Image
          alt={project.imageAlt}
          className="object-cover transition-[scale_260ms_ease] group-hover:scale-[1.025] group-focus-visible:scale-[1.025]"
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1200px) 31vw, 390px"
          src={project.image}
        />
        <HandDrawnBorder seed={imageSeed} strength="subtle" />
      </div>
      <h3 className="mx-0.5 mt-[13px] mb-1 font-hand text-[1.55rem] leading-none">
        {project.title}
      </h3>
      <p className="mx-0.5 my-0 font-bold text-muted">
        {project.description}
      </p>
      <ul
        aria-label={`${project.title} technologies`}
        className="mx-0.5 mt-[13px] mb-0 flex list-none flex-wrap gap-[7px] p-0"
      >
        {project.tags.map((tag) => (
          <li
            className="rounded-[999px_999px_999px_84%] border-[1.5px] border-ink bg-mint px-[9px] py-[3px] text-xs font-black even:bg-lavender"
            key={tag}
          >
            {tag}
          </li>
        ))}
      </ul>
      <HandDrawnBorder seed={cardSeed} strength="bold" />
    </>
  );
  const classes = `relative block h-full rounded-[var(--hand-radius)] border-[2.5px] border-transparent bg-[#fffef9] px-3 pt-3 pb-[15px] text-ink no-underline shadow-[var(--hand-shadow-x)_var(--hand-shadow-y)_0_var(--card-shadow)] transition-[translate_180ms_ease,rotate_180ms_ease,box-shadow_180ms_ease] ${variantClasses[project.variant]}`;

  return project.url ? (
    <a
      aria-label={`View ${project.title} project (opens in a new tab)`}
      className={`${classes} group hover:[rotate:0deg] hover:[translate:0_-4px] hover:shadow-[6px_7px_0_rgb(17_17_17_/_16%)] focus-visible:[rotate:0deg] focus-visible:[translate:0_-4px] focus-visible:shadow-[6px_7px_0_rgb(17_17_17_/_16%)]`}
      href={project.url}
      rel="noopener noreferrer"
      style={cardStyle}
      target="_blank"
    >
      {content}
    </a>
  ) : (
    <article className={classes} style={cardStyle}>
      {content}
    </article>
  );
}
