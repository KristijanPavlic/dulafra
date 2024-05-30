import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ReactNode } from 'react'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dulafra foto corner',
  description:
    'Fotografiranje sportskih događaja. Izrada fotografija, šalica, postera i Fifa kartica sa slikama igrača po vlastitom izboru',
  authors: { name: 'Kristijan Pavlic Tumpa' },
  manifest: './manifest.json',
  icons: [
    {
      url: './icon.png',
      href: './icon.png'
    }
  ]
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
