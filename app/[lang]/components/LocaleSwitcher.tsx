'use client'

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
    <div className='sticky top-0 z-50'>
      <ul className='absolute right-0 p-3 rounded-bl-lg bg-white w-fit border-[#001120] border-l border-b'>
        {i18n.locales.map(locale => (
          <li key={locale} className='transition-all hover:text-[#001120]'>
            {pathName.includes('/dashboard') || pathName.includes(locale) ? (
              ''
            ) : (
              <Link href={redirectedPathName(locale)}>
                {locale.toUpperCase()}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
