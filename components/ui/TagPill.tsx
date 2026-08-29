import React from "react";

export function TagPill({
  label,
  color = "mint",
  className = "",
}: {
  label: string;
  color?: "mint" | "pink" | "yellow" | "lavender" | "purple" | "cream";
  className?: string;
}) {
  const colorStyles = {
    mint: "bg-[#CFEBD8] text-[#17172A]",
    pink: "bg-[#F6B8B8] text-[#17172A]",
    yellow: "bg-[#FFF0B0] text-[#17172A]",
    lavender: "bg-[#DCC8F6] text-[#17172A]",
    purple: "bg-[#7653D8] text-[#FFFDFC]",
    cream: "bg-[#FFF8E8] text-[#17172A]",
  }[color];

  return (
    <span
      className={`
        inline-flex items-center justify-center rounded-full border-[1.8px] border-[#17172A]
        px-3.5 py-1 font-hand text-sm font-extrabold leading-none
        shadow-[2px_2px_0_#17172A] transition-transform hover:-translate-y-0.5
        ${colorStyles}
        ${className}
      `}
    >
      {label}
    </span>
  );
}

