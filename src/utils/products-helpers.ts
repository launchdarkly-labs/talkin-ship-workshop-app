import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getServerClient } from "./ld-server";
import { getCookie } from "cookies-next";
import { v4 as uuidv4 } from "uuid";
import { listAllProducts, getPriceFromApi } from "@/pages/api/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15", // or whichever version you're using
});

export default async function retrieveProducts (req: NextApiRequest, res: NextApiResponse) {

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

      const filteredProducts = products.filter((product: any) =>
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
    }
}