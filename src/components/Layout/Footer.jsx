import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { COMPANY_INFO, ROUTES } from '../../utils/constants'

/* Footer link with an animated underline sweep on hover */
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="relative inline-block hover:text-yellow-primary transition-colors after:content-[''] after:absolute after:bottom-0 after:start-0 after:h-px after:w-0 after:bg-yellow-primary after:transition-all after:duration-300 hover:after:w-full"
  >
    {children}
  </Link>
)

const Footer = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const { ref, isInView } = useScrollAnimation({ margin: '-50px' })

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <footer className="bg-[#0d2519] text-white mt-20 border-t border-white/10" style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        className="container mx-auto px-4 md:px-6 lg:px-8 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link to={ROUTES.home} className="footer-brand inline-flex items-center transition-transform duration-300 hover:scale-105">
              <img src="/images/cesco-icon.png" alt="" aria-hidden="true" className="footer-logo-sun" draggable={false} />
              <span className="footer-logo-name-crop">
                <img src="/images/cesco-name.png" alt="CESCO Logo" className="footer-logo-name" draggable={false} />
              </span>
            </Link>
            <p className="text-green-50/60 text-sm leading-7 max-w-sm">
              {t('about.story.p1').substring(0, 100)}...
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('common.quickLinks')}</h3>
            <ul className="space-y-2 text-green-50/60">
              <li>
                <FooterLink to={ROUTES.home}>{t('nav.home')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.about}>{t('nav.about')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.vision}>{t('nav.vision')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.services}>{t('nav.services')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.products}>{t('nav.products')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.calculator}>{t('nav.calculator')}</FooterLink>
              </li>
              <li>
                <FooterLink to={ROUTES.contact}>{t('nav.contact')}</FooterLink>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">{t('contact.info.title')}</h3>
            <ul className="space-y-3 text-green-50/60">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-1 text-yellow-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-1 text-yellow-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 mt-1 text-yellow-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center text-green-50/50 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t('common.companyName')} - CESCO.{' '}
            {t('common.allRightsReserved')}
          </p>
        </div>
      </motion.div>

      {/* Decorative floating island — follows page direction (right in RTL, left in LTR) */}
      <div
        className="footer-island-wrapper"
        style={isRTL ? { right: '230px', left: 'auto' } : { left: '230px', right: 'auto' }}
        aria-hidden="true"
      >
        <img
          src="/images/renewable-energy-island.png"
          alt=""
          className="footer-island"
          draggable={false}
        />
      </div>
    </footer>
  )
}

export default Footer
