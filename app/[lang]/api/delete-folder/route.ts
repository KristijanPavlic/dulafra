import { NextApiRequest, NextApiResponse } from 'next'
import cloudinary from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function POST(req: NextRequest, res: NextResponse) {
  const { folder } = await req.json()
  const cleanedFolder = folder.startsWith('/') ? folder.substring(1) : folder

  console.log(`Deleting folder: ${cleanedFolder}`)

  try {
    const result = await cloudinary.v2.api.delete_folder(folder)
    return new NextResponse('Folder deleted successfully', { status: 200 })
  } catch (error) {
    console.error('Error deleting folder:', error)
    return new NextResponse('Error deleting folder', { status: 500 })
  }
}
