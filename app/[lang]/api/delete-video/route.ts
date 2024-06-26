import cloudinary from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
})

export async function POST(req: NextRequest) {
  const { publicId, folder } = await req.json()

  try {
    await cloudinary.v2.uploader.destroy(`${folder}/${publicId}`, {
      invalidate: true,
      resource_type: 'video'
    })

    return new NextResponse('Video deleted successfully', { status: 200 })
  } catch (error: any) {
    console.error('Error deleting video:', error)
    return new NextResponse('Error deleting dideo:', { status: 500 })
  }
}
