// Adapted for CESCO from Aceternity UI Text Hover Effect.
// https://ui.aceternity.com/components/text-hover-effect
// Original component: Manu Arora / Aceternity; initial contribution: Sudhanshu Mishra.
import { useEffect, useId, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './text-hover-effect.css'

export default function TextHoverEffect({ text = 'CESCO', duration = .16 }) {
  const id = useId().replace(/:/g, '')
  const svgRef = useRef(null)
  const reduced = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState({ cx: 300, cy: 90 })
  const interactive = finePointer && !reduced
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  const move = event => {
    if (!interactive || event.pointerType !== 'mouse') return
    const svg = svgRef.current
    const matrix = svg.getScreenCTM()
    if (!matrix) return
    const point = svg.createSVGPoint()
    point.x = event.clientX; point.y = event.clientY
    const local = point.matrixTransform(matrix.inverse())
    setPosition({ cx: local.x, cy: local.y }); setHovered(true)
  }
  const lettering = { x: 300, y: 95, textAnchor: 'middle', dominantBaseline: 'middle', fontSize: 150, fontWeight: 800, fontFamily: 'Arial, sans-serif', letterSpacing: 4 }
  return <div className="cesco-text-effect" role="img" aria-label={text}>
    <svg ref={svgRef} viewBox="0 0 600 180" aria-hidden="true" focusable="false" onPointerMove={move} onPointerLeave={() => setHovered(false)}>
      <defs>
        <linearGradient id={`${id}-color`} x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#d99028" /><stop offset=".35" stopColor="#ffd363" /><stop offset=".68" stopColor="#f3b724" /><stop offset="1" stopColor="#49b878" />
        </linearGradient>
        <motion.radialGradient id={`${id}-spot`} gradientUnits="userSpaceOnUse" r="145" initial={false} animate={interactive ? position : { cx: 300, cy: 90 }} transition={{ duration: interactive ? duration : 0, ease: 'easeOut' }}>
          <stop offset="0" stopColor="white" /><stop offset="1" stopColor="black" />
        </motion.radialGradient>
        <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="180"><rect width="600" height="180" fill={`url(#${id}-spot)`} /></mask>
      </defs>
      <text {...lettering} fill="#ffffff03" stroke="#ffffff35" strokeWidth=".7">{text}</text>
      <motion.text {...lettering} fill="none" stroke={`url(#${id}-color)`} strokeWidth=".9" initial={reduced ? false : { strokeDashoffset: 1000, strokeDasharray: 1000 }} whileInView={{ strokeDashoffset: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: reduced ? 0 : 2, ease: 'easeInOut' }} opacity={interactive ? .4 : .85}>{text}</motion.text>
      <text {...lettering} fill="none" stroke={`url(#${id}-color)`} strokeWidth="1.65" mask={`url(#${id}-mask)`} opacity={interactive && hovered ? 1 : 0}>{text}</text>
    </svg>
  </div>
}
