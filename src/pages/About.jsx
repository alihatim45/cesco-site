import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { COMPANY_INFO, ROUTES } from '../utils/constants'
import { VisionIcon, MissionIcon, ValuesIcon } from '../components/SolarIcons'
import PageCinematicHero from '../components/PageCinematicHero'
import SolarBenefits from '../components/SolarBenefits'

const About = () => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'
  const { ref: storyRef, isInView: storyInView } = useScrollAnimation()
  const { ref: cardsRef, isInView: cardsInView } = useScrollAnimation()
  const { ref: infoRef, isInView: infoInView } = useScrollAnimation()
  const { ref: mapRef, isInView: mapInView } = useScrollAnimation()

  const projectImage = '/images/cesco-solar-cinematic.png'

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
      {/* Modern identity snapshot */}
      <section className="relative overflow-hidden bg-[#f3f7f3] py-16 md:py-20">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-primary/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-yellow-primary/10 blur-3xl" />
        <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className={isArabic ? 'text-right' : 'text-left'}>
              <span className="inline-flex items-center gap-2 rounded-full border border-green-primary/15 bg-white/75 px-4 py-2 text-xs font-bold tracking-[0.18em] text-green-primary">
                <span className="h-2 w-2 rounded-full bg-yellow-primary" /> CESCO SOLAR
              </span>
              <h2 className="mt-6 max-w-3xl text-4xl font-black leading-[1.12] tracking-tight text-[#102d1c] md:text-6xl">
                {isArabic ? <>نبني <span className="text-green-primary">طاقة أوضح</span><br />لمستقبل أكثر استدامة.</> : <>Building <span className="text-green-primary">clearer energy</span><br />for a more sustainable future.</>}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[['50+', isArabic ? 'مشروعًا' : 'Projects'], ['70+', isArabic ? 'عميلًا' : 'Clients'], ['10+', isArabic ? 'سنوات خبرة' : 'Years']].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-green-primary/10 bg-white/80 p-4 text-center shadow-[0_18px_38px_-30px_rgba(15,56,31,.45)] backdrop-blur-sm md:p-5">
                  <strong className="block text-2xl font-black text-green-primary md:text-3xl">{value}</strong>
                  <span className="mt-1 block text-xs font-semibold text-gray-600 md:text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="relative overflow-hidden bg-[#07140d] px-4 py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-[32rem] w-[32rem] rounded-full bg-green-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-yellow-primary/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <motion.div ref={storyRef} initial={{ opacity: 0, x: isArabic ? 40 : -40 }} animate={storyInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.75 }} className="relative order-2 lg:order-1">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-yellow-primary/20" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[#123321] shadow-[0_30px_80px_-35px_rgba(0,0,0,.75)]">
              <motion.img src={projectImage} alt="Solar Project" className="h-full w-full object-cover" initial={{ scale: 1.08 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.1 }} />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071b10]/80 via-transparent to-white/5" />
              <div className="absolute bottom-5 start-5 flex items-center gap-3 rounded-full border border-white/20 bg-[#07140d]/70 px-4 py-2 text-xs font-bold tracking-[0.16em] text-white backdrop-blur-md"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> CESCO · SOLAR ENERGY</div>
            </div>
            <div className="absolute -bottom-6 -end-4 rounded-2xl border border-white/10 bg-[#123321]/90 px-5 py-4 shadow-xl backdrop-blur-md md:-end-8"><span className="block text-2xl font-black text-yellow-primary">2014</span><span className="text-xs text-green-50/65">{isArabic ? 'منذ البداية' : 'Since day one'}</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 28 }} animate={storyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: .12 }} className={`order-1 lg:order-2 ${isArabic ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 text-xs font-bold tracking-[0.2em] text-yellow-primary"><span className="h-px w-10 bg-yellow-primary" /> {isArabic ? 'من نحن' : 'WHO WE ARE'}</div>
            <h2 className="mt-6 text-4xl font-black leading-[1.25] tracking-tight md:text-6xl">{isArabic ? <>نبذة عن<br /><span className="text-yellow-primary">الشركة.</span></> : <>The story<br /><span className="text-yellow-primary">behind CESCO.</span></>}</h2>
            <div className="mt-8 space-y-5 border-s border-white/10 ps-6 text-base leading-8 text-green-50/65 md:text-lg">
              <p>{t('about.story.p1')}</p><p>{t('about.story.p2')}</p><p>{t('about.story.p3')}</p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3 text-xs font-bold text-green-50/55"><span className="rounded-full border border-white/10 px-4 py-2">{isArabic ? 'خبرة هندسية' : 'Engineering expertise'}</span><span className="rounded-full border border-white/10 px-4 py-2">{isArabic ? 'حلول مستدامة' : 'Sustainable solutions'}</span></div>
          </motion.div>
        </div>
      </section>
      {/* Our approach */}
      <section className="relative overflow-hidden bg-[#f3f8f4] px-4 py-24 md:py-32">
        <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-green-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-yellow-primary/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl">
          <div className={`max-w-2xl ${isArabic ? 'mr-auto text-right' : 'ml-auto text-left'}`}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-green-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isArabic ? 'منهجنا في العمل' : 'OUR APPROACH'}</span>
            <h2 className="mt-5 text-4xl font-black leading-[1.2] tracking-tight text-[#071b12] md:text-6xl">{isArabic ? <>نحوّل التعقيد<br /><span className="text-green-primary">إلى خطوات واضحة.</span></> : <>Turning complexity<br /><span className="text-green-primary">into clear steps.</span></>}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-gray-600 md:text-lg">{isArabic ? 'من أول زيارة وحتى التشغيل، نعمل معك عبر مسار واضح يربط القرار الهندسي بالنتيجة التي يمكن قياسها.' : 'From the first visit to commissioning, we follow a clear path that connects engineering decisions to measurable results.'}</p>
          </div>
          <div className="relative mt-16">
            <div className="absolute start-[8%] end-[8%] top-8 hidden h-px bg-gradient-to-r from-yellow-primary/20 via-green-primary/50 to-yellow-primary/20 md:block" />
            <div className="grid gap-6 md:grid-cols-3">
              {approach.map(([title, text], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .12 }} className="group relative rounded-[2rem] border border-green-primary/10 bg-white p-7 shadow-[0_24px_55px_-35px_rgba(6,42,22,.55)] transition-all duration-300 hover:-translate-y-2 hover:border-yellow-primary/50 hover:shadow-[0_30px_60px_-35px_rgba(6,42,22,.7)] md:p-8">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0e2c1d] text-2xl font-black text-yellow-primary shadow-lg">0{index + 1}</div>
                  <div className="mt-8 flex items-center gap-3"><span className="h-px w-8 bg-yellow-primary" /><span className="text-xs font-bold tracking-[0.16em] text-green-primary/60">{isArabic ? ['اكتشاف', 'تصميم', 'نتيجة'][index] : ['DISCOVER', 'DESIGN', 'DELIVER'][index]}</span></div>
                  <h3 className="mt-4 text-2xl font-black text-[#071b12]">{title}</h3>
                  <p className="mt-3 text-sm leading-8 text-gray-600 md:text-base">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>      <SolarBenefits />

      {/* Vision, Mission, Values */}
      <section className="relative overflow-hidden bg-[#07140d] px-4 py-24 text-white md:py-32">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-green-primary/15 blur-3xl" /><div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-yellow-primary/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div className={isArabic ? 'text-right' : 'text-left'}>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-yellow-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isArabic ? 'ما نقوده' : 'WHAT GUIDES US'}</span>
            <h2 className="mt-6 text-4xl font-black leading-[1.18] tracking-tight md:text-6xl">{isArabic ? <>من الفكرة<br /><span className="text-yellow-primary">إلى الأثر.</span></> : <>From an idea<br /><span className="text-yellow-primary">to impact.</span></>}</h2>
            <p className="mt-6 max-w-md text-base leading-8 text-green-50/60">{isArabic ? 'ثلاثة مبادئ تربط رؤيتنا بطريقة عملنا، وتحوّل الطاقة النظيفة إلى قيمة عملية للمشاريع.' : 'Three principles connect our vision to the way we work, turning clean energy into practical value for every project.'}</p>
            <div className="mt-10 flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-green-50/40"><span className="h-px w-12 bg-yellow-primary/60" /> CESCO SOLAR</div>
          </div>
          <div className="relative">
            <div className="absolute bottom-8 start-7 top-8 w-px bg-gradient-to-b from-yellow-primary/60 via-green-primary/40 to-transparent md:start-8" />
            <div className="space-y-4">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, x: isArabic ? 24 : -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .2 }} transition={{ duration: .55, delay: index * .12 }} className="group relative flex gap-5 rounded-3xl border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-primary/35 hover:bg-white/[0.08] md:gap-7 md:p-7">
                  <div className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-2xl border border-yellow-primary/35 bg-[#123321] text-yellow-primary shadow-[0_0_28px_rgba(254,200,25,.08)] md:h-16 md:w-16"><value.Icon size={28} /></div>
                  <div className="min-w-0 flex-1"><div className="mb-2 flex items-center justify-between gap-4"><span className="text-xs font-bold tracking-[0.18em] text-yellow-primary/80">0{index + 1}</span><span className="text-xs font-bold uppercase tracking-[0.16em] text-white/25">{index === 0 ? (isArabic ? 'Direction' : 'Direction') : index === 1 ? (isArabic ? 'Action' : 'Action') : (isArabic ? 'Standard' : 'Standard')}</span></div><h3 className="text-xl font-black text-white md:text-2xl">{value.title}</h3><p className="mt-2 max-w-xl text-sm leading-7 text-green-50/60 md:text-base">{value.description}</p></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Block */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div ref={infoRef} initial={{ opacity: 0, y: 30 }} animate={infoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="relative overflow-hidden rounded-[2.5rem] bg-[#0e2c1d] text-white shadow-[0_30px_70px_-35px_rgba(6,42,22,.7)]">
            <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-green-primary/20 blur-3xl" /><div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-yellow-primary/10 blur-3xl" />
            <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
              <div className={`p-8 md:p-12 lg:p-16 ${isArabic ? 'text-right' : 'text-left'}`}>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-yellow-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isArabic ? 'لنبقَ على تواصل' : 'LET’S CONNECT'}</span>
                <h2 className="mt-6 max-w-xl text-4xl font-black leading-[1.3] tracking-tight md:text-5xl md:leading-[1.28]">{isArabic ? <>فكرة واضحة.<br /><span className="text-yellow-primary">خطوة أقرب.</span></> : <>A clear idea.<br /><span className="text-yellow-primary">One step closer.</span></>}</h2>
                <p className="mt-6 max-w-md text-base leading-8 text-green-50/65">{isArabic ? 'شاركنا احتياج منشأتك، وسيساعدك فريق CESCO في الوصول إلى الحل الأنسب.' : 'Tell us what your facility needs and the CESCO team will help shape the right solution.'}</p>
                <div className="mt-12 flex items-center gap-3 text-xs font-semibold text-green-50/45"><span className="h-px w-12 bg-yellow-primary/60" /> CESCO SOLAR · RIYADH</div>
              </div>
              <div className="border-t border-white/10 p-8 md:p-12 lg:border-s lg:border-t-0 lg:p-16">
                <div className="divide-y divide-white/10">
                  <motion.a whileHover={{ x: isArabic ? -6 : 6 }} href={`mailto:${COMPANY_INFO.email}`} className="group flex items-center justify-between gap-5 py-6 first:pt-0"><div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">01 · {isArabic ? 'البريد الإلكتروني' : 'EMAIL'}</span><strong className="mt-2 block text-lg text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.email}</strong></div><span className="text-2xl text-yellow-primary">↗</span></motion.a>
                  <motion.a whileHover={{ x: isArabic ? -6 : 6 }} href={`tel:${COMPANY_INFO.phone}`} className="group flex items-center justify-between gap-5 py-6"><div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">02 · {isArabic ? 'الهاتف' : 'PHONE'}</span><strong className="mt-2 block text-lg text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.phone}</strong></div><span className="text-2xl text-yellow-primary">↗</span></motion.a>
                  <motion.a whileHover={{ x: isArabic ? -6 : 6 }} href="https://www.google.com/maps/search/?api=1&query=PQM3%2B36%20Ar%20Rawdah%2C%20Riyadh" target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-5 py-6 last:pb-0"><div><span className="text-xs font-bold tracking-[0.18em] text-green-50/40">03 · {isArabic ? 'العنوان' : 'ADDRESS'}</span><strong className="mt-2 block max-w-xs text-base leading-7 text-white transition-colors group-hover:text-yellow-primary">{COMPANY_INFO.address}</strong></div><span className="text-2xl text-yellow-primary">↗</span></motion.a>
                </div>
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
            <div className={`mb-8 flex flex-col gap-3 ${isArabic ? 'text-right' : 'text-left'} md:flex-row md:items-end md:justify-between`}>
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-green-primary"><span className="h-2 w-2 rounded-full bg-yellow-primary" /> {isArabic ? 'موقعنا' : 'FIND US'}</span>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-[#102d1c] md:text-5xl">{isArabic ? 'نحن قريبون من مشروعك' : 'Close to your next project'}</h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-gray-600 md:text-end">{COMPANY_INFO.address}</p>
            </div>
            <div className="map-wrapper overflow-hidden rounded-[2rem] border border-green-primary/10 bg-[#eaf4ed] shadow-[0_24px_60px_-34px_rgba(15,56,31,.5)]">
              <iframe
                src="https://www.google.com/maps?q=PQM3%2B36%20Ar%20Rawdah%2C%20Riyadh&output=embed"
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










