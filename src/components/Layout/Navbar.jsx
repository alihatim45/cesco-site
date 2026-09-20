import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import LanguageToggle from '../LanguageToggle'
import { ROUTES } from '../../utils/constants'

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
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
    { path: ROUTES.projects, key: 'projects' },
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
      className={`relative border-b border-white/60 bg-white/80 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'shadow-[0_10px_30px_-18px_rgba(11,54,31,0.45)]' : 'shadow-none'
      }`}
      style={{
        position: 'relative',
        height: 'var(--navbar-height)',
        width: '100%',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="relative flex items-center h-[var(--navbar-height)]">
          {/* Slot A — Logo: spinning sun icon + static name, same layout as original logo */}
          <div className="navbar-logo-block flex-none">
            <Link to={ROUTES.home} className="flex-none flex items-center" style={{ gap: '0' }}>
              {/* Sun icon — always on the LEFT (start) to match original logo layout */}
              <img
                src="/images/cesco-icon.png"
                alt=""
                className="logo-icon-spin"
                aria-hidden="true"
                draggable={false}
              />
              {/* Company name — always static, on the RIGHT */}
              <span className="logo-name-crop">
                <img
                  src="/images/cesco-name.png"
                  alt="CESCO Logo"
                  className="logo-name"
                  draggable={false}
                />
              </span>
            </Link>
          </div>

          {/* Slot B — Nav links: absolutely centered, immune to flex direction */}
          <div className="hidden xl:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 rounded-full border border-green-primary/10 bg-white/70 p-1 shadow-sm">
            {navLinks.map((link) =>
              link.isCta ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className="px-4 py-2 bg-yellow-primary text-gray-900 rounded-full text-sm font-bold whitespace-nowrap shadow-sm hover:bg-yellow-primary/90 transition-colors"
                >
                  {t(`nav.${link.key}`)}
                </Link>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link relative px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors duration-200 text-gray-600 hover:text-green-primary group"
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
            <div className="hidden xl:block">
              <LanguageToggle />
            </div>

            {/* Mobile controls */}
            <div className="xl:hidden flex items-center gap-3">
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
            className="mobile-menu absolute inset-x-0 top-full xl:hidden mx-3 mt-2 py-3 rounded-2xl border border-white/70 bg-white/95 shadow-xl backdrop-blur-xl z-50"
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

