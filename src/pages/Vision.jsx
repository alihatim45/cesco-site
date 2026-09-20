import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useParallax } from '../hooks/useParallax'
import { ROUTES } from '../utils/constants'
import { VisionIcon, InstallIcon, AnalysisIcon } from '../components/SolarIcons'
import PageCinematicHero from '../components/PageCinematicHero'

const VISION_CONTENT = {
  ar: {
    badge: 'رؤيتنا للمستقبل',
    lead: 'نؤمن بأن الطاقة النظيفة ليست مجرد مصدر بديل، بل قرار تشغيلي واستثماري يصنع قيمة مستدامة للمنشآت.',
    statementLabel: 'بيان الرؤية',
    statementTitle: 'نقود التحول إلى طاقة أكثر كفاءة وأثراً',
    statement: 'نسعى لأن نكون الشريك الموثوق للمشاريع الزراعية والصناعية والتجارية في رحلتها نحو الطاقة الشمسية، عبر حلول عملية تجمع بين جودة التصميم، موثوقية التنفيذ، والعائد الاقتصادي طويل المدى.',
    pillarsLabel: 'محاورنا الاستراتيجية',
    pillarsTitle: 'رؤية تُترجم إلى نتائج قابلة للقياس',
    pillars: [
      { title: 'حلول مصممة للأثر', text: 'نبدأ من احتياج المنشأة الحقيقي ونبني منظومة ترفع كفاءة الاستخدام وتدعم استمرارية التشغيل.' },
      { title: 'تنفيذ موثوق وشراكات طويلة', text: 'نختار المعدات والأنظمة بعناية، وندعم عملاءنا من الدراسة الأولى حتى التشغيل والصيانة.' },
      { title: 'نمو اقتصادي مستدام', text: 'نساعد القطاعات المستهدفة على خفض التكاليف التشغيلية وتطوير قرارات الطاقة بثقة ووضوح.' },
    ],
    journeyLabel: 'من الرؤية إلى الميدان',
    journeyTitle: 'كيف نُحدث الفرق في كل مشروع؟',
    journey: [
      ['نفهم المنشأة', 'نحلل الاستهلاك وطبيعة الموقع وأهداف العمل قبل اقتراح أي حل.'],
      ['نصمم بوضوح', 'نحوّل البيانات إلى تصميم فني وخطة تنفيذ قابلة للقياس والمتابعة.'],
      ['نواصل الشراكة', 'نرافق المشروع بالتشغيل والدعم الفني لضمان الاستفادة المستمرة من المنظومة.'],
    ],
    sectorsLabel: 'القطاعات التي نخدمها',
    sectors: ['المزارع ومشاريع المياه', 'المصانع وخطوط الإنتاج', 'المنشآت والمجمعات التجارية'],
    ctaTitle: 'لنصنع لمشروعك مساراً أوضح نحو الطاقة النظيفة',
    ctaText: 'ابدأ بدراسة فنية تناسب منشأتك واحتياجك التشغيلي.',
    ctaButton: 'تواصل مع فريقنا',
  },
  en: {
    badge: 'Our vision for the future',
    lead: 'We believe clean energy is not simply an alternative source—it is an operational and investment decision that creates enduring value for facilities.',
    statementLabel: 'Vision statement',
    statementTitle: 'Leading the transition to more efficient, impactful energy',
    statement: 'We aim to be the trusted partner for agricultural, industrial, and commercial projects on their solar journey, through practical solutions that combine quality design, dependable delivery, and long-term economic return.',
    pillarsLabel: 'Strategic pillars',
    pillarsTitle: 'A vision translated into measurable outcomes',
    pillars: [
      { title: 'Solutions designed for impact', text: 'We start with real facility needs and build systems that improve energy efficiency and operational continuity.' },
      { title: 'Dependable delivery, lasting partnerships', text: 'We select equipment and systems with care and support customers from the first study through operation and maintenance.' },
      { title: 'Sustainable economic growth', text: 'We help target sectors lower operating costs and make energy decisions with confidence and clarity.' },
    ],
    journeyLabel: 'From vision to the field',
    journeyTitle: 'How we make a difference in every project',
    journey: [
      ['Understand the facility', 'We analyse consumption, site conditions, and business goals before proposing any solution.'],
      ['Design with clarity', 'We turn data into a technical design and delivery plan that can be measured and tracked.'],
      ['Continue the partnership', 'We support commissioning and technical service to ensure ongoing benefit from the system.'],
    ],
    sectorsLabel: 'Sectors we serve',
    sectors: ['Farms and water projects', 'Factories and production lines', 'Commercial facilities and complexes'],
    ctaTitle: 'Create a clearer path to clean energy for your project',
    ctaText: 'Start with a technical study tailored to your facility and operational needs.',
    ctaButton: 'Talk to our team',
  },
}

