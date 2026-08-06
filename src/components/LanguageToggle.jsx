import { useTranslation } from 'react-i18next'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar'
    i18n.changeLanguage(newLang)
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-3.5 py-2 rounded-full border border-green-primary/10 bg-green-primary text-white font-bold hover:bg-green-primary/90 transition-colors duration-200 text-sm"
      aria-label="Toggle language"
    >
      {i18n.language === 'ar' ? 'EN' : 'AR'}
    </button>
  )
}

export default LanguageToggle

