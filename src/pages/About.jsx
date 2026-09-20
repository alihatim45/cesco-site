import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { COMPANY_INFO, ROUTES } from '../utils/constants'
import { VisionIcon, MissionIcon, ValuesIcon } from '../components/SolarIcons'
import PageCinematicHero from '../components/PageCinematicHero'

const About = () => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const { ref: storyRef, isInView: storyInView } = useScrollAnimation()
  const { ref: cardsRef, isInView: cardsInView } = useScrollAnimation()
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation()
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation()

  const projectImage = '/images/WhatsApp Image 2025-12-05 at 3.40.02 PM.jpeg'

  const values = [
    {
      title: isArabic ? 'الرؤية' : 'Vision',
      Icon: VisionIcon,
      description: t('about.story.vision').replace(/^(الرؤية|Vision):\s*/, ''),
    },
    {
      title: isArabic ? 'المهمة' : 'Mission',
      Icon: MissionIcon,
      description: t('about.story.mission').replace(/^(المهمة|Mission):\s*/, ''),
    },
    {
      title: t('about.story.values'),
      Icon: ValuesIcon,
      description: t('about.story.valuesDesc'),
    },
  ]
  const approach = isArabic
    ? [
        ['نبدأ بالفهم', 'نستوعب استهلاك المنشأة وأهدافها التشغيلية قبل اختيار أي حل.'],
        ['نصمم للتشغيل', 'نربط التصميم الفني باحتياج الموقع والعائد المتوقع على المدى الطويل.'],
        ['نبقى شركاء', 'نرافق المشروع بالتنفيذ والدعم والصيانة لضمان أفضل استفادة ممكنة.'],
      ]
    : [
        ['We start by understanding', 'We assess facility consumption and operational goals before choosing any solution.'],
        ['We design for operations', 'We connect the technical design to site needs and long-term expected return.'],
        ['We remain partners', 'We support delivery, operation, and maintenance for lasting value.'],
      ]

  return (
    <div className="w-full">
      <PageCinematicHero eyebrow={isArabic ? 'قصتنا وخبرتنا' : 'Our story and expertise'} title={t('about.title')} subtitle={isArabic ? 'شريك هندسي موثوق لحلول الطاقة الشمسية في القطاعات الزراعية والصناعية والتجارية.' : 'A trusted engineering partner for solar solutions across agricultural, industrial, and commercial sectors.'} primaryLabel={isArabic ? 'استكشف خدماتنا' : 'Explore our services'} primaryTo={ROUTES.services} secondaryLabel={isArabic ? 'تواصل معنا' : 'Contact us'} secondaryTo={ROUTES.contact} />
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
              {t('about.title')}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="about-story-panel grid overflow-hidden rounded-[2rem] bg-[#0e2c1d] shadow-[0_26px_60px_-32px_rgba(9,52,28,0.55)] lg:grid-cols-2">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, x: -50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="order-2 space-y-6 p-8 md:p-12 lg:p-14 rtl:lg:text-right ltr:lg:text-left"
            >
              <span className="inline-block text-sm font-bold tracking-wide text-yellow-primary">CESCO SOLAR</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                {t('about.story.title')}
              </h2>
              <p className="text-base md:text-lg text-green-50/75 leading-8">{t('about.story.p1')}</p>
              <p className="text-base md:text-lg text-green-50/75 leading-8">{t('about.story.p2')}</p>
              <p className="text-base md:text-lg text-green-50/75 leading-8">{t('about.story.p3')}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 min-h-[340px] lg:min-h-full"
            >
              <motion.img
                src={projectImage}
                alt="Solar Project"
              className="w-full h-full min-h-[340px] object-cover"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our approach */}
      <section className="bg-white py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <span className="text-sm font-bold text-green-primary">{isArabic ? 'كيف نعمل' : 'How we work'}</span>
              <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-[1.6] tracking-normal text-gray-900 md:text-[2.85rem]">{isArabic ? 'شراكة تبدأ من فهم منشأتك' : 'A partnership that begins with your facility'}</h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-600">{isArabic ? 'نقدم حلول طاقة شمسية عملية للمشاريع الزراعية والصناعية والتجارية، لأن كل منشأة تحتاج مساراً يناسبها.' : 'We deliver practical solar solutions for agricultural, industrial, and commercial projects because every facility needs a path that fits it.'}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {approach.map(([title, text], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.1 }} className="rounded-3xl border border-green-primary/10 bg-[#f4f8f4] p-6">
                  <span className="text-sm font-extrabold text-yellow-700">0{index + 1}</span>
                  <h3 className="mt-4 text-xl font-extrabold text-gray-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Vision, Mission, Values Cards */}
      <section className="py-24 bg-[#f3f7f3]">
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
                className="about-value-card group relative min-h-[250px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#123321] p-7 md:p-8 text-start flex flex-col"
              >
                <span className="absolute -top-7 end-5 text-8xl font-extrabold leading-none text-white/[0.05]">0{index + 1}</span>
                <div className="icon-pop mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f]">
                  <value.Icon size={29} />
                </div>
                <h3 className="relative text-2xl font-extrabold mb-3 text-white leading-tight">{value.title}</h3>
                {value.description && (
                  <p className="relative max-w-[34ch] text-[15px] md:text-base text-green-50/75 leading-8">{value.description}</p>
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
            <div className="about-info-panel rounded-[2rem] bg-[#0e2c1d] p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-white mb-8 text-center">
                {t('about.info.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={infoInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
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
                  <h3 className="font-semibold text-white mb-2">{t('about.info.email')}</h3>
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
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
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
                  <h3 className="font-semibold text-white mb-2">{t('about.info.phone')}</h3>
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
                  className="text-center p-6 bg-white/[0.08] rounded-2xl border border-white/10 backdrop-blur-sm"
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
                  <h3 className="font-semibold text-white mb-2">{t('about.info.address')}</h3>
                  <p className="text-green-50/70">{COMPANY_INFO.address}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="py-24 bg-[#f3f7f3]">
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
            <div className="map-wrapper rounded-3xl overflow-hidden shadow-xl">
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





