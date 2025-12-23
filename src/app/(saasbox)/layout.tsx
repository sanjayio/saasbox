/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from "next";
import "@/app/(saasbox)/globals.css";
import Providers from "@/components/saasbox/providers";
import { DEFAULT_THEME } from "@/lib/themes";
import { cookies } from "next/headers";
import { cn } from "@/lib/utils";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "SaaSBox - All in one toolkit for SaaS builders",
  description:
    "SaaSBox is an all in one toolkit for SaaS builders.",
  keywords: [
    "SaaSBox",
    "SaaS Tools",
    "SaaS Integrations",
    "SaaS Automation",
    "SaaS Management",
    "SaaS Software",
    "SaaS Platforms",
    "SaaS Automation",
    "SaaS Management",
  ],
  authors: [{ name: "Sanjay Kumar" }],
  creator: "Sanjay Kumar",
  publisher: "Sanjay Kumar",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
  },
  openGraph: {
    title: "SaaSBox - All in one toolkit for SaaS builders",
    description:
      "SaaSBox is an all in one toolkit for SaaS builders.",
    siteName: "SaaSBox",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SaaSBox - All in one toolkit for SaaS builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaSBox - All in one toolkit for SaaS builders",
    description:
      "SaaSBox is an all in one toolkit for SaaS builders.",
    images: ["/og-image.jpg"],
    creator: "@iamsanjayofficl",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeSettings = {
    preset: (cookieStore.get("theme_preset")?.value ??
      DEFAULT_THEME.preset) as any,
    scale: (cookieStore.get("theme_scale")?.value ??
      DEFAULT_THEME.scale) as any,
    radius: (cookieStore.get("theme_radius")?.value ??
      DEFAULT_THEME.radius) as any,
  };

  const bodyAttributes = Object.fromEntries(
    Object.entries(themeSettings)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value)
      .map(([key, value]) => [
        `data-theme-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`,
        value,
      ])
  );

  return (
    <body
      suppressHydrationWarning
      className={cn(
        "bg-background group/layout font-sans antialiased",
        fontVariables
      )}
      {...bodyAttributes}
    >
      <Providers themeSettings={themeSettings}>
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </Providers>
    </body>
  );
}
