import Image from "next/image";

import { technologies } from "@/data/technologies";

import { Sparkle } from "./DoodleDecoration";
import { TechSticker } from "./TechSticker";
import styles from "./HeroArtwork.module.css";

export function HeroArtwork() {
  return (
    <div className={styles.art}>
      <div aria-hidden="true" className={styles.blob} />
      <Image
        alt="Curly-haired developer in a purple hoodie working behind a PH laptop with a coding mug and plant"
        className={styles.character}
        height={1086}
        preload
        sizes="(max-width: 767px) 92vw, (max-width: 1100px) 50vw, 620px"
        src="/images/developer-hero.png"
        width={1448}
      />
      <div aria-hidden="true">
        {technologies.map((technology, index) => (
          <TechSticker
            className={styles[`sticker${index + 1}`]}
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
        className={styles.paths}
        viewBox="0 0 650 500"
      >
        <path d="M115 90c70 8 85 42 92 94M497 70c-44 12-58 44-62 82M545 275c-37-12-72-4-94 24M113 330c38-22 68-22 96-3" />
      </svg>
      <Sparkle className={styles.sparkle1} />
      <Sparkle className={styles.sparkle2} />
    </div>
  );
}
