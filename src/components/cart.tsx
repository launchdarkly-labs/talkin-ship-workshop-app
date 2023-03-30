"use client"
import React, { ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'
import * as config from '../config/config'


const Cart = ({ children }: { children: ReactNode }) => (
  <CartProvider
    cartMode="checkout-session"
    stripe={process.env.STRIPE_PUBLISHABLE_KEY as string}
    currency={config.CURRENCY}
    shouldPersist={false}
  >
    <>{children}</>
  </CartProvider>
)

export default Cart