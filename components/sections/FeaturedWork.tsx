import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

const viewAllClasses =
  "border-b-2 border-ink font-hand text-[1.15rem] font-extrabold leading-[1.3] text-ink no-underline transition-colors hover:border-purple hover:text-purple focus-visible:text-purple";

export function FeaturedWork() {
  return (
    <section
      className="bg-cream pt-[78px] pb-[84px] max-[600px]:pt-16 max-[600px]:pb-[70px]"
      id="work"
    >
      <div className="mx-auto w-[calc(100%_-_40px)] max-w-[1280px] max-md:w-[calc(100%_-_28px)]">
        <div className="relative mb-[52px] flex items-center justify-center max-[600px]:mb-[34px] max-[600px]:grid max-[600px]:justify-items-center max-[600px]:gap-6">
          <SectionHeading>Featured Work</SectionHeading>
          {siteConfig.viewAllProjectsUrl ? (
            <a
              className={`absolute right-0 max-[600px]:static max-[600px]:justify-self-end ${viewAllClasses}`}
              href={siteConfig.viewAllProjectsUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              View All <span aria-hidden="true">→</span>
            </a>
          ) : (
            <span
              aria-disabled="true"
              className={`absolute right-0 opacity-70 max-[600px]:static max-[600px]:justify-self-end ${viewAllClasses}`}
              role="link"
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
