import { Footer } from "@/components/landing/blocks/footer";
import { Navbar } from "@/components/landing/blocks/navbar";
import { StyleGlideProvider } from "@/components/landing/styleglide-provider";
import { ThemeProvider } from "@/components/landing/theme-provider";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="antialiased dark">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        <StyleGlideProvider />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <eckokit-convai
          agent-id={process.env.ECKOKIT_AGENT_ID!}
          /* avatar + basic behaviour */
          avatar-image-url="placeholder.svg"
          avatar-orb-color-1="#22c55e"
          avatar-orb-color-2="#4f46e5"
          default-expanded="false"
          always-expanded="false"
          /* override UI strings */
          text-contents={JSON.stringify({
            message_input_placeholder: "Ask me anything about your business…",
            connecting_status: "Connecting you to your assistant…",
            feedback_prompt: "Was this reply helpful?",
            call_fallback_button_label: "Call our team",
            call_fallback_cancel_button_label: "Stay in chat",
          })}
        />
        <script
          src={`${process.env.BETTER_AUTH_URL}/dist/eckokit-widget.min.js`}
          async
          type="text/javascript"
        ></script>
      </ThemeProvider>
    </body>
  );
}