const Vision = () => {
  const { t, i18n } = useTranslation()
  const { ref: statementRef, isInView: statementInView } = useScrollAnimation()
  const { ref: pillarRef, isInView: pillarInView } = useScrollAnimation()
  const { ref: journeyRef, isInView: journeyInView } = useScrollAnimation()
  const { ref: heroParallaxRef, y: heroParallaxY } = useParallax(60)
  const copy = VISION_CONTENT[i18n.language === 'ar' ? 'ar' : 'en']
  const icons = [VisionIcon, InstallIcon, AnalysisIcon]
  const heroImage = '/images/WhatsApp Image 2025-12-05 at 3.40.07 PM7.jpeg'

  return (
    <div className="w-full bg-[#f4f8f4]">
      <PageCinematicHero eyebrow={copy.badge} title={t('vision.title')} subtitle={copy.lead} primaryLabel={copy.ctaButton} primaryTo={ROUTES.contact} secondaryLabel={i18n.language === 'ar' ? 'شاهد مشاريعنا' : 'View our projects'} secondaryTo={ROUTES.projects} />

      <section className="relative overflow-hidden bg-[#0d321f] py-20 md:py-28">
        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-green-primary/25 blur-3xl" />
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <motion.div ref={statementRef} initial={{ opacity: 0, y: 38 }} animate={statementInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-sm md:p-12 lg:p-16">
            <span className="text-sm font-bold tracking-wide text-yellow-primary">{copy.statementLabel}</span>
            <h2 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.6] tracking-normal text-white md:text-[2.85rem]">{copy.statementTitle}</h2>
            <p className="mt-7 max-w-4xl text-lg leading-9 text-green-50/80 md:text-xl">{copy.statement}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div ref={pillarRef} initial={{ opacity: 0, y: 25 }} animate={pillarInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-12 max-w-3xl">
            <span className="text-sm font-bold text-green-primary">{copy.pillarsLabel}</span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 md:text-5xl">{copy.pillarsTitle}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {copy.pillars.map((pillar, index) => { const Icon = icons[index]; return (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 24 }} animate={pillarInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.12 }} whileHover={{ y: -7 }} className="rounded-[1.75rem] border border-green-primary/10 bg-white p-7 shadow-[0_18px_42px_-32px_rgba(15,56,31,.4)] md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-primary text-[#15321f]"><Icon size={32} /></div>
                <h3 className="mt-7 text-2xl font-extrabold leading-tight text-gray-900">{pillar.title}</h3>
                <p className="mt-4 leading-8 text-gray-600">{pillar.text}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div ref={journeyRef} initial={{ opacity: 0, y: 25 }} animate={journeyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65 }} className="grid overflow-hidden rounded-[2rem] bg-[#153c27] shadow-[0_28px_56px_-34px_rgba(6,42,22,.6)] lg:grid-cols-[1.1fr_.9fr]">
            <div className="p-8 md:p-12">
              <span className="text-sm font-bold text-yellow-primary">{copy.journeyLabel}</span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white md:text-4xl">{copy.journeyTitle}</h2>
              <div className="mt-9 space-y-6">{copy.journey.map(([title, text], index) => <div key={title} className="flex gap-4"><span className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-yellow-primary/45 text-sm font-bold text-yellow-primary">0{index + 1}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 leading-7 text-green-50/65">{text}</p></div></div>)}</div>
            </div>
            <div className="border-t border-white/10 bg-white/[0.06] p-8 md:p-12 lg:border-s lg:border-t-0">
              <span className="text-sm font-bold text-green-200">{copy.sectorsLabel}</span>
              <div className="mt-7 space-y-4">{copy.sectors.map((sector) => <div key={sector} className="rounded-2xl border border-white/10 bg-black/10 px-5 py-4 text-lg font-bold text-white">{sector}</div>)}</div>
              <div className="mt-8 h-1 w-16 rounded-full bg-yellow-primary" />
            </div>
          </motion.div>

          <div className="mt-8 rounded-[2rem] bg-white p-8 text-center shadow-[0_18px_42px_-32px_rgba(15,56,31,.42)] md:p-12">
            <h2 className="mx-auto max-w-3xl text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">{copy.ctaTitle}</h2>
            <p className="mt-4 text-lg text-gray-600">{copy.ctaText}</p>
            <Link to={ROUTES.contact} className="mt-8 inline-flex rounded-full bg-green-primary px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105">{copy.ctaButton}</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Vision



