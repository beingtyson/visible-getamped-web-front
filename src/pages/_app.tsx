import "styles/globals.css";

import React from "react";
import { RecoilRoot } from "recoil";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

import type { AppProps } from "next/app";

import { GOOGLE_MESAUREMENT_ID } from "@constants";

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <GoogleAnalytics gaMeasurementId={GOOGLE_MESAUREMENT_ID} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}
