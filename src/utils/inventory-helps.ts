import { NextApiResponse, NextApiRequest } from "next";
import { createClient } from '@supabase/supabase-js';

export default async function databaseConnection (req: NextApiRequest, res: NextApiResponse ) {
    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")

    const { data, error } = await supabase
      .from('toggletable')
      .select()

    res.status(200).json(data)
}