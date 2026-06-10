import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { COMPANY_INFO, ROUTES } from '../../utils/constants'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="space-y-4">
            <Link to={ROUTES.home}>
              <img src="/images/cesco-logo.png" alt="CESCO Logo" className="h-16 w-auto object-contain mb-4" />
            </Link>
            <p className="text-gray-400 text-sm">
              {t('about.story.p1').substring(0, 100)}...
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('common.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  to={ROUTES.home}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.about}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.vision}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.vision')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.services}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.products}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.products')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.calculator}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.calculator')}
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.contact}
                  className="hover:text-yellow-primary transition-colors"
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('contact.info.title')}</h3>
            <ul className="space-y-3 text-gray-400">
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
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>
            &copy; {new Date().getFullYear()} {t('common.companyName')} - CESCO.{' '}
            {t('common.allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
