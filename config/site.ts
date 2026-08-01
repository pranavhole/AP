const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || null;

export const siteConfig = {
  name: "Pranav Hole",
  initials: "PH",
  role: "Freelance Full-Stack Consultant",
  siteUrl: configuredSiteUrl,
  contactActionsEnabled: false,
  contact: {
    email: null as string | null,
    phone: null as string | null,
    meetingUrl: null as string | null,
    resumeUrl: null as string | null,
  },
  socials: {
    linkedin: null as string | null,
    github: null as string | null,
    x: null as string | null,
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
