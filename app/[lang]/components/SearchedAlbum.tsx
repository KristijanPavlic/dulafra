import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'

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
  const [canDelete, setCanDelete] = useState(false) // State to track permission

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
        console.log(images)

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

    const checkPermissions = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/check-permission`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id }) // Send userId in the request body
          })
          const data = await response.json()

          if (data.canDelete) {
            setCanDelete(true)
          }
        } catch (error) {
          console.error('Error checking permissions:', error)
        }
      } else {
        console.error('User ID is not available.')
      }
    }

    checkPermissions()
  }, [user?.id]) // Fetch images and check permissions when user ID is available

  const filteredImages = images.filter(image => image.folder === searchId)

  const deleteImage = async (url: string) => {
    try {
      // Decode the URL to get the original filename with the extension
      const decodedUrl = decodeURIComponent(url)
      const publicId = decodedUrl.split('/').pop()?.slice(0, -4)
      const folder = searchId

      // Optimistically update the UI by removing the image
      const updatedImages = images.filter(image => image.url !== url)
      setImages(updatedImages)

      const response = await fetch(`/api/delete-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId, folder }),
        cache: 'no-store'
      })

      if (!response.ok) {
        console.error('Error deleting image:', response.status)
        // Optionally, you could revert the UI update if the deletion fails
        setImages(images) // Revert the UI state
      } else {
        console.log(`Image deleted successfully: ${publicId}`)

        // Check if the folder is empty and delete the folder if needed
        const remainingImages = updatedImages.filter(
          image => image.folder === searchId
        )
        if (remainingImages.length === 0) {
          await deleteFolder(folder)
        }
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      // Optionally, you could revert the UI update if an error occurs
      setImages(images) // Revert the UI state
    } finally {
      setDeleteBtnText(false)
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

      if (response.ok) {
        console.log('Folder deleted successfully')
      } else {
        console.error('Error deleting folder:', response.status)
      }
    } catch (error) {
      console.error('Error deleting folder:', error)
    }
  }

  const fixImageUrl = (url: string) => {
    // Decode the URL to correct any over-encoding
    const decodedUrl = decodeURIComponent(url)
    // Then encode it properly to make sure it's correctly formatted
    return encodeURI(decodedUrl)
  }

  return (
    <div className='duration-2000 container m-auto transform pl-5 pr-5 pt-10 transition-transform ease-in'>
      <div className='grid gap-10 gap-y-16 text-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
        {isLoading ? (
          <div className='col-span-full flex h-64 items-center justify-center '>
            <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent'></div>
          </div>
        ) : (
          filteredImages?.map(image => {
            const fixedUrl = fixImageUrl(image.url) // Fix the URL encoding

            return (
              <div key={fixedUrl} className='relative'>
                <Image
                  src={fixedUrl}
                  width='600'
                  height='450'
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                  alt='There is a problem with loading this image'
                  className='mb-3 rounded-lg bg-cover shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] transition-all hover:shadow-none'
                  onLoad={e => {
                    const target = e.target as HTMLImageElement
                    const aspectRatio =
                      target.naturalWidth / target.naturalHeight
                    if (aspectRatio > 1) {
                      target.style.width = '100%'
                    } else {
                      target.style.height = '100%'
                    }
                  }}
                />
                <h4 className='text-[#333333]'>
                  {fixedUrl.split('/').pop()?.slice(0, -4)}
                </h4>
                {canDelete && (
                  <div
                    className='absolute left-0 top-0 flex h-full w-full items-center 
                      justify-center rounded-lg bg-black/50 opacity-0 
                      transition-opacity duration-300 ease-in-out hover:opacity-100'
                  >
                    <button
                      onClick={() => deleteImage(fixedUrl)}
                      className='rounded bg-red-500 px-4 py-2 text-white'
                    >
                      {deleteBtnText ? btnDeletion : btnDelete}
                    </button>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default SearchedAlbum
