import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import LanguageToggle from '../LanguageToggle'
import { ROUTES } from '../../utils/constants'

const Navbar = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Nav links — same order for both languages; RTL/LTR is handled by document direction
  const navLinks = [
    { path: ROUTES.home, key: 'home' },
    { path: ROUTES.about, key: 'about' },
    { path: ROUTES.vision, key: 'vision' },
    { path: ROUTES.services, key: 'services' },
    { path: ROUTES.products, key: 'products' },
    { path: ROUTES.contact, key: 'contact' },
    { path: ROUTES.calculator, key: 'calculator', isCta: true },
  ]

  const isActive = (path) => {
    if (path === ROUTES.home) {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        isScrolled ? 'shadow-lg' : 'shadow-sm'
      }`}
      style={{
        position: 'relative',
        height: 'var(--navbar-height)',
        width: '100%',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="relative flex items-center h-[var(--navbar-height)]">
          {/* Slot A — Logo (logical start: right in RTL, left in LTR) */}
          <Link
            to={ROUTES.home}
            className="navbar-logo flex-none flex items-center"
          >
            <img src="/images/cesco-logo.png" alt="CESCO Logo" className="h-12 md:h-16 w-auto object-contain" />
          </Link>

          {/* Slot B — Nav links: absolutely centered, immune to flex direction */}
          <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) =>
              link.isCta ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-3 py-1.5 bg-yellow-primary text-gray-900 rounded-lg text-sm font-semibold whitespace-nowrap hover:bg-yellow-primary/90 transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link relative px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 text-gray-700 hover:text-green-primary group"
                >
                  {t(`nav.${link.key}`)}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="navbar-indicator absolute bottom-0 left-0 right-0 h-0.5"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Slot C — Controls: ms-auto pushes to logical end (left in RTL, right in LTR) */}
          <div className="flex-none ms-auto flex items-center gap-4">
            {/* Desktop language toggle */}
            <div className="hidden lg:block">
              <LanguageToggle />
            </div>

            {/* Mobile controls */}
            <div className="lg:hidden flex items-center gap-3">
              <LanguageToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu absolute inset-x-0 top-full lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md z-50"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) =>
                link.isCta ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mobile-menu-item mx-4 px-4 py-2 text-base font-semibold rounded-lg bg-yellow-primary text-gray-900 text-center hover:bg-yellow-primary/90 transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`mobile-menu-item px-4 py-2 text-base font-medium transition-colors duration-200 ${
                      isActive(link.path)
                        ? 'text-green-primary bg-green-primary/10'
                        : 'text-gray-700 hover:text-green-primary hover:bg-gray-50'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
