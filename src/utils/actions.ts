'use server'

import { redirect } from 'next/navigation'
import prisma from './prisma'

export const createCar = async ({ brand, model, description }: any) => {
  await prisma.car.create({
    data: {
      modelId: model,
      brandId: brand,
      description: description,
    },
  })
  console.log('car created: ', JSON.stringify({ brand, model, description }))
}
