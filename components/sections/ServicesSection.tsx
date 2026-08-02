import { ArrowRight } from "lucide-react";

import { PaperPlane, Sparkle } from "@/components/illustrations/DoodleDecoration";
import { SketchIcon } from "@/components/illustrations/SketchIcon";
import { services } from "@/data/services";

function ServicesSheet() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <pattern height="4.8" id="services-sheet-grain" patternUnits="userSpaceOnUse" width="5.6">
          <circle cx="1.2" cy="1.4" fill="#111" opacity="0.055" r="0.11" />
          <circle cx="4.1" cy="3.7" fill="#c49d48" opacity="0.11" r="0.12" />
        </pattern>
      </defs>
      <path d="M3.2 1.6C24 .2 43 1.3 61.5.7c19-.6 30.5-.1 34.7 2.5 2.5 18.5 1.1 40.8 2 65.3.6 16.5-.3 25.7-3.1 28.4-24.7 2.4-50.8-.2-78 1.3-9.4.5-13.8-.5-15.3-3.7C.4 70.1 1.8 38.6 1.2 12.1 1 6.3 1.6 2.8 3.2 1.6Z" fill="#c9ad67" transform="translate(.55 1.25)" />
      <path d="M3.2 1.6C24 .2 43 1.3 61.5.7c19-.6 30.5-.1 34.7 2.5 2.5 18.5 1.1 40.8 2 65.3.6 16.5-.3 25.7-3.1 28.4-24.7 2.4-50.8-.2-78 1.3-9.4.5-13.8-.5-15.3-3.7C.4 70.1 1.8 38.6 1.2 12.1 1 6.3 1.6 2.8 3.2 1.6Z" fill="#fff9e9" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
      <path d="M3.2 1.6C24 .2 43 1.3 61.5.7c19-.6 30.5-.1 34.7 2.5 2.5 18.5 1.1 40.8 2 65.3.6 16.5-.3 25.7-3.1 28.4-24.7 2.4-50.8-.2-78 1.3-9.4.5-13.8-.5-15.3-3.7C.4 70.1 1.8 38.6 1.2 12.1 1 6.3 1.6 2.8 3.2 1.6Z" fill="url(#services-sheet-grain)" />
    </svg>
  );
}

function IconBlob({ children, fill, path, shadow }: { children: React.ReactNode; fill: string; path: string; shadow: string }) {
  return (
    <span className="relative isolate grid h-[84px] w-[92px] place-items-center [&_svg:last-child]:relative [&_svg:last-child]:z-[1] [&_svg:last-child]:w-[62px]">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100">
        <path d={path} fill={shadow} transform="translate(3 4)" />
        <path d={path} fill={fill} stroke="#111" strokeLinejoin="round" strokeWidth="2.4" />
      </svg>
      {children}
    </span>
  );
}

function DoodleArrow({ path }: { path: string }) {
  return (
    <span aria-hidden="true" className="relative isolate mt-auto grid h-12 w-12 place-items-center">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 50 50">
        <path d={path} fill="#7653d8" opacity="0.34" transform="translate(2 3)" />
        <path d={path} fill="#fff9e9" stroke="#111" strokeWidth="2.3" />
      </svg>
      <ArrowRight className="relative z-[1]" size={23} strokeWidth={2.7} />
    </span>
  );
}

