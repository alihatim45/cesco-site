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
      <section className="bg-gradient-to-br from-green-primary/20 via-white to-yellow-primary/20 py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('products.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('products.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product, index) => (
              <motion.div
                key={product.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <Link to={product.route}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={t(`products.${product.key}.title`)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                      <div className="bg-white/90 rounded-2xl p-1 shadow-lg">
                        <product.Icon size={48} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center">
                      {t(`products.${product.key}.title`)}
                    </h3>
                    <p className="text-gray-600 mb-4 text-center">
                      {t(`products.${product.key}.subtitle`)}
                    </p>
                    <div className="text-center">
                      <span className="inline-block px-6 py-2 bg-green-primary text-white rounded-lg font-semibold hover:bg-green-primary/90 transition-colors">
                        {t('common.learnMore')}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Products
