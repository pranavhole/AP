import type { SketchIconName } from "@/types/content";

function IconPaths({ name }: { name: SketchIconName }) {
  switch (name) {
    case "laptop":
      return (
        <>
          <path d="M5 7.5 6 6h20l1 1.5v14H5Z" />
          <path d="m2.5 24.5 3 2h21l3-2M12 12l-3 3 3 3m7-6 3 3-3 3m-3.5-7-2 8" />
        </>
      );
    case "phone":
      return (
        <>
          <path d="M10 3.5 11.5 2h11L24 3.5v25L22.5 30h-11L10 28.5Z" />
          <path d="M15 5h4m-3 21.5h2" />
        </>
      );
    case "robot":
      return (
        <>
          <path d="M9 10h14l2 2v11l-2 2H9l-2-2V12Z" />
          <path d="M16 10V6m-2-2h4M11 17h2m6 0h2m-8 5h6M4 15H2m28 0h-2" />
        </>
      );
    case "cloud":
      return (
        <>
          <path d="M8 24h16c7 0 7-9 1-10-1-7-12-8-15-2-7-1-9 9-2 12Z" />
          <path d="m12 27-2 3m7-3-2 3m7-3-2 3" />
        </>
      );
    case "lightbulb":
      return (
        <>
          <path d="M10 15a7 7 0 1 1 12 5c-2 2-2 3-2 5h-8c0-2 0-3-2-5a7 7 0 0 1 0-5Z" />
          <path d="M12 28h8m-7 3h6M16 1v3M4 8l3 2m21-2-3 2" />
        </>
      );
    case "wireframe":
      return (
        <>
          <path d="M3 5h26v23H3Z" />
          <path d="M3 10h26M7 7h.1m4 0h.1M7 15h8v8H7Zm12 0h6m-6 4h6m-6 4h4" />
        </>
      );
    case "rocket":
      return (
        <>
          <path d="M12 21c-3-1-5-1-7 0 1-4 3-6 6-7 2-7 8-11 16-11 0 8-4 14-11 16-1 3-3 5-7 6 1-2 1-4 0-7" />
          <circle cx="20" cy="10" r="2.5" />
          <path d="m12 22-4 7m8-10 3 6" />
        </>
      );
    case "growth":
      return (
        <>
          <path d="M4 28V5m0 23h25M8 23l6-6 5 3 9-11" />
          <path d="M22 9h6v6M9 28v-4m6 4v-7m6 7v-5m6 5V14" />
        </>
      );
    case "heart":
      return <path d="M16 28S4 21 4 12c0-7 9-9 12-3 3-6 12-4 12 3 0 9-12 16-12 16Z" />;
    case "cart":
      return (
        <>
          <path d="M3 4h3.5l3 14h14l2.5-9H9" />
          <circle cx="13" cy="26" r="2" />
          <circle cx="22" cy="26" r="2" />
        </>
      );
  }
}

export function SketchIcon({
  name,
  className = "",
}: {
  name: SketchIconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.15"
        vectorEffect="non-scaling-stroke"
      >
        <IconPaths name={name} />
      </g>
    </svg>
  );
}
