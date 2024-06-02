import NewCarForm from '@/components/NewCarForm'
import prisma from '@/utils/prisma'

const fetchBrands = async () => await prisma.brand.findMany()

const fetchModels = async () => await prisma.carModel.findMany()
const fetchCurrencies = async () => await prisma.currency.findMany()

const NewCarPage = async () => {
  const brands = await fetchBrands()
  const models = await fetchModels()
  const currencies = await fetchCurrencies()

  return <NewCarForm brands={brands} models={models} currencies={currencies} />
}

export default NewCarPage
