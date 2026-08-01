import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { GridDoodle } from "@/components/illustrations/DoodleDecoration";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";

import styles from "./AboutBanner.module.css";

export function AboutBanner() {
  return (
    <section className={styles.section} id="about">
      <div className={`${styles.banner} section-inner paper-texture`}>
        <div className={styles.character}>
          <Image
            alt="Illustrated developer with curly hair, round glasses, and a purple hoodie"
            fill
            sizes="(max-width: 600px) 180px, (max-width: 900px) 190px, 260px"
            src="/images/developer-about.png"
          />
        </div>

        <div className={styles.copy}>
          <h2>{pageContent.about.heading}</h2>
          <p>{pageContent.about.body}</p>
        </div>

        <RoughButton
          className={styles.cta}
          href={contactLinks.buildTogether}
          variant="yellow"
        >
          Let&apos;s Build Together
          <ArrowRight aria-hidden="true" size={20} />
        </RoughButton>

        <GridDoodle className={styles.grid} />
      </div>
    </section>
  );
}
