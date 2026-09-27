import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './three-d-magazine-preview.css'

export default function ThreeDMagazinePreview({ pages = [], title = '' }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const reducedMotion = useReducedMotion()
  const total = pages.length
  if (!total) return null
  const goTo = (next) => {
    setDirection(next > current ? 1 : -1)
    setCurrent((next + total) % total)
  }
  const image = pages[current]
  return (
    <section className="three-d-magazine" aria-label={title + ' 3D magazine'}>
      <div className="three-d-magazine__heading"><span>03D / PROJECT EDITION</span><small>{String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</small></div>
      <div className="three-d-magazine__stage">
        <div className="three-d-magazine__shadow" />
        <div className="three-d-magazine__book">
          <div className="three-d-magazine__spine" />
          <motion.div
            key={image}
            className="three-d-magazine__page"
            initial={reducedMotion ? false : { rotateY: direction > 0 ? 72 : -72, opacity: 0, x: direction * 26 }}
            animate={{ rotateY: 0, opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22 }}
            role="button"
            tabIndex={0}
            aria-label="Next project image"
            onClick={() => goTo(current + 1)}
            onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); goTo(current + 1) } }}
          >
            <img src={image} alt={title + ' ' + (current + 1)} />
            <div className="three-d-magazine__page-meta"><span>{title}</span><b>0{current + 1}</b></div>
          </motion.div>
        </div>
      </div>
      <div className="three-d-magazine__controls">
        <button type="button" onClick={() => goTo(current - 1)} aria-label="Previous page">←</button>
        <div><strong>{title}</strong><span>اسحب بصرياً بين مراحل التنفيذ</span></div>
        <button type="button" onClick={() => goTo(current + 1)} aria-label="Next page">→</button>
      </div>
      <div className="three-d-magazine__rail">{pages.map((page, index) => <button type="button" key={page} className={index === current ? 'is-active' : ''} onClick={() => goTo(index)} aria-label={'Open page ' + (index + 1)}><img src={page} alt="" /></button>)}</div>
    </section>
  )
}

