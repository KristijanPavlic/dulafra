import type { Locale } from '@/i18n.config'

const dictionaries: { [key: string]: () => Promise<any> } = {
  hr: () => import('@/dictionaries/hr.json').then(module => module.default),
  en: () => import('@/dictionaries/en.json').then(module => module.default)
}

export const getDictionary = async (locale: Locale) => {
  if (typeof locale !== 'string' || !['hr', 'en'].includes(locale)) {
    console.error(`Invalid locale '${locale}' provided.`)
    return null // Returning null for invalid locales
  }

  return dictionaries[locale]()
}
