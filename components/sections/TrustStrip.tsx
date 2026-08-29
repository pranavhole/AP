import React from "react";
import { RocketIcon, GrowthIcon, HeartIcon } from "@/components/svg/Icons";
import { OrganicBlob, OrganicBlobVariant } from "@/components/ui/OrganicBlob";
import { TRUST_ITEMS } from "@/lib/constants";
import { WavyDivider } from "@/components/ui/WavyDivider";

export function TrustStrip() {
  const iconComponents = {
    rocket: RocketIcon,
    growth: GrowthIcon,
    heart: HeartIcon,
  };

  const blobVariants: OrganicBlobVariant[] = ["a", "b", "c"];

  return (
    <section
      aria-label="Client commitments"
      className="relative z-20 bg-mint"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.06) 0.8px, transparent 0.8px)",
        backgroundSize: "16px 16px",
      }}
    >
      {/* Hand-drawn Wavy Transition from Hero (Cream #FFF8E8) to TrustStrip (Mint #CFEBD8) */}
      <WavyDivider
        bottomColor="#CFEBD8"
        height={36}
        topColor="#FFF8E8"
        variant="sketch"
      />

      {/* Main Trust Items Content Bar */}
      <div className="mx-auto max-w-[1280px] py-6 md:py-8 px-4">
        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6 md:gap-0">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = iconComponents[item.icon as keyof typeof iconComponents];
            return (
              <React.Fragment key={item.title}>
                {/* Vertical Wavy Dashed Divider between items on desktop */}
                {index > 0 && (
                  <li
                    aria-hidden="true"
                    className="hidden md:flex items-center justify-center px-4"
                  >
                    <svg
                      className="h-14 w-4 text-[#17172A]/40 overflow-visible"
                      fill="none"
                      viewBox="0 0 16 60"
                    >
                      <path
                        d="M 8,2 C 3,12 13,22 8,32 C 3,42 13,52 8,58"
                        stroke="currentColor"
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                        strokeWidth="2.2"
                      />
                    </svg>
                  </li>
                )}

                <li className="flex items-center justify-center gap-4 py-2 px-6">
                  {/* Organic Hand-drawn Icon Blob */}
                  <OrganicBlob
                    className="w-14 h-14"
                    color={item.tone}
                    shadow="ink"
                    variant={blobVariants[index % blobVariants.length]}
                  >
                    <Icon className="w-6 h-6 text-[#17172A]" />
                  </OrganicBlob>

                  <strong className="font-hand text-[clamp(1.2rem,1.7vw,1.5rem)] font-black text-[#17172A]">
                    {item.title}
                  </strong>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>

      {/* Hand-Drawn Wavy Dashed Separator Line connecting into ServicesSection */}
      <div
        aria-hidden="true"
        className="w-full max-w-[1360px] mx-auto px-4 overflow-hidden pt-2 pb-1"
      >
        <svg
          className="w-full h-7 overflow-visible opacity-50"
          preserveAspectRatio="none"
          viewBox="0 0 1440 28"
        >
          {/* Playful Hand-drawn Undulating Wavy Dashed Path */}
          <path
            d="M 0,14 C 45,4 75,24 120,14 C 165,4 195,24 240,14 C 285,4 315,24 360,14 C 405,4 435,24 480,14 C 525,4 555,24 600,14 C 645,4 675,24 720,14 C 765,4 795,24 840,14 C 885,4 915,24 960,14 C 1005,4 1035,24 1080,14 C 1125,4 1155,24 1200,14 C 1245,4 1275,24 1320,14 C 1365,4 1395,24 1440,14"
            fill="none"
            stroke="#17172A"
            strokeDasharray="7 9"
            strokeLinecap="round"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </section>
  );
}
