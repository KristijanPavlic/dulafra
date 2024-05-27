'use client'

import React, { useState, useEffect } from 'react'

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 1000) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <button
      type='button'
      onClick={scrollToTop}
      className={`${isVisible ? '' : 'hidden'}fixed bottom-10 right-5 z-50 rounded-lg border-2 border-[#001120] bg-[#001120] px-4 py-2 text-2xl text-[#FFF6EE] shadow-md transition-all hover:scale-110 hover:bg-[#FFF6EE] hover:text-[#001120]`}
    >
      &uArr;
    </button>
  )
}

export default BackToTopButton
