import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import type { CardVariant, Tone } from "@/types/content";

import styles from "./ProcessSection.module.css";

type ProcessTone = Extract<Tone, "yellow" | "mint" | "pink">;

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

function isProcessTone(tone: Tone): tone is ProcessTone {
  return tone in toneClasses;
}

export function ProcessSection() {
  return (
    <section className={`${styles.section} paper-texture`} id="process">
      <div className="section-inner">
        <SectionHeading>How We Work</SectionHeading>
        <ol className={styles.steps}>
          {processSteps.map((step, index) => {
            const toneClass = isProcessTone(step.tone)
              ? toneClasses[step.tone]
              : styles.yellow;

            return (
              <li
                className={`${styles.step} ${variantClasses[step.variant]}`}
                key={step.title}
              >
                <span className={`${styles.icon} ${toneClass}`}>
                  <SketchIcon name={step.icon} />
                </span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                {index < processSteps.length - 1 ? (
                  <HandDrawnArrow className={styles.connector} />
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
