import { NextPage } from 'next'
import Cart from '../components/cart'
import CartSummary from '../components/cart-summary'

const DonatePage: NextPage = () => {
  return (
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <CartSummary />
        </Cart>
      </div>
  )
}

export default DonatePage