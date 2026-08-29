import React from "react";

export type WavyDividerVariant =
  | "gentle"
  | "paper"
  | "sketch"
  | "soft"
  | "asymmetric";

const wavePaths: Record<WavyDividerVariant, string> = {
  // Gentle dip and rise
  gentle:
    "M 0,22 C 220,38 420,12 680,30 C 920,44 1160,16 1440,26 L 1440,60 L 0,60 Z",
  // Sketchy paper edge with slight jitter
  paper:
    "M 0,24 C 180,14 360,34 540,20 C 720,36 900,16 1080,32 C 1260,18 1380,28 1440,22 L 1440,60 L 0,60 Z",
  // Hand-drawn sketch line with subtle peaks
  sketch:
    "M 0,20 C 160,32 320,15 480,28 C 640,38 800,18 960,32 C 1120,42 1280,18 1440,25 L 1440,60 L 0,60 Z",
  // Soft irregular undulation
  soft:
    "M 0,26 C 240,16 480,36 720,22 C 960,36 1200,18 1440,28 L 1440,60 L 0,60 Z",
  // Asymmetric rise towards right
  asymmetric:
    "M 0,18 C 300,34 600,12 900,38 C 1100,22 1300,32 1440,16 L 1440,60 L 0,60 Z",
};

const waveStrokes: Record<WavyDividerVariant, string> = {
  gentle:
    "M 0,22 C 220,38 420,12 680,30 C 920,44 1160,16 1440,26",
  paper:
    "M 0,24 C 180,14 360,34 540,20 C 720,36 900,16 1080,32 C 1260,18 1380,28 1440,22",
  sketch:
    "M 0,20 C 160,32 320,15 480,28 C 640,38 800,18 960,32 C 1120,42 1280,18 1440,25",
  soft:
    "M 0,26 C 240,16 480,36 720,22 C 960,36 1200,18 1440,28",
  asymmetric:
    "M 0,18 C 300,34 600,12 900,38 C 1100,22 1300,32 1440,16",
};

export function WavyDivider({
  topColor = "transparent",
  bottomColor = "#CFEBD8",
  variant = "paper",
  height = 36,
  flip = false,
  className = "w-full overflow-hidden leading-none select-none",
}: {
  topColor?: string;
  bottomColor?: string;
  variant?: WavyDividerVariant;
  height?: number;
  flip?: boolean;
  className?: string;
}) {
  const fillPath = wavePaths[variant];
  const strokePath = waveStrokes[variant];

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        backgroundColor: topColor,
        height: `${height}px`,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
    >
      <svg
        className="block h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 1440 60"
      >
        {/* Bottom Fill Shape */}
        <path d={fillPath} fill={bottomColor} />
        {/* Hand-drawn Ink Stroke on Boundary */}
        <path
          d={strokePath}
          fill="none"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Subtle Double Line Trace */}
        <path
          d={strokePath}
          fill="none"
          opacity="0.2"
          stroke="#17172A"
          strokeDasharray="4 6"
          strokeWidth="1"
          transform="translate(0, 1.2)"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function WavyTop({
  fill = "#F6B8B8",
  className = "w-full",
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <WavyDivider
      bottomColor="transparent"
      className={className}
      flip
      topColor={fill}
      variant="gentle"
    />
  );
}

export function WavyBottom({
  fill = "#F6B8B8",
  className = "w-full",
}: {
  fill?: string;
  className?: string;
}) {
  return (
    <WavyDivider
      bottomColor={fill}
      className={className}
      topColor="transparent"
      variant="paper"
    />
  );
}
