export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 32 32">
      <path
        d="M16 2c1 8 5 12 13 14-8 1-12 5-13 14-2-9-6-13-14-14 8-2 12-6 14-14Z"
        fill="var(--yellow)"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function PaperPlane({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 90 62">
      <path
        d="m5 20 78-16-33 50-9-23Z"
        fill="#dff6f1"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="M41 31 83 4 48 39"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="3"
      />
    </svg>
  );
}

export function GridDoodle({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 100 54">
      <path
        d="M3 4 96 9 92 49 7 45ZM8 16l86 4M7 28l86 4M6 39l86 4M22 5l-3 41M40 6l-2 41M59 7l-2 41M78 8l-3 41"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
