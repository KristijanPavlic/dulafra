'use client'

import React, { useState, useEffect } from 'react'
import OrderForm from './OrderForm'

interface ImageData {
  url: string
  folder?: string
}

interface ProductsOrderProps {
  title: string
  labelProduct: string
  chooseProduct: string
  addProduct: string
  removeProduct: string
  chooseImage: string
  labelImage: string
  btnOrder: string
  btnOrdering: string
  labelEvent: string
  chooseEvent: string
  labelDate: string
  chooseDate: string
  labelTime: string
  chooseTime: string
  labelField: string
  chooseField: string
  labelTeam: string
  chooseTeam: string
  warning: string
  photo: string
  poster: string
  fifaCard: string
  mug: string
  addedItemsLabel: string
  labelName: string
  labelEmail: string
  labelMessage: string
  success: string
  error: string
}

const ProductsOrder: React.FC<ProductsOrderProps> = ({
  title,
  labelProduct,
  chooseProduct,
  addProduct,
  removeProduct,
  chooseImage,
  labelImage,
  btnOrder,
  btnOrdering,
  labelEvent,
  chooseEvent,
  labelDate,
  chooseDate,
  labelTime,
  chooseTime,
  labelField,
  chooseField,
  labelTeam,
  chooseTeam,
  warning,
  photo,
  mug,
  poster,
  fifaCard,
  addedItemsLabel,
  labelName,
  labelEmail,
  labelMessage,
  success,
  error
}) => {
  const [event, setEvent] = useState(chooseEvent)
  const [date, setDate] = useState(chooseDate)
  const [time, setTime] = useState(chooseTime)
  const [field, setField] = useState(chooseField)
  const [team, setTeam] = useState(chooseTeam)
  const [image, setImage] = useState(chooseImage)
  const [image1, setImage1] = useState(chooseImage)
  const [image2, setImage2] = useState(chooseImage)
  const [image3, setImage3] = useState(chooseImage)
  const [product, setProduct] = useState(chooseProduct)
  const [images, setImages] = useState<ImageData[]>([])
  const [dateOptions, setDateOptions] = useState<string[]>([])
  const [timeOptions, setTimeOptions] = useState<string[]>([])
  const [fieldOptions, setFieldOptions] = useState<string[]>([])
  const [teamOptions, setTeamOptions] = useState<string[]>([])
  const [imageOptions, setImageOptions] = useState<string[]>([])
  const [isSearched, setIsSearched] = useState(false)
  const [infoText, setInfoText] = useState('')
  const [addedItems, setAddedItems] = useState<
    { item: string; quantity: number }[]
  >([])

  const fetchImages = async () => {
    const response = await fetch(`/api/cloudinary`, {
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

      const timeOptions = filteredImages
        .filter(
          image => image.folder?.includes(event) && image.folder?.includes(date)
        )
        .map(image => image.folder?.split('~')[2])
        .filter((option): option is string => option !== undefined)
      setTimeOptions(Array.from(new Set(timeOptions)))

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

      const teamOptions = filteredImages
        .filter(
          image =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time) &&
            image.folder?.includes(field)
        )
        .map(image => image.folder?.split('~')[4])
        .filter((option): option is string => option !== undefined)
      setTeamOptions(Array.from(new Set(teamOptions)))

      const imageOptions = filteredImages
        .filter(
          image =>
            image.folder?.includes(event) &&
            image.folder?.includes(date) &&
            image.folder?.includes(time) &&
            image.folder?.includes(field)
        )
        .map(image => {
          const fileName = image.url.split('/').pop()
          return fileName ? fileName.split('.')[0] : undefined
        })
        .filter((option): option is string => option !== undefined)

      setImageOptions(Array.from(new Set(imageOptions)))
    } else {
      setDateOptions([])
      setTimeOptions([])
      setFieldOptions([])
      setTeamOptions([])
      setImageOptions([])
    }
  }, [event, date, time, field, images, chooseEvent])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check if all required selections are made
    if (
      event === chooseEvent ||
      date === chooseDate ||
      time === chooseTime ||
      field === chooseField ||
      team === chooseTeam ||
      product === chooseProduct
    ) {
      setIsSearched(false)
      setInfoText(warning)
      return
    }

    // Check if the product is mug or poster and validate image selections
    if (product === mug.split(' ')[0]) {
      if (image === chooseImage && image1 === chooseImage) {
        setIsSearched(false)
        setInfoText(infoText)
        return
      }
    } else if (product === poster.split(' ')[0]) {
      if (
        image === chooseImage &&
        image1 === chooseImage &&
        image2 === chooseImage &&
        image3 === chooseImage
      ) {
        setIsSearched(false)
        setInfoText(infoText)
        return
      }
    }

    // If all validations pass, add the item to the list
    setIsSearched(true)
    setInfoText('')

    let selectedItem
    if (product === mug.split(' ')[0]) {
      selectedItem = `${labelProduct}: ${product}, ${labelEvent}: ${event}, ${labelDate}: ${date}, ${labelTime}: ${time}, ${labelField}: ${field}, ${labelTeam}: ${team}, ${labelImage} 1: ${image}, ${labelImage} 2: ${image1}`
    } else if (product === poster.split(' ')[0]) {
      selectedItem = `${labelProduct}: ${product}, ${labelEvent}: ${event}, ${labelDate}: ${date}, ${labelTime}: ${time}, ${labelField}: ${field}, ${labelTeam}: ${team}, ${labelImage} 1: ${image}, ${labelImage} 2: ${image1}, ${labelImage} 3: ${image2}, ${labelImage} 4: ${image3}`
    } else {
      selectedItem = `${labelProduct}: ${product}, ${labelEvent}: ${event}, ${labelDate}: ${date}, ${labelTime}: ${time}, ${labelField}: ${field}, ${labelTeam}: ${team}, ${labelImage} 1: ${image}`
    }

    setAddedItems([...addedItems, { item: selectedItem, quantity: 1 }])
  }

  const handleQuantityChange = (index: number, delta: number) => {
    const updatedItems = addedItems
      .map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity: item.quantity + delta }
        }
        return item
      })
      .filter(item => item.quantity > 0) // Remove items with quantity <= 0
    setAddedItems(updatedItems)
  }

  const handleRemoveItem = (index: number) => {
    const updatedItems = addedItems.filter((_, idx) => idx !== index)
    setAddedItems(updatedItems)
  }

  return (
    <div className='container m-auto pb-20 pl-5 pr-5 pt-5'>
      <h2 className='text-center text-2xl font-bold uppercase text-[#001120]'>
        {title}
      </h2>
      <div className='mt-5 flex justify-center'>
        <form
          className='grid grid-cols-2 gap-3 text-[#333333] md:grid-cols-3 md:gap-4 xl:grid-cols-6 xl:gap-6'
          onSubmit={handleSearch}
        >
          <div className='flex flex-col gap-1'>
            <label htmlFor='product' className='text-[#333333]'>
              {labelProduct}
            </label>
            <select
              id='product'
              name='product'
              title={labelProduct}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={product}
              onChange={e => setProduct(e.target.value)}
            >
              <option value={chooseProduct}>{chooseProduct}</option>
              <option value={photo.split(' ')[0]}>{photo.split(' ')[0]}</option>
              <option value={mug.split(' ')[0]}>{mug.split(' ')[0]}</option>
              <option value={poster.split(' ')[0]}>
                {poster.split(' ')[0]}
              </option>
              <option value={fifaCard.split(' ')[0]}>
                {fifaCard.split(' ')[0]} {fifaCard.split(' ')[1]}
              </option>
            </select>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='event' className='text-[#333333]'>
              {labelEvent}
            </label>
            <select
              id='event'
              name='event'
              title={labelEvent}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={event}
              onChange={e => setEvent(e.target.value)}
            >
              <option value={chooseEvent}>{chooseEvent}</option>
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
              title={labelDate}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={date}
              onChange={e => setDate(e.target.value)}
            >
              <option value={chooseDate}>{chooseDate}</option>
              {dateOptions.map(option => (
                <option key={option} value={option}>
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
              title={labelTime}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={time}
              onChange={e => setTime(e.target.value)}
            >
              <option value={chooseTime}>{chooseTime}</option>
              {timeOptions.map(option => (
                <option key={option} value={option}>
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
              id='field'
              name='field'
              title={labelField}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={field}
              onChange={e => setField(e.target.value)}
            >
              <option value={chooseField}>{chooseField}</option>
              {fieldOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='team' className='text-[#333333]'>
              {labelTeam}
            </label>
            <select
              id='team'
              name='team'
              title={labelTeam}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={team}
              onChange={e => setTeam(e.target.value)}
            >
              <option value={chooseTeam}>{chooseTeam}</option>
              {teamOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor='image' className='text-[#333333]'>
              {labelImage}
            </label>
            <select
              id='image'
              name='image'
              title={labelImage}
              required
              className='rounded-lg p-4 outline-[#001120]'
              value={image}
              onChange={e => setImage(e.target.value)}
            >
              <option value={chooseImage}>{chooseImage}</option>
              {imageOptions.map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {product === mug.split(' ')[0] && (
            <>
              <div className='flex flex-col gap-1'>
                <label htmlFor='image1mug' className='text-[#333333]'>
                  {labelImage} 2
                </label>
                <select
                  id='image1mug'
                  name='image1'
                  title={`${labelImage} 1`}
                  required
                  className='rounded-lg p-4 outline-[#001120]'
                  value={image1}
                  onChange={e => setImage1(e.target.value)}
                >
                  <option value={chooseImage}>{chooseImage}</option>
                  {imageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          {product === poster.split(' ')[0] && (
            <>
              <div className='flex flex-col gap-1'>
                <label htmlFor='image1' className='text-[#333333]'>
                  {labelImage} 2
                </label>
                <select
                  id='image1'
                  name='image1'
                  title={`${labelImage} 1`}
                  required
                  className='rounded-lg p-4 outline-[#001120]'
                  value={image1}
                  onChange={e => setImage1(e.target.value)}
                >
                  <option value={chooseImage}>{chooseImage}</option>
                  {imageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='image2' className='text-[#333333]'>
                  {labelImage} 3
                </label>
                <select
                  id='image2'
                  name='image2'
                  title={`${labelImage} 2`}
                  required
                  className='rounded-lg p-4 outline-[#001120]'
                  value={image2}
                  onChange={e => setImage2(e.target.value)}
                >
                  <option value={chooseImage}>{chooseImage}</option>
                  {imageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className='flex flex-col gap-1'>
                <label htmlFor='image3' className='text-[#333333]'>
                  {labelImage} 4
                </label>
                <select
                  id='image3'
                  name='image3'
                  title={`${labelImage} 3`}
                  required
                  className='rounded-lg p-4 outline-[#001120]'
                  value={image3}
                  onChange={e => setImage3(e.target.value)}
                >
                  <option value={chooseImage}>{chooseImage}</option>
                  {imageOptions.map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
          <button
            type='submit'
            className='mt-7 rounded-lg bg-[#333333] p-4 text-[#FFF6EE] transition-all hover:bg-[#001120] hover:text-[#FFF6EE]'
          >
            {addProduct}
          </button>
        </form>
      </div>

      {infoText && <p className='mt-5 text-center text-red-500'>{infoText}</p>}

      {isSearched && addedItems.length > 0 && (
        <div className='mt-10'>
          <h3 className='text-xl font-bold'>{addedItemsLabel}</h3>
          <ul>
            {addedItems.map((item, index) => (
              <li
                key={index}
                className='mb-3 flex items-center justify-center gap-1'
              >
                <span>{item.item}</span>
                <button
                  onClick={() => handleQuantityChange(index, -1)}
                  className='rounded-lg bg-[#333333] p-2 text-[#FFF6EE] transition-all hover:bg-[#001120] hover:text-[#FFF6EE]'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(index, 1)}
                  className='rounded-lg bg-[#333333] p-2 text-[#FFF6EE] transition-all hover:bg-[#001120] hover:text-[#FFF6EE]'
                >
                  +
                </button>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className='rounded-lg bg-red-500 p-2 text-[#FFF6EE] transition-all hover:bg-red-700 hover:text-[#FFF6EE]'
                >
                  {removeProduct}
                </button>
              </li>
            ))}
          </ul>
          <div className='m-auto mt-10 max-w-2xl'>
            <OrderForm
              labelName={labelName}
              labelEmail={labelEmail}
              labelMessage={labelMessage}
              btnOrder={btnOrder}
              btnOrdering={btnOrdering}
              success={success}
              error={error}
              addedItems={addedItems}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductsOrder
