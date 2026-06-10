import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from '../WhatsAppButton'
import ScrollNav from '../ScrollNav'
import Breadcrumbs from '../Breadcrumbs'

const Layout = () => {
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
    </div>
  )
}

export default Layout
