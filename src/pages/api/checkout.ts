import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { createCheckoutForStripe } from '@/utils/checkout-helpers';
import { v4 as uuidv4 } from 'uuid';
import { getCookie} from 'cookies-next';

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

//in this code, we are first retrieving the value for the enableStripe flag, 
// then, if it returns true, running a function that creates a checkout session in stripe. 
//If you want to see how that works, take a look at the `/src/utils/checkout-helpers.ts` file.

  if (req.method === 'POST') {
  const enableStripe = await ldClient.variation("enableStripe", jsonObject, false);

    if (enableStripe) {
      createCheckoutForStripe(req, res)
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