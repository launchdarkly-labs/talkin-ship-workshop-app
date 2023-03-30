import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';

export const config = {
    api: {
      bodyParser: false,
      externalResolver: true,
    },
  };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_URL || "")

    const { data, error } = await supabase
        .from('toggletable')
        .select()
//     const ldClient = await getServerClient(process.env.LD_SERVER_KEY || "");

//     const context: LDContext = {
//         key: uuidv4(),
//         name: 'test'
//   }

    res.status(200).json(data)
}