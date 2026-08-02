import {
  createHandDrawnBorder,
  type HandDrawnBorderStrength,
} from "@/lib/create-hand-drawn-border";

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
  const echoOpacity = {
    subtle: "opacity-10",
    regular: "opacity-[0.18]",
    bold: "opacity-25",
  }[strength];

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0.5 z-[3] h-[calc(100%_-_4px)] w-[calc(100%_-_4px)] overflow-visible"
      data-hand-drawn-seed={seed}
      focusable="false"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <path
        className={`${echoOpacity} fill-none stroke-ink [stroke-linecap:round] [stroke-linejoin:round]`}
        d={echoGeometry.path}
        strokeWidth={echoStrokeWidth}
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="fill-none stroke-ink [stroke-linecap:round] [stroke-linejoin:round]"
        d={geometry.path}
        strokeWidth={geometry.strokeWidth}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
