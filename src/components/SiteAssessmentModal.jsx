import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

// WhatsApp business number — same value as the floating WhatsAppButton component
const WHATSAPP_PHONE = '966552277824'

// Sector order follows CESCO market priority
const SECTOR_ORDER = ['agricultural', 'industrial', 'commercial']

const SiteAssessmentModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', sector: 'agricultural' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    const required = t('calculator.inputs.required')
    if (!formData.name.trim()) next.name = required
    if (!formData.phone.trim()) next.phone = required
    if (!formData.city.trim()) next.city = required
    if (!formData.sector) next.sector = required
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const sectorLabel = t(`siteAssessment.sectorOptions.${formData.sector}`)
    const message = t('siteAssessment.whatsappMessage')
      .replace('{name}', formData.name)
      .replace('{sector}', sectorLabel)
      .replace('{city}', formData.city)
      .replace('{phone}', formData.phone)
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank')
    onClose()
  }

  const inputClass =
    'border border-gray-300 rounded-xl px-4 py-3 w-full focus:border-green-primary focus:outline-none focus:ring-2 focus:ring-green-primary/20 transition-colors'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Card */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label={t('siteAssessment.close')}
                className="absolute top-4 end-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Top accent bar */}
              <div className="w-12 h-1.5 bg-gradient-to-r from-green-primary to-yellow-primary rounded-full mb-6" />

              <h2 className="text-2xl font-bold text-gray-900 mb-2 text-start">
                {t('siteAssessment.title')}
              </h2>
              <p className="text-gray-500 text-sm mb-6 text-start">{t('siteAssessment.subtitle')}</p>

              <div className="space-y-4">
                <div className="text-start">
                  <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                    {t('siteAssessment.name')}
                  </label>
                  <input name="name" value={formData.name} onChange={handleChange} className={inputClass} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="text-start">
                  <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                    {t('siteAssessment.phone')}
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div className="text-start">
                  <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                    {t('siteAssessment.city')}
                  </label>
                  <input name="city" value={formData.city} onChange={handleChange} className={inputClass} />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div className="text-start">
                  <label className="block text-gray-700 font-semibold mb-1.5 text-sm">
                    {t('siteAssessment.sector')}
                  </label>
                  <select name="sector" value={formData.sector} onChange={handleChange} className={inputClass}>
                    {SECTOR_ORDER.map((s) => (
                      <option key={s} value={s}>
                        {t(`siteAssessment.sectorOptions.${s}`)}
                      </option>
                    ))}
                  </select>
                  {errors.sector && <p className="text-red-500 text-sm mt-1">{errors.sector}</p>}
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors duration-200 mt-6"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51c-.173-.008-.371-.01-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347zM11.999 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.878-1.42A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.522 2 11.999 2z" />
                </svg>
                {t('siteAssessment.submit')}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SiteAssessmentModal

