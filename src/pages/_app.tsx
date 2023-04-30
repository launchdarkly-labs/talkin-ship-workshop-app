"use client"

import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import dynamic from "next/dynamic";
import { globalStyles } from "@/stitches.config";
import Context from "@/context/state";
import {v4 as uuid} from 'uuid'
import {osName, isMobile} from 'react-device-detect'


const CartWithoutSSR = dynamic(() => import("../components/ui/cart"), {
  ssr: false,
});

let c;

if (typeof window !== "undefined") {
    const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
    context: {
      kind: "multi",
      "user": 
      {
        key: uuid(),
        name: "anonymous",
      },
      "session":
      {
        key: uuid(),
        name: "new session",
        description: "session data that we use for experimentation"
      },
      "device":
      {
        key: uuid(),
        operating_system: osName,
        mobile_device: isMobile
      }, 
      "location": {
        key: uuid(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        country: "US"
      },
      "environment": {
        key: uuid(),
        name: "QA Testing"
      }
    },
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
  c = () => null;
}

export default c;