import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import pt from './locales/pt/translation.json'
import en from './locales/en/translation.json'

export const resources = {
  pt: { translation: pt },
  en: { translation: en },
} as const

export const supportedLngs = ['pt', 'en'] as const
export type AppLanguage = (typeof supportedLngs)[number]

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: supportedLngs as unknown as string[],
    // Normalizes "pt-BR" -> "pt" so detected values match resource keys.
    load: 'languageOnly',
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n
