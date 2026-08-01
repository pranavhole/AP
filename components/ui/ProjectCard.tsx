import Image from "next/image";

import type { Project } from "@/types/content";

import styles from "./ProjectCard.module.css";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className={styles.imageWrap}>
        <Image
          alt={project.imageAlt}
          fill
          sizes="(max-width: 767px) 88vw, (max-width: 1200px) 31vw, 390px"
          src={project.image}
        />
      </div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul aria-label={`${project.title} technologies`}>
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </>
  );
  const classes = `${styles.card} ${styles[`variant${project.variant}`]}`;

  return project.url ? (
    <a
      aria-label={`View ${project.title} project (opens in a new tab)`}
      className={classes}
      href={project.url}
      rel="noopener noreferrer"
      target="_blank"
    >
      {content}
    </a>
  ) : (
    <article className={classes}>{content}</article>
  );
}
