import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const BENEFITS = {
  ar: [
    ['⚡', 'حلول محسوبة بدقة', 'نصمم النظام وفق الأحمال والموقع وساعات التشغيل الفعلية.'],
    ['↗', 'كفاءة أعلى', 'نختار المكونات المناسبة لتحقيق إنتاج مستقر وتقليل الهدر.'],
    ['✦', 'قرارات أوضح', 'نقدم تقديرات مفهومة للإنتاج والتكلفة والعائد قبل التنفيذ.'],
    ['⌂', 'دعم مستمر', 'نبقى معك من الدراسة والتركيب حتى المتابعة والصيانة.'],
  ],
  en: [
    ['⚡', 'Precisely sized solutions', 'We design each system around your load, site, and actual operating hours.'],
    ['↗', 'Higher efficiency', 'We select the right components for stable production and less waste.'],
    ['✦', 'Clearer decisions', 'You receive clear estimates for production, cost, and return before execution.'],
    ['⌂', 'Continuous support', 'We stay with you from assessment and installation through monitoring and maintenance.'],
  ],
}

export default function SolarBenefits() {
  const { i18n } = useTranslation()
  const ar = i18n.language === 'ar'
  const items = BENEFITS[ar ? 'ar' : 'en']
  const [active, setActive] = useState(null)

  return (
    <section className="relative isolate overflow-hidden bg-[#07140d] px-6 py-24 text-white md:py-32" dir={ar ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-primary/10 blur-[80px]" />
      <motion.div className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-primary/10 blur-[90px]" animate={{ scale: [1, 1.45], opacity: [0.25, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeOut' }} />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1240px]">
        <div className="mb-16 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }}>
            <span className="text-xs font-bold tracking-[0.24em] text-yellow-primary">{ar ? 'لماذا CESCO' : 'WHY CESCO'}</span>
            <h2 className="mx-auto mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-[52px]">{ar ? <>مزايا تجعل<br /><span className="text-yellow-primary">قرارك أوضح</span></> : <>Benefits that make<br /><span className="text-yellow-primary">your choice clearer</span></>}</h2>
            <p className="mx-auto mt-4 max-w-[520px] text-base leading-relaxed text-white/50">{ar ? 'من الدراسة الهندسية إلى التشغيل، نبني تجربة طاقة شمسية عملية وواضحة.' : 'From engineering study to operation, we build a practical and clear solar experience.'}</p>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-[940px] px-0 md:px-4">
          <div className="absolute left-0 top-1/2 hidden h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent md:block" />
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2">
            {items.map(([icon, title, text], index) => (
              <motion.button type="button" key={title} onClick={() => setActive(active === index ? null : index)} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5, delay: index * .08 }} className={`group relative p-10 text-center md:p-[70px] ${index < 2 ? 'border-b border-white/10 md:border-b-0' : 'md:border-t border-white/10'} ${index % 2 === 1 ? 'md:border-s border-white/10' : ''}`}>
                <span className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl transition-all duration-500 ${active === index ? 'scale-110 border-yellow-primary/60 bg-[#183a25] text-yellow-primary shadow-[0_0_36px_rgba(254,200,25,.2)]' : 'border-white/10 bg-[#10251a] text-white'}`}>{icon}</span>
                <h3 className="mt-8 text-lg font-bold tracking-tight text-white md:text-[22px]">{title}</h3>
                <p className="mx-auto mt-4 max-w-[270px] text-[15px] font-light leading-relaxed text-white/45">{text}</p>
              </motion.button>
            ))}
          </div>
          <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .8, ease: 'backOut' }} className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
            <div className="absolute inset-0 animate-pulse rounded-full bg-green-primary/15 blur-xl" /><div className="absolute inset-4 rounded-full border border-green-primary/25" /><div className="absolute inset-8 rounded-full border border-yellow-primary/35" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-green-primary to-[#0d3b22] text-yellow-primary shadow-[0_0_40px_rgba(42,174,84,.45)]"><span className="text-2xl">☀</span></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