function ServiceCardYellow() {
  const service = services[0];
  return (
    <article className="group relative isolate flex min-h-[330px] -rotate-[0.8deg] flex-col items-center px-6 pt-8 pb-6 text-center transition-transform hover:-translate-y-1 hover:-rotate-[0.2deg] max-[600px]:min-h-[280px]">
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs><pattern height="7" id="yellow-card-grain" patternUnits="userSpaceOnUse" width="8"><circle cx="2" cy="2" fill="#7b5d13" opacity=".11" r=".13" /></pattern></defs>
        <path d="M8 2C33 .3 66 1.6 91 3c4 .2 5.3 2.8 5.1 7.1-.8 22 .9 50-.5 76.4-.3 5.8-3.6 8-9.1 8.8-22.8 3.3-49.8 2.2-75.8 1.1-5.6-.2-7.4-3.3-6.8-8.8C6.5 61 2.4 35 3.8 11 4.1 5.8 5.4 3.1 8 2Z" fill="#d6b31e" transform="translate(1.6 2.8)" />
        <path d="M8 2C33 .3 66 1.6 91 3c4 .2 5.3 2.8 5.1 7.1-.8 22 .9 50-.5 76.4-.3 5.8-3.6 8-9.1 8.8-22.8 3.3-49.8 2.2-75.8 1.1-5.6-.2-7.4-3.3-6.8-8.8C6.5 61 2.4 35 3.8 11 4.1 5.8 5.4 3.1 8 2Z" fill="#ffe58f" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        <path d="M8 2C33 .3 66 1.6 91 3c4 .2 5.3 2.8 5.1 7.1-.8 22 .9 50-.5 76.4-.3 5.8-3.6 8-9.1 8.8-22.8 3.3-49.8 2.2-75.8 1.1-5.6-.2-7.4-3.3-6.8-8.8C6.5 61 2.4 35 3.8 11 4.1 5.8 5.4 3.1 8 2Z" fill="url(#yellow-card-grain)" />
      </svg>
      <IconBlob fill="#fff4c4" path="M48 3C72 1 94 16 96 42c2 27-15 49-41 54C29 100 7 83 4 58 1 32 20 6 48 3Z" shadow="#c5a22d"><SketchIcon name={service.icon} /></IconBlob>
      <h3 className="mt-4 mb-2 font-hand text-[1.75rem] leading-none">{service.title}</h3>
      <p className="font-extrabold text-[#3f3f3f]">{service.description}</p>
      <DoodleArrow path="M25 3C39 3 47 13 46 27 45 40 36 47 23 46 10 45 3 36 4 23 5 10 13 3 25 3Z" />
    </article>
  );
}

function ServiceCardMint() {
  const service = services[1];
  return (
    <article className="group relative isolate flex min-h-[324px] rotate-[0.4deg] flex-col items-center px-6 pt-8 pb-6 text-center transition-transform hover:-translate-y-1 hover:rotate-0 max-[600px]:min-h-[280px]">
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><pattern height="8" id="mint-card-grain" patternUnits="userSpaceOnUse" width="9"><circle cx="3" cy="5" fill="#186e5c" opacity=".1" r=".14" /></pattern></defs><path d="M5 3C28 1.8 62 2.7 88 1.5c6-.3 8.7 2.7 9 8.6.9 21-.5 47 .3 73.7.2 7.3-2.9 11-8.7 11.8-24 2.1-51 .2-77.1.8-5.4.1-8-2.6-8.3-8C2 65 3.4 34 2.7 12.5c-.2-5.2.7-8 2.3-9.5Z" fill="#5da991" transform="translate(2.1 2.2)" /><path d="M5 3C28 1.8 62 2.7 88 1.5c6-.3 8.7 2.7 9 8.6.9 21-.5 47 .3 73.7.2 7.3-2.9 11-8.7 11.8-24 2.1-51 .2-77.1.8-5.4.1-8-2.6-8.3-8C2 65 3.4 34 2.7 12.5c-.2-5.2.7-8 2.3-9.5Z" fill="#bfebd9" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><path d="M5 3C28 1.8 62 2.7 88 1.5c6-.3 8.7 2.7 9 8.6.9 21-.5 47 .3 73.7.2 7.3-2.9 11-8.7 11.8-24 2.1-51 .2-77.1.8-5.4.1-8-2.6-8.3-8C2 65 3.4 34 2.7 12.5c-.2-5.2.7-8 2.3-9.5Z" fill="url(#mint-card-grain)" /></svg>
      <IconBlob fill="#e4fff4" path="M43 2C69-2 92 17 95 44c3 25-11 47-35 52-26 5-50-11-55-37C1 35 16 6 43 2Z" shadow="#6bb39f"><SketchIcon name={service.icon} /></IconBlob>
      <h3 className="mt-4 mb-2 font-hand text-[1.75rem] leading-none">{service.title}</h3><p className="font-extrabold text-[#3f3f3f]">{service.description}</p><DoodleArrow path="M22 3C36 1 46 10 47 24c1 14-8 23-22 24C11 49 3 39 4 25 5 12 10 5 22 3Z" />
    </article>
  );
}

