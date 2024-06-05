'use server'
import prisma from './prisma'
import { Car } from '@prisma/client'

export const createCar = async ({ currency, price, year, ...other }: any) => {
  await prisma.car.create({
    data: {
      currencyId: currency,
      price: parseFloat(price),
      year: parseInt(year),
      ...other,
    },
  })
}

export const updateCar = async (carData: Partial<Car> & { id: string }) => {
  const { id, currency, price, year, ...data } = carData
  return await prisma.car.update({
    where: { id },
    data: {
      currencyId: currency,
      price: parseFloat(price),
      year: parseInt(year),
      ...data,
    },
  })
}
