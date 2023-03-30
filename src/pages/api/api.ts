import type { NextApiRequest, NextApiResponse } from 'next'
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

    res.status(200).json(data)
}