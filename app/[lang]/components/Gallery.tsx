'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'

interface MediaData {
  url: string
  folder?: string
}

interface GalleryProps {
  title: string
  noVideos: string
  btnDelete: string
  btnDeletion: string
}

const Gallery: React.FC<GalleryProps> = ({
  title,
  noVideos,
  btnDelete,
  btnDeletion
}) => {
  const { user } = useUser()

  const [media, setMedia] = useState<MediaData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteBtnText, setDeleteBtnText] = useState(false)
  const [canDelete, setCanDelete] = useState(false) // State to track permission
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true)
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    )

    if (galleryRef.current) {
      observer.observe(galleryRef.current)
    }

    return () => {
      if (galleryRef.current) {
        observer.unobserve(galleryRef.current)
      }
    }
  }, [isAnimated])

  const fetchMedia = async () => {
    try {
      const response = await fetch(`/api/video`, {
        cache: 'reload'
      })
      setIsLoading(true)

      if (response.ok) {
        const data = await response.json()
        setMedia(data)
        setIsLoading(false)
      } else {
        console.error('Error fetching media:', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMedia()

    const checkPermissions = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/check-permission`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: user.id })
          })
          const data = await response.json()

          if (data.canDelete) {
            setCanDelete(true)
          }
        } catch (error) {
          console.error('Error checking permissions:', error)
        }
      }
    }

    checkPermissions()
  }, [user?.id])

  const filteredMedia = media.filter(item => item.folder === 'gallery')

  const deleteMedia = async (url: string) => {
    setDeleteBtnText(true)
    try {
      const publicId = url.split('/').pop()?.split('.')[0]
      const folder = 'gallery'

      const response = await fetch(`/api/delete-video`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId, folder })
      })

      if (response.ok) {
        const newMedia = media.filter(item => item.url !== url)
        setMedia(newMedia)
        setDeleteBtnText(false)
        // Refetch data after successful deletion
        await fetchMedia()
      } else {
        console.error('Error deleting media:', response.status)
      }
    } catch (error) {
      console.error('Error deleting media:', error)
    }
  }

  return (
    <div
      ref={galleryRef}
      className={`duration-2500 container m-auto transform pb-20 pl-5 pr-5 pt-20 transition-transform ease-in ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      id='gallery'
    >
      <h1 className='mb-5 text-center text-3xl font-bold uppercase text-[#001120]'>
        {title}
      </h1>
      {isLoading ? (
        <div className='col-span-full flex h-64 items-center justify-center '>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent'></div>
        </div>
      ) : filteredMedia.length === 0 ? (
        <div>
          <p className='text-center text-lg text-[#333333]'>{noVideos}</p>
        </div>
      ) : (
        <div className='mt-10 grid gap-10 gap-y-16 text-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {filteredMedia.map(item => (
            <div key={item.url} className='relative'>
              <video
                src={item.url}
                controls
                autoPlay={false}
                loop
                className='mb-3 rounded-lg bg-cover shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] transition-all hover:shadow-none'
              ></video>
              {canDelete && (
                <div className='mt-2'>
                  <button
                    onClick={() => deleteMedia(item.url)}
                    className='rounded bg-red-500 px-4 py-2 text-white'
                  >
                    {deleteBtnText ? btnDeletion : btnDelete}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery
