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
    <body className="antialiased">
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
      </ThemeProvider>
    </body>
  );
}
