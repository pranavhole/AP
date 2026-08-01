export function WavyDivider({
  fill,
  flip = false,
  className = "",
}: {
  fill: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
      style={{ rotate: flip ? "180deg" : undefined }}
      viewBox="0 0 1440 32"
    >
      <path
        d="M0 15 C120 32 220 2 350 16 C510 33 620 5 760 18 C920 31 1040 3 1180 17 C1290 27 1365 11 1440 14 V32 H0 Z"
        fill={fill}
        stroke="var(--ink)"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
