import { CalendarDays } from "lucide-react";

import { HandDrawnArrow } from "@/components/illustrations/HandDrawnArrow";
import { RoughButton } from "@/components/ui/RoughButton";
import { contactLinks } from "@/config/site";
import { pageContent } from "@/data/page-content";

export function CTASection() {
  const contact = pageContent.contact;

  return (
    <section
      className="border-y-[2.5px] border-ink bg-mint py-[34px] [clip-path:polygon(0_6%,14%_1%,31%_7%,49%_2%,68%_7%,84%_1%,100%_6%,100%_95%,84%_100%,67%_94%,48%_99%,28%_94%,13%_99%,0_95%)] max-[600px]:py-11 max-[600px]:[clip-path:polygon(0_2%,23%_0,50%_3%,78%_0,100%_3%,100%_98%,77%_100%,48%_97%,21%_100%,0_97%)]"
      id="contact"
    >
      <div className="mx-auto grid w-[calc(100%_-_40px)] max-w-[1280px] grid-cols-[1fr_160px_auto] items-center gap-7 py-[18px] max-[800px]:grid-cols-[1fr_auto] max-md:w-[calc(100%_-_28px)] max-[600px]:grid-cols-1 max-[600px]:text-center">
        <div>
          <h2 className="m-0 font-hand text-[clamp(2.25rem,4vw,3.5rem)] leading-none max-[600px]:text-[2.65rem]">
            {contact.headingStart}{" "}
            <mark className="inline-block bg-pastel-yellow px-[0.12em] text-inherit [rotate:-1deg]">
              {contact.highlightedWord}
            </mark>{" "}
            {contact.headingEnd}
          </h2>
          <p className="mt-[7px] mb-0 text-[1.05rem] font-bold">
            {contact.body}
          </p>
        </div>

        <HandDrawnArrow className="w-40 max-[800px]:hidden" />

        <div className="relative max-[600px]:w-full">
          <RoughButton
            borderSeed="button-schedule-call"
            href={contactLinks.scheduleCall}
          >
            Schedule a Call
            <CalendarDays aria-hidden="true" size={19} />
          </RoughButton>
          <span
            aria-hidden="true"
            className="absolute top-[-23px] right-[-24px] font-hand text-[1.9rem] text-ink [rotate:-15deg]"
          >
            〽
          </span>
        </div>
      </div>
    </section>
  );
}
