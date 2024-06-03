import extractFileName from '@/utils/extractFileName'

const getServerFile = (absolutePath: string) =>
  `/uploads/` + extractFileName(absolutePath)

export default getServerFile
