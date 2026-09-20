import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../utils/constants'
import LampEffect from './LampEffect'
import '../styles/cinematic-hero.css'

export default function PageCinematicHero({ eyebrow, title, subtitle, primaryLabel, primaryTo=ROUTES.contact, secondaryLabel, secondaryTo=ROUTES.projects, contentId='page-content' }){
  const {i18n}=useTranslation(); const ar=i18n.language==='ar'; const reduced=useReducedMotion(); const root=useRef(null); const [ready,setReady]=useState(false)
  const {scrollYProgress}=useScroll({target:root,offset:['start start','end start']}); const y=useTransform(scrollYProgress,[0,1],[0,48]); const scale=useTransform(scrollYProgress,[0,1],[1,1.035])
  useEffect(()=>{const timer=setTimeout(()=>setReady(true),80);return()=>clearTimeout(timer)},[])
  const reveal=(delay)=>({initial:reduced?false:{opacity:0,y:22,filter:'blur(6px)'},animate:ready||reduced?{opacity:1,y:0,filter:'blur(0px)'}:{},transition:{duration:reduced?0:.65,delay:reduced?0:delay}})
  return <section ref={root} className={`cesco-cinematic cesco-page-cinematic ${ar?'is-arabic':''} ${ready?'is-loaded':''}`} aria-labelledby="page-cinematic-title">
    <motion.div className="cesco-camera" style={{y,scale}} aria-hidden="true"><motion.div className="cesco-pullback" initial={reduced?false:{scale:1.45}} animate={ready||reduced?{scale:1}:{}} transition={{duration:reduced?0:2.2,ease:[.22,1,.36,1]}}><div className="cesco-landscape"/><div className="cesco-sunlight"/><div className="cesco-energy"><i/><i/><i/></div><div className="cesco-particles">{Array.from({length:8},(_,i)=><i key={i} style={{left:`${22+i*10}%`,top:`${22+i*19%60}%`,animationDelay:`${-i*.8}s`}}/>)}</div></motion.div></motion.div>
    <div className="cesco-scrim" aria-hidden="true"/><LampEffect active={ready} reduced={reduced}/>
    <div className="cesco-hero-copy"><motion.p className="cesco-eyebrow" {...reveal(.2)}>{eyebrow}</motion.p><h1 id="page-cinematic-title"><motion.span {...reveal(.4)}>{title}</motion.span></h1><motion.p className="cesco-hero-description" {...reveal(.65)}>{subtitle}</motion.p><motion.div className="cesco-hero-actions" {...reveal(.85)}>{primaryLabel&&<Link className="cesco-hero-button is-primary" to={primaryTo}>{primaryLabel}<span>↗</span></Link>}{secondaryLabel&&<Link className="cesco-hero-button is-secondary" to={secondaryTo}>{secondaryLabel}<span>↗</span></Link>}</motion.div></div>
    <motion.ol className="cesco-hero-labels" {...reveal(1)}><li><span>01</span>{ar?'طاقة متجددة':'Renewable Energy'}</li><li><span>02</span>{ar?'كفاءة عالية':'High Efficiency'}</li><li><span>03</span>{ar?'مراقبة ذكية':'Smart Monitoring'}</li></motion.ol>
    <button type="button" className="cesco-scroll-cue" onClick={()=>document.getElementById(contentId)?.scrollIntoView({behavior:reduced?'auto':'smooth'})}><span/>{ar?'اكتشف المزيد':'Scroll to Explore'}</button>
  </section>
}
