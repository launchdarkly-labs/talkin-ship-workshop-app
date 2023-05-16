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

/************************************************************************************************
* There is a lot of missing API code here, 
* retrieve the code from "Migrating Technologies with LaunchDarkly - Fixing Our API Code", Step 2
*************************************************************************************************/
  if (req.method === 'POST') {
        return res.json("api error");
      }
  if (req.method === 'GET') {
      return res.json("the API is unreachable");
    }
/*************************************************************************************
 * Put the replacement code up above
 *************************************************************************************/
}