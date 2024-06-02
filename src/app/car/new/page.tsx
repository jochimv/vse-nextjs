import NewCarForm from '@/components/NewCarForm'
import prisma from '@/utils/prisma'
import { Box } from '@mui/material'

const fetchBrands = async () => await prisma.brand.findMany()

const fetchModels = async () => await prisma.carModel.findMany()

const NewCarPage = async () => {
  const brands = await fetchBrands()
  const models = await fetchModels()

  return (
    <Box display="flex" justifyContent="center">
      <NewCarForm brands={brands} models={models} />
    </Box>
  )
}

export default NewCarPage
