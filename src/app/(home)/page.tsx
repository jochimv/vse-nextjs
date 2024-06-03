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
        Car listings
      </Typography>
      {cars.length > 0 ? (
        <CarList cars={cars} />
      ) : (
        <Typography variant="h6">Wow, such empty</Typography>
      )}
    </Container>
  )
}

export default HomePage
