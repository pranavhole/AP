import Image from "next/image";

import { HandDrawnBorder } from "@/components/ui/HandDrawnBorder";
import { handDrawnBorderStyle } from "@/lib/create-hand-drawn-border";
import type { Project } from "@/types/content";

import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const cardSeed = `project-${project.slug}`;
  const imageSeed = `${cardSeed}-image`;
  const cardStyle = handDrawnBorderStyle(cardSeed, "bold");
  const content = (
    <>
      <div
        className={styles.imageWrap}
        style={handDrawnBorderStyle(imageSeed, "subtle")}
      >
        <Image
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1200px) 31vw, 390px"
          src={project.image}
        />
        <HandDrawnBorder seed={imageSeed} strength="subtle" />
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <HandDrawnBorder seed={cardSeed} strength="bold" />
    </>
  );
  const classes = `${styles.card} ${styles[`variant${project.variant}`]}`;

  return project.url ? (
    <a
      aria-label={`View ${project.title} project (opens in a new tab)`}
      className={classes}
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
