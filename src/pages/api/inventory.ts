import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
import product from '@/config/products';
import { getCookie } from 'cookies-next';
import { PrismaClient } from '@prisma/client'


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
  const prisma = new PrismaClient()

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

  {/************************************************************************
  * Replace the code below with the code from the guide located 
  in "Taking On Database Migrations - Prepping the Database Backend", Step 2
  **************************************************************************/}
  res.status(200).json(product)
  {/************************************************************************
  * Paste code block above this comment block
   *************************************************************************/}
}