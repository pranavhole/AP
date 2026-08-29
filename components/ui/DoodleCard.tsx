import React, { ReactNode } from "react";

export function DoodleCard({
  children,
  bg = "white",
  shadowColor = "#17172A",
  rotation = "rotate-0",
  className = "",
}: {
  children: ReactNode;
  bg?: "white" | "yellow" | "mint" | "pink" | "lavender" | "cream";
  shadowColor?: string;
  rotation?: string;
  className?: string;
}) {
  const bgStyles = {
    white: "bg-[#FFFDFC]",
    yellow: "bg-[#FFF0B0]",
    mint: "bg-[#CFEBD8]",
    pink: "bg-[#F6B8B8]",
    lavender: "bg-[#DCC8F6]",
    cream: "bg-[#FFF8E8]",
  }[bg];

  return (
    <div
      className={`
        relative isolate rounded-2xl border-2 border-[#17172A] p-6
        shadow-[5px_5px_0_${shadowColor}] transition-transform duration-200
        hover:-translate-y-1 ${rotation} ${bgStyles} ${className}
      `}
    >
      {children}
    </div>
  );
}

