'use client'

import React, { useRef, useEffect, useState } from 'react'
import { CldImage } from 'next-cloudinary'
import { useUser } from '@clerk/nextjs'

interface ImageData {
  url: string
  folder?: string
}

interface UpcomingEventsProps {
  titleEvents: string
  noEvents: string
  btnDelete: string
  btnDeletion: string
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({
  titleEvents,
  noEvents,
  btnDelete,
  btnDeletion
}) => {
  const { user } = useUser()

  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [deleteBtnText, setDeleteBtnText] = useState(false)
  const [noEventsText, setNoEventstext] = useState(false)

  const upcomingEventsRef = useRef<HTMLDivElement>(null)
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

    if (upcomingEventsRef.current) {
      observer.observe(upcomingEventsRef.current)
    }

    return () => {
      if (upcomingEventsRef.current) {
        observer.unobserve(upcomingEventsRef.current)
      }
    }
  }, [isAnimated])

  const fetchImages = async () => {
    try {
      const response = await fetch(`/api/cloudinary`, {
        cache: 'reload'
      })
      setIsLoading(true)

      if (response.ok) {
        const data = await response.json()
        setImages(data)
        setIsLoading(false)
      } else {
        console.error('Error fetching images:', response.status)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  const filteredImages = images.filter(
    image => image.folder === 'upcoming_events'
  )

  const deleteImage = async (url: string) => {
    setDeleteBtnText(true)
    try {
      const publicId = url.split('/').pop()?.split('.')[0]
      const folder = 'upcoming_events'

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
      } else {
        console.error('Error deleting image:', response.status)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
    }
  }

  const isAdmin = user?.id === process.env.NEXT_PRIVATE_ADMIN_KEY
  const isBranko = user?.id === process.env.NEXT_PRIVATE_BRANKO_KEY

  return (
    <div
      ref={upcomingEventsRef}
      className={`duration-2500 container m-auto transform pb-20 pl-5 pr-5 pt-20 transition-transform ease-in ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      id='upcomingEvents'
    >
      <h1 className='mb-5 text-center text-3xl font-bold uppercase text-[#001120]'>
        {titleEvents}
      </h1>
      {isLoading ? (
        <div className='col-span-full flex h-64 items-center justify-center '>
          <div className='h-16 w-16 animate-spin rounded-full border-4 border-[#001120] border-t-transparent'></div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div>
          <p className='text-center text-lg text-[#333333]'>{noEvents}</p>
        </div>
      ) : (
        <div className='mt-10 grid gap-10 gap-y-16 text-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {filteredImages.map(image => (
            <div key={image.url} className='relative'>
              <CldImage
                src={image.url}
                width={500}
                height={300}
                style={{ width: '100%', height: '100%' }}
                placeholder='blur'
                blurDataURL={image.url}
                alt='There is a problem with loading this image'
                className='mb-3 rounded-lg bg-cover shadow-[8px_8px_0px_-2px_rgba(0,17,32,1)] transition-all hover:shadow-none'
              />
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
          ))}
        </div>
      )}
    </div>
  )
}

export default UpcomingEvents
