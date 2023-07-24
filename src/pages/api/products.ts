import retrieveProducts from "@/utils/products-helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import product from "@/config/products";
import { getServerClient } from "@/utils/ld-server";
import { getCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";


/************************************************************************************************

  This file uses the `billing` feature flag in LaunchDarkly switch between an inventory file thats
  local or dynamically pull the product inventory directly from the Stripe product api
  
  User context is rendered from the 'ldcontext' cookie which gets set during login. It is decoded
  into a JSON object below

  *************************************************************************************************
  */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15", // or whichever version you're using
});


export async function listAllProducts() {
const products: Stripe.Product[] = [];

  let hasMore = true;
  let startingAfter: string | undefined;

  while (hasMore) {
    const result = await stripe.products.list({
      limit: 100, // increase limit to fetch more products per page
      starting_after: startingAfter, // use startingAfter to fetch the next page of products
    });

    products.push(...result.data);
    hasMore = result.has_more;

    if (hasMore) {
      startingAfter = result.data[result.data.length - 1].id;
    }
  }

  return products;
}

export const getPriceFromApi = async (priceId: string) => {
  const price = await stripe.prices.retrieve(priceId);
  return price.unit_amount ?? 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
const clientContext: any = getCookie("ldcontext", { req, res });
let enableStripe;
let jsonObject;

  if (clientContext == undefined) {
    jsonObject = {
      key: uuidv4(),
      user: "Anonymous"
    }
  } else {
    const json = decodeURIComponent(clientContext);
    jsonObject = JSON.parse(json);
  }
  enableStripe = await ldClient.variation("enableStripe", jsonObject, false);
// this function retrieves our product catalog from the Stripe API based on our flag values. 
// If you want to see the flag evaluations, check out the `/src/utils/product-helpers.ts` 

if (req.method === "GET") {
    if (enableStripe) {
    retrieveProducts(req, res)
  }
  else {
      return res.json(product);
    }
  }
  }
