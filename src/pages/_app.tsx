import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import {withLDProvider } from 'launchdarkly-react-client-sdk'
import dynamic from 'next/dynamic'


const CartWithoutSSR = dynamic(() => import('../components/cart'), {ssr: false})
function App({ Component, pageProps }: AppProps) {
  return (
  <CartWithoutSSR>
    <Component {...pageProps} />
  </CartWithoutSSR>
  )
}

export default withLDProvider({
      clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY as string,
  })(App as any);



