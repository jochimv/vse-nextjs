'use server'
import prisma from '@/utils/prisma'
import { Stack, Typography, Button } from '@mui/material'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import { grey } from '@mui/material/colors'
import React from 'react'
import CarImage from '@/components/CarImage'
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import DeleteButton from '@/components/DeleteButton'
import Link from 'next/link'

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

const CarDetailPage = async ({ params }: { params: { id: string } }) => {
  const car = await fetchCarDetail(params.id)
  return (
    <div>
      <Typography variant="h4">{car?.adName}</Typography>
      <Stack direction="row" spacing={4}>
        <div>
          <Stack direction="row" spacing={1} alignItems="center">
            <HealthAndSafetyIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.brand}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <DirectionsCarIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.model}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.year}</Typography>
          </Stack>
        </div>
        <div>
          <Stack direction="row" spacing={1} alignItems="center">
            <ElectricBoltIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.condition}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocalOfferIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.price}</Typography>
            <Typography>{car?.currency.name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon fontSize="large" sx={{ color: grey[600] }} />
            <Typography>{car?.city}</Typography>
          </Stack>
        </div>
      </Stack>
      {car && <CarImage car={car} />}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href={`/car/edit/${car.id}`}
        sx={{ mt: 2, mr: 2 }}
      >
        Edit Car
      </Button>
      <DeleteButton car={car} />
    </div>
  )
}

export default CarDetailPage
