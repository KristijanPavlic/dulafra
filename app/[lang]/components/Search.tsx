'use client'

import React, { useRef, useEffect, useState } from 'react'
import SearchedAlbum from './SearchedAlbum'

interface ImageData {
  url: string
  folder?: string
}

interface SearchProps {
  title: string
  description: string
  labelEvent: string
  chooseEvent: string
  labelDate: string
  chooseDate: string
  labelTime: string
  chooseTime: string
  labelField: string
  chooseField: string
  btnSearchImages: string
  btnDelete: string
  btnDeletion: string
  warning: string
}

const Search: React.FC<SearchProps> = ({
  title,
  description,
  labelEvent,
  chooseEvent,
  labelDate,
  chooseDate,
  labelTime,
  chooseTime,
  labelField,
  chooseField,
  btnSearchImages,
  warning,
  btnDelete,
  btnDeletion
}) => {
  const [event, setEvent] = useState(chooseEvent)
  const [date, setDate] = useState(chooseDate)
  const [time, setTime] = useState(chooseTime)
  const [field, setField] = useState(chooseField)
  const [dateOptions, setDateOptions] = useState<string[]>([])
  const [timeOptions, setTimeOptions] = useState<string[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[]>([])
  const [isSearched, setIsSearched] = useState(false)
  const [infoText, setInfoText] = useState('')
  const [images, setImages] = useState<ImageData[]>([])
  const searchRef = useRef<HTMLDivElement>(null)
  const [isAnimated, setIsAnimated] = useState(false)

  // State variables to control the disabled status of dropdowns
  const [isDateDisabled, setIsDateDisabled] = useState(true)
  const [isTimeDisabled, setIsTimeDisabled] = useState(true)
  const [isFieldDisabled, setIsFieldDisabled] = useState(true)

  // State variable to track the loading status
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isAnimated) {
          setIsAnimated(true)
        }
      },
      { threshold: 0.1 }
    )

    if (searchRef.current) {
      observer.observe(searchRef.current)
    }

    return () => {
      if (searchRef.current) {
        observer.unobserve(searchRef.current)
      }
    }
  }, [isAnimated])

  const fetchImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/`, {
        cache: 'reload'
      })

      if (response.ok) {
        const data = await response.json()
        // Filter out images from the "upcoming_events" folder
        const filteredData = data.filter(
          (image: ImageData) => image.folder !== 'upcoming_events'
        )
        setImages(filteredData)
      } else {
        console.error('Error fetching images:', response.status)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [])

  useEffect(() => {
    if (event !== chooseEvent) {
      const filteredImages = images.filter(image =>
        image.folder?.includes(event)
      )

      const dateOptions = filteredImages
        .map(image => image.folder?.split('~')[1])
        .filter((option): option is string => option !== undefined)
      setDateOptions(Array.from(new Set(dateOptions)))
      setIsDateDisabled(false)

      const timeOptions = filteredImages
        .filter(
          image => image.folder?.includes(event) && image.folder?.includes(date)
        )
        .map(image => image.folder?.split('~')[2])
        .filter((option): option is string => option !== undefined)
      setTimeOptions(Array.from(new Set(timeOptions)))
      setIsTimeDisabled(date === chooseDate)

      const fieldOptions = filteredImages
        .filter(
          image =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time)
        )
        .map(image => image.folder?.split('~')[3])
        .filter((option): option is string => option !== undefined)
      setFieldOptions(Array.from(new Set(fieldOptions)))
      setIsFieldDisabled(time === chooseTime)
    } else {
      setDateOptions([])
      setTimeOptions([])
      setFieldOptions([])
      setIsDateDisabled(true)
      setIsTimeDisabled(true)
      setIsFieldDisabled(true)
    }
  }, [event, date, time, field, images, chooseEvent])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      event === chooseEvent ||
      date === chooseDate ||
      time === chooseTime ||
      field === chooseField
    ) {
      setIsSearched(false)
      setInfoText(warning)
    } else {
      setIsSearched(true)
      setInfoText('')
    }
  }

  return (
    <div
      ref={searchRef}
      className={`duration-2500 container m-auto transform pb-20 pl-5 pr-5 pt-20 transition-transform ease-in ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
      id='search'
    >
      <h1 className='mb-5 text-center text-3xl font-bold uppercase text-[#001120]'>
        {title}
      </h1>
      <div>
        <p className='m-auto mb-5 max-w-full text-center text-lg text-[#333333] md:max-w-[50%]'>
          {description}
        </p>
      </div>
      <div className='flex justify-center'>
        <form
          className='grid grid-cols-2 gap-3 text-[#333333] md:grid-cols-3 md:gap-4 xl:grid-cols-5 xl:gap-6'
          onSubmit={handleSearch}
        >
          <div className='flex flex-col gap-1'>
            <label htmlFor='event' className='text-[#333333]'>
              {labelEvent}
            </label>
            <select
              id='event'
              name='event'
              title={chooseEvent}
              required
              disabled={isLoading}
              className='rounded-lg p-4 outline-[#001120]'
              onChange={e => {
                setEvent(e.target.value)
                setDate(chooseDate)
                setTime(chooseTime)
                setField(chooseField)
                setIsDateDisabled(e.target.value === chooseEvent)
                setIsTimeDisabled(true)
                setIsFieldDisabled(true)
              }}
              value={event}
            >
              <option>{isLoading ? 'Loading...' : chooseEvent}</option>
              {Array.from(
                new Set(images.map(image => image.folder?.split('~')[0]))
              ).map((uniqueEvent, index) => (
                <option key={index} value={uniqueEvent}>
                  {uniqueEvent}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='date' className='text-[#333333]'>
              {labelDate}
            </label>
            <select
              id='date'
              name='date'
              title={chooseDate}
              required
              disabled={isDateDisabled || isLoading}
              className='rounded-lg p-4 outline-[#001120]'
              onChange={e => {
                setDate(e.target.value)
                setTime(chooseTime)
                setField(chooseField)
                setIsTimeDisabled(e.target.value === chooseDate)
                setIsFieldDisabled(true)
              }}
              value={date}
            >
              <option>{isLoading ? 'Loading...' : chooseDate}</option>
              {dateOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='time' className='text-[#333333]'>
              {labelTime}
            </label>
            <select
              id='time'
              name='time'
              title={chooseTime}
              required
              disabled={isTimeDisabled || isLoading}
              className='rounded-lg p-4 outline-[#001120]'
              onChange={e => {
                setTime(e.target.value)
                setField(chooseField)
                setIsFieldDisabled(e.target.value === chooseTime)
              }}
              value={time}
            >
              <option>{isLoading ? 'Loading...' : chooseTime}</option>
              {timeOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='field' className='text-[#333333]'>
              {labelField}
            </label>
            <select
              name='field'
              id='field'
              title={chooseField}
              required
              disabled={isFieldDisabled || isLoading}
              className='rounded-lg p-4 outline-[#001120]'
              onChange={e => setField(e.target.value)}
              value={field}
            >
              <option>{isLoading ? 'Loading...' : chooseField}</option>
              {fieldOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <button
            type='submit'
            className='mt-7 rounded-lg bg-[#333333] p-4 text-[#FFF6EE] transition-all hover:bg-[#001120] hover:text-[#FFF6EE]'
            disabled={isLoading}
          >
            {btnSearchImages}
          </button>
        </form>
      </div>
      {isSearched && (
        <div className='mt-8'>
          <SearchedAlbum
            event={event}
            date={date}
            time={time}
            field={field}
            btnDelete={btnDelete}
            btnDeletion={btnDeletion}
          />
        </div>
      )}
      <h4 id='infoSearch' className='mt-4 text-center'>
        {infoText}
      </h4>
    </div>
  )
}

export default Search
