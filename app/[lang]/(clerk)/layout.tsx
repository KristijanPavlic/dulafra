import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dulafra foto corner',
  description:
    'Fotografiranje sportskih događaja. Izrada fotografija, šalica, postera i Fifa kartica sa slikama igrača po vlastitom izboru',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  icons: [
    {
      url: './favicon.ico',
      href: './favicon.ico'
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
