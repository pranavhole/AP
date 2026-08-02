import { siteConfig } from "@/config/site";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <a
      aria-label={`${siteConfig.name} home`}
      className="inline-flex items-center gap-2.5 leading-none"
      href="#home"
    >
      <strong
        className={`font-hand tracking-[-0.08em] ${compact ? "text-4xl" : "text-[2.65rem]"}`}
      >
        {siteConfig.initials}
      </strong>
      <span className="grid gap-[3px]">
        <b className="text-[0.85rem] max-[430px]:text-[0.72rem]">
          {siteConfig.name.toUpperCase()}
        </b>
        <small className="text-[0.58rem] font-bold max-[430px]:hidden">
          {siteConfig.role}
        </small>
      </span>
    </a>
  );
}
