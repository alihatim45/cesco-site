import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useParallax } from '../hooks/useParallax'
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
import FAQ from '../components/FAQ'

const Counter = ({ end, suffix = '', className = 'text-white' }) => {
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
      <motion.div className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-2 ${className}`}>
        {displayValue}
        {suffix}
      </motion.div>
    </motion.div>
  )
}

const Home = () => {
  const { t } = useTranslation()
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation()
  const { ref: heroParallaxRef, y: heroParallaxY } = useParallax(80)
  const { ref: aboutRef, isInView: aboutInView } = useScrollAnimation()
  const { ref: productsRef, isInView: productsInView } = useScrollAnimation()
  const { ref: contactRef, isInView: contactInView } = useScrollAnimation()
  const { ref: galleryRef, isInView: galleryInView } = useScrollAnimation()
  const { ref: ctaRef, isInView: ctaInView } = useScrollAnimation()
  const { ref: faqRef, isInView: faqInView } = useScrollAnimation()

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
    { key: 'solar', route: ROUTES.productSolar, Icon: SolarPanelIcon, image: '/images/ja-solar-720w.jpeg' },
    { key: 'inverters', route: ROUTES.productInverters, Icon: InverterIcon, image: '/images/huawei-inverter.jpeg' },
    { key: 'cables', route: ROUTES.productCables, Icon: CableIcon, image: '/images/dc-cable-red-black.jpeg' },
    { key: 'structures', route: ROUTES.productStructures, Icon: StructureIcon, image: '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg' },
    { key: 'extras', route: ROUTES.productExtras, Icon: ExtrasIcon, image: '/images/suntree-dc-breaker.jpeg' },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        ref={heroParallaxRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Parallax background layer — subtle scroll-linked drift, transform-only */}
        <motion.div
          className="absolute inset-0 z-0 scale-110"
          style={{
            y: heroParallaxY,
            backgroundImage: 'url("/images/WhatsApp Image 2025-12-13 at 1.27.02 PM.jpeg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Rich overlay keeps the photography while making the message effortless to read. */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#082416]/75 via-[#0a2919]/62 to-[#061a10]/82" />
        <div className="hero-orb z-[1] w-80 h-80 bg-yellow-primary/20 -top-28 -right-20" />
        <div className="hero-orb z-[1] w-96 h-96 bg-green-primary/30 -bottom-44 -left-24" />
        
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
              <div className="section-kicker mb-6">
                <span className="h-2 w-2 rounded-full bg-yellow-primary shadow-[0_0_12px_#fec819]" />
                <span>{t('common.companyName')}</span>
              </div>
              <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.25] tracking-tight">
                {t('home.hero.title')}
              </h1>
              <p className="hero-text text-lg md:text-2xl mb-9 leading-relaxed text-white/85 max-w-3xl mx-auto">
                {t('home.hero.subtitle')}
              </p>
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  to={ROUTES.contact}
                  className="btn-animated px-8 py-4 bg-white text-green-primary rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  {t('home.hero.ctaPrimary')}
                </Link>
                <Link
                  to={ROUTES.contact}
                  className="btn-animated px-8 py-4 bg-yellow-primary text-gray-900 rounded-full font-bold text-lg hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  {t('home.hero.ctaSecondary')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Counters Section */}
      <section className="relative -mt-8 z-20 px-4 md:px-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_22px_50px_-28px_rgba(14,62,34,0.5)] backdrop-blur-xl">
            <div className="py-7 md:py-9 bg-white/80">
              <Counter end={50} suffix="+" className="text-gray-900" />
              <p className="text-xl text-gray-700 mt-2 text-center">{t('home.counters.projects')}</p>
            </div>
            <div className="py-7 md:py-9 bg-white/80">
              <Counter end={200} suffix="+" className="text-gray-900" />
              <p className="text-xl text-gray-700 mt-2 text-center">{t('home.counters.clients')}</p>
            </div>
            <div className="py-7 md:py-9 bg-white/80">
              <Counter end={10} suffix="+" className="text-gray-900" />
              <p className="text-xl text-gray-700 mt-2 text-center">{t('home.counters.years')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator CTA Section */}
      <section className="py-24 bg-[#0c281a] mt-16 relative overflow-hidden">
        <div className="absolute w-[34rem] h-[34rem] rounded-full bg-green-primary/20 blur-3xl -top-48 -right-40" />
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
                className="btn-animated inline-flex items-center gap-2 px-10 py-4 bg-yellow-primary text-gray-900 rounded-xl font-bold text-xl hover:bg-yellow-primary/90 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
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
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="about-spotlight grid overflow-hidden rounded-[2rem] bg-[#0e2c1d] shadow-[0_26px_60px_-32px_rgba(9,52,28,0.55)] lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] overflow-hidden lg:min-h-[390px]">
                <img
                  src="/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg"
                  alt="Solar project"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#092016]/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 start-6 flex items-center gap-3 text-white">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-primary shadow-[0_0_15px_#fec819]" />
                  <span className="text-sm font-bold">CESCO</span>
                </div>
              </div>
              <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <span className="mb-5 text-sm font-bold tracking-wide text-yellow-primary">CESCO SOLAR</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-5">
                  {t('about.title')}
                </h2>
                <p className="text-base md:text-lg text-green-50/75 mb-8 leading-8 text-start">
                  {t('about.story.p1').substring(0, 200)}...
                </p>
                <div>
                <Link
                  to={ROUTES.about}
                  className="btn-animated inline-flex items-center gap-3 px-7 py-3.5 bg-yellow-primary text-[#13291c] rounded-full font-bold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg"
                >
                  {t('common.learnMore')}
                  <span className="ltr:hidden" aria-hidden="true">←</span>
                  <span className="rtl:hidden" aria-hidden="true">→</span>
                </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-24 bg-[#0e2c1d] relative overflow-hidden">
        <div className="absolute -top-44 -left-32 h-96 w-96 rounded-full bg-green-primary/20 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              {t('home.services.title')}
            </h2>
            <p className="text-xl text-green-50/65">{t('home.services.subtitle')}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((serviceNum, index) => (
              <motion.div
                key={serviceNum}
                initial={{ opacity: 0, y: 30 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="service-feature-card group relative min-h-[285px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-300"
              >
                <span className="absolute -top-8 end-4 text-8xl font-extrabold leading-none text-white/[0.06] transition-transform duration-500 group-hover:scale-110">
                  0{serviceNum}
                </span>
                <div className="relative flex items-center justify-between gap-4 mb-8">
                  <div className="icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f] shadow-lg shadow-black/10">
                    {serviceNum === 1 && <DesignIcon size={30} />}
                    {serviceNum === 2 && <InstallIcon size={30} />}
                    {serviceNum === 3 && <MaintenanceIcon size={30} />}
                    {serviceNum === 4 && <ConsultingIcon size={30} />}
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 group-hover:border-yellow-primary group-hover:bg-yellow-primary group-hover:text-[#15321f]">
                    <span className="ltr:hidden" aria-hidden="true">←</span>
                    <span className="rtl:hidden" aria-hidden="true">→</span>
                  </span>
                </div>
                <h3 className="relative text-lg font-extrabold text-white mb-3 leading-7 text-start">
                  {t(`services.list.${serviceNum}.title`)}
                </h3>
                <p className="relative text-green-50/65 text-sm leading-6 text-start">
                  {t(`services.list.${serviceNum}.description`)}
                </p>
                <span className="absolute inset-x-7 bottom-0 h-1 origin-start scale-x-0 rounded-full bg-yellow-primary transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={ROUTES.services}
              className="btn-animated inline-block px-8 py-3 bg-yellow-primary text-gray-900 rounded-full font-bold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.viewDetails')} - {t('nav.services')}
            </Link>
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-white">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 30 }}
                animate={productsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -9 }}
                className="product-spotlight-card group relative overflow-hidden rounded-[1.6rem] bg-[#102b1c] shadow-lg transition-all duration-300"
              >
                <div className="relative h-44 overflow-hidden">
                  <img src={product.image} alt={t(`products.${product.key}.title`)} className="h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#102b1c] via-[#102b1c]/20 to-transparent" />
                  <div className="absolute bottom-4 start-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur">
                    <product.Icon size={25} />
                  </div>
                </div>
                <div className="p-6 pt-3">
                  <h3 className="text-xl font-extrabold text-white mb-3 text-start leading-7">
                    {t(`products.${product.key}.title`)}
                  </h3>
                  <p className="text-green-50/65 text-sm leading-6 text-start mb-5">
                    {t(`products.${product.key}.subtitle`)}
                  </p>
                  <Link
                    to={product.route}
                    className="inline-flex items-center gap-2 text-sm font-bold text-yellow-primary hover:text-white transition-colors"
                  >
                    {t('common.learnMore')}
                    <span className="ltr:hidden" aria-hidden="true">←</span>
                    <span className="rtl:hidden" aria-hidden="true">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to={ROUTES.products}
              className="btn-animated inline-block px-8 py-3 bg-yellow-primary text-gray-900 rounded-lg font-semibold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.viewDetails')} - {t('nav.products')}
            </Link>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24 bg-[#edf5ef] overflow-hidden">
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
          <div className="project-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={galleryInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -7 }}
                className={`project-gallery-card group relative overflow-hidden rounded-[1.75rem] shadow-lg transition-all duration-300 ${
                  index === 0
                    ? 'md:col-span-2 lg:col-span-6 lg:row-span-2 h-[340px] lg:h-[520px]'
                    : 'lg:col-span-3 h-[260px]'
                }`}
              >
                <img
                  src={img}
                  alt={`Solar Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061a10]/90 via-[#061a10]/10 to-transparent" />
                <div className="absolute top-5 start-5 flex h-9 min-w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 px-3 text-xs font-bold text-white backdrop-blur">
                  0{index + 1}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className={`${index === 0 ? 'text-xl md:text-2xl' : 'text-base'} text-white font-extrabold`}>
                    {t('home.projects.imageCaption')}
                  </p>
                  <span className="mt-2 block h-0.5 w-10 rounded-full bg-yellow-primary transition-all duration-500 group-hover:w-20" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={faqRef}
            initial={{ opacity: 0, y: 50 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-gray-600">{t('faq.subtitle')}</p>
          </motion.div>
          <div className="max-w-3xl mx-auto">
            <FAQ />
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-24 bg-[#eaf4ed] border-t border-green-primary/10">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t('contact.subtitle')}
            </p>
            <Link
              to={ROUTES.contact}
              className="btn-animated inline-block px-8 py-4 bg-green-primary text-white rounded-lg font-semibold text-lg hover:bg-green-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
