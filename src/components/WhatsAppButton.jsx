import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const WhatsAppButton = () => {
  const { i18n, t } = useTranslation()
  const location = useLocation()
  const isRTL = i18n.language === 'ar'
  const phoneNumber = '966552277824'
  const [formData, setFormData] = useState(null)

  // Read form data from localStorage when on contact page
  useEffect(() => {
    const readFormData = () => {
      try {
        const saved = localStorage.getItem('contactFormData')
        if (saved) {
          const data = JSON.parse(saved)
          // Only use if there's meaningful data
          if (data.name || data.phone || data.message) {
            setFormData(data)
          } else {
            setFormData(null)
          }
        } else {
          setFormData(null)
        }
      } catch (err) {
        setFormData(null)
      }
    }
    
    readFormData()
    
    // Listen for storage changes (when form is updated)
    const handleStorageChange = (e) => {
      if (e.key === 'contactFormData') {
        readFormData()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    // Also check periodically (but less frequently)
    const interval = setInterval(readFormData, 2000)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [location.pathname])

  // Create smart WhatsApp message based on current page and form data
  const getWhatsAppMessage = () => {
    const isContactPage = location.pathname === '/contact'
    
    if (isContactPage && formData) {
      // Build message with form data
      const parts = []
      
      if (formData.name) {
        parts.push(isRTL ? `الاسم: ${formData.name}` : `Name: ${formData.name}`)
      }
      if (formData.phone) {
        parts.push(isRTL ? `الجوال: ${formData.phone}` : `Phone: ${formData.phone}`)
      }
      if (formData.establishment) {
        const establishmentLabel = t(`contact.form.establishmentOptions.${formData.establishment}`)
        parts.push(isRTL ? `نوع المنشأة: ${establishmentLabel}` : `Establishment: ${establishmentLabel}`)
      }
      if (formData.message) {
        parts.push(isRTL ? `الرسالة: ${formData.message}` : `Message: ${formData.message}`)
      }
      
      if (parts.length > 0) {
        return parts.join('\n')
      }
    }
    
    // Default messages
    if (isContactPage) {
      return isRTL
        ? 'مرحباً، أود الاستفسار عن خدمات الطاقة الشمسية'
        : 'Hello, I would like to inquire about solar energy services'
    }
    
    return isRTL
      ? 'مرحباً، أود الاستفسار عن خدماتكم'
      : 'Hello, I would like to inquire about your services'
  }

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(getWhatsAppMessage())}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#20BA5A] transition-colors duration-200"
      style={{
        bottom: '24px',
        [isRTL ? 'left' : 'right']: '24px',
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      aria-label={isRTL ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
    >
      <svg
        className="w-8 h-8"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.372a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
  )
}

export default WhatsAppButton

