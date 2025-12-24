 

"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ActiveThemeProvider } from "@/components/saasbox/active-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeType } from "@/lib/themes";
import { useState } from "react";

interface ProvidersProps {
  themeSettings: ThemeType;
  children: React.ReactNode;
}

const Providers = ({ children, themeSettings }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <ActiveThemeProvider initialTheme={themeSettings}>
        <QueryClientProvider client={queryClient}>
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </QueryClientProvider>
        <Toaster position="top-center" richColors />
        {/* Temporarily disabled NextTopLoader due to React 19 compatibility issues */}
        {/* <NextTopLoader color="var(--primary)" showSpinner={false} height={2} shadow="none" /> */}
      </ActiveThemeProvider>
    </ThemeProvider>
  );
};

export default Providers;
