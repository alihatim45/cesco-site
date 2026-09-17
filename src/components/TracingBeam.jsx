// CESCO adaptation of Aceternity UI's Tracing Beam.
// Source: https://ui.aceternity.com/components/tracing-beam
import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import './tracing-beam.css'

export default function TracingBeam({ children, className = '' }) {
  const rootRef = useRef(null)
  const contentRef = useRef(null)
  const reduced = useReducedMotion()
  const gradientId = `cesco-beam-${useId().replace(/:/g, '')}`
  const [height, setHeight] = useState(0)
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start 75%', 'end 35%'],
  })

  useEffect(() => {
    const content = contentRef.current
    if (!content) return
    const measure = () => setHeight(content.offsetHeight)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [])

  const start = useSpring(useTransform(scrollYProgress, [0, .85], [30, Math.max(30, height - 260)]), { stiffness: 360, damping: 70 })
  const end = useSpring(useTransform(scrollYProgress, [0, 1], [80, Math.max(80, height - 40)]), { stiffness: 360, damping: 70 })
  const marker = useSpring(useTransform(scrollYProgress, [0, 1], [18, Math.max(18, height - 28)]), { stiffness: 280, damping: 46 })
  const path = height > 0
    ? `M 10 0 C 10 ${height * .25}, 2 ${height * .42}, 10 ${height * .58} S 18 ${height * .82}, 10 ${height}`
    : 'M 10 0 V 1'

  return (
    <div ref={rootRef} className={`cesco-tracing-beam ${className}`}>
      <div className="cesco-beam-rail" aria-hidden="true">
        <motion.span className="cesco-beam-marker" style={reduced ? { top: 18 } : { top: marker }} />
        {height > 0 && (
          <svg viewBox={`0 0 20 ${height}`} width="20" height={height} preserveAspectRatio="none">
            <path d={path} className="cesco-beam-track" />
            <motion.path d={path} className="cesco-beam-progress" stroke={`url(#${gradientId})`} />
            <defs>
              <motion.linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={reduced ? 0 : start} y2={reduced ? 180 : end}>
                <stop stopColor="#30a84b" stopOpacity="0" />
                <stop offset=".22" stopColor="#30a84b" />
                <stop offset=".56" stopColor="#fec819" />
                <stop offset="1" stopColor="#fec819" stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div ref={contentRef}>{children}</div>
    </div>
  )
}
