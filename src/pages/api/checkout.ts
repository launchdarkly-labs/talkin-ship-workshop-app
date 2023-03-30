import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getCookies, getCookie, setCookie, deleteCookie, CookieValueTypes } from 'cookies-next';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {

    const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
    const user = getCookie('user', { req, res })

    const context: LDContext = {
      key: uuidv4(),
      name: user?.toString()
    }

    const enableStripe = await ldClient.variation("enableStripe", context, false);
    
    if (enableStripe) {
      try {
        const cartDetails = await req.body;
        let line_items: any = [];
      let i = 0;
        Object.keys(cartDetails['cartDetails']).forEach((key) => {
          line_items[i] = {
            price: cartDetails['cartDetails'][key].price_id,
            quantity: cartDetails['cartDetails'][key].quantity,
          };
          i++;
        }
        );
        console.log(line_items)

        const session = await stripe.checkout.sessions.create({
          mode: "payment",
          line_items,
          success_url: "http://localhost:3000",
          cancel_url: "http://localhost:3000",
        });
        console.log(session.url)
        return res.json({ url: session.url });
      } catch (error: any) {
        // console.error(error.message);
      }
    }
  } if (req.method === 'GET') {
    const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
    const user = getCookie('user', { req, res })

    const context: LDContext = {
      key: uuidv4(),
      name: user?.toString()
    }

    const enableStripe = await ldClient.variation("enableStripe", context, false);
    if (enableStripe) {
      try {
        res.send("You are good to go!");
      } catch (error: any) {
        console.error(error.message);
      }
    } else {
      return res.json("the API is unreachable");
    }
  }
}