import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const Vision = () => {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  const heroImage = '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg'

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Solar Panels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-primary/80 via-green-primary/70 to-yellow-primary/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 md:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t('vision.title')}
          </h1>
          <p className="text-2xl md:text-3xl mb-8">{t('vision.subtitle')}</p>
        </motion.div>
      </section>

      {/* Vision Text Card */}
      <section className="py-20 bg-gradient-to-br from-green-primary/10 via-white to-yellow-primary/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 lg:p-16">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed text-center rtl:text-right ltr:text-left">
                {t('vision.text')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Vision

