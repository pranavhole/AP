import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { trustItems } from "@/data/trust";

import styles from "./TrustStrip.module.css";

export function TrustStrip() {
  return (
    <section aria-label="Client commitments" className={styles.strip}>
      <div className={`${styles.inner} section-inner`}>
        {trustItems.map((item) => (
          <div
            className={`${styles.item} ${styles[`variant${item.variant}`]}`}
            key={item.label}
          >
            <span className={`${styles.icon} ${styles[item.tone]}`}>
              <SketchIcon name={item.icon} />
            </span>
            <strong>{item.label}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
