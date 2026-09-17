import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ROUTES } from '../utils/constants'
import {
  SolarPanelIcon,
  InverterIcon,
  CableIcon,
  StructureIcon,
  ExtrasIcon,
} from '../components/SolarIcons'

const Products = () => {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  const products = [
    {
      key: 'solar',
      route: ROUTES.productSolar,
      Icon: SolarPanelIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg',
    },
    {
      key: 'inverters',
      route: ROUTES.productInverters,
      Icon: InverterIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.03 PM1.jpeg',
    },
    {
      key: 'cables',
      route: ROUTES.productCables,
      Icon: CableIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.04 PM2.jpeg',
    },
    {
      key: 'structures',
      route: ROUTES.productStructures,
      Icon: StructureIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
    },
    {
      key: 'extras',
      route: ROUTES.productExtras,
      Icon: ExtrasIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg',
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="page-hero py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="page-eyebrow mb-5">{t('products.catalog.eyebrow')}</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('products.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('products.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Catalogue introduction: gives the product listing an editorial, sales-focused opening. */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="catalog-intro grid overflow-hidden rounded-[2rem] bg-[#0e2c1d] shadow-[0_26px_60px_-32px_rgba(9,52,28,0.6)] lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[270px] overflow-hidden lg:min-h-[380px]">
              <img
                src="/images/jinko-bifacial-720w.jpeg"
                alt={t('products.solar.title')}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2517]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 start-6 flex items-center gap-3 text-white">
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-primary shadow-[0_0_15px_#fec819]" />
                <span className="text-sm font-bold">CESCO SOLAR</span>
              </div>
            </div>
            <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <span className="mb-5 text-sm font-bold tracking-wide text-yellow-primary">{t('products.catalog.eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-white mb-5">
                {t('products.catalog.title')}
              </h2>
              <p className="text-base md:text-lg leading-8 text-green-50/75 mb-8">
                {t('products.catalog.description')}
              </p>
              <div className="grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                {['quality', 'coverage', 'support'].map((item, index) => (
                  <div key={item} className="text-start">
                    <span className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-primary text-xs font-extrabold text-[#123321]">0{index + 1}</span>
                    <span className="text-sm font-bold leading-6 text-white">{t(`products.catalog.${item}`)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pt-8 pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -9 }}
                className="inner-product-card group relative overflow-hidden rounded-[1.75rem] bg-[#102b1c] transition-all duration-300"
              >
                <Link to={product.route}>
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image}
                      alt={t(`products.${product.key}.title`)}
                      className="img-zoom w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102b1c] via-[#102b1c]/20 to-transparent" />
                    <div className="absolute bottom-5 start-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 shadow-lg backdrop-blur">
                        <product.Icon size={28} />
                      </div>
                    </div>
                  </div>
                  <div className="p-7 pt-2">
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mb-3 text-start">
                      {t(`products.${product.key}.title`)}
                    </h3>
                    <p className="text-green-50/65 mb-5 leading-7 text-start">
                      {t(`products.${product.key}.subtitle`)}
                    </p>
                    <div>
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-yellow-primary transition-colors group-hover:text-white">
                        {t('common.learnMore')}
                        <span className="ltr:hidden" aria-hidden="true">←</span>
                        <span className="rtl:hidden" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="catalog-cta mt-16 rounded-[2rem] border border-green-primary/10 bg-[#edf5ef] p-8 md:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#123321] mb-3">{t('products.catalog.ctaTitle')}</h2>
              <p className="text-[#637268] leading-7">{t('products.catalog.ctaText')}</p>
            </div>
            <Link
              to={ROUTES.contact}
              className="btn-animated mt-6 inline-flex items-center gap-3 rounded-full bg-green-primary px-7 py-3.5 font-bold text-white shadow-lg lg:mt-0"
            >
              {t('products.catalog.ctaButton')}
              <span className="ltr:hidden" aria-hidden="true">←</span>
              <span className="rtl:hidden" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products
