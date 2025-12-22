import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fa9d9f2bf90fa62842aed39d44c78636@o4510507411767296.ingest.us.sentry.io/4510549490401280",
  integrations: [
    // send console.log, console.warn, and console.error calls as logs to Sentry
    Sentry.consoleLoggingIntegration({ levels: ["log", "warn", "error"] }),
  ],
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: {
    default: "SaaS Box",
    template: "%s | SaaS Box",
  },
  description:
    "SaaS Box is a swiss army knife for SaaS businesses, with tools and integrations to help you grow your business.",
  keywords: [
    "SaaS Box",
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
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: "SaaS Box",
    description:
      "SaaS Box is a swiss army knife for SaaS businesses, with tools and integrations to help you grow your business.",
    siteName: "SaaS Box",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SaaS Box",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS Box",
    description:
      "SaaS Box is a swiss army knife for SaaS businesses, with tools and integrations to help you grow your business.",
    images: ["/og-image.jpg"],
    creator: "@iamsanjayofficl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.amplitude.com/script/594fb74bf75e546311b19c5b1b71bd5d.js"
          async
        ></script>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: `
            import * as loom from "https://www.unpkg.com/@loomhq/loom-embed@1.2.4/dist/esm/index.js?module";
            `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.amplitude && window.sessionReplay) {
                window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
                window.amplitude.init('594fb74bf75e546311b19c5b1b71bd5d', {
                  "fetchRemoteConfig": true,
                  "autocapture": {
                    "attribution": true,
                    "fileDownloads": true,
                    "formInteractions": true,
                    "pageViews": true,
                    "sessions": true,
                    "elementInteractions": true,
                    "networkTracking": true,
                    "webVitals": true,
                    "frustrationInteractions": true
                  }
                });
              }
            `,
          }}
        />
      </head>
      {children}
    </html>
  );
}
