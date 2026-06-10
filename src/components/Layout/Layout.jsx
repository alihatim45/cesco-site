import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../WhatsAppButton'
import ScrollNav from '../ScrollNav'
import Breadcrumbs from '../Breadcrumbs'
import SiteAssessmentModal from '../SiteAssessmentModal'

const Layout = () => {
  const { t } = useTranslation()
  const [assessmentOpen, setAssessmentOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col">
      {/* Site Header - Sticky container for Navbar and Breadcrumbs */}
      <header 
        className="site-header w-full flex flex-col"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        {/* Navbar - Relative positioning inside sticky header */}
        <Navbar />
        {/* Breadcrumbs - Sticky below navbar, always visible on scroll */}
        <Breadcrumbs />
      </header>
      
      {/* Main content */}
      <main className="site-main flex-grow">
        <Outlet />
      </main>
      
      <Footer />
      <WhatsAppButton />
      <ScrollNav />

      {/* Site Assessment floating trigger — leading edge (start), opposite the WhatsApp button */}
      <motion.button
        onClick={() => setAssessmentOpen(true)}
        className="fixed bottom-6 start-5 z-40 flex items-center gap-2 bg-green-primary hover:bg-green-primary/90 text-white font-semibold text-sm px-4 py-3 rounded-full shadow-lg transition-colors duration-200"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="whitespace-nowrap">{t('siteAssessment.trigger')}</span>
      </motion.button>

      <SiteAssessmentModal isOpen={assessmentOpen} onClose={() => setAssessmentOpen(false)} />
    </div>
  )
}

export default Layout
