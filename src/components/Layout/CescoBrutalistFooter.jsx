import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { COMPANY_INFO, ROUTES } from '../../utils/constants'
import './cesco-brutalist-footer.css'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'

function ShuffleText({ text }) {
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reducedMotion) { setDisplay(text); return undefined }
    let frame
    let loop
    const run = () => {
      const started = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - started) / 1200, 1)
        setDisplay(text.split('').map((character, index) => {
          if (character === ' ') return ' '
          return progress > index / text.length ? character : CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join(''))
        if (progress < 1) frame = requestAnimationFrame(tick)
        else loop = window.setTimeout(run, 6000)
      }
      frame = requestAnimationFrame(tick)
    }
    run()
    return () => { cancelAnimationFrame(frame); window.clearTimeout(loop) }
  }, [text, reducedMotion])

  return <span aria-label={text}>{display}</span>
}

const Arrow = ({ rtl }) => <span aria-hidden="true">{rtl ? '←' : '→'}</span>

export default function CescoBrutalistFooter() {
  const { t, i18n } = useTranslation()
  const rtl = i18n.language === 'ar'
  const reducedMotion = useReducedMotion()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat(rtl ? 'ar-SA' : 'en-US', {
      timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    }).format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [rtl])

  const nav = [
    [ROUTES.home, t('nav.home')], [ROUTES.about, t('nav.about')],
    [ROUTES.services, t('nav.services')], [ROUTES.products, t('nav.products')],
    [ROUTES.calculator, t('nav.calculator')], [ROUTES.contact, t('nav.contact')],
  ]

  return (
    <footer className="cesco-brutalist-footer">
      <div className="cesco-footer-top">
        <div className="cesco-footer-identity">
          <Link to={ROUTES.home} className={rtl ? 'cesco-footer-logo is-rtl' : 'cesco-footer-logo'} aria-label={t('common.companyName')}>
            <img src="/images/cesco-icon.png" alt="" aria-hidden="true" className="cesco-footer-logo-sun" draggable={false} />
            <span className="cesco-footer-logo-name-crop">
              <img src="/images/cesco-name.png" alt="CESCO" className="cesco-footer-logo-name" draggable={false} />
            </span>
          </Link>
          <div className="cesco-footer-email">
            <span>// {rtl ? 'راسل فريقنا' : 'SHOOT US AN EMAIL'}</span>
            <a href={`mailto:${COMPANY_INFO.email}`}>{COMPANY_INFO.email}</a>
          </div>
        </div>

        <div className="cesco-footer-column">
          <div className="cesco-footer-eyebrow"><i />{rtl ? 'التنقل' : 'Navigation'}</div>
          <nav aria-label={rtl ? 'روابط الفوتر' : 'Footer navigation'}>
            {nav.map(([to, label], index) => (
              <motion.div key={to} whileHover={reducedMotion ? undefined : { x: rtl ? -10 : 10 }}>
                <Link to={to}>{label}{index === 3 && <small>[005]</small>}</Link>
              </motion.div>
            ))}
          </nav>
        </div>

        <div className="cesco-footer-column">
          <div className="cesco-footer-eyebrow"><i />{rtl ? 'تواصل معنا' : 'Connect'}</div>
          <div className="cesco-footer-connect">
            <motion.a whileHover={reducedMotion ? undefined : { x: rtl ? -10 : 10 }} href={`tel:${COMPANY_INFO.phone}`}>{rtl ? 'اتصل بنا' : 'Call us'} <small>{COMPANY_INFO.phone}</small></motion.a>
            <motion.a whileHover={reducedMotion ? undefined : { x: rtl ? -10 : 10 }} href={`mailto:${COMPANY_INFO.email}`}>{rtl ? 'البريد' : 'Email'} <small>{COMPANY_INFO.email}</small></motion.a>
            <motion.a whileHover={reducedMotion ? undefined : { x: rtl ? -10 : 10 }} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`} target="_blank" rel="noopener noreferrer">{rtl ? 'الموقع' : 'Location'} <small>{rtl ? 'الرياض' : 'Riyadh'}</small></motion.a>
          </div>
        </div>
      </div>

      <div className="cesco-footer-action">
        <div className="cesco-footer-eyebrow"><i />{rtl ? 'ابدأ مشروعك' : 'Start a project'}</div>
        <p>// {rtl ? 'حلول عملية للمشاريع الزراعية والصناعية والتجارية' : 'Practical solutions for agricultural, industrial, and commercial projects'}</p>
        <Link to={ROUTES.contact}>{rtl ? 'اطلب عرض سعر' : 'Request a quote'} <Arrow rtl={rtl} /></Link>
      </div>

      <div className="cesco-footer-brand-frame">
        <i className="corner corner-tl" /><i className="corner corner-tr" /><i className="corner corner-bl" /><i className="corner corner-br" />
        <div className="cesco-footer-location">
          <span>{rtl ? 'مقرنا في الرياض، ونعمل في جميع أنحاء المملكة' : 'LOCATED IN RIYADH, WORKING ACROSS SAUDI ARABIA'}</span>
          <span>// 24.7136° N, 46.6753° E //</span>
          <strong>{time}</strong>
        </div>
        <div className="cesco-footer-word"><ShuffleText text="CESCO" /></div>
      </div>

      <div className="cesco-footer-bottom">
        <span>©{new Date().getFullYear()} CESCO™ // {t('common.allRightsReserved')}</span>
        <span>{rtl ? 'البيئة النقية للطاقة المتجددة' : 'PURE ENVIRONMENT FOR RENEWABLE ENERGY'}</span>
      </div>
    </footer>
  )
}



