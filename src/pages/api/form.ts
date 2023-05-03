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

      const { data, error } = await supabase
          .from('formfills')
          .insert({name: formData['name'], email: formData['email']}).select()

      return res.status(200).json(data)
    } catch (error:any) {
      console.error(error.message);
      return res.status(502).send('An error occurred while processing the request');
    }

  } if (req.method === 'GET') {
    const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL || "", process.env.NEXT_PUBLIC_DB_ANON_KEY || "")
    const { data, error } = await supabase
        .from('formfills')
        .select()
    try {
      const formFills = data
      return res.status(200).json(formFills);
    } catch (error:any) {
      console.error(error.message);
      return res.status(502).send('An error occurred while processing the request');
    }
  }
  return res.status(405).send('Method not allowed');
}