function ServiceCardPink() {
  const service = services[2];
  return (
    <article className="group relative isolate flex min-h-[338px] -rotate-[0.25deg] flex-col items-center px-6 pt-8 pb-6 text-center transition-transform hover:-translate-y-1 hover:rotate-0 max-[600px]:min-h-[284px]">
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><pattern height="7" id="pink-card-grain" patternUnits="userSpaceOnUse" width="8"><circle cx="5" cy="2" fill="#8d303b" opacity=".1" r=".13" /></pattern></defs><path d="M4 2.2C29 .8 61 1.7 91 2.1c4 .1 6.2 2.3 6.3 6.5.8 22-.6 49 .5 76.4.2 6.2-3.5 9.7-10.2 10.4-22 2.3-50 .7-77 1.3C4 96.8 1.6 93.3 2.2 87.2c1.3-23-.8-50.5-.4-75.8.1-5.2.7-8.1 2.2-9.2Z" fill="#c86d77" transform="translate(1.3 3)" /><path d="M4 2.2C29 .8 61 1.7 91 2.1c4 .1 6.2 2.3 6.3 6.5.8 22-.6 49 .5 76.4.2 6.2-3.5 9.7-10.2 10.4-22 2.3-50 .7-77 1.3C4 96.8 1.6 93.3 2.2 87.2c1.3-23-.8-50.5-.4-75.8.1-5.2.7-8.1 2.2-9.2Z" fill="#f7c3c5" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><path d="M4 2.2C29 .8 61 1.7 91 2.1c4 .1 6.2 2.3 6.3 6.5.8 22-.6 49 .5 76.4.2 6.2-3.5 9.7-10.2 10.4-22 2.3-50 .7-77 1.3C4 96.8 1.6 93.3 2.2 87.2c1.3-23-.8-50.5-.4-75.8.1-5.2.7-8.1 2.2-9.2Z" fill="url(#pink-card-grain)" /></svg>
      <IconBlob fill="#ffdadd" path="M54 2C80 5 97 26 94 53c-3 26-23 43-49 42C19 94 2 74 5 48 8 21 29 0 54 2Z" shadow="#d3838c"><SketchIcon name={service.icon} /></IconBlob>
      <h3 className="mt-4 mb-2 font-hand text-[1.75rem] leading-none">{service.title}</h3><p className="font-extrabold text-[#3f3f3f]">{service.description}</p><DoodleArrow path="M27 3C40 4 47 14 45 28c-2 13-12 20-25 18C7 44 2 34 5 21 8 8 15 2 27 3Z" />
      <Sparkle className="absolute right-5 bottom-7 w-7 rotate-12 text-ink" />
    </article>
  );
}

