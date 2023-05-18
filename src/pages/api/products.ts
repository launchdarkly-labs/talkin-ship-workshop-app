import product from "@/config/products";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { getServerClient } from "../../utils/ld-server";
import { getCookie } from "cookies-next";

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

async function listAllProducts() {
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

const getPriceFromApi = async (priceId: string) => {
  const price = await stripe.prices.retrieve(priceId);
  return price.unit_amount ?? 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
    const clientContext: any = getCookie("ldcontext", { req, res });

    let enableStripe;
    let jsonObject;
    let newProductExperienceAccess;

    if (clientContext == undefined) {
      jsonObject = {
        key: uuidv4(),
        user: "Anonymous",
      };
    } else {
      const json = decodeURIComponent(clientContext);
      jsonObject = JSON.parse(json);
    }

    enableStripe = await ldClient.variation("enableStripe", jsonObject, false);
    newProductExperienceAccess = await ldClient.variation(
      "new-product-experience-access",
      jsonObject,
      "toggle"
    );

    if (enableStripe) {
      const products = await listAllProducts();
       const allowedCategories = newProductExperienceAccess.replace(/\s/, '').split(",");

      const filteredProducts = products.filter((product) =>
        allowedCategories.includes(product.metadata.category)
      );

      const productListTemp = await Promise.all(
        filteredProducts.map(async (product, i) => {
          const priceId = product.default_price;
          const price =
            typeof priceId === "string" ? await getPriceFromApi(priceId) : 0;

          return {
            id: i,
            product_id: product.metadata.product_id,
            description: product.description,
            price_id: priceId,
            category: product.metadata.category,
            image: product.metadata.image,
            price: price / 100, // Add the price field
          };
        })
      );

      return res.json(productListTemp);
    } else {
      return res.json(product);
    }
  }
}
