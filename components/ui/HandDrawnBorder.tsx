import {
  createHandDrawnBorder,
  type HandDrawnBorderStrength,
} from "@/lib/create-hand-drawn-border";

import styles from "./HandDrawnBorder.module.css";

export function HandDrawnBorder({
  seed,
  strength = "regular",
}: {
  seed: string;
  strength?: HandDrawnBorderStrength;
}) {
  const geometry = createHandDrawnBorder(seed, strength);

  return (
    <svg
      aria-hidden="true"
      className={`${styles.border} ${styles[strength]}`}
      data-hand-drawn-seed={seed}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        className={styles.echo}
        d={geometry.path}
        strokeWidth={geometry.strokeWidth * 0.58}
        transform="translate(0.28 -0.2)"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={geometry.path}
        strokeWidth={geometry.strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
