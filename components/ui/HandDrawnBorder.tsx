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
  const echoGeometry = createHandDrawnBorder(`${seed}:echo`, strength);
  const echoStrokeWidth = Number(
    (echoGeometry.strokeWidth * 0.58).toFixed(2),
  );
  const strengthClass = strength === "regular" ? "" : styles[strength];

  return (
    <svg
      aria-hidden="true"
      className={`${styles.border} ${strengthClass}`.trim()}
      data-hand-drawn-seed={seed}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        className={styles.echo}
        d={echoGeometry.path}
        strokeWidth={echoStrokeWidth}
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
