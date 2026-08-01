import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  return (
    <section className={styles.section} id="work">
      <div className="section-inner">
        <div className={styles.headingRow}>
          <SectionHeading>Featured Work</SectionHeading>
          {siteConfig.viewAllProjectsUrl ? (
            <a
              className={styles.viewAll}
              href={siteConfig.viewAllProjectsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View All <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className={`${styles.viewAll} ${styles.viewAllDisabled}`}
            >
              View All <span aria-hidden="true">→</span>
            </span>
          )}
        </div>
        <ProjectCarousel>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </ProjectCarousel>
      </div>
    </section>
  );
}
