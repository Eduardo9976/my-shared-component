import { ref, computed } from 'vue'
import enUS from './en-US.js'
import ptBR from './pt-BR.js'
import esES from './es-ES.js'
import esMX from './es-MX.js'
import frCA from './fr-CA.js'
import frFR from './fr-FR.js'
import ptPT from './pt-PT.js'

export type SupportedLocale = 'en-US' | 'pt-BR' | 'es-ES' | 'es-MX' | 'fr-CA' | 'fr-FR' | 'pt-PT'

const translations = {
  'en-US': enUS,
  'pt-BR': ptBR,
  'es-ES': esES,
  'es-MX': esMX,
  'fr-CA': frCA,
  'fr-FR': frFR,
  'pt-PT': ptPT
}

const globalLocale = ref<SupportedLocale>('en-US')

export function useTranslations() {
  const t = (key: string, params?: Record<string, string | number>) => {
    const keys = key.split('.')
    let value: any = translations[globalLocale.value]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${globalLocale.value}`)
        return key
      }
    }

    if (typeof value === 'string') {
      if (params) {
        return value.replace(/\{(\w+)\}/g, (match, param) => {
          return params[param]?.toString() || match
        })
      }
      return value
    }

    return key
  }

  const setLocale = (locale: SupportedLocale) => {
    if (locale in translations) {
      globalLocale.value = locale
    } else {
      console.warn(`Unsupported locale: ${locale}`)
    }
  }

  const getCurrentLocale = computed(() => globalLocale.value)

  const getSupportedLocales = computed(() => Object.keys(translations) as SupportedLocale[])

  return {
    t,
    setLocale,
    getCurrentLocale,
    getSupportedLocales
  }
}
