import { CalendarDays } from "lucide-react";

import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";

import styles from "./CTASection.module.css";

export function CTASection() {
  const contact = pageContent.contact;

  return (
    <section className={styles.section} id="contact">
      <div className={`${styles.inner} section-inner`}>
        <div>
          <h2>
            {contact.headingStart} <mark>{contact.highlightedWord}</mark>{" "}
            {contact.headingEnd}
          </h2>
          <p>{contact.body}</p>
        </div>

        <HandDrawnArrow className={styles.arrow} />

        <div className={styles.action}>
          <RoughButton
            borderSeed="button-schedule-call"
            href={contactLinks.scheduleCall}
          >
            Schedule a Call
            <CalendarDays aria-hidden="true" size={19} />
          </RoughButton>
          <span aria-hidden="true" className={styles.lines}>
            〽
          </span>
        </div>
      </div>
    </section>
  );
}
