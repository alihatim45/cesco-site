import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ScrollNav = () => {
  const { i18n } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const positionClass = i18n.language === 'ar' ? 'right-5' : 'left-5'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY >= 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    if (scrolled) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })
    }
  }

  // Chevron SVG paths
  const ChevronUp = (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
  )
  const ChevronDown = (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
  )

  return (
    <motion.button
      onClick={handleClick}
      // bottom-24 (96px) clears the WhatsApp button (bottom-6 + h-16 → top edge at 88px) with an 8px gap
      className={`fixed ${positionClass} bottom-24 z-40 w-11 h-11 rounded-full
                 bg-white border-2 border-green-primary shadow-lg
                 flex items-center justify-center
                 text-green-primary hover:bg-green-primary hover:text-white
                 transition-colors duration-200 cursor-pointer`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={scrolled ? 'Scroll to top' : 'Scroll down'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {scrolled ? (
          <motion.svg
            key="up"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {ChevronUp}
          </motion.svg>
        ) : (
          <motion.svg
            key="down"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {ChevronDown}
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default ScrollNav
