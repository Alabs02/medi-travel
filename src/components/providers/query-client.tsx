"use client";

import React, { useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "../ui/toaster";

const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBar
        height="3px"
        color="linear-gradient(90deg, hsl(250,50%,45%) 0%, hsl(265,45%,58%) 50%, hsl(330,67%,52%) 100%)"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <style>{`
        #nprogress .bar {
          z-index: 999 !important;
        }
      `}</style>

      <Toaster />

      {children}

      <Analytics />
      <SpeedInsights />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

QueryProvider.displayName = "QueryProvider";
export { QueryProvider };
