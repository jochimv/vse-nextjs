import { Container, Typography } from '@mui/material'
import CarList from '@/components/CarList'
import prisma from '@/utils/prisma'

const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      model: true,
      brand: true,
      currency: true,
    },
  })
  return cars
}

const HomePage = async () => {
  const cars = await getCars()
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Home Page
      </Typography>
      <CarList cars={cars} />
    </Container>
  )
}

export default HomePage
