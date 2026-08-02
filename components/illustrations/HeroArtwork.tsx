import Image from "next/image";

import { technologies } from "@/data/technologies";

import { Sparkle } from "./DoodleDecoration";
import { TechSticker } from "./TechSticker";

const stickerPositions = [
  "top-[7%] left-[5%] max-md:top-[12%] max-md:left-0",
  "top-0 right-[20%] max-md:top-[2%] max-md:right-[22%]",
  "top-[10%] right-[-3%] max-md:top-[18%] max-md:right-0 max-[390px]:right-[-4%]",
  "top-[39%] right-[-8%] max-[1024px]:right-0 max-md:hidden",
  "top-[40%] left-[1%] max-md:top-[48%] max-md:left-0",
] as const;

export function HeroArtwork() {
  return (
    <div className="relative min-h-[510px] max-[1024px]:min-h-[440px] max-md:mt-2 max-md:min-h-[390px] max-[390px]:min-h-[340px]">
      <div
        aria-hidden="true"
        className="absolute right-[5%] bottom-[2%] aspect-[1.25] w-[77%] rounded-[52%_48%_43%_57%/58%_43%_57%_42%] bg-pastel-yellow"
      />
      <Image
        alt="Curly-haired developer in a purple hoodie working behind a PH laptop with a coding mug and plant"
        className="absolute right-[-2%] bottom-[-2%] z-[2] h-auto w-[84%] object-contain max-md:right-1/2 max-md:w-[min(91%,520px)] max-md:translate-x-1/2"
        height={1086}
        preload
        sizes="(max-width: 600px) 86vw, (max-width: 767px) 520px, (max-width: 1100px) 50vw, 520px"
        src="/images/developer-hero.png"
        width={1448}
      />
      <div aria-hidden="true">
        {technologies.map((technology, index) => (
          <TechSticker
            className={`absolute z-[4] ${stickerPositions[index]}`}
            key={technology.label}
            technology={technology}
          />
        ))}
      </div>
      <ul aria-label="Technologies featured" className="sr-only">
        {technologies.map((technology) => (
          <li key={technology.label}>{technology.label}</li>
        ))}
      </ul>
      <svg
        aria-hidden="true"
        className="absolute inset-x-0 top-[4%] bottom-[8%] z-[1] h-[88%] w-full overflow-visible fill-none stroke-ink stroke-2 [stroke-dasharray:5_8] [stroke-linecap:round] max-md:opacity-55"
        viewBox="0 0 650 500"
      >
        <path d="M115 90c70 8 85 42 92 94M497 70c-44 12-58 44-62 82M545 275c-37-12-72-4-94 24M113 330c38-22 68-22 96-3" />
      </svg>
      <Sparkle className="absolute top-[27%] left-[-1%] z-[5] w-7" />
      <Sparkle className="absolute top-[32%] right-[8%] z-[5] w-7 text-purple max-[390px]:hidden" />
    </div>
  );
}
