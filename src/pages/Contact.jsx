import { useState, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ReCAPTCHA from 'react-google-recaptcha'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { COMPANY_INFO, ROUTES } from '../utils/constants'
import ModernSelect from '../components/ModernSelect'
import PageCinematicHero from '../components/PageCinematicHero'

const Contact = () => {
  const { t, i18n } = useTranslation()
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation()
  const { ref: formRef, isInView: formInView } = useScrollAnimation()
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation()
  
  // Get direction for WhatsApp message content (not styling)
  const isRTL = i18n.language === 'ar'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    establishment: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [recaptchaToken, setRecaptchaToken] = useState(null)
  const [recaptchaError, setRecaptchaError] = useState('')
  const recaptchaRef = useRef(null)
  
  // reCAPTCHA site key from environment
  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''
  const isRecaptchaValid = recaptchaSiteKey && 
    recaptchaSiteKey !== 'YOUR_RECAPTCHA_SITE_KEY' && 
    recaptchaSiteKey !== 'your_recaptcha_site_key_here' &&
    recaptchaSiteKey.trim() !== ''

  // Establishment type options with icons
  // Order: Agricultural, Industrial, Commercial (CESCO sector priority)
  const establishmentOptions = [
    { value: 'agricultural', label: t('contact.form.establishmentOptions.agricultural'), icon: '🌱' },
    { value: 'industrial', label: t('contact.form.establishmentOptions.industrial'), icon: '🏭' },
    { value: 'commercial', label: t('contact.form.establishmentOptions.commercial'), icon: '🏪' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    const updatedData = { ...formData, [name]: value }
    setFormData(updatedData)
    
    // Save form data to localStorage for WhatsApp button
    try {
      localStorage.setItem('contactFormData', JSON.stringify(updatedData))
    } catch (err) {
      // Ignore localStorage errors
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.name.trim()) {
      newErrors.name = isRTL ? 'الاسم الكامل مطلوب' : 'Full name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = isRTL ? 'البريد الإلكتروني مطلوب' : 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = isRTL ? 'البريد الإلكتروني غير صحيح' : 'Invalid email format'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = isRTL ? 'رقم الجوال مطلوب' : 'Phone number is required'
    }
    if (!formData.establishment.trim()) {
      newErrors.establishment = isRTL ? 'نوع المنشأة مطلوب' : 'Establishment type is required'
    }
    if (!formData.message.trim()) {
      newErrors.message = isRTL ? 'الرسالة مطلوبة' : 'Message is required'
    }
    
    // Validate reCAPTCHA only if it's enabled
    if (isRecaptchaValid) {
      if (!recaptchaToken) {
        setRecaptchaError(t('contact.form.recaptchaRequired'))
        newErrors.recaptcha = true
      } else {
        setRecaptchaError('')
      }
    } else {
      setRecaptchaError('')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Check if form is valid for enabling submit button
  const isFormValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const basicFieldsValid = (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      emailRegex.test(formData.email) &&
      formData.phone.trim() !== '' &&
      formData.establishment.trim() !== '' &&
      formData.message.trim() !== ''
    )
    
    // If reCAPTCHA is enabled, require token. Otherwise, only basic fields are required
    if (isRecaptchaValid) {
      return basicFieldsValid && recaptchaToken !== null
    }
    return basicFieldsValid
  }, [formData, recaptchaToken, isRecaptchaValid])
  
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token)
    setRecaptchaError('')
    if (errors.recaptcha) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.recaptcha
        return newErrors
      })
    }
  }
  
  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null)
    setRecaptchaError(t('contact.form.recaptchaError'))
    if (recaptchaRef.current) {
      recaptchaRef.current.reset()
    }
  }
  
  const handleRecaptchaError = () => {
    setRecaptchaToken(null)
    setRecaptchaError(t('contact.form.recaptchaError'))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    if (!validate()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Prepare payload with reCAPTCHA token for future backend integration
    const payload = {
      ...formData,
      recaptchaToken, // Include token for backend verification
    }

    // Build WhatsApp message
    const establishmentLabel = establishmentOptions.find(
      opt => opt.value === formData.establishment
    )?.label || formData.establishment

    const whatsappMessage = isRTL
      ? `الاسم: ${formData.name}\nالبريد الإلكتروني: ${formData.email}\nرقم الجوال: ${formData.phone}\nنوع المنشأة: ${establishmentLabel}\nالرسالة: ${formData.message}`
      : `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEstablishment Type: ${establishmentLabel}\nMessage: ${formData.message}`

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/966552277824?text=${encodedMessage}`

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank')

    // Reset form after redirect
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        establishment: '',
        message: '',
      })
      setErrors({})
      // Clear localStorage
      try {
        localStorage.removeItem('contactFormData')
      } catch (err) {
        // Ignore
      }
      // Reset reCAPTCHA after successful submission (only if enabled)
      if (isRecaptchaValid) {
        setRecaptchaToken(null)
        setRecaptchaError('')
        if (recaptchaRef.current) {
          recaptchaRef.current.reset()
        }
      }
    }, 500)
  }

  const contactJourney = isRTL
    ? [
        ['شاركنا بيانات المنشأة', 'أرسل تفاصيل الاستهلاك والموقع وهدف المشروع.'],
        ['ندرس الاحتياج', 'يراجع فريقنا البيانات ويقترح الخطوة الفنية المناسبة.'],
        ['نبدأ بوضوح', 'نرتب معاينة أو استشارة ونبني عرضاً يناسب المشروع.'],
      ]
    : [
        ['Share your facility details', 'Send consumption, location, and project objectives.'],
        ['We study the need', 'Our team reviews the data and recommends the right technical step.'],
        ['Start with clarity', 'We arrange a survey or consultation and build a proposal for the project.'],
      ]
  return (
    <div className="w-full">
      <PageCinematicHero eyebrow={isRTL ? 'لنبدأ مشروعك' : 'Let’s start your project'} title={t('contact.title')} subtitle={t('contact.subtitle')} primaryLabel={isRTL ? 'اطلب استشارة' : 'Request a consultation'} primaryTo={ROUTES.contact} secondaryLabel={isRTL ? 'شاهد مشاريعنا' : 'View our projects'} secondaryTo={ROUTES.projects} />
      {/* Hero Section */}
      <section className="page-hero py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('contact.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Block */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={infoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="contact-info-panel rounded-[2rem] bg-[#0e2c1d] p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
                {t('contact.info.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-green-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="font-semibold text-white mb-2">Email</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-green-primary hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-green-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <h3 className="font-semibold text-white mb-2">Phone</h3>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-green-primary hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-green-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="font-semibold text-white mb-2">Address</h3>
                  <p className="text-green-50/70">{COMPANY_INFO.address}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Start your project */}
      <section className="bg-white py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[2rem] bg-[#123b26] shadow-[0_24px_54px_-34px_rgba(6,42,22,.64)] lg:grid-cols-[.8fr_1.2fr]">
            <div className="p-8 md:p-12">
              <span className="text-sm font-bold text-yellow-primary">{isRTL ? 'من أول رسالة إلى مشروع جاهز' : 'From first message to a ready project'}</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">{isRTL ? 'خطوات بسيطة لبدء دراسة منشأتك' : 'Simple steps to begin your facility study'}</h2>
              <a href="https://wa.me/966552277824" target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-yellow-primary px-6 py-3 font-bold text-[#15321f] transition-transform hover:scale-105">{isRTL ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</a>
            </div>
            <div className="border-t border-white/10 p-8 md:p-12 lg:border-s lg:border-t-0">
              <div className="space-y-5">{contactJourney.map(([title, text], index) => <div key={title} className="flex gap-4"><span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-yellow-primary/45 text-sm font-bold text-yellow-primary">0{index + 1}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 leading-7 text-green-50/65">{text}</p></div></div>)}</div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Form */}
      <section className="py-24 bg-[#f3f7f3]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="modern-surface bg-white rounded-[2rem] p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                {t('contact.title')}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">
                    {t('contact.form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-primary`}
                    placeholder={t('contact.form.name')}
                  />
                  {errors.name && (
                    <p className="form-error text-red-500 text-sm mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">
                    {t('contact.form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input form-input-email w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-primary`}
                    placeholder={t('contact.form.email')}
                  />
                  {errors.email && (
                    <p className="form-error text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">
                    {t('contact.form.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-primary`}
                    placeholder={t('contact.form.phone')}
                  />
                  {errors.phone && (
                    <p className="form-error text-red-500 text-sm mt-1">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">
                    {t('contact.form.establishment')} <span className="text-red-500">*</span>
                  </label>
                  <ModernSelect
                    label={t('contact.form.establishment')}
                    value={formData.establishment}
                    onChange={handleChange}
                    options={establishmentOptions}
                    required={true}
                    error={errors.establishment}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label block text-gray-700 font-semibold mb-2">
                    {t('contact.form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`form-input w-full px-4 py-3 rounded-lg border ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-primary`}
                    placeholder={t('contact.form.message')}
                  />
                  {errors.message && (
                    <p className="form-error text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* reCAPTCHA */}
                {isRecaptchaValid ? (
                  <div className="flex flex-col items-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={recaptchaSiteKey}
                      onChange={handleRecaptchaChange}
                      onExpired={handleRecaptchaExpired}
                      onError={handleRecaptchaError}
                      hl={i18n.language}
                      theme="light"
                    />
                    {recaptchaError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="form-error text-red-500 text-sm mt-2 text-center"
                      >
                        {recaptchaError}
                      </motion.p>
                    )}
                  </div>
                ) : (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <p className="text-yellow-800 text-sm">
                      {isRTL 
                        ? '⚠️ تحذير: لم يتم إعداد reCAPTCHA. يرجى إضافة VITE_RECAPTCHA_SITE_KEY في ملف .env للحماية من الرسائل المزعجة.'
                        : '⚠️ Warning: reCAPTCHA is not configured. Please add VITE_RECAPTCHA_SITE_KEY in .env file for spam protection.'}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full px-8 py-4 bg-green-primary text-white rounded-lg font-semibold text-lg transition-all duration-200 shadow-lg ${
                    isSubmitting || !isFormValid
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-green-primary/90 hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                </button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-100 text-green-800 rounded-lg text-center"
                  >
                    {t('contact.form.success')}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('contact.info.address')}
            </h2>
            <div className="map-wrapper rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.669959635035!2d46.7253173!3d24.7403836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02174a53ce27%3A0x3c436a3d79042f2!2sPQM3%2B36%20Ar%20Rawdah%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Contact


