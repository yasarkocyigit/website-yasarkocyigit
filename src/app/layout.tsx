import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yasar Kocyigit",
  description: "Personal website of Yasar Kocyigit.",
};

import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SmoothScrollProvider } from "@/components/ui/smooth-scroll";
import { BlendedCursor } from "@/components/ui/blended-cursor";
import { MagneticNav } from "@/components/layout/magnetic-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black cursor-none">
        <SmoothScrollProvider>
          <NoiseOverlay />
          <BlendedCursor />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <div className="relative min-h-screen flex flex-col">
              {/* Floating Magnetic Nav replaces fixed Header */}
              <MagneticNav />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
