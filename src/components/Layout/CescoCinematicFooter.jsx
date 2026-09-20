import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { COMPANY_INFO, ROUTES } from '../../utils/constants'
import './cesco-cinematic-footer.css'

const LOCATIONS = [
  { ar: 'الرياض', en: 'Riyadh', x: 190, y: 269, left: '11%', top: '38%' },
  { ar: 'جدة', en: 'Jeddah', x: 370, y: 245, left: '23%', top: '25%' },
  { ar: 'المدينة', en: 'Madinah', x: 680, y: 230, left: '46%', top: '12%' },
  { ar: 'الدمام', en: 'Dammam', x: 870, y: 234, left: '62%', top: '21%' },
  { ar: 'تبوك', en: 'Tabuk', x: 1180, y: 264, left: '81%', top: '37%' },
]

export default function CescoCinematicFooter() {
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'
  const reducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reducedMotion) return undefined
    const timer = window.setInterval(() => setActive((value) => (value + 1) % LOCATIONS.length), 2500)
    return () => window.clearInterval(timer)
  }, [reducedMotion])

  const columns = [
    {
      title: rtl ? 'روابط سريعة' : 'Quick links',
      links: [[ROUTES.home, t('nav.home')], [ROUTES.about, t('nav.about')], [ROUTES.vision, t('nav.vision')], [ROUTES.projects, t('nav.projects')], [ROUTES.contact, t('nav.contact')]],
    },
    {
      title: t('nav.services'),
      links: [['/services/design', t('services.list.1.title')], ['/services/installation', t('services.list.2.title')], ['/services/maintenance', t('services.list.3.title')], ['/services/consulting', t('services.list.4.title')]],
    },
    {
      title: t('nav.products'),
      links: [[ROUTES.productSolar, t('products.solar.title')], [ROUTES.productInverters, t('products.inverters.title')], [ROUTES.productCables, t('products.cables.title')], [ROUTES.productStructures, t('products.structures.title')]],
    },
    {
      title: rtl ? 'تواصل معنا' : 'Connect',
      links: [[`mailto:${COMPANY_INFO.email}`, COMPANY_INFO.email, true], [`tel:${COMPANY_INFO.phone}`, COMPANY_INFO.phone, true], [ROUTES.calculator, t('nav.calculator')], [ROUTES.contact, rtl ? 'اطلب عرض سعر' : 'Request a quote']],
    },
  ]

  return (
    <footer className="cesco-cinematic-footer">
      <section className="cesco-energy-globe" aria-label={rtl ? 'تغطية خدمات CESCO في المملكة' : 'CESCO service coverage across Saudi Arabia'}>
        <div className="cesco-energy-globe__top-fade" />
        <svg viewBox="0 0 1400 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <radialGradient id="cescoPlanet" cx="50%" cy="100%" r="100%"><stop offset="0%" stopColor="#27a557" /><stop offset="58%" stopColor="#0d4b2a" /><stop offset="100%" stopColor="#000805" /></radialGradient>
            <filter id="cescoGlow"><feGaussianBlur stdDeviation="6" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          </defs>
          <ellipse cx="700" cy="420" rx="900" ry="220" fill="url(#cescoPlanet)" />
          <ellipse cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#f7b500" strokeWidth="2.5" opacity=".9" />
          <ellipse cx="700" cy="430" rx="860" ry="200" fill="none" stroke="#ffe08a" strokeWidth="13" opacity=".12" filter="url(#cescoGlow)" />
          <motion.path d="M -160 430 A 860 200 0 0 1 1560 430" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".7" strokeDasharray="120 1800" animate={reducedMotion ? undefined : { strokeDashoffset: [1920, -1920] }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} filter="url(#cescoGlow)" />
          {Array.from({ length: 35 }, (_, index) => {
            const angle = Math.PI + (Math.PI * index) / 34
            return <circle key={index} cx={700 + 860 * Math.cos(angle)} cy={430 + 200 * Math.sin(angle)} r={index % 4 === 0 ? 1.8 : .9} fill="#ffe7a0" opacity={index % 3 === 0 ? .75 : .38} />
          })}
          {LOCATIONS.map((pin, index) => (
            <g key={pin.en}>
              <motion.circle cx={pin.x} cy={pin.y} r="14" fill="#f7b500" filter="url(#cescoGlow)" animate={{ opacity: active === index ? .65 : .16, scale: active === index ? 1.5 : 1 }} transition={{ duration: .8 }} style={{ transformOrigin: `${pin.x}px ${pin.y}px` }} />
              <motion.circle cx={pin.x} cy={pin.y} fill="#fff7dc" animate={{ r: active === index ? 6 : 4 }} transition={{ duration: .7 }} />
            </g>
          ))}
        </svg>
        {LOCATIONS.map((location, index) => (
          <motion.div className="cesco-location-badge" data-active={active === index ? '' : undefined} key={location.en} style={{ left: location.left, top: location.top }} animate={{ opacity: active === index ? 1 : .35, y: active === index ? -5 : 0, scale: active === index ? 1.08 : 1 }} transition={{ duration: .7 }}>
            <span>◆</span> {rtl ? location.ar : location.en}
            <motion.i animate={{ height: active === index ? 45 : 38, opacity: active === index ? .8 : .25 }} />
          </motion.div>
        ))}
      </section>

      <section className="cesco-cinematic-links">
        <div className="cesco-cinematic-links__fade" />
        <div className="cesco-cinematic-grid">
          {columns.map((column) => (
            <div key={column.title}>
              <h3>{column.title}</h3>
              <ul>{column.links.map(([to, label, external]) => <li key={`${to}-${label}`}>{external ? <a href={to}>{label}</a> : <Link to={to}>{label}</Link>}</li>)}</ul>
            </div>
          ))}
        </div>
        <div className="cesco-cinematic-actions">
          <motion.a whileHover={{ y: -3 }} href={`tel:${COMPANY_INFO.phone}`}>{rtl ? 'اتصل بنا' : 'Call us'}</motion.a>
          <motion.a whileHover={{ y: -3 }} href={`mailto:${COMPANY_INFO.email}`}>{rtl ? 'أرسل بريدًا' : 'Send email'}</motion.a>
          <motion.div whileHover={{ y: -3 }}><Link to={ROUTES.calculator}>{rtl ? 'احسب منظومتك' : 'Solar calculator'}</Link></motion.div>
          <motion.div whileHover={{ y: -3 }}><Link to={ROUTES.contact}>{rtl ? 'زيارة ميدانية' : 'Site assessment'}</Link></motion.div>
        </div>
      </section>

      <div className="cesco-cinematic-copyright"><span>© {new Date().getFullYear()} CESCO</span><span>{t('common.allRightsReserved')}</span></div>
      <section className="cesco-cinematic-word" aria-label="CESCO">
        <motion.h2 initial={{ y: 120, opacity: 0, scale: .95 }} whileInView={{ y: 0, opacity: 1, scale: 1 }} viewport={{ once: false, amount: .1 }} transition={{ duration: 1.6, ease: [0.16, 1, .3, 1] }} animate={reducedMotion ? undefined : { textShadow: ['0 0 18px rgba(247,181,0,.15)', '0 0 70px rgba(247,181,0,.5)', '0 0 18px rgba(247,181,0,.15)'] }}>CESCO</motion.h2>
        <div />
      </section>
    </footer>
  )
}

