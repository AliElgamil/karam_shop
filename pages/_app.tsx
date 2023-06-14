import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import Loading from "./loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Component {...pageProps} />
      </Suspense>
    </Layout>
  );
}
