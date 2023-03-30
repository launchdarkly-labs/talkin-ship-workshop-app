import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")

      const formData = JSON.parse(req.body)
      console.log(formData.name)
      console.log(formData.email)

      const { data, error } = await supabase
          .from('formfill')
          .insert({name: formData.name, email: formData.email}).select()

      res.status(200);
    } catch (error:any) {
      console.error(error.message);
    }

  } if (req.method === 'GET') {

    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")

    const { data, error } = await supabase
        .from('formfills')
        .select()

    try {
      console.log(error)
      const formFills = data
      res.json(formFills);
    } catch (error:any) {
      console.error(error.message);
    }

  }

    console.log(req)
    console.log("logout")
    res.status(200)
}