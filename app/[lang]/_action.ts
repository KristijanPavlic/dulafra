// _action.ts
'use server'

import { v2 as cloudinary, ConfigOptions } from 'cloudinary'

const cloudinaryConfig: ConfigOptions = cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
})

interface InputData {
  public_id: string
  version: number
  signature: string
}

export async function getSignature(
  folder: string,
  public_id: string
): Promise<{
  timestamp: number
  signature: string
}> {
  const timestamp: number = Math.round(new Date().getTime() / 1000)

  const signature: string = cloudinary.utils.api_sign_request(
    { timestamp, folder: folder, public_id: public_id },
    cloudinaryConfig.api_secret!
  )

  return { timestamp, signature }
}

export async function saveToDatabase({
  public_id,
  version,
  signature
}: InputData): Promise<void> {
  const expectedSignature: string = cloudinary.utils.api_sign_request(
    { public_id, version },
    cloudinaryConfig.api_secret!
  )
  // Verify the data here
}