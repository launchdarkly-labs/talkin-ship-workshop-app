import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerClient } from '../../utils/ld-server';
import { LDContext } from 'launchdarkly-node-server-sdk';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")

    const { data, error } = await supabase
        .from('toggletable')
        .select()

    res.status(200).json(data)
}