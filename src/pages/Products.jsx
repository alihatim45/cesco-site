import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ROUTES } from '../utils/constants'
import AnimatedTabs from '../components/AnimatedTabs'
import {
  SolarPanelIcon,
  InverterIcon,
  CableIcon,
  StructureIcon,
  ExtrasIcon,
} from '../components/SolarIcons'
import ThreeDMarquee from '../components/ThreeDMarquee'
import ProductInlineDetails from '../components/ProductInlineDetails'

const MARQUEE_IMAGES = [
  '/images/jinko-bifacial-720w.jpeg',
  '/images/huawei-inverter.jpeg',
  '/images/dc-cable-red-black.jpeg',
  '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
  '/images/suntree-dc-breaker.jpeg',
  '/images/ja-solar-720w.jpeg',
  '/images/goodwe-inverter.jpeg',
  '/images/mc4-connectors.jpeg',
  '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM8.jpeg',
  '/images/dc-isolator-switch.jpeg',
  '/images/aiko-comet-620w.jpeg',
  '/images/growatt-hybrid.jpeg',
  '/images/suntree-dc-spd.jpeg',
  '/images/WhatsApp Image 2025-12-05 at 3.40.08 PM3.jpeg',
  '/images/dc-isolator-range.jpeg',
  '/images/jinko-monofacial-635w.jpeg',
  '/images/deye-hybrid.jpeg',
  '/images/suntree-dc-mccb.jpeg',
  '/images/WhatsApp Image 2025-12-05 at 3.40.09 PM88.jpeg',
  '/images/dc-isolator-2p.jpeg',
  '/images/ja-solar-635w.jpeg',
  '/images/frecon-vfd.jpeg',
  '/images/suntree-dc-fuse.jpeg',
  '/images/WhatsApp Image 2025-12-05 at 3.40.10 PM663.jpeg',
]

const Products = () => {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = useState('solar')

  const products = [
    {
      key: 'solar',
      route: ROUTES.productSolar,
      Icon: SolarPanelIcon,
      image: '/images/jinko-bifacial-720w.jpeg',
      productShot: true,
    },
    {
      key: 'inverters',
      route: ROUTES.productInverters,
      Icon: InverterIcon,
      image: '/images/huawei-inverter.jpeg',
      productShot: true,
    },
    {
      key: 'cables',
      route: ROUTES.productCables,
      Icon: CableIcon,
      image: '/images/dc-cable-red-black.jpeg',
      productShot: true,
    },
    {
      key: 'structures',
      route: ROUTES.productStructures,
      Icon: StructureIcon,
      image: '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
      productShot: false,
    },
    {
      key: 'extras',
      route: ROUTES.productExtras,
      Icon: ExtrasIcon,
      image: '/images/suntree-dc-breaker.jpeg',
      productShot: true,
    },
  ]

  const productTabs = products.map((product, index) => ({
    title: t(`products.${product.key}.title`),
    value: product.key,
    icon: <product.Icon size={24} />,
    content: (
      <div className="cesco-product-tab-card">
        <div className={`cesco-product-tab-image ${product.productShot ? 'is-product-shot' : ''}`}>
          <img src={product.image} alt={t(`products.${product.key}.title`)} />
          <span className="cesco-product-tab-number">CESCO · 0{index + 1}</span>
        </div>
        <div className="cesco-product-tab-copy">
          <div className="cesco-product-tab-heading">
            <span aria-hidden="true"><product.Icon size={30} /></span>
            <h2>{t(`products.${product.key}.title`)}</h2>
          </div>
          <p>{t(`products.${product.key}.description`)}</p>
          <button
            type="button"
            className="cesco-product-tab-link"
            onClick={() => document.getElementById('product-live-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            {t('common.learnMore')}
            <span className="ltr:hidden" aria-hidden="true">←</span>
            <span className="rtl:hidden" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    ),
  }))

  return (
    <div className="w-full">
      <section className="products-marquee-hero" aria-labelledby="products-marquee-title">
        <ThreeDMarquee images={MARQUEE_IMAGES} />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="products-marquee-copy"
          >
            <span className="page-eyebrow">{t('products.catalog.eyebrow')}</span>
            <h1 id="products-marquee-title">{t('products.title')}</h1>
            <p>{t('products.subtitle')}</p>
            <span className="products-marquee-accent">CESCO PRODUCT SYSTEMS</span>
          </motion.div>
        </div>
      </section>

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

      <section className="pt-8 pb-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-6xl"
          >
            <AnimatedTabs
              tabs={productTabs}
              ariaLabel={t('products.title')}
              value={activeProduct}
              onValueChange={setActiveProduct}
            />
          </motion.div>

          <div className="mx-auto max-w-6xl">
            <ProductInlineDetails
              key={activeProduct}
              productKey={activeProduct}
              detailRoute={products.find((product) => product.key === activeProduct)?.route || ROUTES.productSolar}
            />
          </div>

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