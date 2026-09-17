import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useMotionValue, useSpring, useMotionValueEvent } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import CinematicHero from '../components/CinematicHero'
import TextHoverEffect from '../components/TextHoverEffect'
import CardSpotlight from '../components/CardSpotlight'
import TracingBeam from '../components/TracingBeam'
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
  const [showAllProjects, setShowAllProjects] = useState(false)
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
    '/images/WhatsApp Image 2025-12-05 at 3.40.08 PM6.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.08 PM9.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.09 PM88.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.10 PM56.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.11 PM221.jpeg',
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
      <CinematicHero />
      <div className="cesco-signature">
        <p className="cesco-signature-caption">{t('home.cinematic.eyebrow')}</p>
        <TextHoverEffect text="CESCO" duration={0.16} />
      </div>
      <TracingBeam>

      {/* Counters Section */}
      <section id="home-overview" style={{ scrollMarginTop: "var(--navbar-height)" }} className="relative -mt-8 z-20 px-4 md:px-6">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_22px_50px_-28px_rgba(14,62,34,0.5)] backdrop-blur-xl">
            <div className="py-7 md:py-9 bg-white/80">
              <Counter end={50} suffix="+" className="text-gray-900" />
              <p className="text-xl text-gray-700 mt-2 text-center">{t('home.counters.projects')}</p>
            </div>
            <div className="py-7 md:py-9 bg-white/80">
              <Counter end={70} suffix="+" className="text-gray-900" />
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
                <Counter end={1000} suffix="+" />
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
                className="min-h-[285px]"
              >
                <Link
                  to={`/services/${['design', 'installation', 'maintenance', 'consulting'][serviceNum - 1]}`}
                  aria-label={t(`services.list.${serviceNum}.title`)}
                  className="group block h-full rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-primary focus-visible:ring-offset-4 focus-visible:ring-offset-[#0e2c1d]"
                >
                  <CardSpotlight className="service-feature-card min-h-[285px] rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-7 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-primary/35" radius={300}>
                    <span className="absolute -top-8 end-4 text-8xl font-extrabold leading-none text-white/[0.06] transition-transform duration-500 group-hover:scale-110">0{serviceNum}</span>
                    <div className="relative flex items-center justify-between gap-4 mb-8">
                      <div className="icon-pop flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f] shadow-lg shadow-black/10">
                        {serviceNum === 1 && <DesignIcon size={30} />}
                        {serviceNum === 2 && <InstallIcon size={30} />}
                        {serviceNum === 3 && <MaintenanceIcon size={30} />}
                        {serviceNum === 4 && <ConsultingIcon size={30} />}
                      </div>
                      <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 group-hover:border-yellow-primary group-hover:bg-yellow-primary group-hover:text-[#15321f]">
                        <span className="ltr:hidden" aria-hidden="true">←</span><span className="rtl:hidden" aria-hidden="true">→</span>
                      </span>
                    </div>
                    <h3 className="relative text-lg font-extrabold text-white mb-3 leading-7 text-start">{t(`services.list.${serviceNum}.title`)}</h3>
                    <p className="relative text-green-50/70 text-sm leading-6 text-start">{t(`services.list.${serviceNum}.description`)}</p>
                    <span className="absolute inset-x-7 bottom-0 h-1 origin-start scale-x-0 rounded-full bg-yellow-primary transition-transform duration-500 group-hover:scale-x-100" />
                  </CardSpotlight>
                </Link>
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
          <div className="project-showcase">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={galleryInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65 }}
              className="project-feature grid overflow-hidden rounded-[2rem] bg-[#0e2c1d] shadow-[0_28px_60px_-34px_rgba(7,44,23,0.65)] lg:grid-cols-[1.15fr_0.85fr]"
            >
              <div className="relative min-h-[330px] overflow-hidden lg:min-h-[440px]">
                <img src={galleryImages[0]} alt="Solar Project 1" className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d11]/70 via-transparent to-transparent" />
                <span className="absolute bottom-6 start-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-extrabold text-white backdrop-blur">01</span>
              </div>
              <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
                <span className="mb-5 text-sm font-bold tracking-wide text-yellow-primary">CESCO SOLAR</span>
                <h3 className="text-3xl md:text-4xl font-extrabold leading-tight text-white">{t('home.projects.imageCaption')}</h3>
                <p className="mt-5 max-w-md text-base leading-8 text-green-50/70">{t('home.projects.subtitle')}</p>
                <span className="mt-8 h-1 w-16 rounded-full bg-yellow-primary" />
              </div>
            </motion.div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
              {(showAllProjects ? galleryImages.slice(1) : galleryImages.slice(1, 6)).map((img, index) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0, y: 22 }}
                  animate={galleryInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -7 }}
                  className="project-thumbnail group relative h-[250px] overflow-hidden rounded-[1.5rem] bg-[#0e2c1d]"
                >
                  <img src={img} alt={`Solar Project ${index + 2}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071d11]/90 via-transparent to-transparent" />
                  <span className="absolute top-4 start-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xs font-bold text-white backdrop-blur">0{index + 2}</span>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="text-sm font-extrabold leading-6 text-white">{t('home.projects.imageCaption')}</p>
                    <span className="mt-3 block h-0.5 w-8 rounded-full bg-yellow-primary transition-all duration-500 group-hover:w-14" />
                  </div>
                </motion.div>
              ))}
            </div>
            {!showAllProjects && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllProjects(true)}
                  className="btn-animated inline-flex items-center gap-3 rounded-full bg-yellow-primary px-8 py-3.5 font-bold text-[#123321] shadow-lg transition-transform hover:scale-105"
                >
                  {t('common.viewDetails')} - {t('home.projects.title')}
                  <span className="ltr:hidden" aria-hidden="true">←</span>
                  <span className="rtl:hidden" aria-hidden="true">→</span>
                </button>
              </div>
            )}
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
      </TracingBeam>
    </div>
  )
}

export default Home






