import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title:
    'Foto corner - Fotografiranje sportskih događaja i foto proizvodi po narudžbi',
  keywords: [
    'sports photography',
    'Foto Corner',
    'Dulafra',
    'event photography',
    'custom photo products',
    'photo mugs',
    'photo posters',
    'Fifa cards',
    'custom Fifa cards',
    'sports event photos',
    'photo gallery',
    'sports photography portfolio',
    'Dulafra photographer',
    'Dulafra photo products',
    'Dulafra portfolio',
    'sportska fotografija',
    'Kutak za fotografije',
    'Dulafra',
    'fotografija događaja',
    'prilagođeni foto proizvodi',
    'foto šalice',
    'foto posteri',
    'Fifa kartice',
    'prilagođene Fifa kartice',
    'fotografije sportskog događaja',
    'FOTOGALERIJA',
    'portfolio sportske fotografije',
    'Dulafra fotograf',
    'Dulafra foto proizvodi',
    'Dulafra portfelj'
  ],
  description:
    'Fotografiranje sportskih događaja. Izrada fotografija, šalica, postera i Fifa kartica sa slikama igrača po vlastitom izboru',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  robots: 'index, follow',
  icons: [
    {
      url: './favicon.ico',
      href: './favicon.ico',
      type: 'image/ico'
    }
  ],
  openGraph: {
    title:
      'Foto corner - Fotografiranje sportskih događaja i foto proizvodi po narudžbi',
    description:
      'Fotografiranje sportskih događaja. Izrada fotografija, šalica, postera i Fifa kartica sa slikama igrača po vlastitom izboru.',
    url: 'https://dulafra.com',
    type: 'website',
    images: [
      {
        url: 'https://dulafra.com/favicon.ico',
        width: 32,
        height: 32,
        alt: 'Foto Corner'
      }
    ]
  }
}

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode
  params: { lang: string }
}) {
  const lang = params.lang

  return (
    <ClerkProvider>
      <html lang={lang}>
        <body className={`${montserrat.className} bg-[#FFF6EE]`}>
          {children}
        </body>
      </html>
      <Analytics />
      <SpeedInsights />
    </ClerkProvider>
  )
}
