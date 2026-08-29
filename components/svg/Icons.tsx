import React from "react";

export function LaptopIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      {/* Screen frame */}
      <path
        d="M5 7.5 C5.5 6 6.5 6 8 6 L24 6 C25.5 6 26.5 6 27 7.5 L27 20 C27 21 26 21.5 25 21.5 L7 21.5 C6 21.5 5 21 5 20 Z"
        fill="#FFFDFC"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
      {/* Code bracket inside screen */}
      <path
        d="M12 11.5 L9.5 14.5 L12 17.5 M20 11.5 L22.5 14.5 L20 17.5 M17 10 L15 19"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      {/* Base */}
      <path
        d="M2.5 24.5 L5.5 22 L26.5 22 L29.5 24.5 C29.8 25.5 29 26 27.5 26 L4.5 26 C3 26 2.2 25.5 2.5 24.5 Z"
        fill="#FFF8E8"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function CartIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M3 4 L6.5 4 L9.5 18 L24 18 L27 8 L8 8"
        fill="#FFFDFC"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.3"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="12"
        cy="24.5"
        fill="#F9E37D"
        r="2.5"
        stroke="#17172A"
        strokeWidth="2"
      />
      <circle
        cx="22"
        cy="24.5"
        fill="#F9E37D"
        r="2.5"
        stroke="#17172A"
        strokeWidth="2"
      />
    </svg>
  );
}

export function MobileIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <rect
        fill="#FFFDFC"
        height="26"
        rx="4"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
        width="16"
        x="8"
        y="3"
      />
      {/* Screen speaker & home button */}
      <line
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2"
        x1="13"
        x2="19"
        y1="6.5"
        y2="6.5"
      />
      <circle cx="16" cy="25" fill="#17172A" r="1.5" />
      {/* Inner app UI lines */}
      <line
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="11"
        x2="21"
        y1="11"
        y2="11"
      />
      <line
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="1.5"
        x1="11"
        x2="17"
        y1="15"
        y2="15"
      />
      <rect
        fill="#DCC8F6"
        height="4"
        stroke="#17172A"
        strokeWidth="1.2"
        width="10"
        x="11"
        y="18"
      />
    </svg>
  );
}

export function AIChipIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      {/* Main square chip */}
      <rect
        fill="#FFFDFC"
        height="16"
        rx="2"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
        width="16"
        x="8"
        y="8"
      />
      {/* Pins top */}
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="12" x2="12" y1="4" y2="8" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="16" x2="16" y1="4" y2="8" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="20" x2="20" y1="4" y2="8" />
      {/* Pins bottom */}
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="12" x2="12" y1="24" y2="28" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="16" x2="16" y1="24" y2="28" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="20" x2="20" y1="24" y2="28" />
      {/* Pins left */}
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="4" x2="8" y1="12" y2="12" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="4" x2="8" y1="16" y2="16" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="4" x2="8" y1="20" y2="20" />
      {/* Pins right */}
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="24" x2="28" y1="12" y2="12" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="24" x2="28" y1="16" y2="16" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="24" x2="28" y1="20" y2="20" />
      {/* AI text */}
      <text
        fill="#17172A"
        fontFamily="sans-serif"
        fontSize="8"
        fontWeight="bold"
        textAnchor="middle"
        x="16"
        y="19"
      >
        AI
      </text>
    </svg>
  );
}

export function RocketIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M12 21 C 9 20, 7 20, 5 21 C 4 17, 5 15, 8 14 C 10 7, 16 3, 24 3 C 24 11, 20 17, 13 19 C 12 22, 10 24, 6 25 C 7 23, 7 21, 6 18"
        fill="#FFFDFC"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="19" cy="9" fill="#F6B8B8" r="2.5" stroke="#17172A" strokeWidth="1.8" />
      <path
        d="M12 22 L8 29 M16 20 L19 26"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function GrowthIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M4 28 L4 5 M4 28 L28 28"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2.3"
      />
      <path
        d="M8 23 L14 17 L19 20 L27 8"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      <path
        d="M21 8 L27 8 L27 14"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
      {/* Small bar charts */}
      <path d="M8 28 L8 24 M14 28 L14 18 M19 28 L19 21 M24 28 L24 12" stroke="#CFEBD8" strokeWidth="3" />
    </svg>
  );
}

export function HeartIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="#F6B8B8"
      viewBox="0 0 32 32"
    >
      <path
        d="M16 28 C16 28, 4 21, 4 12 C4 5, 13 3, 16 9 C19 3, 28 5, 28 12 C28 21, 16 28, 16 28 Z"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function LightbulbIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M10 15 C10 10.5, 13 7, 16 7 C19 7, 22 10.5, 22 15 C22 18, 20 20, 20 22 L12 22 C12 20, 10 18, 10 15 Z"
        fill="#FFF0B0"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d="M12 25 L20 25 M13.5 28 L18.5 28"
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      {/* Glow rays */}
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="16" x2="16" y1="2" y2="4.5" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="7" x2="9" y1="6" y2="8" />
      <line stroke="#17172A" strokeLinecap="round" strokeWidth="2" x1="25" x2="23" y1="6" y2="8" />
    </svg>
  );
}

