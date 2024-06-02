import prisma from '@/utils/prisma'
import { Stack, Typography } from '@mui/material'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import DescriptionIcon from '@mui/icons-material/Description'
import { grey } from '@mui/material/colors'
import React from 'react'
import CarImage from '@/components/CarImage'

const fetchCarDetail = async (id: string) => {
  const car = await prisma.car.findUnique({
    where: {
      id: id,
    },
    include: {
      model: true,
      brand: true,
    },
  })
  return car
}

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id)
  return (
    <div>
      <Stack direction="row" spacing={1} alignItems="center">
        <HealthAndSafetyIcon fontSize="large" sx={{ color: grey[600] }} />
        <Typography>{car?.brand.name}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <DirectionsCarIcon fontSize="large" sx={{ color: grey[600] }} />
        <Typography>{car?.model.name}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <DescriptionIcon fontSize="large" sx={{ color: grey[600] }} />
        <Typography>{car?.description}</Typography>
      </Stack>
      {car && <CarImage car={car} />}
    </div>
  )
}

export default CarDetailPage
