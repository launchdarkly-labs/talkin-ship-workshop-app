import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import product from '@/config/products';
import { getCookie } from 'cookies-next';

/************************************************************************************************

  This file uses the `dbTesting` feature flag in LaunchDarkly to determine which inventory to render
  either from Postgres or from the local product config file.

  User context is rendered from the 'ldcontext' cookie which gets set during login. It is decoded
  into a JSON object below

*************************************************************************************************
*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // const product = [
  //   {
  //     id: 0,
  //     name: "Classic Toggle",
  //     price: 2,
  //     table_price: '$2',
  //     price_id: "price_1MrT6lADAOT9FmnUWXmbUnPh",
  //     image: '/toggle-1.jpg',
  //     inventory: 500,
  //     metadata: { "product_id": "Classic Toggle" }
  //   },
  //   {
  //     id: 1,
  //     name: "Fancy Toggle",
  //     price: 5,
  //     table_price: '$5',
  //     price_id: "price_1MrT6lADAOT9FmnU497LUP7Q",
  //     image: '/toggle-2.webp',
  //     inventory: 300,
  //     metadata: { "product_id": "Fancy Toggle" }
  //   },
  //   {
  //     id: 2,
  //     name: "Plastic Toggle",
  //     price: 1,
  //     table_price: '$1',
  //     price_id: "price_1MrT6lADAOT9FmnUoWqSr1Ll",
  //     image: '/toggle-3.webp',
  //     inventory: 200,
  //     metadata: { "product_id": "Plastic Toggle" }
  //   },
  //   {
  //     id: 3,
  //     name: "Metal Toggle",
  //     price: 10,
  //     table_price: "$10",
  //     price_id: "price_1MrT6lADAOT9FmnUkPmfFYr3",
  //     image: '/toggle-4.webp',
  //     inventory: 65,
  //     metadata: { "product_id": "Metal Toggle" }
  //   },
  //   {
  //     id: 4,
  //     name: "Bulk Toggle",
  //     price: 15,
  //     table_price: '$15',
  //     price_id: "price_1MrT6lADAOT9FmnUwKGo9wLB",
  //     image: '/toggle-5.jpeg',
  //     inventory: 78,
  //     metadata: { "product_id": "Bulk Toggle" }
  //   },
  //   {
  //     id: 5,
  //     name: "Corded Toggle",
  //     price: 5,
  //     table_price: '$50',
  //     price_id: "price_1MrT6lADAOT9FmnUjincVl4q",
  //     image: '/toggle-6.jpeg',
  //     inventory: 20,
  //     metadata: { "product_id": "Corded Toggle" }
  //   },
  //   {
  //     id: 6,
  //     name: "Historic Toggle",
  //     price: 25,
  //     table_price: '$25',
  //     price_id: "price_1MrT6lADAOT9FmnUgR6Uw67Y",
  //     image: '/toggle-7.jpeg',
  //     inventory: 15,
  //     metadata: { "product_id": "Historic Toggle" }
  //   },
  //   {
  //     id: 7,
  //     name: "Horn Toggle",
  //     price: 50,
  //     table_price: '$50',
  //     price_id: "price_1MrT6lADAOT9FmnU7ZLUvEEt",
  //     image: '/toggle-8.jpeg',
  //     inventory: 7,
  //     metadata: { "product_id": "Horn Toggle" }
  //   }
  // ]

  const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
  const clientContext: any = getCookie('ldcontext', { req, res })

  let dbTesting;
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

  dbTesting = await ldClient.variation("dbTesting", jsonObject, false);

  if (dbTesting == 'postgres') {
    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")

    const { data, error } = await supabase
      .from('toggletable')
      .select()

    res.status(200).json(data)
  } else {
    res.status(200).json(product)
  }
}