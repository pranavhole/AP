import { PaperPlane, Sparkle } from "@/components/illustrations/DoodleDecoration";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";

function FeaturedPaper() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <pattern height="4.4" id="featured-paper-grain" patternUnits="userSpaceOnUse" width="5.2">
          <circle cx="1" cy="1.4" fill="#b48734" opacity=".1" r=".1" />
          <circle cx="3.8" cy="3.5" fill="#111" opacity=".06" r=".09" />
        </pattern>
      </defs>
      <path d="M2.5 1.8C23 .3 43 1.5 62 .7c17.8-.7 29.8-.1 34.7 2.2 2.1 20 .8 42.3 1.7 65.7.6 16.3-.4 25.5-3.2 28.2-24.4 2.2-49.5-.2-77.3 1.2-9.8.5-14.2-.6-16-3.9C.5 69.6 1.7 38.5 1.1 12.2 1 6.4 1.5 3 2.5 1.8Z" fill="#c9ad67" opacity=".48" transform="translate(.45 1.05)" />
      <path d="M2.5 1.8C23 .3 43 1.5 62 .7c17.8-.7 29.8-.1 34.7 2.2 2.1 20 .8 42.3 1.7 65.7.6 16.3-.4 25.5-3.2 28.2-24.4 2.2-49.5-.2-77.3 1.2-9.8.5-14.2-.6-16-3.9C.5 69.6 1.7 38.5 1.1 12.2 1 6.4 1.5 3 2.5 1.8Z" fill="#fff9e9" stroke="#111" strokeLinejoin="round" strokeWidth="2.3" vectorEffect="non-scaling-stroke" />
      <path d="M2.5 1.8C23 .3 43 1.5 62 .7c17.8-.7 29.8-.1 34.7 2.2 2.1 20 .8 42.3 1.7 65.7.6 16.3-.4 25.5-3.2 28.2-24.4 2.2-49.5-.2-77.3 1.2-9.8.5-14.2-.6-16-3.9C.5 69.6 1.7 38.5 1.1 12.2 1 6.4 1.5 3 2.5 1.8Z" fill="url(#featured-paper-grain)" />
    </svg>
  );
}

function ViewAllSticker() {
  const className = "group relative isolate flex w-fit -rotate-[0.7deg] items-center px-5 py-2.5 font-hand text-lg font-bold text-ink no-underline transition-transform hover:-translate-y-0.5 hover:rotate-0";
  const paper = <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><pattern height="10" id="view-all-grain" patternUnits="userSpaceOnUse" width="12"><circle cx="3" cy="4" fill="#aa7b19" opacity=".14" r=".15" /></pattern></defs><path d="M6 5C28 2 70 5 94 3c3 21 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="#7653d8" transform="translate(2.5 7)" /><path d="M6 5C28 2 70 5 94 3c3 21 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="#ffe9a0" stroke="#111" strokeLinejoin="round" strokeWidth="2" vectorEffect="non-scaling-stroke" /><path d="M6 5C28 2 70 5 94 3c3 21 .5 59 2 88-23 5-65 1-91 4C1 73 4 29 6 5Z" fill="url(#view-all-grain)" /></svg>;
  return siteConfig.viewAllProjectsUrl ? (
    <a className={className} href={siteConfig.viewAllProjectsUrl} rel="noopener noreferrer" target="_blank">{paper}View All →</a>
  ) : (
    <span aria-disabled="true" className={`${className} opacity-80`} role="link">{paper}View All →</span>
  );
}

