import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { trustItems } from "@/data/trust";

const toneClasses = {
  cream: "bg-cream",
  yellow: "bg-pastel-yellow",
  mint: "bg-[#e8fff7]",
  pink: "bg-soft-pink",
  lavender: "bg-lavender",
  purple: "bg-purple text-white",
  coral: "bg-coral",
} as const;

const variantClasses = {
  1: "[rotate:-4deg]",
  2: "rounded-[55%_45%_52%_48%] [rotate:2deg]",
  3: "rounded-[44%_56%_48%_52%] [rotate:-1deg]",
  4: "[rotate:1deg]",
} as const;

export function TrustStrip() {
  return (
    <section
      aria-label="Client commitments"
      className="relative z-[3] -mt-0.5 border-y-[2.5px] border-ink bg-mint py-[26px] [clip-path:polygon(0_7%,7%_2%,17%_8%,28%_3%,41%_7%,55%_1%,68%_6%,82%_2%,100%_7%,100%_94%,90%_98%,77%_93%,63%_98%,47%_94%,31%_99%,16%_94%,0_98%)] max-[700px]:py-6 max-[700px]:[clip-path:polygon(0_2%,20%_0,48%_3%,72%_0,100%_3%,100%_98%,74%_100%,50%_97%,22%_100%,0_97%)]"
    >
      <ul className="mx-auto my-0 grid w-[calc(100%_-_40px)] max-w-[1280px] list-none grid-cols-3 items-center py-3.5 ps-0 max-[700px]:grid-cols-1 max-[700px]:gap-2 max-md:w-[calc(100%_-_28px)]">
        {trustItems.map((item) => (
          <li
            className="flex min-h-[62px] items-center justify-center gap-[13px] px-[22px] [&+&]:border-l-2 [&+&]:border-black/65 max-[700px]:justify-start max-[700px]:px-7 max-[700px]:py-[7px] max-[700px]:[&+&]:border-t-[1.5px] max-[700px]:[&+&]:border-l-0 max-[700px]:[&+&]:border-dashed max-[700px]:[&+&]:border-black/45"
            key={item.label}
          >
            <span
              className={`grid aspect-square w-[50px] flex-none place-items-center rounded-[48%_52%_44%_56%] border-2 border-ink [&_svg]:w-7 ${toneClasses[item.tone]} ${variantClasses[item.variant]}`}
            >
              <SketchIcon name={item.icon} />
            </span>
            <strong className="text-[clamp(0.94rem,1.35vw,1.15rem)]">
              {item.label}
            </strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
