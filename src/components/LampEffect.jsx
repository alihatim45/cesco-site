import { motion } from 'framer-motion'
import './lamp-effect.css'

export default function LampEffect({ active, reduced }) {
  const beamTransition = reduced
    ? { duration: 0 }
    : { delay: 0.35, duration: 1.15, ease: [0.22, 1, 0.36, 1] }

  return (
    <div className="cesco-lamp" aria-hidden="true">
      <motion.span
        className="cesco-lamp-beam is-start"
        initial={reduced ? false : { opacity: 0, scaleX: 0.45 }}
        animate={active || reduced ? { opacity: 0.78, scaleX: 1 } : {}}
        transition={beamTransition}
      />
      <motion.span
        className="cesco-lamp-beam is-end"
        initial={reduced ? false : { opacity: 0, scaleX: 0.45 }}
        animate={active || reduced ? { opacity: 0.72, scaleX: 1 } : {}}
        transition={beamTransition}
      />
      <motion.span
        className="cesco-lamp-horizon"
        initial={reduced ? false : { opacity: 0, scaleX: 0.25 }}
        animate={active || reduced ? { opacity: 1, scaleX: 1 } : {}}
        transition={reduced ? { duration: 0 } : { delay: 0.55, duration: 0.9, ease: 'easeOut' }}
      />
      <motion.span
        className="cesco-lamp-core"
        initial={reduced ? false : { opacity: 0, scale: 0.45 }}
        animate={active || reduced ? { opacity: 0.9, scale: 1 } : {}}
        transition={reduced ? { duration: 0 } : { delay: 0.65, duration: 1, ease: 'easeOut' }}
      />
      <motion.span
        className="cesco-lamp-ambient"
        initial={reduced ? false : { opacity: 0 }}
        animate={active || reduced ? { opacity: 1 } : {}}
        transition={reduced ? { duration: 0 } : { delay: 0.75, duration: 1.15 }}
      />
    </div>
  )
}
