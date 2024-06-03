'use server'

import { revalidatePath } from 'next/cache'

const revalidateHomePath = async () => {
  await revalidatePath('/')
}

export default revalidateHomePath