export function PencilIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M6 26 L11 25 L25 11 C26.5 9.5, 26.5 7.5, 25 6 C23.5 4.5, 21.5 4.5, 20 6 L6 20 Z"
        fill="#FFF0B0"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
        vectorEffect="non-scaling-stroke"
      />
      <line stroke="#17172A" strokeWidth="2" x1="18" x2="23" y1="8" y2="13" />
      <polygon fill="#17172A" points="6,26 8.5,23 9,25.5" />
    </svg>
  );
}

export function CodeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <path
        d="M10 10 L4 16 L10 22"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <path
        d="M22 10 L28 16 L22 22"
        stroke="#17172A"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
      <line
        stroke="#17172A"
        strokeLinecap="round"
        strokeWidth="2.2"
        x1="18"
        x2="14"
        y1="8"
        y2="24"
      />
    </svg>
  );
}

export function LaunchIcon({ className = "w-7 h-7" }: { className?: string }) {
  return <RocketIcon className={className} />;
}

export function GlobeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <circle cx="16" cy="16" fill="#CFEBD8" r="12" stroke="#17172A" strokeWidth="2.2" />
      <ellipse cx="16" cy="16" rx="6" ry="12" stroke="#17172A" strokeWidth="2" />
      <line stroke="#17172A" strokeWidth="2" x1="4" x2="28" y1="16" y2="16" />
    </svg>
  );
}

export function CloudIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="#DCC8F6"
      viewBox="0 0 32 32"
    >
      <path
        d="M8 24 L24 24 C 30 24, 30 15, 25 14 C 24 7, 13 6, 10 12 C 3 13, 2 23, 8 24 Z"
        stroke="#17172A"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function DatabaseIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 32 32"
    >
      <ellipse cx="16" cy="8" fill="#FFF0B0" rx="10" ry="4" stroke="#17172A" strokeWidth="2.2" />
      <path d="M6 8 L6 16 C6 18.2, 10.5 20, 16 20 C21.5 20, 26 18.2, 26 16 L26 8" stroke="#17172A" strokeWidth="2.2" />
      <path d="M6 16 L6 24 C6 26.2, 10.5 28, 16 28 C21.5 28, 26 26.2, 26 24 L26 16" stroke="#17172A" strokeWidth="2.2" />
    </svg>
  );
}

export function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.98 3.5 C4.98 4.88, 3.87 6, 2.5 6 C1.12 6, 0 4.88, 0 3.5 C0 2.12, 1.12 1, 2.5 1 C3.87 1, 4.98 2.12, 4.98 3.5 Z M0.4 8 L4.6 8 L4.6 22 L0.4 22 Z M8 8 L12 8 L12 10.2 C12.6 9, 14.2 7.6, 17 7.6 C21.4 7.6, 22.8 10.4, 22.8 15.2 L22.8 22 L18.6 22 L18.6 15.8 C18.6 13.6, 18.2 11.6, 15.6 11.6 C13 11.6, 12.2 13.5, 12.2 15.8 L12.2 22 L8 22 Z" />
    </svg>
  );
}

export function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2 C6.47 2, 2 6.48, 2 12 C2 16.42, 4.87 20.17, 8.84 21.5 C9.34 21.58, 9.5 21.27, 9.5 21 L9.5 19.3 C6.73 19.9, 6.14 18.1, 6.14 18.1 C5.68 16.96, 5.03 16.65, 5.03 16.65 C4.12 16.03, 5.1 16.05, 5.1 16.05 C6.1 16.12, 6.63 17.08, 6.63 17.08 C7.52 18.6, 8.97 18.17, 9.54 17.9 C9.63 17.25, 9.89 16.82, 10.17 16.57 C7.95 16.32, 5.62 15.46, 5.62 11.63 C5.62 10.54, 6.01 9.64, 6.65 8.94 C6.55 8.68, 6.2 7.67, 6.75 6.32 C6.75 6.32, 7.59 6.05, 9.5 7.34 C10.3 7.12, 11.15 7.01, 12 7 C12.85 7.01, 13.7 7.12, 14.5 7.34 C16.41 6.05, 17.25 6.32, 17.25 6.32 C17.8 7.67, 17.45 8.68, 17.35 8.94 C17.99 9.64, 18.38 10.54, 18.38 11.63 C18.38 15.47, 16.04 16.31, 13.81 16.56 C14.17 16.87, 14.5 17.48, 14.5 18.42 L14.5 21 C14.5 21.27, 14.66 21.59, 15.17 21.5 C19.14 20.16, 22 16.42, 22 12 C22 6.48, 17.52 2, 12 2 Z" />
    </svg>
  );
}

export function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <rect
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        width="20"
        x="2"
        y="5"
      />
      <path
        d="M3 6 L12 13 L21 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

