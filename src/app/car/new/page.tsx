import NewCarForm from '@/components/NewCarForm'
import prisma from '@/utils/prisma'

const fetchBrands = async () => await prisma.brand.findMany()

const fetchModels = async () => await prisma.carModel.findMany()

const NewCarPage = async () => {
  const brands = await fetchBrands()
  const models = await fetchModels()

  return <NewCarForm brands={brands} models={models} />
}

export default NewCarPage
