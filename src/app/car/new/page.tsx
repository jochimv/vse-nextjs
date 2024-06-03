import NewCarForm from '@/components/CarForm'
import prisma from '@/utils/prisma'

const fetchCurrencies = async () => await prisma.currency.findMany()

const NewCarPage = async () => {
  const currencies = await fetchCurrencies()

  return <NewCarForm currencies={currencies} />
}

export default NewCarPage
