// Lightweight CESCO adaptation of Aceternity UI's Card Spotlight.
// Source: https://ui.aceternity.com/components/card-spotlight
import { useEffect, useState } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import './card-spotlight.css'

export default function CardSpotlight({ children, className = '', radius = 290 }) {
  const reduced = useReducedMotion()
  const [finePointer, setFinePointer] = useState(false)
  const mouseX = useMotionValue(145)
  const mouseY = useMotionValue(145)
  const x = useSpring(mouseX, { stiffness: 180, damping: 28 })
  const y = useSpring(mouseY, { stiffness: 180, damping: 28 })
  const spotlight = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, rgba(48, 168, 75, .34), rgba(254, 200, 25, .13) 36%, transparent 72%)`
  const dots = useMotionTemplate`radial-gradient(150px circle at ${x}px ${y}px, rgba(254, 200, 25, .42), transparent 75%)`

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setFinePointer(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const interactive = finePointer && !reduced
  const move = (event) => {
    if (!interactive || event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    mouseX.set(event.clientX - rect.left)
    mouseY.set(event.clientY - rect.top)
  }

  return (
    <div className={`cesco-spotlight-card ${className}`} onPointerMove={move} style={{ '--spotlight-radius': `${radius}px` }}>
      <motion.span className="cesco-spotlight-glow" aria-hidden="true" style={interactive ? { background: spotlight } : undefined} />
      <motion.span className="cesco-spotlight-dots" aria-hidden="true" style={interactive ? { maskImage: dots, WebkitMaskImage: dots } : undefined} />
      <span className="cesco-spotlight-content">{children}</span>
    </div>
  )
}
