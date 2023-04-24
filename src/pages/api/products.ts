import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: '2022-11-15', // or whichever version you're using
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const products = await listAllProducts();
    return res.json(products);
  }
}