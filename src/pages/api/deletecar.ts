import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ error: 'Car ID is required' })
    }

    try {
      await prisma.car.delete({
        where: {
          id: id,
        },
      })
      return res.status(200).json({ message: 'Car deleted successfully' })
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete car' })
    }
  } else {
    res.setHeader('Allow', ['DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
