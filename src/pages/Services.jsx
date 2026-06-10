import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import {
  DesignIcon,
  InstallIcon,
  MaintenanceIcon,
  ConsultingIcon,
  BatteryIcon,
  SupplyIcon,
  AnalysisIcon,
} from '../components/SolarIcons'

const Services = () => {
  const { t } = useTranslation()
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()

  const services = [
    { key: '1', Icon: DesignIcon },
    { key: '2', Icon: InstallIcon },
    { key: '3', Icon: MaintenanceIcon },
    { key: '4', Icon: ConsultingIcon },
    { key: '5', Icon: BatteryIcon },
    { key: '6', Icon: SupplyIcon },
    { key: '7', Icon: AnalysisIcon },
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
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6 flex justify-center">
                  <service.Icon size={56} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {t(`services.list.${service.key}.title`)}
                </h3>
                <p className="text-gray-700 leading-relaxed text-center rtl:text-right ltr:text-left">
                  {t(`services.list.${service.key}.description`)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services

