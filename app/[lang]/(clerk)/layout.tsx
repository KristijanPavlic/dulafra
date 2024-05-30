import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dulafra foto corner',
  description: 'Dulafra foto corner',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  icons: [
    {
      url: './icon.png',
      href: './icon.png'
    }
  ]
}

const ClerkLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-full items-center justify-center py-10 lg:py-32'>
      {children}
    </div>
  )
}

export default ClerkLayout
