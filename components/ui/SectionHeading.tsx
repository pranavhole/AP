import type { ReactNode } from "react";

type SectionHeadingProps = {
  children: ReactNode;
  decoration?: ReactNode;
};

export function SectionHeading({
  children,
  decoration,
}: SectionHeadingProps) {
  return (
    <div className="relative mx-auto w-fit">
      <h2 className="relative z-[1] m-0 font-hand text-[clamp(2.25rem,4vw,3.6rem)] leading-none tracking-[0.015em]">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="absolute right-[-5%] bottom-[-5px] left-[7%] h-[9px] rounded-[54%_46%_57%_43%] bg-pastel-yellow [rotate:-1.5deg]"
      />
      {decoration ? (
        <span
          aria-hidden="true"
          className="absolute top-[-19px] right-[-42px] text-purple"
        >
          {decoration}
        </span>
      ) : null}
    </div>
  );
}
