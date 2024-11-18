import { Layout } from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import Loading from "./loading";
import Transition from "@/components/transition";
import { AnimatePresence } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Suspense fallback={<Loading />}>
          <Component {...pageProps} />
        </Suspense>
      </Layout>
    </AnimatePresence>
  );
}
