import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../utils/constants'

const FAQ_ITEMS = {
  ar: [
    ['هل تعملون مع المشاريع الناشئة والميزانيات المحدودة؟', 'نعم. نساعدك على ترتيب أولويات المشروع والبدء بالحلول الأكثر تأثيرًا، ثم التوسع على مراحل واضحة.'],
    ['كيف يتم تسعير مشاريع الطاقة الشمسية؟', 'يختلف السعر حسب القدرة المطلوبة، نوع النظام، الموقع، والمكونات. نقدم عرضًا مبدئيًا واضحًا بعد مراجعة احتياجك.'],
    ['كيف تبدأ دراسة المشروع؟', 'ابدأ بإرسال بيانات الموقع والحمل أو استخدم الحاسبة، وسيتواصل فريقنا معك لتحديد الحل المناسب.'],
    ['ماذا يحدث إذا تغيرت متطلبات المشروع؟', 'نراجع التغييرات معك ونحدّث التصميم والعرض قبل التنفيذ، حتى تبقى كل خطوة واضحة وموثقة.'],
    ['هل تقدمون خدمات ما بعد التركيب؟', 'نعم، نوفر المتابعة والصيانة والدعم الفني لمساعدة النظام على العمل بكفاءة مستمرة.'],
  ],
  en: [
    ['Do you work with startups and limited budgets?', 'Yes. We help prioritize the highest-impact solutions first, then scale the project through clear phases.'],
    ['How are solar projects priced?', 'Pricing depends on the required capacity, system type, site, and selected components. We provide a clear preliminary proposal after reviewing your needs.'],
    ['How do I start a project study?', 'Share your site and load details or use the calculator, and our team will help define the right solution.'],
    ['What happens if project requirements change?', 'We review changes with you and update the design and proposal before execution, keeping every step clear.'],
    ['Do you provide post-installation support?', 'Yes. We provide follow-up, maintenance, and technical support to help your system operate efficiently.'],
  ],
}

export default function PremiumFAQ() {
  const { i18n } = useTranslation()
  const ar = i18n.language === 'ar'
  const items = FAQ_ITEMS[ar ? 'ar' : 'en']
  const [open, setOpen] = useState(0)

  return (
    <section className="border-y border-green-primary/10 bg-[#07140d] px-5 py-24 text-white selection:bg-yellow-primary/30 md:px-[60px]">
      <div className="mx-auto max-w-[1240px]">
        <div className={`mb-14 ${ar ? 'text-right' : 'text-left'}`}>
          <div className="mb-3 flex items-center gap-3 text-xs font-medium tracking-[0.22em] text-green-50/45">
            <span>04.</span><span className="text-yellow-primary/70">—</span><span>FAQ</span>
          </div>
          <h2 className="text-[38px] font-medium leading-[1.1] text-white md:text-[54px]">
            {ar ? <>أسئلة<br /><span className="text-yellow-primary">متكررة</span></> : <>Frequently<br /><span className="text-yellow-primary">Asked</span></>}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-[60px] lg:flex-row" dir={ar ? 'rtl' : 'ltr'}>
          <div className="flex w-full flex-[0.65] flex-col gap-3">
            {items.map(([question, answer], index) => {
              const isOpen = open === index
              return (
                <div key={question} id={`cesco-faq-${index + 1}`} className={`rounded-[18px] border-[1.5px] transition-all duration-300 ${isOpen ? 'border-yellow-primary/35 bg-[#10271a]' : 'border-white/[0.08] bg-[#0c1d13] hover:border-green-primary/35'}`}>
                  <button type="button" className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-5 px-5 py-5 text-start md:px-7 md:py-6" onClick={() => setOpen(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`cesco-faq-answer-${index + 1}`}>
                    <span className={`text-base font-medium transition-colors md:text-[17px] ${isOpen ? 'text-white' : 'text-white/75'}`}>{question}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${isOpen ? 'bg-yellow-primary text-[#10271a]' : 'bg-white/[0.06] text-white/50'}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 7h8" />{!isOpen && <path d="M7 3v8" />}</svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && <motion.div id={`cesco-faq-answer-${index + 1}`} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }} className="overflow-hidden"><p className="px-5 pb-6 text-[15px] leading-[1.8] text-green-50/60 md:px-7 md:pb-7 md:text-base">{answer}</p></motion.div>}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          <aside className="group relative w-full flex-[0.35] overflow-hidden rounded-[24px] border border-white/10 bg-[#0c1d13] p-7 md:sticky md:top-20 md:p-9">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-yellow-primary/10 blur-[60px]" />
            <div className="relative mb-6 flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-yellow-primary/30 bg-[#12351f] text-yellow-primary">
              <span className="text-3xl">☀</span>
            </div>
            <h3 className="relative mb-4 text-[26px] font-medium leading-[1.2] text-white">{ar ? <>هل لديك<br />استفسار؟</> : <>Have questions?<br />Let's talk.</>}</h3>
            <p className="relative mb-8 text-[15px] leading-[1.7] text-white/45">{ar ? <>تحدث مع فريقنا عن <strong className="font-medium text-white/80">احتياجك وحل الطاقة المناسب لموقعك.</strong></> : <>Talk with our team about <strong className="font-medium text-white/80">your site, load, and next energy solution.</strong></>}</p>
            <Link to={ROUTES.contact} className="relative flex w-full items-center justify-center gap-3 rounded-[14px] bg-green-primary px-8 py-[18px] text-[15px] font-semibold text-white shadow-lg shadow-green-primary/20 transition-all hover:bg-[#249c4b] active:scale-[0.98]"><span className="h-2 w-2 animate-pulse rounded-full bg-yellow-primary" />{ar ? 'ابدأ محادثة' : 'Start conversation'}</Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
