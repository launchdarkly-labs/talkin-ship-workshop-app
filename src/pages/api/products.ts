// import product from '@/config/products';
import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { getServerClient } from '../../utils/ld-server';
import { getCookie } from 'cookies-next';

/************************************************************************************************

  This file uses the `billing` feature flag in LaunchDarkly switch between an inventory file thats
  local or dynamically pull the product inventory directly from the Stripe product api
  
  User context is rendered from the 'ldcontext' cookie which gets set during login. It is decoded
  into a JSON object below

  *************************************************************************************************
  */


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2022-11-15', // or whichever version you're using
});

const product = [
  {
    id: 0,
    name: "Classic Toggle",
    price: 2,
    table_price: '$2',
    price_id: "price_1MrT6lADAOT9FmnUWXmbUnPh",
    image: '/toggle-1.jpg',
    inventory: 500,
    metadata: { "product_id": "Classic Toggle" }
  },
  {
    id: 1,
    name: "Fancy Toggle",
    price: 5,
    table_price: '$5',
    price_id: "price_1MrT6lADAOT9FmnU497LUP7Q",
    image: '/toggle-2.webp',
    inventory: 300,
    metadata: { "product_id": "Fancy Toggle" }
  },
  {
    id: 2,
    name: "Plastic Toggle",
    price: 1,
    table_price: '$1',
    price_id: "price_1MrT6lADAOT9FmnUoWqSr1Ll",
    image: '/toggle-3.webp',
    inventory: 200,
    metadata: { "product_id": "Plastic Toggle" }
  },
  {
    id: 3,
    name: "Metal Toggle",
    price: 10,
    table_price: "$10",
    price_id: "price_1MrT6lADAOT9FmnUkPmfFYr3",
    image: '/toggle-4.webp',
    inventory: 65,
    metadata: { "product_id": "Metal Toggle" }
  },
  {
    id: 4,
    name: "Bulk Toggle",
    price: 15,
    table_price: '$15',
    price_id: "price_1MrT6lADAOT9FmnUwKGo9wLB",
    image: '/toggle-5.jpeg',
    inventory: 78,
    metadata: { "product_id": "Bulk Toggle" }
  },
  {
    id: 5,
    name: "Corded Toggle",
    price: 5,
    table_price: '$50',
    price_id: "price_1MrT6lADAOT9FmnUjincVl4q",
    image: '/toggle-6.jpeg',
    inventory: 20,
    metadata: { "product_id": "Corded Toggle" }
  },
  {
    id: 6,
    name: "Historic Toggle",
    price: 25,
    table_price: '$25',
    price_id: "price_1MrT6lADAOT9FmnUgR6Uw67Y",
    image: '/toggle-7.jpeg',
    inventory: 15,
    metadata: { "product_id": "Historic Toggle" }
  },
  {
    id: 7,
    name: "Horn Toggle",
    price: 50,
    table_price: '$50',
    price_id: "price_1MrT6lADAOT9FmnU7ZLUvEEt",
    image: '/toggle-8.jpeg',
    inventory: 7,
    metadata: { "product_id": "Horn Toggle" }
  }
]

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
  res: NextApiResponse,
) {
  if (req.method === 'GET') {

    const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
    const clientContext: any = getCookie('ldcontext', { req, res })

    const json = decodeURIComponent(clientContext);
    const jsonObject = JSON.parse(json);

    const enableStripe = await ldClient.variation("enableStripe", jsonObject, false);

    if (enableStripe) {
      const products = await listAllProducts();

      const productListTemp = await Promise.all(
        products.map(async (product, i) => {
          const priceId = product.default_price;
          const price = typeof priceId === 'string' ? await getPriceFromApi(priceId) : 0;

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
      return res.json(product)
    }
  }
}