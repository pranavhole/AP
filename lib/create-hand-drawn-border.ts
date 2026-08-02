import type { CSSProperties } from "react";

export type HandDrawnBorderStrength = "subtle" | "regular" | "bold";

export type HandDrawnBorderGeometry = {
  path: string;
  radius: string;
  shadowX: number;
  shadowY: number;
  strokeWidth: number;
};

type HandDrawnBorderVariables = CSSProperties & {
  "--hand-radius": string;
  "--hand-shadow-x": string;
  "--hand-shadow-y": string;
};

const amplitudes: Record<
  HandDrawnBorderStrength,
  { x: number; y: number }
> = {
  subtle: { x: 0.1, y: 0.3 },
  regular: { x: 0.18, y: 0.5 },
  bold: { x: 0.28, y: 0.75 },
};

const borderInset = 2;

function hashSeed(seed: string) {
  let hash = 2166136261;

  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed;

  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

const tidy = (value: number) => Number(value.toFixed(2));

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(maximum, Math.max(minimum, value));

export function createHandDrawnBorder(
  seed: string,
  strength: HandDrawnBorderStrength = "regular",
): HandDrawnBorderGeometry {
  const random = createSeededRandom(hashSeed(seed));
  const amplitude = amplitudes[strength];
  const edgeX = 0.2;
  const edgeY = 0.55;
  const pathEdgeX = edgeX + amplitude.x;
  const pathEdgeY = edgeY + amplitude.y;
  const jitterX = () => (random() * 2 - 1) * amplitude.x;
  const jitterY = () => (random() * 2 - 1) * amplitude.y;
  const x = (value: number) =>
    tidy(clamp(value + jitterX(), edgeX, 100 - edgeX));
  const y = (value: number) =>
    tidy(clamp(value + jitterY(), edgeY, 100 - edgeY));
  const cornerX = () => tidy(1.2 + random() * 0.9);
  const cornerY = () => tidy(3.2 + random() * 2.4);
  const topLeft = { x: cornerX(), y: cornerY() };
  const topRight = { x: cornerX(), y: cornerY() };
  const bottomRight = { x: cornerX(), y: cornerY() };
  const bottomLeft = { x: cornerX(), y: cornerY() };
  const topY = y(pathEdgeY);
  const rightX = x(100 - pathEdgeX);
  const bottomY = y(100 - pathEdgeY);
  const leftX = x(pathEdgeX);

  const path = [
    `M ${topLeft.x} ${topY}`,
    `C ${x(29)} ${y(pathEdgeY)}, ${x(69)} ${y(pathEdgeY)}, ${tidy(100 - topRight.x)} ${y(pathEdgeY)}`,
    `Q ${x(100 - pathEdgeX)} ${y(pathEdgeY)}, ${rightX} ${topRight.y}`,
    `C ${x(100 - pathEdgeX)} ${y(31)}, ${x(100 - pathEdgeX)} ${y(70)}, ${x(100 - pathEdgeX)} ${tidy(100 - bottomRight.y)}`,
    `Q ${x(100 - pathEdgeX)} ${y(100 - pathEdgeY)}, ${tidy(100 - bottomRight.x)} ${bottomY}`,
    `C ${x(70)} ${y(100 - pathEdgeY)}, ${x(31)} ${y(100 - pathEdgeY)}, ${bottomLeft.x} ${y(100 - pathEdgeY)}`,
    `Q ${x(pathEdgeX)} ${y(100 - pathEdgeY)}, ${leftX} ${tidy(100 - bottomLeft.y)}`,
    `C ${x(pathEdgeX)} ${y(70)}, ${x(pathEdgeX)} ${y(31)}, ${x(pathEdgeX)} ${topLeft.y}`,
    `Q ${x(pathEdgeX)} ${y(pathEdgeY)}, ${topLeft.x} ${topY}`,
    "Z",
  ].join(" ");

  const radiusValue = (value: number) =>
    `calc(${borderInset}px + ${value}%)`;
  const horizontalRadii = [topLeft, topRight, bottomRight, bottomLeft]
    .map((corner) => radiusValue(corner.x))
    .join(" ");
  const verticalRadii = [topLeft, topRight, bottomRight, bottomLeft]
    .map((corner) => radiusValue(corner.y))
    .join(" ");
  const shadowDirection = random() > 0.22 ? 1 : -1;

  return {
    path,
    radius: `${horizontalRadii} / ${verticalRadii}`,
    shadowX: shadowDirection * Math.round(3 + random() * 3),
    shadowY: Math.round(4 + random() * 3),
    strokeWidth: tidy(2.15 + random() * 0.65),
  };
}

export function handDrawnBorderStyle(
  seed: string,
  strength: HandDrawnBorderStrength = "regular",
): HandDrawnBorderVariables {
  const geometry = createHandDrawnBorder(seed, strength);

  return {
    "--hand-radius": geometry.radius,
    "--hand-shadow-x": `${geometry.shadowX}px`,
    "--hand-shadow-y": `${geometry.shadowY}px`,
  };
}
