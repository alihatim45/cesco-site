import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import './why-choose-cesco.css'

const COPY = {
  ar: [
    ['تصميم هندسي دقيق', 'نحدد حجم المنظومة ومكوناتها وفق الاستهلاك والموقع وطبيعة التشغيل.'],
    ['تقدير واضح للوفر والعائد', 'نحوّل بيانات الاستهلاك إلى إنتاج متوقع وتوفير سنوي يساعدك على اتخاذ القرار.'],
    ['تنفيذ متكامل', 'ندير المشروع من الدراسة والمعاينة حتى التركيب والاختبار والتشغيل.'],
    ['مراقبة ذكية للأداء', 'متابعة مستمرة للإنتاج والتنبيهات لضمان كفاءة المنظومة على المدى الطويل.'],
    ['معدات موثوقة', 'ألواح ومحولات وحمايات من علامات عالمية مختارة لتناسب ظروف التشغيل.'],
    ['حلول تناسب كل مشروع', 'أنظمة متصلة بالشبكة أو منفصلة أو هجينة للمزارع والمصانع والمنشآت التجارية.'],
  ],
  en: [
    ['Accurate engineering design', 'We size every system around consumption, site conditions, and operating needs.'],
    ['Clear savings and ROI', 'We translate consumption data into expected production and annual savings for better decisions.'],
    ['Turnkey delivery', 'We manage the journey from study and site survey to installation, testing, and commissioning.'],
    ['Smart performance monitoring', 'Continuous production visibility and alerts help sustain long-term system efficiency.'],
    ['Trusted equipment', 'Panels, inverters, and protection devices from global brands selected for the application.'],
    ['A system for every project', 'Grid-tied, off-grid, and hybrid solutions for farms, factories, and commercial facilities.'],
  ],
}

function EnergyDesign() {
  return <div className="cesco-mini-flow"><span className="is-sun">☀</span><i /><span>▦</span><i /><span className="is-power">ϟ</span><motion.b animate={{ left: ['13%', '48%', '84%'] }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} /></div>
}

function SavingsChart({ arabic }) {
  return <div className="cesco-mini-chart"><div className="cesco-mini-chart__top"><span>{arabic ? 'عائد الاستثمار' : 'CESCO ROI'}</span><strong>+38%</strong></div>{[92,76,61].map((width,index)=><div className="cesco-mini-progress" key={width}><motion.i initial={{ width: 0 }} animate={{ width: `${width}%` }} transition={{ duration: 1.8, delay: index*.2, repeat: Infinity, repeatDelay: 1.5 }} /><span>{(arabic ? ['الطاقة','التوفير','العائد'] : ['ENERGY','SAVINGS','RETURN'])[index]}</span></div>)}</div>
}

function DeliveryTimeline({ arabic }) {
  const steps=['01','02','03','04']
  return <div className="cesco-mini-timeline">{steps.map((step,index)=><div key={step}><motion.span animate={{ backgroundColor: ['#26352d','#f7b500','#26352d'], scale:[1,1.12,1] }} transition={{ duration: 3, delay:index*.55, repeat:Infinity }}>{step}</motion.span><i /><small>{(arabic ? ['الدراسة','التصميم','التركيب','التشغيل'] : ['STUDY','DESIGN','INSTALL','START'])[index]}</small></div>)}</div>
}

function Monitoring({ arabic }) {
  const bars=[30,62,45,82,55,92,68,48,76,38,64,88]
  return <div className="cesco-mini-monitor"><div><span>{arabic ? 'الإنتاج المباشر' : 'LIVE PRODUCTION'}</span><strong>98.6%</strong></div><section>{bars.map((height,index)=><motion.i key={index} animate={{ height:[`${height*.45}%`,`${height}%`,`${height*.55}%`] }} transition={{ duration:1.4,delay:index*.08,repeat:Infinity,ease:'easeInOut' }} />)}</section><footer><b /> {arabic ? 'النظام متصل' : 'SYSTEM ONLINE'}</footer></div>
}

function Equipment({ arabic }) {
  const brands=arabic ? ['جينكو','هواوي','صن تري','جودوي','جيه إيه سولار','داي'] : ['JINKO','HUAWEI','SUNTREE','GOODWE','JA SOLAR','DEYE']
  return <div className="cesco-mini-brands">{brands.map((brand,index)=><motion.span key={brand} animate={{ y:[0,index%2?-4:4,0],borderColor:['#32433a','#f7b500','#32433a'] }} transition={{duration:3,delay:index*.22,repeat:Infinity}}>{brand}</motion.span>)}<motion.strong animate={{scale:[1,1.08,1],boxShadow:['0 0 0 rgba(247,181,0,0)','0 0 34px rgba(247,181,0,.28)','0 0 0 rgba(247,181,0,0)']}} transition={{duration:2.2,repeat:Infinity}}>✓</motion.strong></div>
}

function FlexibleSystems({ arabic }) {
  const [active,setActive]=useState(0)
  useEffect(()=>{const timer=setInterval(()=>setActive(v=>(v+1)%3),3000);return()=>clearInterval(timer)},[])
  const names=arabic ? ['متصل بالشبكة','منفصل','هجين'] : ['GRID','OFF-GRID','HYBRID']
  const sizes=[[210,120],[150,190],[185,155]]
  return <div className="cesco-mini-systems"><motion.div className="cesco-system-device" animate={{width:sizes[active][0],height:sizes[active][1]}} transition={{duration:.55}}><span>{arabic ? `${names[active]} / سيسكو` : `CESCO / ${names[active]}`}</span><motion.i key={active} initial={{top:'-70%'}} animate={{top:'110%'}} transition={{duration:1.5,ease:'linear'}}/><b>▦</b><em>ϟ</em></motion.div><div>{names.map((name,index)=><button type="button" key={name} onClick={()=>setActive(index)} data-active={active===index?'':undefined}>{name}</button>)}</div></div>
}

const VISUALS=[EnergyDesign,SavingsChart,DeliveryTimeline,Monitoring,Equipment,FlexibleSystems]

export default function WhyChooseCesco(){
  const {i18n}=useTranslation(); const arabic=i18n.language==='ar'; const reduced=useReducedMotion(); const copy=COPY[arabic?'ar':'en']
  return <section className="why-cesco" aria-labelledby="why-cesco-title"><div className="why-cesco__inner"><header><span>{arabic ? 'سيسكو / لماذا نحن' : 'CESCO / WHY US'}</span><h2 id="why-cesco-title">{arabic?'لماذا تختار CESCO؟':'Why choose CESCO?'}</h2><p>{arabic?'خبرة هندسية وحلول عملية تجعل قرار الطاقة الشمسية أوضح وتنفيذ المشروع أكثر موثوقية.':'Engineering expertise and practical solutions make solar decisions clearer and project delivery more reliable.'}</p></header><div className="why-cesco__grid">{copy.map(([title,description],index)=>{const Visual=VISUALS[index];return <motion.article key={title} initial={reduced?false:{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.5,delay:(index%2)*.08}}><div className="why-cesco__card-head"><span>0{index+1}</span><h3>{title}</h3><p>{description}</p></div><div className="why-cesco__visual"><Visual arabic={arabic} /></div></motion.article>})}</div></div></section>
}

