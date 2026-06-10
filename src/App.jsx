import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import SplashScreen from './components/SplashScreen'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Vision from './pages/Vision'
import Services from './pages/Services'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Contact from './pages/Contact'
import Calculator from './pages/Calculator'
import { ROUTES } from './utils/constants'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
    if (hasSeenSplash) {
      setShowSplash(false)
    } else {
      const timer = setTimeout(() => {
        setShowSplash(false)
        sessionStorage.setItem('hasSeenSplash', 'true')
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.about} element={<About />} />
        <Route path={ROUTES.vision} element={<Vision />} />
        <Route path={ROUTES.services} element={<Services />} />
        <Route path={ROUTES.products} element={<Products />} />
        <Route path={ROUTES.calculator} element={<Calculator />} />
        <Route path={ROUTES.productSolar} element={<ProductDetail productKey="solar" />} />
        <Route path={ROUTES.productInverters} element={<ProductDetail productKey="inverters" />} />
        <Route path={ROUTES.productCables} element={<ProductDetail productKey="cables" />} />
        <Route path={ROUTES.productStructures} element={<ProductDetail productKey="structures" />} />
        <Route path={ROUTES.productExtras} element={<ProductDetail productKey="extras" />} />
        <Route path={ROUTES.contact} element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
