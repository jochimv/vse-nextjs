'use client'
import { useState } from 'react'
import { Grid, Pagination } from '@mui/material'
import CarItem from './CarItem'
import { CarWithDeps } from '@/types/prismaTypes'

type Props = {
  cars: CarWithDeps[]
}

const CarList = ({ cars }: Props) => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 3
  const totalPages = Math.ceil(cars.length / itemsPerPage)

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  return (
    <div>
      <Grid container spacing={2}>
        {cars
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4}>
              <CarItem car={car} />
            </Grid>
          ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        sx={{ mt: 2 }}
      />
    </div>
  )
}

export default CarList
