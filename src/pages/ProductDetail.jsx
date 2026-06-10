import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { ROUTES } from '../utils/constants'

const ProductDetail = ({ productKey }) => {
  const { t } = useTranslation()
  const { ref: heroRef, isInView: heroInView } = useScrollAnimation()
  const { ref: descRef, isInView: descInView } = useScrollAnimation()
  const { ref: featuresRef, isInView: featuresInView } = useScrollAnimation()
  const { ref: galleryRef, isInView: galleryInView } = useScrollAnimation()

  // Map product keys to translation keys
  const productMap = {
    'solar': 'solar',
    'inverters': 'inverters',
    'cables': 'cables',
    'structures': 'structures',
    'extras': 'extras',
  }

  const transKey = productMap[productKey] || 'solar'

  // Get product images for gallery
  const galleryImages = [
    '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.03 PM1.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.04 PM2.jpeg',
    '/images/WhatsApp Image 2025-12-05 at 3.40.05 PM4.jpeg',
  ]

  const heroImage = galleryImages[0]

  return (
    <div className="w-full">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={t(`products.${transKey}.title`)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-green-primary/70 via-green-primary/60 to-yellow-primary/50" />
        </div>
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white px-4 md:px-6 lg:px-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            {t(`products.${transKey}.title`)}
          </h1>
          <p className="text-2xl md:text-3xl">{t(`products.${transKey}.subtitle`)}</p>
        </motion.div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={descRef}
            initial={{ opacity: 0, y: 30 }}
            animate={descInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="prose prose-lg max-w-none rtl:text-right ltr:text-left">
              <p className="text-xl text-gray-700 leading-relaxed">
                {t(`products.${transKey}.description`)}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 30 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {t('products.featuresTitle')}
            </h2>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <ul className="space-y-4">
                {t(`products.${transKey}.features`, { returnObjects: true }).map(
                  (feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={featuresInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 text-lg text-gray-700 rtl:text-right ltr:text-left"
                    >
                      <span className="text-green-primary text-2xl mt-1">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  )
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={galleryRef}
            initial={{ opacity: 0, y: 30 }}
            animate={galleryInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              {t('products.galleryTitle')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    alt={`${t(`products.${transKey}.title`)} ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-primary to-yellow-primary">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('common.getQuote')}
            </h2>
            <Link
              to={ROUTES.contact}
              className="inline-block px-8 py-4 bg-white text-green-primary rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {t('common.contactUs')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductDetail
