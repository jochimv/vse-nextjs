'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@mui/material'
import Image from 'next/image'

const useFetchCarImageUrl = (brand: string, model: string) => {
  return useQuery({
    queryKey: ['car-image', brand, model],
    queryFn: () =>
      axios.get(
        `https://api.unsplash.com/search/photos?query=${brand}+${model}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
      ),
    select: (data: any) => data?.data?.results[0]?.urls?.regular || null,
  })
}

const CarImage = ({ car }: any) => {
  const { data: imageUrl, isLoading } = useFetchCarImageUrl(
    car?.brand.name || '',
    car?.model.name || '',
  )

  return isLoading ? (
    <Skeleton variant="rectangular" width={600} height={400} sx={{ mt: 2 }} />
  ) : (
    <div style={{ width: '100%', height: 'auto', marginTop: '20px' }}>
      <Image
        src={imageUrl}
        alt={`${car?.brand?.name} ${car?.model?.name}`}
        width={400}
        height={300}
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  )
}

export default CarImage
