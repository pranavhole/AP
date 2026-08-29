import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dialex Technologies",
    short_name: "Dialex",
    description:
      "Dialex Technologies Private Limited helps businesses build modern websites, scalable web applications, AI-powered solutions, and cloud systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF8E8",
    theme_color: "#F6B8B8",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

