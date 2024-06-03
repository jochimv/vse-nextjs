'use client'
import { Skeleton } from '@mui/material'
import Image from 'next/image'
import { extractFileName } from '@/utils/extractFileName'
import getServerFile from '@/utils/getServerFile'

const CarImage = ({ car }: any) => {
  return car ? (
    <div style={{ width: '100%', height: 'auto', marginTop: '20px' }}>
      <Image
        src={getServerFile(car?.imageSrc)}
        alt={`${car?.brand?.name} ${car?.model?.name}`}
        width={400}
        height={300}
        style={{
          width: '400px',
          height: 'auto',
          borderRadius: '4px',
        }}
      />
    </div>
  ) : (
    <Skeleton variant="rectangular" width={600} height={400} sx={{ mt: 2 }} />
  )
}

export default CarImage
