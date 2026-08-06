import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useParallax } from '../hooks/useParallax'

const Vision = () => {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()
  const { ref: heroParallaxRef, y: heroParallaxY } = useParallax(60)

  const heroImage = '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg'

  return (
    <div className="w-full">
      {/* Hero Section with Image */}
      <section ref={heroParallaxRef} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0 z-0 scale-110" style={{ y: heroParallaxY }}>
          <img
            src={heroImage}
            alt="Solar Panels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#06351d]/85 via-green-primary/70 to-[#d9a900]/55" />
        </motion.div>
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
      <section className="py-24 bg-[#0e2c1d] relative overflow-hidden">
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-green-primary/25 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 md:p-12 lg:p-16 backdrop-blur-sm">
              <span className="mb-6 inline-block text-sm font-bold tracking-wide text-yellow-primary">CESCO SOLAR</span>
              <p className="text-xl md:text-2xl text-green-50/85 leading-relaxed text-start">
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

