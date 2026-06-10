import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { COMPANY_INFO } from '../utils/constants'
import { VisionIcon, MissionIcon, ValuesIcon } from '../components/SolarIcons'

const About = () => {
  const { t } = useTranslation()
  const { ref: storyRef, isInView: storyInView } = useScrollAnimation()
  const { ref: cardsRef, isInView: cardsInView } = useScrollAnimation()
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation()
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation()

  const projectImage = '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg'

  const values = [
    {
      title: t('about.story.vision'),
      Icon: VisionIcon,
      color: 'from-green-primary to-green-primary/80',
    },
    {
      title: t('about.story.mission'),
      Icon: MissionIcon,
      color: 'from-yellow-primary to-yellow-primary/80',
    },
    {
      title: t('about.story.values'),
      Icon: ValuesIcon,
      color: 'from-green-primary to-yellow-primary',
      description: t('about.story.valuesDesc'),
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
              {t('about.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="rtl:lg:text-right ltr:lg:text-left space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">{t('about.story.p1')}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{t('about.story.p2')}</p>
              <p className="text-lg text-gray-700 leading-relaxed">{t('about.story.p3')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <motion.img
                src={projectImage}
                alt="Solar Project"
                className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                style={{ maxHeight: '600px' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={cardsRef}
            initial={{ opacity: 0, y: 50 }}
            animate={cardsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`bg-gradient-to-br ${value.color} rounded-2xl shadow-xl p-8 text-white`}
              >
                <div className="mb-4 flex justify-center">
                  <div className="bg-white/90 rounded-2xl p-1.5 shadow-md">
                    <value.Icon size={52} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center">{value.title}</h3>
                {value.description && (
                  <p className="text-center opacity-90">{value.description}</p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Information Block */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={infoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={infoInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-green-primary/10 via-white to-yellow-primary/10 rounded-2xl shadow-xl p-8 md:p-12 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                {t('about.info.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center p-6 bg-white/80 rounded-xl backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-green-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('about.info.email')}</h3>
                  <a
                    href={`mailto:${COMPANY_INFO.email}`}
                    className="text-green-primary hover:underline"
                  >
                    {COMPANY_INFO.email}
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center p-6 bg-white/80 rounded-xl backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-yellow-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('about.info.phone')}</h3>
                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="text-yellow-primary hover:underline"
                  >
                    {COMPANY_INFO.phone}
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-center p-6 bg-white/80 rounded-xl backdrop-blur-sm"
                >
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-green-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('about.info.address')}</h3>
                  <p className="text-gray-700">{COMPANY_INFO.address}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={mapRef}
            initial={{ opacity: 0, y: 30 }}
            animate={mapInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              {t('about.info.address')}
            </h2>
            <div className="map-wrapper rounded-xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.669959635035!2d46.7253173!3d24.7403836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f02174a53ce27%3A0x3c436a3d79042f2!2sPQM3%2B36%20Ar%20Rawdah%2C%20Riyadh!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
