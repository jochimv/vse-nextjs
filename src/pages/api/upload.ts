import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'node:fs/promises'
import * as formidable from 'formidable'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadDir = path.join(process.cwd(), 'public/uploads')

// Ensure the uploads directory exists
fs.mkdir(uploadDir, { recursive: true }).catch(console.error)

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm({
    maxFileSize: 100 * 1024 * 1024, // 100MB
    uploadDir,
    keepExtensions: true,
  })

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error caught in API route ', err)
        return resolve(
          res.status(500).json({ status: 'fail', error: err.message }),
        )
      }

      const file = files.file[0] as formidable.File
      if (!file) {
        console.error('No file found in the request')
        return resolve(
          res.status(400).json({ status: 'fail', error: 'No file uploaded' }),
        )
      }

      if (!file.filepath || (!file.newFilename && !file.originalFilename)) {
        console.error('Filepath or filename is missing')
        return resolve(
          res
            .status(400)
            .json({ status: 'fail', error: 'Filepath or filename is missing' }),
        )
      }

      const imageSrc = path.join(
        uploadDir,
        file.newFilename || file.originalFilename,
      )

      try {
        await fs.rename(file.filepath, imageSrc)
        resolve(res.status(200).json({ status: 'success', imageSrc }))
      } catch (e) {
        console.error('Error caught in API route ', e)
        return resolve(
          res.status(500).json({ status: 'fail', error: e.message }),
        )
      }
    })
  })
}
