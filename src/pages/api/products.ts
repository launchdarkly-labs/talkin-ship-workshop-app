import retrieveProducts from "@/utils/products-helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import product from "@/config/products";

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
    /****************************************************************************************
     * we're missing the code to retrieve the new products. 
     * You'll find this code in "Preparing for Launch - Updating our Product Catalog" Step 3
     ****************************************************************************************/
if (req.method === "GET") {
    return res.json(product)
}
    /**************************************************************************
     * Put replacement code between these two comments blocks 
     **************************************************************************/
  }
