import { useState } from 'react'
import revalidateHomePath from '@/utils/revalidateHomePath'
import { useRouter } from 'next/navigation'

const useActionModal = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const handleOpen = () => setOpen(true)
  const handleClose = async () => {
    await revalidateHomePath()
    await router.push('/')
    setOpen(false)
  }

  return { open, handleOpen, handleClose }
}

export default useActionModal
