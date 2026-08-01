import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import type { CardVariant, ProcessTone } from "@/types/content";

import styles from "./ProcessSection.module.css";

const toneClasses: Record<ProcessTone, string> = {
  yellow: styles.yellow,
  mint: styles.mint,
  pink: styles.pink,
};

const variantClasses: Record<CardVariant, string> = {
  1: styles.variant1,
  2: styles.variant2,
  3: styles.variant3,
  4: styles.variant4,
};

export function ProcessSection() {
  return (
    <section className={styles.section} id="process">
      <div className="section-inner">
        <SectionHeading>How We Work</SectionHeading>
        <ol className={styles.steps} role="list">
          {processSteps.map((step, index) => (
            <li
              className={`${styles.step} ${variantClasses[step.variant]}`}
              key={step.title}
            >
              <Reveal delay={index * 0.08}>
                <span className={`${styles.icon} ${toneClasses[step.tone]}`}>
                  <SketchIcon name={step.icon} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < processSteps.length - 1 ? (
                  <HandDrawnArrow className={styles.connector} />
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
