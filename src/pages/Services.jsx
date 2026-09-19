import { Link, useNavigate } from 'react-router-dom'
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
import ServiceStory from '../components/ServiceStory'

const Services = () => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation()

  const services = [
    { key: '1', slug: 'design', Icon: DesignIcon },
    { key: '2', slug: 'installation', Icon: InstallIcon },
    { key: '3', slug: 'maintenance', Icon: MaintenanceIcon },
    { key: '4', slug: 'consulting', Icon: ConsultingIcon },
    { key: '5', slug: 'storage', Icon: BatteryIcon },
    { key: '6', slug: 'supply', Icon: SupplyIcon },
    { key: '7', slug: 'feasibility', Icon: AnalysisIcon },
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-600">{t('services.subtitle')}</p>
          </motion.div>
        </div>
      </section>

      {/* Scroll-driven services showcase */}
      <ServiceStory services={services} t={t} language={i18n.language} />


      {/* Services Grid */}
      <section className="py-24 bg-[#0e2c1d] relative overflow-hidden">
        <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-green-primary/25 blur-3xl" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 30 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/services/${service.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') navigate(`/services/${service.slug}`)
                }}
                role="link"
                tabIndex={0}
                className="inner-service-card group relative min-h-[300px] cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-sm transition-all duration-300"
              >
                <span className="absolute -top-8 end-5 text-8xl font-extrabold leading-none text-white/[0.06]">0{service.key}</span>
                <div className="icon-pop relative mb-7 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f] shadow-lg shadow-black/10">
                  <service.Icon size={32} />
                </div>
                <h3 className="relative text-xl font-extrabold text-white mb-4 leading-8 text-start">
                  {t(`services.list.${service.key}.title`)}
                </h3>
                <p className="relative text-green-50/65 leading-7 text-start">
                  {t(`services.list.${service.key}.description`)}
                </p>
                <Link to={`/services/${service.slug}`} className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-yellow-primary transition-colors hover:text-white">
                  {i18n.language === 'ar' ? 'تفاصيل الخدمة' : 'Service details'}
                  <span aria-hidden="true">{i18n.language === 'ar' ? '←' : '→'}</span>
                </Link>
                <span className="absolute inset-x-8 bottom-0 h-1 origin-start scale-x-0 rounded-full bg-yellow-primary transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Services
