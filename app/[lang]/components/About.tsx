'use client'

import React, { useRef, useEffect, useState } from 'react'

interface AboutProps {
  title: string
  description: string
  years: string
  professional: string
  events: string
}

const About: React.FC<AboutProps> = ({
  title,
  description,
  years,
  professional,
  events
}) => {
  const aboutRef = useRef<HTMLDivElement>(null)
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

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => {
      if (aboutRef.current) {
        observer.unobserve(aboutRef.current)
      }
    }
  }, [isAnimated])

  return (
    <div
      ref={aboutRef}
      className={`duration-2500 container m-auto transform pb-20 pl-5 pr-5 pt-20 transition-transform ease-in ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      id='about'
    >
      <h1 className='mb-5 text-center text-3xl font-bold uppercase text-[#001120]'>
        {title}
      </h1>
      <div>
        <p className='text-center text-lg text-[#333333]'>{description}</p>
      </div>
      <div className='mt-10'>
        <div className='m-auto flex w-fit flex-col justify-center gap-8 rounded-lg border border-black p-4 md:flex-row'>
          <div className='min-w-[192px] text-center'>
            <h2 className='text-lg font-semibold text-[#001120]'>7+</h2>
            <span className='text-[#333333]'>{years}</span>
          </div>
          <div className='h-[1px] w-full bg-black md:h-[50px] md:w-[1px]'></div>
          <div className='min-w-[192px] text-center'>
            <h2 className='text-lg font-semibold text-[#001120]'>5+</h2>
            <span className='text-[#333333]'>{professional}</span>
          </div>
          <div className='h-[1px] w-full bg-black md:h-[50px] md:w-[1px]'></div>
          <div className='min-w-[192px] text-center'>
            <h2 className='text-lg font-semibold text-[#001120]'>80+</h2>
            <span className='text-[#333333]'>{events}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
