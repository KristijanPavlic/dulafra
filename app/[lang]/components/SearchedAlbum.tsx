import React, { useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { useUser } from '@clerk/nextjs'

interface ImageData {
  url: string
  folder?: string
}

interface SearchedAlbumProps {
  event: string
  date: string
  time: string
  field: string
  btnDelete: string
  btnDeletion: string
}

const SearchedAlbum: React.FC<SearchedAlbumProps> = ({
  event,
  date,
  time,
  field,
  btnDelete,
  btnDeletion
}) => {
  const { user } = useUser()

  const searchId = `${event}~${date}~${time}~${field}`

  const [deleteBtnText, setDeleteBtnText] = useState(false)
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/cloudinary`, {
        cache: 'reload'
      })
      setIsLoading(true)

      if (response.ok) {
        const data = await response.json()

        const filteredData = data.filter(
          (image: ImageData) => image.folder !== 'upcoming_events'
        )

        setImages(filteredData)
        setIsLoading(false)
      } else {
        console.error('Error fetching images:', response.status)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const filteredImages = images.filter(image => image.folder === searchId)

  const deleteImage = async (url: string) => {
    setDeleteBtnText(true)
    try {
      const publicId = url.split('/').pop()?.split('.')[0]
      const folder = searchId

      const response = await fetch(`/api/delete-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId, folder })
      })

      if (response.ok) {
        const newImages = images.filter(image => image.url !== url)
        setImages(newImages)
        setDeleteBtnText(false)

        if (newImages.filter(image => image.folder === searchId).length === 0) {
          await deleteFolder(folder)
        }
      } else {
        console.error('Error deleting image:', response.status)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const deleteFolder = async (folder: string) => {
    try {
      const response = await fetch(`/api/delete-folder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ folder })
      })

      if (!response.ok) {
        console.error('Error deleting folder:', response.status)
      }
    } catch (error) {
      console.error('Error deleting folder:', error)
    }
  }

  const isAdmin = user?.id === process.env.NEXT_PUBLIC_ADMIN_KEY
  const isBranko = user?.id === process.env.NEXT_PUBLIC_BRANKO_KEY

  return (
    <div className='duration-2000 container m-auto transform pl-5 pr-5 pt-10 transition-transform ease-in'>
      <div className='grid gap-10 gap-y-16 text-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {isLoading ? (
          <div className='col-span-full flex h-64 items-center justify-center '>
            <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent'></div>
          </div>
        ) : (
          filteredImages?.map(image => (
            <div key={image.url} className='relative'>
              <CldImage
                src={image.url}
                width='600'
                height='450'
                style={{ maxWidth: '100%', maxHeight: '100%' }}
                placeholder='blur'
                blurDataURL={image.url}
                alt='There is a problem with loading this image'
                className='mb-3 rounded-lg bg-cover shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] transition-all hover:shadow-none'
                onLoad={e => {
                  const target = e.target as HTMLImageElement
                  const aspectRatio = target.naturalWidth / target.naturalHeight
                  if (aspectRatio > 1) {
                    target.style.width = '100%'
                  } else {
                    target.style.height = '100%'
                  }
                }}
              />
              <h4 className='text-[#333333]'>
                {image.url.split('/').pop()?.split('.')[0]}
              </h4>
              {(isAdmin || isBranko) && (
                <div
                  className='absolute left-0 top-0 flex h-full w-full items-center 
                    justify-center rounded-lg bg-black/50 opacity-0 
                    transition-opacity duration-300 ease-in-out hover:opacity-100'
                >
                  <button
                    onClick={() => deleteImage(image.url)}
                    className='rounded bg-red-500 px-4 py-2 text-white'
                  >
                    {deleteBtnText ? btnDeletion : btnDelete}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default SearchedAlbum