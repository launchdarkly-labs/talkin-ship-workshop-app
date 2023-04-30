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
  
  const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
  const clientContext: any = getCookie('ldcontext', { req, res })

  const json = decodeURIComponent(clientContext);
  const jsonObject = JSON.parse(json);

  const dbTesting = await ldClient.variation("dbTesting", jsonObject, false);

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