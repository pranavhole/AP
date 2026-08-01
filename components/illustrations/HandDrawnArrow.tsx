export function HandDrawnArrow({
  className = "",
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "down";
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      style={{ rotate: direction === "down" ? "90deg" : undefined }}
      viewBox="0 0 88 42"
    >
      <path
        d="M4 29c21-18 45-17 73-9"
        fill="none"
        stroke="currentColor"
        strokeDasharray="5 7"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="m67 10 11 10-14 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </svg>
  );
}
