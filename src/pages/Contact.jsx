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
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div ref={infoRef} initial={{ opacity: 0, y: 30 }} animate={infoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-[2.5rem] bg-[#0e2c1d] text-white shadow-[0_30px_70px_-35px_rgba(6,42,22,.7)]">
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-green-primary/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-yellow-primary/10 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
              <div className={`p-8 md:p-12 lg:p-16 ${isRTL ? 'text-right' : 'text-left'}`}>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-yellow-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isRTL ? 'لنبقَ على تواصل' : 'LET’S CONNECT'}</span>
                <h2 className="mt-6 max-w-xl text-4xl font-black leading-[1.3] tracking-tight md:text-5xl md:leading-[1.28]">{isRTL ? <>فكرة واضحة.<br /><span className="text-yellow-primary">خطوة أقرب.</span></> : <>A clear idea.<br /><span className="text-yellow-primary">One step closer.</span></>}</h2>
                <p className="mt-6 max-w-md text-base leading-8 text-green-50/65">{isRTL ? 'شاركنا احتياج منشأتك، وسيساعدك فريق CESCO في الوصول إلى الحل الأنسب.' : 'Tell us what your facility needs and the CESCO team will help shape the right solution.'}</p>
                <div className="mt-12 flex items-center gap-3 text-xs font-semibold text-green-50/45"><span className="h-px w-12 bg-yellow-primary/60" /> CESCO SOLAR · RIYADH</div>
              </div>
              <div className="border-t border-white/10 p-8 md:p-12 lg:border-s lg:border-t-0 lg:p-16">
                <div className="divide-y divide-white/10">
                  <motion.a whileHover={{ x: isRTL ? -6 : 6 }} href={`mailto:${COMPANY_INFO.email}`} className="group flex items-center justify-between gap-5 py-6 first:pt-0">
                    <div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">01 · {t('contact.info.email')}</span><strong className="mt-2 block text-lg text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.email}</strong></div><span className="text-2xl text-yellow-primary">↗</span>
                  </motion.a>
                  <motion.a whileHover={{ x: isRTL ? -6 : 6 }} href={`tel:${COMPANY_INFO.phone}`} className="group flex items-center justify-between gap-5 py-6">
                    <div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">02 · {t('contact.info.phone')}</span><strong className="mt-2 block text-lg text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.phone}</strong></div><span className="text-2xl text-yellow-primary">↗</span>
                  </motion.a>
                  <motion.a whileHover={{ x: isRTL ? -6 : 6 }} href="https://www.google.com/maps/search/?api=1&query=PQM3%2B36%20Ar%20Rawdah%2C%20Riyadh" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 py-6 last:pb-0">
                    <div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">03 · {t('contact.info.address')}</span><strong className="mt-2 block max-w-xs text-base leading-7 text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.address}</strong></div><span className="text-2xl text-yellow-primary">↗</span>
                  </motion.a>
                </div>
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
      <section className="relative overflow-hidden bg-[#eaf4ed] py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <div className="contact-form-shell relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-[#0e2c1d] p-7 shadow-[0_30px_70px_-35px_rgba(6,42,22,.7)] md:p-12">
              <h2 className="mb-3 text-center text-3xl font-black text-white md:text-4xl">
                {t('contact.title')}
              </h2>
              <p className="mb-8 text-center text-sm leading-7 text-green-50/60">{isRTL ? 'أرسل بياناتك وسيتواصل معك فريق CESCO بالخطوة المناسبة.' : 'Share your details and the CESCO team will guide you to the right next step.'}</p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-group">
                  <label className="form-label mb-2 block font-semibold text-green-50/85">
                    {t('contact.form.name')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input w-full rounded-xl border bg-white/[0.07] px-4 py-3.5 text-white placeholder:text-white/40 ${
                      errors.name ? 'border-red-500' : 'border-white/15'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-primary/70 focus:border-yellow-primary/60`}
                    placeholder={t('contact.form.name')}
                  />
                  {errors.name && (
                    <p className="form-error mt-1 text-sm text-red-300">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label mb-2 block font-semibold text-green-50/85">
                    {t('contact.form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input form-input-email w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-white/15'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-primary/70 focus:border-yellow-primary/60`}
                    placeholder={t('contact.form.email')}
                  />
                  {errors.email && (
                    <p className="form-error mt-1 text-sm text-red-300">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label mb-2 block font-semibold text-green-50/85">
                    {t('contact.form.phone')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-input w-full rounded-xl border bg-white/[0.07] px-4 py-3.5 text-white placeholder:text-white/40 ${
                      errors.phone ? 'border-red-500' : 'border-white/15'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-primary/70 focus:border-yellow-primary/60`}
                    placeholder={t('contact.form.phone')}
                  />
                  {errors.phone && (
                    <p className="form-error mt-1 text-sm text-red-300">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label mb-2 block font-semibold text-green-50/85">
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
                  <label className="form-label mb-2 block font-semibold text-green-50/85">
                    {t('contact.form.message')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`form-input w-full rounded-xl border bg-white/[0.07] px-4 py-3.5 text-white placeholder:text-white/40 ${
                      errors.message ? 'border-red-500' : 'border-white/15'
                    } focus:outline-none focus:ring-2 focus:ring-yellow-primary/70 focus:border-yellow-primary/60`}
                    placeholder={t('contact.form.message')}
                  />
                  {errors.message && (
                    <p className="form-error mt-1 text-sm text-red-300">
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
                      <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="form-error mt-2 text-center text-sm text-red-300">{recaptchaError}</motion.p>
                    )}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting || !isFormValid}
                  className={`w-full rounded-xl bg-yellow-primary px-8 py-4 text-lg font-bold text-[#15321f] shadow-lg shadow-yellow-primary/10 transition-all duration-200 ${
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
            <div className={`mb-8 flex flex-col gap-3 ${isRTL ? 'text-right' : 'text-left'} md:flex-row md:items-end md:justify-between`}>
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-green-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isRTL ? 'موقعنا' : 'FIND US'}</span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102d1c] md:text-5xl">{isRTL ? 'نحن قريبون من مشروعك' : 'Close to your next project'}</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-gray-600 md:text-end">{isRTL ? COMPANY_INFO.address : COMPANY_INFO.address}</p>
            </div>
            <div className="map-wrapper overflow-hidden rounded-[2rem] border border-green-primary/10 bg-[#eaf4ed] shadow-[0_24px_60px_-34px_rgba(15,56,31,.5)]">
              <iframe
                src="https://www.google.com/maps?q=PQM3%2B36%20Ar%20Rawdah%2C%20Riyadh&output=embed"
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



