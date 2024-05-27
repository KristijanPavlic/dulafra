'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import Image from 'next/image'
import heroImg from '@/public/hero_img.jpg'
import heroMobImg from '@/public/hero_mobile_img.jpg'
import Link from 'next/link'
import UpcomingEvents from './UpcomingEvents'

interface HeroProps {
  title: string
  description: string
  btnSearch: string
  btnProducts: string
  btnContact: string
  titleEvents: string
}

const Hero: React.FC<HeroProps> = ({
  title,
  description,
  btnSearch,
  btnProducts,
  btnContact,
  titleEvents
}) => {
  const size = useWindowSize()
  const heroRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true)
        }
      },
      { threshold: 0 } // Adjust threshold as needed
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [isAnimated])

  return (
    <div
      ref={heroRef}
      className={`relative min-h-max duration-1000 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}
    >
      <div>
        {size.width >= 768 ? (
          <Image
            src={heroImg}
            alt='Dulafra hero image'
            style={{ width: '100%' }}
            className='min-h-[100svh] bg-center object-cover transition-opacity'
          />
        ) : (
          <Image
            src={heroMobImg}
            alt='Dulafra hero mobile image'
            style={{ width: '100%', height: '100svh' }}
            className='bg-center object-cover transition-opacity'
          />
        )}
      </div>
      <div
        className={`absolute left-1/2 top-1/2 min-w-[80%] -translate-x-1/2 -translate-y-1/2 xl:min-w-[50%]`}
      >
        <div className='rounded-xl bg-[#00112060] pb-6 pl-8 pr-8 pt-6 md:pl-16 md:pr-16'>
          <div>
            <h1
              className={`text-center text-2xl font-bold text-[#FFF6EE] md:text-5xl`}
            >
              {title}
            </h1>
          </div>
          <div className='mt-7 lg:mt-14'>
            <h3 className='text-center text-base text-[#FFF6EE] md:text-lg'>
              {description}
            </h3>
          </div>
          <div className='m-auto mt-10 flex w-full flex-col flex-wrap items-center justify-center gap-6 md:flex-row'>
            <div className='w-[200px]'>
              <Link
                className='flex justify-center rounded-lg bg-[#FFF6EE] pb-2 pl-4 pr-4 pt-2 align-middle text-[#333333] transition-all hover:bg-[#333333] hover:text-[#FFF6EE]'
                href='#search'
              >
                {btnSearch}
              </Link>
            </div>
            <div className='w-[200px]'>
              <Link
                className='flex justify-center rounded-lg bg-[#FFF6EE] pb-2 pl-4 pr-4 pt-2 align-middle text-[#333333] transition-all hover:bg-[#333333] hover:text-[#FFF6EE]'
                href='#products'
              >
                {btnProducts}
              </Link>
            </div>
            <div className='w-[200px]'>
              <Link
                className='flex justify-center rounded-lg bg-[#FFF6EE] pb-2 pl-4 pr-4 pt-2 align-middle text-[#333333] transition-all hover:bg-[#333333] hover:text-[#FFF6EE]'
                href='#upcomingEvents'
              >
                {titleEvents}
              </Link>
            </div>
            <div className='w-[200px]'>
              <Link
                className='flex justify-center rounded-lg bg-[#FFF6EE] pb-2 pl-4 pr-4 pt-2 align-middle text-[#333333] transition-all hover:bg-[#333333] hover:text-[#FFF6EE]'
                href='#contact'
              >
                {btnContact}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
