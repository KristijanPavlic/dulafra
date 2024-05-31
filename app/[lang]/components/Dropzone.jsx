'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { getSignature, saveToDatabase } from '../_action'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Dropzone = ({ className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [addingImages, setAddingImages] = useState(false)

  const [event, setEvent] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [field, setField] = useState('')
  let folderId = `${event}~${date}~${time}~${field}`

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
        // If allowing multiple files
        // ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    maxSize: 1024 * 1024 * 10, // 1MB
    maxFiles: 500,
    onDrop
  })

  useEffect(() => {
    // Revoke the data URIs to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  const removeRejected = name => {
    setRejected(rejected => rejected.filter(({ file }) => file.name !== name))
  }

  async function action() {
    // Only proceed if there are actually files to upload
    if (files.length === 0) return

    for (const file of files) {
      // get a signature using server action
      const { timestamp, signature } = await getSignature(folderId)

      // upload to cloudinary using the signature
      const formData = new FormData()

      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('folder', folderId)

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL

      try {
        setAddingImages(true)
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          setAddingImages(false)

          // Write to database using server actions
          await saveToDatabase({
            version: data?.version,
            signature: data?.signature,
            public_id: data?.public_id
          })

          toast.success('Dodavanje slike uspješno') // Report each file's status
        } else {
          toast.error('Greška pri dodavanju slike')
        }
      } catch (error) {
        console.error('Greška pri dodavanju slike:', error)
        toast.error('Dogodila se greška pri dodavanju slike')
      }
    }

    setEvent('')
    setDate('')
    setTime('')
    setField('')

    setFiles([])
  }

  return (
    <form action={action}>
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps({ name: 'file' })} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <ArrowUpTrayIcon className='h-5 w-5 fill-current' />
          {isDragActive ? (
            <p>Ovdje ispustite slike ...</p>
          ) : (
            <p>
              Ovdje privucite i ispustite slike ili kliknite za odabir slika
            </p>
          )}
        </div>
      </div>

      {/* Alert Message */}
      {alertMessage && (
        <div
          className={`mt-4 p-2 text-center ${alertMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
        >
          {alertMessage}
        </div>
      )}

      {/* Preview */}
      <section className='mt-10'>
        <div>
          <h2 className='title text-3xl font-semibold'>
            Kreirajte mapu za slike
          </h2>
          <div className='mb-10 mt-5'>
            <div className='grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-4 xl:grid-cols-4 xl:gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor='event' className='text-[#333333]'>
                  Event
                </label>
                <input
                  type='text'
                  id='event'
                  name='event'
                  title='Event'
                  placeholder='Open football tournament Medulin'
                  required
                  value={event}
                  onChange={e => setEvent(e.target.value)}
                  className='rounded-lg p-3 outline-[#001120]'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='date' className='text-[#333333]'>
                  Datum
                </label>
                <input
                  type='date'
                  id='date'
                  name='date'
                  title='Odaberite datum'
                  required
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className='rounded-lg p-3 outline-[#001120]'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='time' className='text-[#333333]'>
                  Vrijeme
                </label>
                <input
                  type='time'
                  id='time'
                  name='time'
                  title='Odaberite vrijeme'
                  required
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className='rounded-lg p-3 outline-[#001120]'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='field' className='text-[#333333]'>
                  Teren
                </label>
                <input
                  name='field'
                  id='field'
                  title='Odaberite teren'
                  placeholder='7A'
                  required
                  value={field}
                  onChange={e => setField(e.target.value)}
                  className='rounded-lg p-3 outline-[#001120]'
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Pregled</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-[#333333] transition-colors hover:bg-rose-400 hover:text-white'
          >
            Ukloni sve dodate slike
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border border-[#001120] px-3 text-[12px] font-bold uppercase tracking-wider text-[#333333] transition-colors hover:bg-[#001120] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400'
            /* disabled={addingImages} */
            disabled={!event || !date || !time || !field}
          >
            {addingImages ? 'Dodavanje slika...' : 'Dodaj slike'}
          </button>
        </div>

        {/* Accepted images */}
        <h3 className='title mt-10 border-b border-black pb-3 text-lg font-semibold text-[#333333]'>
          Prihvaćene slike
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview)
                }}
                className='h-full w-full rounded-md object-cover'
              />
              <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={() => removeFile(file.name)}
              >
                <XMarkIcon className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
              </button>
              <p className='mt-2 text-[12px] font-medium text-[#333333]'>
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Images */}
        <h3 className='title mt-24 border-b border-black pb-3 text-lg font-semibold text-stone-600'>
          Neprihvaćene slike
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-sm font-medium text-[#333333]'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 rounded-md border border-rose-400 px-3 py-1 text-[12px] font-bold uppercase tracking-wider text-[#333333] transition-colors hover:bg-rose-400 hover:text-white'
                onClick={() => removeRejected(file.name)}
              >
                Ukloni
              </button>
            </li>
          ))}
        </ul>
      </section>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </form>
  )
}

export default Dropzone
