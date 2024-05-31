/* 'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='sticky top-0 z-40'>
      <div className='absolute right-0 w-fit rounded-bl-lg border-b border-l border-[#001120] bg-white p-3'>
        {i18n.locales.map(locale => (
          <div key={locale} className='transition-all hover:text-[#001120]'>
            {pathName.includes('/dashboard') || pathName.includes(locale) ? (
              ''
            ) : (
              <Link href={redirectedPathName(locale)}>
                {locale.toUpperCase()}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
};
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  const pathName = usePathname()
  const [localePath, setLocalePath] = useState('/')

  useEffect(() => {
    if (pathName) {
      const segments = pathName.split('/')
      setLocalePath(segments.join('/'))
    }
  }, [pathName])

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  return (
    <div className='sticky top-0 z-40'>
      <div className='absolute right-0 w-fit rounded-bl-lg border-b border-l border-[#001120] bg-white p-3'>
        {i18n.locales.map(locale => (
          <div key={locale}>
            {pathName &&
            !pathName.includes('/dashboard') &&
            !pathName.includes(locale) ? (
              <Link href={redirectedPathName(locale)}>
                {locale.toUpperCase()}
              </Link>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
