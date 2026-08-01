import type { ReactNode } from "react";

import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  children: ReactNode;
  decoration?: ReactNode;
};

export function SectionHeading({
  children,
  decoration,
}: SectionHeadingProps) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>{children}</h2>
      <span aria-hidden="true" className={styles.marker} />
      {decoration ? (
        <span className={styles.decoration}>{decoration}</span>
      ) : null}
    </div>
  );
}
