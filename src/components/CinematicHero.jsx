import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { ROUTES } from '../utils/constants'
import BrandLoader from './BrandLoader'
import LampEffect from './LampEffect'
import '../styles/cinematic-hero.css'

function MagneticLink({ to, children, primary, enabled }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 240, damping: 24 })
  const sy = useSpring(y, { stiffness: 240, damping: 24 })
  const reset = () => { x.set(0); y.set(0) }
  useEffect(() => { if (!enabled) reset() }, [enabled])
  return <motion.div style={{ x: sx, y: sy }} className="cesco-magnet"
    onPointerMove={e => {
      if (!enabled || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      x.set((e.clientX - r.left - r.width / 2) * .07)
      y.set((e.clientY - r.top - r.height / 2) * .1)
    }} onPointerLeave={reset}>
    <Link className={`cesco-hero-button ${primary ? 'is-primary' : 'is-secondary'}`} to={to}>{children}<span aria-hidden="true">↗</span></Link>
  </motion.div>
}

export default function CinematicHero() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const root = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const arabic = i18n.language.startsWith('ar')
  const interactive = desktop && !reduced
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const x = useSpring(px, { stiffness: 45, damping: 22 })
  const pointerY = useSpring(py, { stiffness: 45, damping: 22 })
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, interactive ? 55 : 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, interactive ? 1.04 : 1])
  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)')
    const update = () => setDesktop(query.matches)
    update(); query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => { if (!interactive) { px.set(0); py.set(0) } }, [interactive, px, py])
  useEffect(() => {
    const image = new Image()
    let disposed = false
    const finish = () => { if (!disposed) setLoaded(true) }
    const fallback = setTimeout(finish, 10000)
    image.onload = () => image.decode().catch(() => {}).then(finish)
    image.onerror = finish
    image.src = '/images/cesco-solar-cinematic.png'
    if (image.complete) image.decode().catch(() => {}).then(finish)
    return () => { disposed = true; clearTimeout(fallback); image.onload = image.onerror = null }
  }, [])
  useEffect(() => {
    const previousTitle = document.title
    const description = document.querySelector('meta[name="description"]')
    const previousDescription = description?.content
    document.title = t('home.cinematic.metaTitle')
    if (description) description.content = t('home.cinematic.description')
    return () => { document.title = previousTitle; if (description) description.content = previousDescription }
  }, [t])
  const reveal = delay => ({
    initial: reduced ? false : { opacity: 0, y: 22, filter: 'blur(6px)' },
    animate: loaded || reduced ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay },
  })
  return <section ref={root} className={`cesco-cinematic ${arabic ? 'is-arabic' : ''} ${loaded ? 'is-loaded' : ''}`} aria-labelledby="cinematic-title"
    onPointerMove={e => {
      if (!interactive || e.pointerType !== 'mouse') return
      const r = e.currentTarget.getBoundingClientRect()
      px.set(((e.clientX - r.left) / r.width - .5) * 10)
      py.set(((e.clientY - r.top) / r.height - .5) * 6)
    }} onPointerLeave={() => { px.set(0); py.set(0) }}>
    <motion.div className="cesco-camera" style={{ y, scale }} aria-hidden="true">
      <motion.div className="cesco-pullback" initial={reduced ? false : { scale: 1.75 }} animate={loaded || reduced ? { scale: 1 } : {}} transition={{ duration: reduced ? 0 : 2.7, ease: [.22, 1, .36, 1] }}>
        <motion.div className="cesco-landscape" style={{ x, y: pointerY }} />
        <div className="cesco-sunlight" />
        <div className="cesco-energy"><i /><i /><i /></div>
        <div className="cesco-particles">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ left: `${22 + i * 10}%`, top: `${22 + i * 19 % 60}%`, animationDelay: `${-i * .8}s` }} />)}</div>
      </motion.div>
    </motion.div>
    <div className="cesco-scrim" aria-hidden="true" />
    <LampEffect active={loaded} reduced={reduced} />
    {!loaded && <BrandLoader label={t('home.cinematic.loading')} />}
    <div className="cesco-hero-copy">
      <motion.p className="cesco-eyebrow" {...reveal(.65)}>{t('home.cinematic.eyebrow')}</motion.p>
      <h1 id="cinematic-title"><motion.span {...reveal(.95)}>{t('home.cinematic.line1')}</motion.span><motion.span {...reveal(1.15)}>{t('home.cinematic.line2')}</motion.span></h1>
      <motion.p className="cesco-hero-description" {...reveal(1.5)}>{t('home.cinematic.description')}</motion.p>
      <motion.div className="cesco-hero-actions" {...reveal(1.8)}>
        <MagneticLink primary to={ROUTES.services} enabled={interactive}>{t('home.cinematic.solutions')}</MagneticLink>
        <MagneticLink to={ROUTES.contact} enabled={interactive}>{t('home.cinematic.consultation')}</MagneticLink>
      </motion.div>
    </div>
    <motion.ol className="cesco-hero-labels" {...reveal(2)}>{['renewable', 'efficiency', 'monitoring'].map((key, i) => <li key={key}><span aria-hidden="true">0{i + 1}</span>{t(`home.cinematic.${key}`)}</li>)}</motion.ol>
    <button type="button" className="cesco-scroll-cue" onClick={() => document.getElementById('home-overview')?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'start' })}><span aria-hidden="true" />{t('home.cinematic.scroll')}</button>
  </section>
}
