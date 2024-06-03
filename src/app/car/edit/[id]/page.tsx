'use server'
import prisma from '@/utils/prisma'
import CarForm from '@/components/CarForm'

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      currency: true,
    },
  })
  return car
}

const fetchCurrencies = async () => await prisma.currency.findMany()

const EditCarPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id)
  const currencies = await fetchCurrencies()
  return <CarForm car={car} currencies={currencies} />
}

export default EditCarPage
