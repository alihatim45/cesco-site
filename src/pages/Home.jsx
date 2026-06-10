import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ROUTES } from '../utils/constants'
import {
  DesignIcon,
  InstallIcon,
  MaintenanceIcon,
  ConsultingIcon,
  SolarPanelIcon,
  InverterIcon,
  CableIcon,
  StructureIcon,
  ExtrasIcon,
  CalculatorIcon,
} from '../components/SolarIcons'

const Counter = ({ end, suffix = '' }) => {
  const count = useMotionValue(0)
  const rounded = useSpring(count, { damping: 50, stiffness: 100 })
  const [displayValue, setDisplayValue] = useState(0)

  const { ref, isInView } = useScrollAnimation()

  useEffect(() => {
    if (isInView) {
      count.set(end)
    }
  }, [isInView, end, count])

  useMotionValueEvent(rounded, 'change', (latest) => {
    setDisplayValue(Math.floor(latest))
  })

  return (
    <motion.div ref={ref} className="text-center">
      <motion.div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
        {displayValue}
        {suffix}
      </motion.div>
    </motion.div>
  )
}

const Home = () => {
  const { t } = useTranslation()
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation()
  const { ref: aboutRef, isInView: aboutInView } = useScrollAnimation()
  const { ref: productsRef, isInView: productsInView } = useScrollAnimation()
  const { ref: contactRef, isInView: contactInView } = useScrollAnimation()
  const { ref: galleryRef, isInView: galleryInView } = useScrollAnimation()
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation()

  // Solar project images
  const galleryImages = [
    '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.03 PM1.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.04 PM2.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.08 PM3.jpeg',
  ]

  const featuredProducts = [
    { key: 'solar', route: ROUTES.productSolar, Icon: SolarPanelIcon },
    { key: 'inverters', route: ROUTES.productInverters, Icon: InverterIcon },
    { key: 'cables', route: ROUTES.productCables, Icon: CableIcon },
    { key: 'structures', route: ROUTES.productStructures, Icon: StructureIcon },
    { key: 'extras', route: ROUTES.productExtras, Icon: ExtrasIcon },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url("/images/WhatsApp Image 2025-12-13 at 1.27.02 PM.jpeg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-black/35" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10 py-20">
          <div className="hero-section flex items-center justify-center min-h-[calc(100vh-5rem)]">
            {/* Centered Text Content */}
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="hero-content text-white text-center max-w-4xl mx-auto"
            >
              <h1 className="hero-text text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('home.hero.title')}
              </h1>
              <p className="hero-text text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                {t('home.hero.subtitle')}
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to={ROUTES.contact}
                  className="px-8 py-4 bg-white text-green-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  {t('home.hero.ctaPrimary')}
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="px-8 py-4 bg-yellow-primary text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  {t('home.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="py-16 bg-gradient-to-r from-green-primary to-yellow-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Counter end={50} suffix="+" />
              <p className="text-xl text-white mt-2 text-center">{t('home.counters.projects')}</p>
            </div>
            <div>
              <Counter end={200} suffix="+" />
              <p className="text-xl text-white mt-2 text-center">{t('home.counters.clients')}</p>
            </div>
            <div>
              <Counter end={10} suffix="+" />
              <p className="text-xl text-white mt-2 text-center">{t('home.counters.years')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={ctaRef}
            initial={{ opacity: 0, y: 50 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Text column */}
            <div className="text-center lg:text-start">
              <span className="inline-block px-4 py-1.5 bg-yellow-primary text-gray-900 rounded-full text-sm font-bold mb-5">
                {t('home.calculatorCta.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
                {t('home.calculatorCta.title')}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t('home.calculatorCta.subtitle')}
              </p>
              <Link
                to={ROUTES.calculator}
                className="inline-flex items-center gap-2 px-10 py-4 bg-yellow-primary text-gray-900 rounded-xl font-bold text-xl hover:bg-yellow-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('home.calculatorCta.button')}
                <span aria-hidden="true" className="ltr:hidden">←</span>
                <span aria-hidden="true" className="rtl:hidden">→</span>
              </Link>
            </div>

            {/* Visual column */}
            <div className="flex flex-col items-center justify-center text-center">
              <CalculatorIcon size={120} />
              <div className="mt-6">
                <Counter end={5000} suffix="+" />
                <p className="text-lg text-white mt-2 font-semibold">
                  {t('home.calculatorCta.stat')}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {t('home.calculatorCta.statSub')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-green-primary/10 via-white to-yellow-primary/10 rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                {t('about.story.p1').substring(0, 200)}...
              </p>
              <div className="text-center">
                <Link
                  to={ROUTES.about}
                  className="inline-block px-8 py-3 bg-green-primary text-white rounded-lg font-semibold hover:bg-green-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {t('common.learnMore')}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('home.services.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((serviceNum, index) => (
              <motion.div
                key={serviceNum}
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
              >
                <div className="mb-4 flex justify-center">
                  {serviceNum === 1 && <DesignIcon size={48} />}
                  {serviceNum === 2 && <InstallIcon size={48} />}
                  {serviceNum === 3 && <MaintenanceIcon size={48} />}
                  {serviceNum === 4 && <ConsultingIcon size={48} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {t(`services.list.${serviceNum}.title`)}
                </h3>
                <p className="text-gray-600 text-sm text-center mb-4">
                  {t(`services.list.${serviceNum}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={ROUTES.services}
              className="inline-block px-8 py-3 bg-yellow-primary text-gray-900 rounded-lg font-semibold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.viewDetails')} - {t('nav.services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={productsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={productsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.products.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('home.products.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
              >
                <div className="mb-4 flex justify-center">
                  <product.Icon size={56} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                  {t(`products.${product.key}.title`)}
                </h3>
                <p className="text-gray-600 text-center mb-6">
                  {t(`products.${product.key}.subtitle`)}
                </p>
                <div className="text-center">
                  <Link
                    to={product.route}
                    className="inline-block px-6 py-2 bg-green-primary text-white rounded-lg font-semibold hover:bg-green-primary/90 transition-all duration-200"
                  >
                    {t('common.learnMore')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={ROUTES.products}
              className="inline-block px-8 py-3 bg-yellow-primary text-gray-900 rounded-lg font-semibold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.viewDetails')} - {t('nav.products')}
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, y: 50 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.projects.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('home.projects.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={img}
                  alt={`Solar Project ${index + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-semibold">
                    {t('home.projects.imageCaption')}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-20 bg-gradient-to-br from-green-primary to-yellow-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {t('contact.subtitle')}
            </p>
            <Link
              to={ROUTES.contact}
              className="inline-block px-8 py-4 bg-white text-green-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.contactUs')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
