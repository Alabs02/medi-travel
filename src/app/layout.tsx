// STYLES
import "@/styles/globals.scss";
import "lenis/dist/lenis.css";
import "@/plugins/fonts";

// PLUGINS
import { geistSans, outfit, plusJakartaSans } from "@/plugins";

// LIBS
import { cn } from "@/lib";

// CORE
import { RealViewport, ReactLenis } from "@/components/core";

// CONSTANTS
import { seo } from "@/constants";

import type { Metadata, Viewport } from "next";
import { BASE_URL } from "./sitemap";
import { PageTransition } from "@/layouts";
import { QueryProvider } from "@/components/providers";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...seo,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 2,
  userScalable: true,
  interactiveWidget: "resizes-visual",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b1426" },
    { media: "(prefers-color-scheme: dark)", color: "#e3e7ea" }
  ],
  colorScheme: "light"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        outfit.variable,
        geistSans.variable,
        plusJakartaSans.variable,
        "scroll-smooth overflow-y-auto overflow-x-hidden"
      )}
    >
      <ReactLenis root>
        <body
          className={`${geistSans.variable} antialiased grid w-full min-h-screen`}
        >
          <RealViewport />
          <QueryProvider>
            <PageTransition>{children}</PageTransition>
          </QueryProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
