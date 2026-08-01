import { ArrowRight } from "lucide-react";

import { PaperPlane } from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";
import type { CardVariant, Tone } from "@/types/content";

import styles from "./ServicesSection.module.css";

type ServiceTone = Extract<Tone, "yellow" | "mint" | "pink" | "lavender">;

const toneClasses: Record<ServiceTone, string> = {
  yellow: styles.yellow,
  mint: styles.mint,
  pink: styles.pink,
  lavender: styles.lavender,
};

const variantClasses: Record<CardVariant, string> = {
  1: styles.variant1,
  2: styles.variant2,
  3: styles.variant3,
  4: styles.variant4,
};

function isServiceTone(tone: Tone): tone is ServiceTone {
  return tone in toneClasses;
}

export function ServicesSection() {
  return (
    <section className={styles.section} id="services">
      <div className="section-inner">
        <SectionHeading decoration={<span>〽</span>}>
          Services I Offer
        </SectionHeading>
        <PaperPlane className={styles.plane} />
        <div className={styles.grid}>
          {services.map((service) => {
            const toneClass = isServiceTone(service.tone)
              ? toneClasses[service.tone]
              : styles.yellow;

            return (
              <article
                className={`${styles.card} ${toneClass} ${variantClasses[service.variant]}`}
                key={service.title}
              >
                <span className={styles.icon}>
                  <SketchIcon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span aria-hidden="true" className={styles.arrow}>
                  <ArrowRight size={22} strokeWidth={2.6} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
