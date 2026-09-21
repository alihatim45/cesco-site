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
import WhyChooseCesco from '../components/WhyChooseCesco'
import ProjectKineticGallery from '../components/ProjectKineticGallery'
import PremiumFAQ from '../components/PremiumFAQ'

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
  const { t, i18n } = useTranslation()
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [activeProduct, setActiveProduct] = useState(0)
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
          <motion.div ref={aboutRef} initial={{ opacity: 0, y: 34 }} animate={aboutInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75 }} className="about-modern overflow-hidden rounded-[2.25rem] bg-[#0b2a1b] text-white shadow-[0_30px_80px_-38px_rgba(8,48,26,.8)] lg:grid lg:grid-cols-[.92fr_1.08fr]">
  <div className="relative order-2 flex min-h-[480px] flex-col justify-between overflow-hidden p-8 md:p-12 lg:order-1 lg:p-14 rtl:text-right ltr:text-left">
    <div><span className="inline-flex items-center gap-3 text-xs font-black tracking-[.18em] text-yellow-primary"><i className="h-2 w-2 rounded-full bg-yellow-primary shadow-[0_0_16px_#fec819]" /> CESCO SOLAR</span><h2 className="mt-7 max-w-xl text-4xl font-black leading-[1.08] tracking-tight md:text-5xl lg:text-6xl">{t('about.title')}</h2><p className="mt-7 max-w-xl text-base leading-8 text-green-50/70 md:text-lg">{t('about.story.p1').substring(0, 210)}...</p><Link to={ROUTES.about} className="mt-9 inline-flex items-center gap-3 rounded-full bg-yellow-primary px-7 py-3.5 font-extrabold text-[#102c1c] shadow-[0_12px_28px_-12px_#fec819] transition-transform hover:-translate-y-1">{t('common.learnMore')}<span aria-hidden="true">{i18n.language === 'ar' ? '←' : '→'}</span></Link></div>
    <div className="mt-12 grid max-w-xl grid-cols-3 gap-3 border-t border-white/10 pt-6 text-start"><div><strong className="block text-2xl font-black text-white md:text-3xl">10+</strong><span className="mt-1 block text-xs text-green-50/50">{i18n.language === 'ar' ? 'سنوات خبرة' : 'Years experience'}</span></div><div><strong className="block text-2xl font-black text-white md:text-3xl">70+</strong><span className="mt-1 block text-xs text-green-50/50">{i18n.language === 'ar' ? 'عميل وشريك' : 'Clients & partners'}</span></div><div><strong className="block text-2xl font-black text-yellow-primary md:text-3xl">50+</strong><span className="mt-1 block text-xs text-green-50/50">{i18n.language === 'ar' ? 'مشروع شمسي' : 'Solar projects'}</span></div></div>
  </div>
  <div className="about-modern__visual relative order-1 min-h-[300px] overflow-hidden lg:order-2 lg:min-h-[480px]"><img src="/images/cesco-solar-cinematic.png" alt={i18n.language === 'ar' ? 'مشهد الطاقة الشمسية من CESCO' : 'CESCO solar energy scene'} className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"/><div className="absolute inset-0 bg-gradient-to-t from-[#061b10]/70 via-transparent to-[#061b10]/10"/><div className="absolute bottom-7 start-7 rounded-2xl border border-white/20 bg-[#092116]/70 px-4 py-3 backdrop-blur-md"><span className="block text-[10px] font-black uppercase tracking-[.18em] text-yellow-primary">{i18n.language === 'ar' ? 'طاقة أنظف' : 'Cleaner energy'}</span><strong className="mt-1 block text-sm text-white">{i18n.language === 'ar' ? 'مصممة لواقعك' : 'Designed for your reality'}</strong></div><span className="absolute end-7 top-7 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-bold tracking-[.18em] text-white/75 backdrop-blur">01 / CESCO</span></div>
</motion.div>
        </div>
      </section>

      <WhyChooseCesco />

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
          <div className="product-modern grid gap-5 lg:grid-cols-[1.45fr_.75fr]">
            {(() => { const product = featuredProducts[activeProduct]; return (
              <motion.div className="product-modern__feature relative grid min-h-[470px] overflow-hidden rounded-[2rem] bg-[#102b1c] shadow-[0_26px_60px_-34px_rgba(8,47,25,.75)] lg:grid-cols-[1.05fr_.95fr]" key={product.key} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35 }}>
                <div className="relative min-h-[280px] overflow-hidden"><motion.img key={product.image} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: .9, scale: 1 }} transition={{ duration: .65 }} src={product.image} alt={t(`products.${product.key}.title`)} className="h-full w-full object-cover"/><div className="absolute inset-0 bg-gradient-to-t from-[#071d11]/90 via-[#071d11]/15 to-transparent lg:bg-gradient-to-r"/><span className="absolute start-6 top-6 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-black tracking-[.18em] text-white/80 backdrop-blur">0{activeProduct + 1} / 05</span></div>
                <div className="flex flex-col justify-center p-7 md:p-10"><div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-primary text-[#102b1c] shadow-lg"><product.Icon size={30} /></div><span className="text-xs font-black tracking-[.18em] text-yellow-primary">CESCO / {i18n.language === 'ar' ? 'حلول موثوقة' : 'TRUSTED SOLUTIONS'}</span><h3 className="mt-4 text-3xl font-black leading-tight text-white md:text-4xl">{t(`products.${product.key}.title`)}</h3><p className="mt-4 max-w-md text-base leading-8 text-green-50/70">{t(`products.${product.key}.subtitle`)}</p><Link to={product.route} className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-yellow-primary px-6 py-3 font-extrabold text-[#102b1c] transition-transform hover:-translate-y-1">{t('common.learnMore')}<span aria-hidden="true">{i18n.language === 'ar' ? '←' : '→'}</span></Link></div>
              </motion.div>
            )})()}
            <div className="product-modern__rail rounded-[2rem] border border-green-primary/10 bg-[#f1f7f2] p-3 md:p-4">
              <p className="px-3 pb-3 pt-2 text-xs font-black tracking-[.16em] text-[#7a8b80]">{i18n.language === 'ar' ? 'استكشف منتجاتنا' : 'EXPLORE PRODUCTS'}</p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">{featuredProducts.map((product,index)=><button type="button" key={product.key} onClick={() => setActiveProduct(index)} className={`group flex items-center gap-3 rounded-2xl p-3 text-start transition-all duration-300 ${activeProduct === index ? 'bg-[#102b1c] text-white shadow-lg' : 'text-[#173b27] hover:bg-white'}`}><span className={`flex h-11 w-11 flex-none items-center justify-center overflow-hidden rounded-xl ${activeProduct === index ? 'bg-yellow-primary text-[#102b1c]' : 'bg-white text-green-primary'}`}><product.Icon size={23} /></span><span className="min-w-0"><strong className="block truncate text-sm font-extrabold">{t(`products.${product.key}.title`)}</strong><small className={`mt-1 block text-[11px] ${activeProduct === index ? 'text-green-50/60' : 'text-[#738278]'}`}>0{index + 1} / 05</small></span><span className="ms-auto text-lg opacity-50 transition-transform group-hover:translate-x-1">{i18n.language === 'ar' ? '←' : '→'}</span></button>)}</div>
            </div>
          </div>          <div className="text-center mt-12">
            <Link
              to={ROUTES.products}
              className="btn-animated inline-block px-8 py-3 bg-yellow-primary text-gray-900 rounded-lg font-semibold hover:bg-yellow-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.viewDetails')} - {t('nav.products')}
            </Link>
          </div>
        </div>
      </section>

      {/* Solar energy flow */}
      <section className="relative overflow-hidden border-y border-green-primary/10 bg-[#f3f7f3] py-16 md:py-20">
        <div className="absolute -start-28 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-yellow-primary/10 blur-3xl" aria-hidden="true" />
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-6xl"
          >
            <div className="mb-8 text-center">
              <span className="text-xs font-extrabold tracking-[0.2em] text-[#b88000]">CESCO ENERGY FLOW</span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#123522] md:text-4xl">
                {i18n.language === 'ar' ? 'من ضوء الشمس إلى طاقة لمشروعك' : 'From sunlight to power for your project'}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-600">
                {i18n.language === 'ar'
                  ? 'مسار مبسط يوضح توليد الطاقة وتخزينها ووصولها إلى منشأتك.'
                  : 'A simple view of how energy is generated, stored, and delivered to your facility.'}
              </p>
            </div>
            <div className="overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-[0_24px_55px_-35px_rgba(15,56,31,0.45)] md:p-6">
              <img
                src="/images/solar-flow-diagram.svg"
                alt={i18n.language === 'ar' ? 'مخطط تدفق الطاقة الشمسية من الشمس إلى المشروع' : 'Solar energy flow from sunlight to the project'}
                className="block h-auto w-full"
                loading="lazy"
              />
            </div>
          </motion.div>
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
          <ProjectKineticGallery images={galleryImages} />
          <div className="mt-10 text-center">
            <Link to={ROUTES.projects} className="btn-animated inline-flex items-center gap-3 rounded-full bg-[#0e2c1d] px-8 py-3.5 font-bold text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-[#164b30]">
              {i18n.language === 'ar' ? 'عرض جميع المشاريع' : 'View all projects'}
              <span aria-hidden="true">{i18n.language === 'ar' ? '←' : '→'}</span>
            </Link>
          </div>
        </div>
      </section>

      <PremiumFAQ />

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














