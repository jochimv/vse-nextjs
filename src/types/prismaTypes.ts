import { Brand, Car, CarModel, Currency } from '@prisma/client'

export interface CarWithDeps extends Car {
  model: CarModel
  brand: Brand
  currency: Currency
}
