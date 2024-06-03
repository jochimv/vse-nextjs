import { Car, Currency } from '@prisma/client'

export interface CarWithDeps extends Car {
  currency: Currency
}
