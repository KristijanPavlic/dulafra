'use client'

import { useState, useEffect } from 'react'

interface OrderFormProps {
  labelName: string
  labelEmail: string
  labelMessage: string
  btnOrder: string
  btnOrdering: string
  success: string
  error: string
  addedItems: { item: string; quantity: number }[]
}

const OrderForm: React.FC<OrderFormProps> = ({
  labelName,
  labelEmail,
  labelMessage,
  btnOrder,
  btnOrdering,
  success,
  error,
  addedItems
}) => {
  const [infoText, setInfoText] = useState('')
  const [data, setData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const message = addedItems
      .map(({ item, quantity }) => `${item} - Quantity: ${quantity}`)
      .join('\n')
    setData(prevData => ({ ...prevData, message }))
  }, [addedItems])

  const sendEmail = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)

    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (response.status === 200) {
      setIsSubmitting(false)
      setInfoText(success)
      setData({
        name: '',
        email: '',
        message: ''
      })
    }

    if (response.status !== 200) {
      setIsSubmitting(false)
      setInfoText(error)
    }
  }

  const clearInputFields = (): void => {
    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('email') as HTMLInputElement
    const messageInput = document.getElementById(
      'message'
    ) as HTMLTextAreaElement

    nameInput.value = ''
    emailInput.value = ''
    messageInput.value = ''
  }

  return (
    <>
      <form
        className='flex flex-col rounded-lg border border-black'
        onSubmit={sendEmail}
      >
        <input
          className='rounded-t-lg border-b border-b-black bg-transparent p-5 focus:bg-white focus:outline-none'
          type='text'
          placeholder={labelName}
          name='name'
          id='name'
          required
          maxLength={60}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <input
          className='border-b border-b-black bg-transparent p-5 focus:bg-white focus:outline-none'
          type='email'
          placeholder={labelEmail}
          name='email'
          id='email'
          required
          maxLength={320}
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />
        <input type='hidden' name='message' value={data.message} />
        <button
          className='rounded-b-lg bg-[#001120] p-4 text-[#FFF6EE] transition-all hover:bg-[#FFF6EE] hover:text-[#001120]'
          type='submit'
          onClick={clearInputFields}
          disabled={isSubmitting}
        >
          {isSubmitting ? btnOrdering : btnOrder}
        </button>
      </form>
      <h4 id='infoContact' className='mt-4 text-center'>
        {infoText}
      </h4>
    </>
  )
}

export default OrderForm
