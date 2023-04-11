import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import dynamic from "next/dynamic";
import { globalStyles } from "@/stitches.config";
import Context from "@/context/state";

const CartWithoutSSR = dynamic(() => import("../components/cart"), {
  ssr: false,
});

let c;

if (typeof window !== "undefined") {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY,
  });
  c = ({ Component, pageProps }: AppProps) => {
    globalStyles();
    return (
      <Context>
        <CartWithoutSSR>
          <LDProvider>
            <Component {...pageProps} />
          </LDProvider>
        </CartWithoutSSR>
      </Context>
    );
  };
} else {
  c = () => "window is undefined for some reason";
}

export default c;
