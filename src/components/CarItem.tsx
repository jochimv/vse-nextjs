import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { CarWithDeps } from '@/types/prismaTypes'
import Link from 'next/link'
import Image from 'next/image'
import getServerFile from '@/utils/getServerFile'

const CarItem = ({ car }: { car: CarWithDeps }) => {
  return (
    <Link href={`car/detail/${car.id}`} className="cursor-pointer">
      <Card sx={{ maxWidth: 345, margin: 2 }}>
        <div
          style={{
            position: 'relative',
            width: '345px',
            height: '200px',
            backgroundColor: 'black',
          }}
        >
          <Image
            src={getServerFile(car.imageSrc)}
            alt={car.model.name}
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.model}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.brand} - {car.year}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.city}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.price} {car.currency.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CarItem
