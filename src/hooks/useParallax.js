import { useRef } from 'react'
import { useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Subtle scroll-linked parallax for section background images.
 * - Uses transform only (GPU-composited, no layout thrash)
 * - Capped offset keeps the effect elegant, not disorienting
 * - Automatically disabled when the user prefers reduced motion
 *
 * @param {number} offset - max vertical drift in px (default 60)
 */
export const useParallax = (offset = 60) => {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, offset]
  )

  return { ref, y }
}

export default useParallax
