import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient()

  if (req.method === 'POST') {
    try {
      const formData = JSON.parse(req.body)

      const data = await prisma.formfills.create({
        data: {
          name: formData['name'],
          email: formData['email']
        }
      })

      return res.status(200).json(data)
    } catch (error:any) {
      console.error(error.message);
      return res.status(502).send('An error occurred while processing the request');
    }

  } if (req.method === 'GET') {
    try {
      const formFills = await prisma.formfills.findMany()

      return res.status(200).json(formFills);
    } catch (error:any) {
      console.error(error.message);
      return res.status(502).send('An error occurred while processing the request');
    }
  }
  return res.status(405).send('Method not allowed');
}