import type { MetadataRoute } from "next";

const SITE_URL = "https://yasarkocyigit.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
