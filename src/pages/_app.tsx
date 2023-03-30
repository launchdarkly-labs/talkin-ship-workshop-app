import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import {withLDProvider } from 'launchdarkly-react-client-sdk'
import dynamic from 'next/dynamic'
import {v4 as uuid} from 'uuid'
import {osName, isMobile} from 'react-device-detect'
import { globalStyles } from '@/stitches.config'

const CartWithoutSSR = dynamic(() => import('../components/cart'), {ssr: false})

function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return (
  <CartWithoutSSR>
    <Component {...pageProps} />
  </CartWithoutSSR>
  )
}

export default withLDProvider({
      clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY as string,
      context: {
        kind: "multi",
        "user": 
        {
          key: uuid(),
          name: "anonymous"
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
        }
      }
  })(App as any);



