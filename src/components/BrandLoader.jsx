// Aceternity UI LoaderThree, adapted to CESCO brand colors and reduced motion.
// Source: https://ui.aceternity.com/components/loader
import { motion, useReducedMotion } from 'framer-motion'
import { BRAND_COLORS } from '../utils/constants'

export default function BrandLoader({ label }) {
  const reduced = useReducedMotion()
  return <div className="cesco-asset-loader" role="status" aria-live="polite" aria-atomic="true">
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={BRAND_COLORS.green} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <motion.path
        initial={reduced ? false : { pathLength: 0, fill: '#10251c' }}
        animate={{ pathLength: 1, fill: BRAND_COLORS.yellow }}
        transition={reduced ? { duration: 0 } : { duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
        d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"
      />
    </motion.svg>
    <span className="cesco-loader-name" aria-hidden="true">CESCO</span>
    <span className="cesco-loader-caption">{label}</span>
  </div>
}