function ServiceCardPurple() {
  const service = services[3];
  return (
    <article className="group relative isolate flex min-h-[328px] rotate-[0.7deg] flex-col items-center px-6 pt-8 pb-6 text-center transition-transform hover:-translate-y-1 hover:rotate-[0.1deg] max-[600px]:min-h-[280px]">
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100"><defs><pattern height="8" id="purple-card-grain" patternUnits="userSpaceOnUse" width="9"><circle cx="2" cy="6" fill="#56358f" opacity=".11" r=".14" /></pattern></defs><path d="M7 2C27 .4 64 1.6 90.5 1.2c5.4-.1 7.3 3.4 7.8 8.4 1 19-.3 45 .5 72.8.2 8.2-2.7 12.2-8.5 13.1-24 2.7-52 .4-78 .7-5.4.1-8-3-8.2-8.6-.8-24 .4-50.5-.4-75.2C3.5 6.7 4.8 3.5 7 2Z" fill="#8d6abd" transform="translate(1.9 2.6)" /><path d="M7 2C27 .4 64 1.6 90.5 1.2c5.4-.1 7.3 3.4 7.8 8.4 1 19-.3 45 .5 72.8.2 8.2-2.7 12.2-8.5 13.1-24 2.7-52 .4-78 .7-5.4.1-8-3-8.2-8.6-.8-24 .4-50.5-.4-75.2C3.5 6.7 4.8 3.5 7 2Z" fill="#d8c2f2" stroke="#111" strokeLinejoin="round" strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><path d="M7 2C27 .4 64 1.6 90.5 1.2c5.4-.1 7.3 3.4 7.8 8.4 1 19-.3 45 .5 72.8.2 8.2-2.7 12.2-8.5 13.1-24 2.7-52 .4-78 .7-5.4.1-8-3-8.2-8.6-.8-24 .4-50.5-.4-75.2C3.5 6.7 4.8 3.5 7 2Z" fill="url(#purple-card-grain)" /></svg>
      <IconBlob fill="#eee2ff" path="M40 3C65-3 91 13 96 39c5 27-11 51-37 57C32 102 7 85 3 59-3 34 14 9 40 3Z" shadow="#a386ca"><SketchIcon name={service.icon} /></IconBlob>
      <h3 className="mt-4 mb-2 font-hand text-[1.75rem] leading-none">{service.title}</h3><p className="font-extrabold text-[#3f3f3f]">{service.description}</p><DoodleArrow path="M24 3C38 2 46 11 47 25 48 39 39 47 25 47 11 47 3 38 4 24 5 10 11 4 24 3Z" />
    </article>
  );
}

export function ServicesSection() {
  return (
    <section className="relative bg-cream py-8 [background-image:url('/doodles/paper-grain.svg')] [background-size:180px_180px] max-[600px]:py-5" id="services">
      <div className="relative isolate mx-auto w-[calc(100%_-_40px)] max-w-[1440px] px-12 pt-[72px] pb-[78px] max-md:w-[calc(100%_-_28px)] max-md:px-5 max-[600px]:pt-16 max-[600px]:pb-14">
        <ServicesSheet />
        <div className="relative mx-auto w-fit -rotate-[0.25deg]">
          <h2 className="relative z-[1] font-hand text-[clamp(2.7rem,4.2vw,4.2rem)] leading-none">Services I Offer</h2>
          <svg aria-hidden="true" className="absolute -right-3 -bottom-5 -left-2 h-7 w-[calc(100%+20px)]" preserveAspectRatio="none" viewBox="0 0 100 20"><path d="M2 8C31 13 62 4 98 8M10 14c23 2 54-4 80-1" fill="none" stroke="#f4ca4b" strokeLinecap="round" strokeWidth="4" /></svg>
          <span aria-hidden="true" className="absolute -top-6 -right-12 rotate-12 font-hand text-5xl text-purple">〽</span>
        </div>
        <Sparkle className="absolute top-20 left-[7%] w-8 -rotate-12 text-ink max-[700px]:left-7" />
        <Sparkle className="absolute top-28 left-[13%] w-10 rotate-6 text-[#e9476e] max-[700px]:hidden" />
        <PaperPlane className="absolute top-12 right-[4%] w-24 -rotate-6 max-[700px]:top-24 max-[700px]:right-4 max-[700px]:w-16" />
        <svg aria-hidden="true" className="absolute top-28 right-[9%] h-16 w-44 max-[700px]:hidden" viewBox="0 0 180 65"><path d="M3 47c29-35 48 14 77-9 16-13-7-30 6-34 17-5 14 32 40 27 19-3 29-14 49-23" fill="none" stroke="#111" strokeDasharray="7 8" strokeLinecap="round" strokeWidth="2.5" /></svg>
        <div className="mt-[70px] grid grid-cols-4 gap-[clamp(18px,2.2vw,30px)] max-[1000px]:grid-cols-2 max-[600px]:mt-14 max-[600px]:grid-cols-1 max-[600px]:gap-7">
          <ServiceCardYellow />
          <ServiceCardMint />
          <ServiceCardPink />
          <ServiceCardPurple />
        </div>
      </div>
    </section>
  );
}
