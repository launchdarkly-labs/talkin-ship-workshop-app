import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import { getCookies, getCookie, setCookie, deleteCookie, CookieValueTypes } from 'cookies-next';

/************************************************************************************************

  This file uses the `enableStripe` feature flag in LaunchDarkly enable the Stripe API communication
  for the billing component. 

  User context is rendered from the 'ldcontext' cookie which gets set during login. It is decoded
  into a JSON object below

  This file also contains the error return for when the `billing` flag is enabled but not the 
  `enableStripe` flag

*************************************************************************************************
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
  const clientContext: any = getCookie("ldcontext", { req, res });

  let enableStripe;
  let jsonObject

  if (clientContext == undefined) {
    jsonObject = {
      key: uuidv4(),
      user: "Anonymous"
    }
  } else {
    const json = decodeURIComponent(clientContext);
    jsonObject = JSON.parse(json);
  }



  if (req.method === 'POST') {
  const enableStripe = await ldClient.variation("enableStripe", jsonObject, false);

    if (enableStripe) {
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
  } if (req.method === 'GET') {
    const enableStripe = await ldClient.variation("enableStripe", jsonObject, false);
  
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