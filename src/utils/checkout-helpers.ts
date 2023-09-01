const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import type { NextApiRequest, NextApiResponse } from 'next'

export async function createCheckoutForStripe(req: NextApiRequest,
  res: NextApiResponse) {
  try {
        const cartDetails = await req.body;
        let line_items: any = [];
        let i = 0;
        Object.keys(cartDetails['cartDetails']).forEach((key) => {
          console.log(cartDetails['cartDetails'][key])
          line_items[i] = {
            price: cartDetails['cartDetails'][key].price_id,
            quantity: cartDetails['cartDetails'][key].quantity,
          };
          i++;
        }
        );
         const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items,
          success_url: "http://localhost:3000",
          cancel_url: "http://localhost:3000",
        });
        console.log(session.url)
        return res.json({ url: session.url });
      } catch (error: any) {
        console.error(error.message);
        return res.json("api error");
      }
    }