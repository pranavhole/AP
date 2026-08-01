import { ArrowRight } from "lucide-react";

import { HeroArtwork } from "@/components/illustrations/HeroArtwork";
import { RoughButton } from "@/components/ui/RoughButton";
import { ScribbleUnderline } from "@/components/ui/ScribbleUnderline";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";

import styles from "./HeroSection.module.css";

export function HeroSection() {
  const hero = pageContent.hero;

  return (
    <section className={`${styles.hero} paper-texture`} id="home">
      <div aria-hidden="true" className={styles.mintEdge} />
      <div className={`${styles.inner} section-inner`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1>
            <span>{hero.headingLines[0]}</span>
            <span>{hero.headingLines[1]}</span>
            <span>
              {hero.headingLines[2]}{" "}
              <span className={styles.work}>
                <mark>{hero.highlightedWord}</mark>
                <ScribbleUnderline />
              </span>
            </span>
          </h1>
          <p className={styles.support}>{hero.support}</p>
          <div className={styles.actions}>
            <RoughButton href={contactLinks.startProject}>
              Start Your Project <ArrowRight aria-hidden="true" size={20} />
            </RoughButton>
            <RoughButton href="#work" variant="paper">
              View My Work
            </RoughButton>
          </div>
        </div>
        <HeroArtwork />
      </div>
    </section>
  );
}
