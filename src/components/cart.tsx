"use client"
import React, { ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'
import * as config from '../config/config'


const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    cartMode="checkout-session"
    stripe={"pk_test_51MoVoDIMSMVrlrM0A3Lu8hs7JGTs4o0s5uqQ2KJ5zZCoN4RhLnWDoD1x6alq00KBIrB1Gl4GtF2xdJu9AYndqR2k00PCcS3p8W" as string}
    currency={config.CURRENCY}
    shouldPersist={false}
  >
    <>{children}</>
  </CartProvider>
)

export default Cart