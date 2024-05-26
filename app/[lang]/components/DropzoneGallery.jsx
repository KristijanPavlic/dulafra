'use client'

import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { getSignature, saveToDatabase } from '../_action'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DropzoneGallery = ({ className }) => {
  const [files, setFiles] = useState([])
  const [rejected, setRejected] = useState([])
  const [alertMessage, setAlertMessage] = useState(null)
  const [addingFiles, setAddingFiles] = useState(false)

  const folderId = 'gallery'

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles(previousFiles => [
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
      'video/*': []
    },
    maxSize: 1024 * 1024 * 100, // 100MB
    maxFiles: 10,
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
    if (files.length === 0) return

    for (const file of files) {
      const { timestamp, signature } = await getSignature(folderId)

      const formData = new FormData()

      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('folder', folderId)
      formData.append('resource_type', 'video')

      const endpoint = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`

      try {
        setAddingFiles(true)
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const data = await response.json()
          setAddingFiles(false)

          await saveToDatabase({
            version: data.version,
            signature: data.signature,
            public_id: data.public_id
          })

          toast.success('Dodavanje videa uspješno')
        } else {
          toast.error('Greška pri dodavanju videa')
        }
      } catch (error) {
        console.error('Greška pri dodavanju videa:', error)
        toast.error('Dogodila se greška pri dodavanju videa')
      }
    }

    setFiles([]) // Clear the files array after successful uploads
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
            <p>Ovdje ispustite videe ...</p>
          ) : (
            <p>
              Ovdje privucite i ispustite videe ili kliknite za odabir videa
            </p>
          )}
        </div>
      </div>

      {alertMessage && (
        <div
          className={`mt-4 p-2 text-center ${alertMessage.includes('failed') ? 'text-red-500' : 'text-green-500'}`}
        >
          {alertMessage}
        </div>
      )}

      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Pregled</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 rounded-md border border-rose-400 px-3 text-[12px] font-bold uppercase tracking-wider text-[#333333] transition-colors hover:bg-rose-400 hover:text-white'
          >
            Ukloni sve dodate videe
          </button>
          <button
            type='submit'
            className='ml-auto mt-1 rounded-md border border-[#001120] px-3 text-[12px] font-bold uppercase tracking-wider text-[#333333] transition-colors hover:bg-[#001120] hover:text-white disabled:cursor-not-allowed disabled:bg-gray-400'
            disabled={files.length === 0 || addingFiles}
          >
            {addingFiles ? 'Dodavanje videa...' : 'Dodaj videe'}
          </button>
        </div>

        <h3 className='title mt-10 border-b border-black pb-3 text-lg font-semibold text-[#333333]'>
          Prihvaćeni videi
        </h3>
        <ul className='mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
          {files.map(file => (
            <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
              <video
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                controls
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

        <h3 className='title mt-24 border-b border-black pb-3 text-lg font-semibold text-stone-600'>
          Neprihvaćeni videi
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

export default DropzoneGallery
