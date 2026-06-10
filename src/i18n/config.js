import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import ar from './ar.json'
import en from './en.json'

// Get saved language or default to Arabic
const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem('cesco_lang')
    if (saved === 'ar' || saved === 'en') {
      return saved
    }
  } catch (e) {
    // Ignore localStorage errors
  }
  return 'ar'
}

const initialLang = getInitialLanguage()

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: initialLang,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false,
    },
  })

// Function to update HTML direction
const updateHTMLDirection = (lng) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
}

// Update HTML direction when language changes
i18n.on('languageChanged', (lng) => {
  updateHTMLDirection(lng)
  try {
    localStorage.setItem('cesco_lang', lng)
  } catch (e) {
    // Ignore localStorage errors
  }
})

// Set initial direction immediately
updateHTMLDirection(initialLang)

export default i18n