export function FeaturedWork() {
  return (
    <section className="relative bg-cream py-7 [background-image:url('/doodles/paper-grain.svg')] [background-size:180px_180px] max-[600px]:py-5" id="work">
      <div className="relative isolate mx-auto w-[calc(100%_-_40px)] max-w-[1480px] px-12 pt-[74px] pb-[66px] max-md:w-[calc(100%_-_28px)] max-md:px-5 max-[600px]:pt-16 max-[600px]:pb-12">
        <FeaturedPaper />
        <div className="relative mb-14 flex items-center justify-center max-[600px]:mb-10 max-[600px]:grid max-[600px]:justify-items-center max-[600px]:gap-7">
          <div className="relative -translate-x-3 -rotate-[0.2deg] max-[600px]:translate-x-0">
            <h2 className="relative z-[1] font-hand text-[clamp(2.5rem,4vw,3.7rem)] leading-none">Featured Work</h2>
            <svg aria-hidden="true" className="absolute -right-4 -bottom-6 -left-3 h-8 w-[calc(100%+28px)]" preserveAspectRatio="none" viewBox="0 0 100 22"><path d="M2 8C31 13 62 4 98 8M8 14c25 3 53-4 85-1" fill="none" stroke="#f4c13e" strokeLinecap="round" strokeWidth="4" /><path d="M62 18c12-2 22-1 34-3" fill="none" stroke="#7653d8" strokeLinecap="round" strokeWidth="3.2" /></svg>
            <span aria-hidden="true" className="absolute -top-7 -right-12 rotate-12 font-hand text-5xl text-purple">〽</span>
          </div>
          <div className="absolute right-2 max-[600px]:static max-[600px]:justify-self-end"><ViewAllSticker /></div>
        </div>

        <div className="pointer-events-none absolute top-5 left-5 h-10 w-28 -rotate-[13deg] border-2 border-ink bg-[#ffd5dd] opacity-90 [clip-path:polygon(4%_12%,96%_0,100%_84%,92%_100%,4%_91%,0_18%)] [background-image:linear-gradient(90deg,transparent_20%,#db4772_21%,#db4772_24%,transparent_25%),linear-gradient(0deg,transparent_20%,#db4772_21%,#db4772_24%,transparent_25%)] [background-size:19px_19px] max-[700px]:h-8 max-[700px]:w-20" />
        <Sparkle className="absolute top-32 left-[7%] w-8 -rotate-12 text-ink max-[700px]:top-24 max-[700px]:left-5" />
        <Sparkle className="absolute top-24 left-[17%] w-9 rotate-6 text-[#e9476e] max-[800px]:hidden" />
        <Sparkle className="absolute top-36 left-[27%] w-7 text-purple max-[800px]:hidden" />
        <PaperPlane className="absolute top-10 right-4 w-20 -rotate-6 max-[700px]:top-28 max-[700px]:right-5 max-[700px]:w-14" />
        <svg aria-hidden="true" className="absolute top-24 right-[5%] h-20 w-44 max-[800px]:hidden" viewBox="0 0 180 80"><path d="M4 59c31-36 52 12 79-10 18-15-5-32 10-37 17-5 14 31 39 25 18-4 27-17 43-25" fill="none" stroke="#111" strokeDasharray="7 8" strokeLinecap="round" strokeWidth="2.5" /><path d="m10 50-7 10 12 1" fill="none" stroke="#111" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>

        <ProjectCarousel>
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </ProjectCarousel>

        <svg aria-hidden="true" className="absolute bottom-8 left-[24%] h-10 w-28 text-[#df5574] max-[700px]:hidden" viewBox="0 0 110 40"><path d="M3 25c14-13 22 7 36-5 10-9 6-22 14-20 11 3 1 26 15 23 10-2 11-18 19-15 7 3 1 18 19 9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" /></svg>
        <div className="pointer-events-none absolute right-4 bottom-3 h-9 w-24 rotate-[9deg] border-2 border-ink bg-[#d9c6f3] [clip-path:polygon(4%_10%,96%_0,100%_84%,91%_100%,3%_91%,0_18%)] [background-image:linear-gradient(90deg,transparent_21%,#8d6ac0_22%,#8d6ac0_25%,transparent_26%),linear-gradient(0deg,transparent_21%,#8d6ac0_22%,#8d6ac0_25%,transparent_26%)] [background-size:18px_18px] max-[700px]:hidden" />
      </div>
    </section>
  );
}
