"use client";

import Script from "next/script";

declare global {
  interface Window {
    BugReporter?: {
      init: (config: {
        apiEndpoint: string;
        saasBoxKey: string;
        saasBoxSecret: string;
        screenshotMode?: string;
        position?: string;
        offsetX?: number;
        offsetY?: number;
        buttonSize?: number;
        buttonShape?: string;
        buttonIcon?: string;
        buttonColor?: string;
        buttonShadow?: string;
        modalTitle?: string;
        modalHeaderColor?: string;
        modalHeaderTextColor?: string;
        modalPrimaryColor?: string;
        modalDescriptionLabel?: string;
        modalDescriptionPlaceholder?: string;
        modalSubmitText?: string;
        modalCancelText?: string;
      }) => void;
    };
  }
}

export function BugReporter() {
  return (
    <Script
      src="https://unpkg.com/saasbox-bug-reporter@1.0.11/dist/bug-reporter.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        if (typeof window !== "undefined" && window.BugReporter) {
          window.BugReporter.init({
            apiEndpoint: `${process.env.NEXT_PUBLIC_SITE_URL}/api/bug-reports`,
            saasBoxKey: `${process.env.NEXT_PUBLIC_SAASBOX_CREDENTIAL_KEY}`,
            saasBoxSecret: `${process.env.NEXT_PUBLIC_SAASBOX_CREDENTIAL_SECRET}`,
            screenshotMode: "selection",
            position: "bottom-left",
            offsetX: 15,
            offsetY: 15,
            buttonSize: 55,
            buttonShape: "rounded",
            buttonIcon: "🐞",
            buttonColor: "#FDACAC",
            buttonShadow: "0 6px 20px #FD7979",
            modalTitle: "Report a Bug",
            modalHeaderColor: "#FD7979",
            modalHeaderTextColor: "#f3f4f6",
            modalPrimaryColor: "#FD7979",
            modalDescriptionLabel: "Describe the issue",
            modalDescriptionPlaceholder: "Please tell us what went wrong...",
            modalSubmitText: "Submit",
            modalCancelText: "Cancel",
          });
        }
      }}
    />
  );
}
