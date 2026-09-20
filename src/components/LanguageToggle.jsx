import { useTranslation } from 'react-i18next'

const BritishFlag = () => (
  <svg viewBox="0 0 60 36" className="h-5 w-[33px] overflow-hidden rounded-[3px] shadow-sm" aria-hidden="true">
    <rect width="60" height="36" fill="#012169" />
    <path d="M0 0 60 36M60 0 0 36" stroke="#fff" strokeWidth="8" />
    <path d="M0 0 60 36M60 0 0 36" stroke="#c8102e" strokeWidth="3.5" />
    <path d="M30 0v36M0 18h60" stroke="#fff" strokeWidth="12" />
    <path d="M30 0v36M0 18h60" stroke="#c8102e" strokeWidth="7" />
  </svg>
)

const SaudiFlag = () => (
  <img src="/images/flags/sa.svg" alt="" className="h-[22px] w-[33px] rounded-[3px] object-cover shadow-sm" aria-hidden="true" />
)

const LanguageToggle = () => {
  const { i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const target = isArabic
    ? { code: 'EN', country: 'gb', label: 'Switch to English' }
    : { code: 'AR', country: 'sa', label: 'التحويل إلى العربية' }

  return (
    <button type="button" onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
      className="inline-flex min-w-[90px] items-center justify-center gap-2 rounded-full border border-green-primary/10 bg-green-primary px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-primary/90 hover:shadow-md"
      aria-label={target.label} title={target.label} dir="ltr">
      {target.country === 'gb' ? <BritishFlag /> : <SaudiFlag />}
      <span>{target.code}</span>
    </button>
  )
}

export default LanguageToggle
