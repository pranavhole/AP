export function ScribbleUnderline({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 180 18">
      <path
        d="M4 10 C38 5 63 14 94 9 S144 4 176 10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <path
        d="M16 15 C57 11 94 17 160 13"
        fill="none"
        opacity=".45"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}
