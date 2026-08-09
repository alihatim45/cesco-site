import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../utils/constants'

const Breadcrumbs = () => {
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language === 'ar'

  // Map product routes to translation keys
  const productKeyMap = {
    '/products/solar': 'solar',
    '/products/inverters': 'inverters',
    '/products/cables': 'cables',
    '/products/structures': 'structures',
    '/products/extras': 'extras',
  }
  // Map service detail routes to their existing service titles
  const serviceKeyMap = {
    '/services/design': '1',
    '/services/installation': '2',
    '/services/maintenance': '3',
    '/services/consulting': '4',
    '/services/storage': '5',
    '/services/supply': '6',
    '/services/feasibility': '7',
  }

  // Map routes to translation keys
  const routeTranslationMap = {
    '/': 'nav.home',
    '/about': 'nav.about',
    '/vision': 'nav.vision',
    '/services': 'nav.services',
    '/products': 'nav.products',
    '/calculator': 'nav.calculator',
    '/contact': 'nav.contact',
  }

  const breadcrumbs = useMemo(() => {
    const pathname = location.pathname

    // Don't show breadcrumbs on home page
    if (pathname === '/') {
      return null
    }

    const items = []
    
    // Always start with Home
    items.push({
      path: ROUTES.home,
      label: t('nav.home'),
      isLast: false,
    })

    // Handle product detail pages
    if (pathname.startsWith('/products/')) {
      const productKey = productKeyMap[pathname]
      
      if (productKey) {
        // Add Products page
        items.push({
          path: ROUTES.products,
          label: t('nav.products'),
          isLast: false,
        })
        
        // Add product detail page
        items.push({
          path: pathname,
          label: t(`products.${productKey}.title`),
          isLast: true,
        })
      } else {
        // Just Products page
        items.push({
          path: pathname,
          label: t('nav.products'),
          isLast: true,
        })
      }
        } else if (pathname.startsWith('/services/')) {
      const serviceKey = serviceKeyMap[pathname]

      if (serviceKey) {
        items.push({
          path: ROUTES.services,
          label: t('nav.services'),
          isLast: false,
        })
        items.push({
          path: pathname,
          label: t(`services.list.${serviceKey}.title`),
          isLast: true,
        })
      }
    } else {
      // Handle other routes
      const translationKey = routeTranslationMap[pathname]
      if (translationKey) {
        items.push({
          path: pathname,
          label: t(translationKey),
          isLast: true,
        })
      }
    }

    return items.length > 0 ? items : null
  }, [location.pathname, t])

  // Don't render if no breadcrumbs (home page)
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null
  }

  // Always render natural order; dir on the <ol> handles RTL/LTR visual ordering
  const displayBreadcrumbs = breadcrumbs

  // Build structured data for SEO (always use original order)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${window.location.origin}${item.path}`,
    })),
  }

  return (
    <>
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumbs Navigation - Sticky below navbar, always visible on scroll */}
      <nav
        aria-label="breadcrumb"
        className="w-full bg-white/80 backdrop-blur-xl border-b border-green-primary/10 transition-colors transition-shadow duration-200"
        style={{
          position: 'sticky',
          top: 'var(--navbar-height)',
          display: 'block',
          width: '100%',
          zIndex: 999,
          backgroundColor: 'rgba(255,255,255,0.82)',
        }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-2">
          <ol
            className="flex items-center text-sm md:text-base flex-nowrap overflow-x-auto whitespace-nowrap"
            dir={isArabic ? 'rtl' : 'ltr'}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              direction: isArabic ? 'rtl' : 'ltr',
              justifyContent: 'flex-start',
              textAlign: 'start',
            }}
          >
            {displayBreadcrumbs.map((item, index) => {
              const isLast = index === displayBreadcrumbs.length - 1
              return (
                <li key={item.path} className="flex items-center">
                  {isLast ? (
                    <span 
                      className="text-green-primary font-medium py-1" 
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <>
                      <Link
                        to={item.path}
                        className="text-gray-600 hover:text-green-primary transition-colors duration-200 cursor-pointer py-1"
                      >
                        {item.label}
                      </Link>
                      <span 
                        className="text-gray-400 select-none" 
                        aria-hidden="true"
                        style={{
                          marginInlineStart: '8px',
                          marginInlineEnd: '8px',
                          opacity: 0.6,
                          alignSelf: 'center',
                        }}
                      >
                        /
                      </span>
                    </>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </>
  )
}

export default Breadcrumbs


