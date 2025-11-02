import type { Metadata } from "next";
import "@/styles/globals.css";
import "@/styles/portrait.css";
import { inter, plexMono, dancingScript } from "./fonts";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import type { ReactNode } from "react";

const SITE_URL = "https://yasarkocyigit.com";
const EMAIL = "yasarkocyigit@daqconsulting.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Yasar Kocyigit",
    template: "%s | Yasar Kocyigit",
  },
  description:
    "Data engineering insights, notes, and frameworks from Yasar Kocyigit.",
  applicationName: "Yasar Kocyigit",
  keywords: [
    "Yasar Kocyigit",
    "Data Engineering",
    "Databricks",
    "Azure",
    "Delta Lake",
    "Unity Catalog",
  ],
  authors: [{ name: "Yasar Kocyigit", url: SITE_URL }],
  creator: "Yasar Kocyigit",
  publisher: "Yasar Kocyigit",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Yasar Kocyigit",
    description:
      "Data engineering insights, notes, and frameworks from Yasar Kocyigit.",
    url: SITE_URL,
    siteName: "Yasar Kocyigit",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Yasar Kocyigit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yasar Kocyigit",
    description:
      "Data engineering insights, notes, and frameworks from Yasar Kocyigit.",
    creator: "@yasarkocyigit",
    images: ["/og-default.png"],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "contact:email": EMAIL,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plexMono.variable} ${dancingScript.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <PageTransition>{children}</PageTransition>
        </ThemeProvider>
      </body>
    </html>
  );
}
