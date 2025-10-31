import { Inter, IBM_Plex_Mono, Dancing_Script } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  weight: ["700"],
  variable: "--font-signature",
});
