import React from "react";
import { MapPin, Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon, MailIcon } from "@/components/svg/Icons";
import { SketchIconButton } from "@/components/ui/SketchIconButton";
import { SITE_INFO, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      aria-label="Dialex Technologies Company Footer"
      className="relative bg-[#F6B8B8] pt-14 pb-12 px-4 border-t-2 border-[#17172A] overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(23, 23, 42, 0.05) 0.8px, transparent 0.8px)",
        backgroundSize: "16px 16px",
      }}
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_0.9fr_1fr] gap-10 md:gap-8 items-start mb-12">
          {/* Left Column: Brand & Company Details */}
          <div className="flex flex-col items-start max-md:items-center max-md:text-center">
            <a
              aria-label="Dialex Technologies Home"
              className="group inline-flex items-center gap-3 no-underline text-[#17172A] mb-4 transition-transform hover:-translate-y-0.5"
              href="#home"
            >
              {/* Hand-drawn DT monogram badge */}
              <span className="relative isolate grid h-12 w-12 flex-none place-items-center -rotate-2">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-visible"
                  viewBox="0 0 100 100"
                >
                  <path
                    d="M 6,6 C 30,2 72,4 94,3 C 97,24 95,76 96,94 C 72,97 26,95 4,96 C 2,74 4,24 6,6 Z"
                    fill="#7653D8"
                    transform="translate(2.5, 3.5)"
                  />
                  <path
                    d="M 6,6 C 30,2 72,4 94,3 C 97,24 95,76 96,94 C 72,97 26,95 4,96 C 2,74 4,24 6,6 Z"
                    fill="#FFF0B0"
                    stroke="#17172A"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                <strong className="font-hand text-2xl font-black text-[#17172A]">
                  {SITE_INFO.initials}
                </strong>
              </span>

              <div className="text-left">
                <strong className="block font-hand text-xl font-black leading-tight tracking-wide text-[#17172A]">
                  {SITE_INFO.name.toUpperCase()}
                </strong>
                <span className="text-xs font-bold text-muted">
                  {SITE_INFO.companyName}
                </span>
              </div>
            </a>

            {/* Mailing Address */}
            <address className="not-italic mt-2 text-left max-md:text-center max-w-[380px] space-y-2 bg-[#FFF8E8]/70 border-2 border-[#17172A] rounded-xl p-3.5 shadow-[2px_2px_0_#17172A]">
              <div className="flex items-start gap-2">
                <MapPin className="text-[#17172A] flex-none mt-0.5" size={16} strokeWidth={2.4} />
                <p className="text-xs font-bold text-[#17172A] leading-relaxed m-0">
                  <span className="font-black block text-[0.8rem] mb-0.5">Registered Office & Mailing Address:</span>
                  {SITE_INFO.address}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-dashed border-[#17172A]/30">
                <Mail className="text-[#17172A] flex-none" size={15} strokeWidth={2.4} />
                <a
                  className="text-xs font-extrabold text-[#17172A] hover:underline"
                  href={`mailto:${SITE_INFO.email}`}
                >
                  {SITE_INFO.email}
                </a>
              </div>
            </address>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="flex flex-col items-start md:items-center max-md:items-center max-md:text-center">
            <div>
              <h4 className="font-hand text-xl font-black text-[#17172A] mb-4 pb-1 border-b-2 border-dashed border-[#17172A]/30">
                Quick Links
              </h4>
              <nav aria-label="Footer Navigation" className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {NAV_LINKS.map((link) => (
                  <a
                    className="font-hand text-lg font-bold text-[#17172A] hover:underline decoration-2 underline-offset-4 transition-transform hover:translate-x-0.5"
                    href={link.href}
                    key={link.href}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Column: Let's Connect */}
          <div className="flex flex-col items-start md:items-end max-md:items-center max-md:text-center">
            <h4 className="font-hand text-xl font-black text-[#17172A] mb-4 pb-1 border-b-2 border-dashed border-[#17172A]/30">
              Let&apos;s Connect
            </h4>
            
            {/* Irregular Sketch Icon Buttons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <SketchIconButton
                ariaLabel="LinkedIn Profile of Dialex Technologies"
                blobIndex={0}
                className="w-11 h-11"
                href={SITE_INFO.socials.linkedin}
                rotation="-rotate-2"
                shadow="pink"
                variant="white"
              >
                <LinkedinIcon className="w-5 h-5" />
              </SketchIconButton>

              {/* GitHub */}
              <SketchIconButton
                ariaLabel="GitHub Organization of Dialex Technologies"
                blobIndex={1}
                className="w-11 h-11"
                href={SITE_INFO.socials.github}
                rotation="rotate-1"
                shadow="pink"
                variant="white"
              >
                <GithubIcon className="w-5 h-5" />
              </SketchIconButton>

              {/* Twitter / X */}
              <SketchIconButton
                ariaLabel="Twitter Profile of Dialex Technologies"
                blobIndex={2}
                className="w-11 h-11"
                href={SITE_INFO.socials.twitter}
                rotation="-rotate-1"
                shadow="pink"
                variant="white"
              >
                <span className="font-sans font-black text-base">𝕏</span>
              </SketchIconButton>

              {/* Email */}
              <SketchIconButton
                ariaLabel="Send Email to Dialex Technologies"
                blobIndex={3}
                className="w-11 h-11"
                href={`mailto:${SITE_INFO.email}`}
                rotation="rotate-2"
                shadow="pink"
                variant="white"
              >
                <MailIcon className="w-5 h-5" />
              </SketchIconButton>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t-2 border-dashed border-[#17172A]/25 text-center">
          <small className="font-hand text-base font-black text-[#17172A]/80">
            {SITE_INFO.copyright}
          </small>
        </div>
      </div>
    </footer>
  );
}
