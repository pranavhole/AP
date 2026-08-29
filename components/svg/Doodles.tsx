import React from "react";

export function Sparkle({
  className = "w-6 h-6 text-ink",
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={color ?? "currentColor"}
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2C12.8 7.5 16.5 11.2 22 12C16.5 12.8 12.8 16.5 12 22C11.2 16.5 7.5 12.8 2 12C7.5 11.2 11.2 7.5 12 2Z"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function StarDoodle({
  className = "w-6 h-6 text-pastel-yellow",
  points = 4,
}: {
  className?: string;
  points?: 4 | 5;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      {points === 4 ? (
        <path
          d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <path
          d="M12 2 L15 8.5 L22 9.3 L17 14.2 L18.2 21.2 L12 17.8 L5.8 21.2 L7 14.2 L2 9.3 L9 8.5 Z"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

export function Squiggle({ className = "w-12 h-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 80 24"
    >
      <path
        d="M4 12 C 16 3, 28 21, 40 12 C 52 3, 64 21, 76 12"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function UnderlineStroke({
  className = "w-full h-4",
  color = "#F9E37D",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      preserveAspectRatio="none"
      viewBox="0 0 200 20"
    >
      <path
        d="M3 10 C 50 16, 120 4, 197 11 M15 15 C 75 18, 145 10, 185 13"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeWidth="5"
      />
    </svg>
  );
}

export function CurvedArrow({
  className = "w-16 h-12",
  direction = "right",
}: {
  className?: string;
  direction?: "left" | "right" | "down";
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 64 48"
    >
      {direction === "right" && (
        <path
          d="M6 38 C 18 10, 42 8, 56 22 M 42 22 L 56 22 L 52 10"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {direction === "left" && (
        <path
          d="M58 38 C 46 10, 22 8, 8 22 M 22 22 L 8 22 L 12 10"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      )}
      {direction === "down" && (
        <path
          d="M10 6 C 14 26, 38 34, 46 42 M 34 42 L 46 42 L 46 30"
          stroke="#17172A"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

export function EmphasisLines({
  className = "w-8 h-8",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M6 24 C 8 18, 9 12, 10 6 M 16 26 C 17 19, 17 12, 18 4 M 26 24 C 24 17, 23 11, 22 6"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function HalftoneDots({
  className = "w-24 h-24",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="#17172A"
      opacity="0.18"
      viewBox="0 0 80 80"
    >
      <circle cx="10" cy="10" r="1.5" />
      <circle cx="25" cy="10" r="1.8" />
      <circle cx="40" cy="10" r="2.2" />
      <circle cx="55" cy="10" r="2.6" />
      <circle cx="70" cy="10" r="3" />
      <circle cx="10" cy="25" r="1.8" />
      <circle cx="25" cy="25" r="2.2" />
      <circle cx="40" cy="25" r="2.6" />
      <circle cx="55" cy="25" r="3" />
      <circle cx="70" cy="25" r="3.4" />
      <circle cx="10" cy="40" r="2.2" />
      <circle cx="25" cy="40" r="2.6" />
      <circle cx="40" cy="40" r="3" />
      <circle cx="55" cy="40" r="3.4" />
      <circle cx="70" cy="40" r="3.8" />
      <circle cx="10" cy="55" r="2.6" />
      <circle cx="25" cy="55" r="3" />
      <circle cx="40" cy="55" r="3.4" />
      <circle cx="55" cy="55" r="3.8" />
      <circle cx="70" cy="55" r="4.2" />
      <circle cx="10" cy="70" r="3" />
      <circle cx="25" cy="70" r="3.4" />
      <circle cx="40" cy="70" r="3.8" />
      <circle cx="55" cy="70" r="4.2" />
      <circle cx="70" cy="70" r="4.6" />
    </svg>
  );
}

export function PaperPlaneDoodle({
  className = "w-20 h-16",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 120 80"
    >
      {/* Flight trail */}
      <path
        d="M6 72 C 30 68, 48 40, 32 24 C 20 12, 14 36, 36 46 C 54 54, 76 44, 82 36"
        fill="none"
        stroke="#17172A"
        strokeDasharray="5 6"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      {/* Paper airplane body */}
      <g transform="translate(68, 12)">
        <polygon
          points="0,28 42,0 34,36"
          fill="#FFF8E8"
          stroke="#17172A"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <polygon
          points="0,28 42,0 18,22"
          fill="#FFF0B0"
          stroke="#17172A"
          strokeLinejoin="round"
          strokeWidth="2.2"
        />
        <polygon
          points="18,22 42,0 24,30"
          fill="#F6B8B8"
          stroke="#17172A"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </g>
    </svg>
  );
}

