import React from "react";
import { SITE_INFO, SERVICES } from "@/lib/constants";

export function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dialextech.com";

  // 1. Organization & Local Business Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: SITE_INFO.name,
    legalName: SITE_INFO.companyName,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/opengraph-image`,
    email: SITE_INFO.email,
    description:
      "Dialex Technologies Private Limited is a full-stack software development and AI engineering company specializing in high-performance websites, scalable web applications, e-commerce systems, and custom AI integrations.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "SHOP NO. 58 ARIHANT NAGAR, HATHOJ KALWAR ROAD, Hathoj",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      postalCode: "302012",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.9443,
      longitude: 75.6983,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [
      SITE_INFO.socials.linkedin,
      SITE_INFO.socials.github,
      SITE_INFO.socials.twitter,
    ],
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    knowsAbout: [
      "Next.js Development",
      "React Web Applications",
      "Full-Stack Engineering",
      "Artificial Intelligence Integrations",
      "E-Commerce Solutions",
      "Cloud Architecture",
      "PostgreSQL Database Design",
      "Tailwind CSS",
      "TypeScript",
      "Python AI Systems",
    ],
  };

  // 2. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_INFO.name,
    description: SITE_INFO.subtext,
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-US",
  };

  // 3. Service Catalog Schema
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        serviceType: service.title,
        areaServed: "Worldwide",
      },
    })),
  };

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        id="schema-org"
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        id="schema-website"
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
        id="schema-services"
        type="application/ld+json"
      />
    </>
  );
}

