'use client'

import React, { useRef, useEffect, useState } from 'react'

import Image from 'next/image'
import productPhoto from '@/public/photo.jpg'
import productMug from '@/public/mug.jpg'
import productPoster from '@/public/poster.jpg'
import productFifaCard from '@/public/fifaCard.jpg'

interface ProductsProps {
  title: string
  photo: string
  poster: string
  fifaCard: string
  mug: string
  info: string
}

const Products: React.FC<ProductsProps> = ({
  title,
  photo,
  poster,
  fifaCard,
  mug,
  info
}) => {
  const productsRef = useRef<HTMLDivElement>(null)
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

    if (productsRef.current) {
      observer.observe(productsRef.current)
    }

    return () => {
      if (productsRef.current) {
        observer.unobserve(productsRef.current)
      }
    }
  }, [isAnimated])

  return (
    <div
      ref={productsRef}
      className={`duration-2500 container m-auto transform pb-20 pl-5 pr-5 pt-20 transition-transform ease-in ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
      id='products'
    >
      <h1 className='mb-5 text-center text-3xl font-bold uppercase text-[#001120]'>
        {title}
      </h1>
      <div>
        <p className='text-center text-lg text-[#333333]'>{info}</p>
      </div>
      <div className='mt-4'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-6'>
          <div className='group h-fit overflow-hidden rounded-lg pb-6 text-center shadow-xl transition duration-300 hover:bg-white hover:shadow-none'>
            <Image
              src={productPhoto}
              alt='photo'
              width={300}
              height={300}
              style={{ width: '100%' }}
              className='rounded-t-lg bg-transparent transition duration-300 ease-in-out group-hover:scale-105'
            />
            <h2 className='mt-5 pl-2 pr-2 text-lg font-bold uppercase text-[#001120]'>
              {photo.split(' ')[0]} - {photo.split(' ')[1]}
            </h2>
            <h5 className='mt-3 pl-2 pr-2'>{photo}</h5>
          </div>
          <div className='group h-fit overflow-hidden rounded-lg pb-6 text-center shadow-xl transition duration-300 hover:bg-white hover:shadow-none'>
            <Image
              src={productMug}
              alt='photo'
              width={300}
              height={500}
              style={{ width: '100%' }}
              className='rounded-t-lg bg-transparent transition duration-300 ease-in-out group-hover:scale-105'
            />
            <h2 className='mt-5 pl-2 pr-2 text-lg font-bold uppercase text-[#001120]'>
              {mug.split(' ')[0]} - {mug.split(' ')[1]}
            </h2>
            <h5 className='mt-3 pl-2 pr-2'>{mug}</h5>
          </div>
          <div className='group h-fit overflow-hidden rounded-lg pb-6 text-center shadow-xl transition duration-300 hover:bg-white hover:shadow-none'>
            <Image
              src={productPoster}
              alt='photo'
              width={300}
              height={300}
              style={{ width: '100%' }}
              className='rounded-t-lg bg-transparent transition duration-300 ease-in-out group-hover:scale-105'
            />
            <h2 className='mt-5 pl-2 pr-2 text-lg font-bold uppercase text-[#001120]'>
              {poster.split(' ')[0]} - {poster.split(' ')[1]}
            </h2>
            <h5 className='mt-3 pl-2 pr-2'>{poster}</h5>
          </div>
          <div className='group h-fit overflow-hidden rounded-lg pb-6 text-center shadow-xl transition duration-300 hover:bg-white hover:shadow-none'>
            <Image
              src={productFifaCard}
              alt='photo'
              width={300}
              height={300}
              style={{ width: '100%' }}
              className='rounded-t-lg bg-transparent transition duration-300 ease-in-out group-hover:scale-105'
            />
            <h2 className='mt-5 pl-2 pr-2 text-lg font-bold uppercase text-[#001120]'>
              {fifaCard.split(' ')[0]} {fifaCard.split(' ')[1]} -{' '}
              {fifaCard.split(' ')[2]}
            </h2>
            <h5 className='mt-3 pl-2 pr-2'>{fifaCard}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
