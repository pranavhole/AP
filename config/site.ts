const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || null;

export const siteConfig = {
  name: "Dialex Technologies",
  companyName: "DIALEX TECHNOLOGIES PRIVATE LIMITED",
  initials: "DT",
  role: "Full-Stack Development & AI Solutions",
  siteUrl: configuredSiteUrl,
  address: "SHOP NO. 58 ARIHANT NAGAR, HATHOJ KALWAR ROAD, Hathoj, Jaipur, Jaipur- 302012, Rajasthan",
  contactActionsEnabled: true,
  contact: {
    email: "info@dialextech.com",
    phone: null as string | null,
    meetingUrl: null as string | null,
    resumeUrl: null as string | null,
  },
  socials: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    x: "https://x.com",
  },
  projectUrls: {
    aiEngineerWorkspace: null as string | null,
    instacity: null as string | null,
    muzzy: null as string | null,
  },
  viewAllProjectsUrl: null as string | null,
} as const;

const primaryContactUrl =
  siteConfig.contact.meetingUrl ??
  (siteConfig.contact.email ? `mailto:${siteConfig.contact.email}` : null);

export const contactLinks = {
  talk: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  startProject: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  buildTogether: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
  scheduleCall: siteConfig.contactActionsEnabled ? primaryContactUrl : null,
} as const;
