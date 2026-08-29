import React from "react";
import { RocketIcon, GrowthIcon, HeartIcon } from "@/components/svg/Icons";
import { OrganicBlob, OrganicBlobVariant } from "@/components/ui/OrganicBlob";
import { TRUST_ITEMS } from "@/lib/constants";

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
      className="relative z-20 border-y-2 border-[#17172A] bg-[#CFEBD8] py-5 px-4"
    >
      <div className="mx-auto max-w-[1280px]">
        <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-0">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = iconComponents[item.icon as keyof typeof iconComponents];
            return (
              <li
                className={`
                  flex items-center justify-center gap-4 py-2 px-6
                  ${index > 0 ? "md:border-l-2 md:border-dashed md:border-[#17172A]/35" : ""}
                `}
                key={item.title}
              >
                {/* Organic Hand-drawn Icon Blob */}
                <OrganicBlob
                  className="w-13 h-13"
                  color={item.tone}
                  shadow="ink"
                  variant={blobVariants[index % blobVariants.length]}
                >
                  <Icon className="w-6 h-6 text-[#17172A]" />
                </OrganicBlob>

                <strong className="font-hand text-[clamp(1.15rem,1.6vw,1.4rem)] font-black text-[#17172A]">
                  {item.title}
                </strong>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
