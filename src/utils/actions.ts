'use server'

import { redirect } from 'next/navigation'
import prisma from './prisma'
import axios from 'axios'

export const createCar = async ({
  brand,
  model,
  currency,
  price,
  year,
  ...other
}: any) => {
  await prisma.car.create({
    data: {
      modelId: model,
      brandId: brand,
      currencyId: currency,
      price: parseFloat(price),
      year: parseInt(year),
      ...other,
    },
  })
}
