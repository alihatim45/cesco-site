import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const SplashScreen = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3500)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.78, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="splash-brand"
      >
        <img
          src="/images/cesco-icon.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="splash-logo-sun"
        />
        <span className="splash-logo-name-crop">
          <img
            src="/images/cesco-name.png"
            alt="CESCO - البيئة النقية للمقاولات"
            draggable={false}
            className="splash-logo-name"
          />
        </span>
      </motion.div>
    </div>
  )
}

export default SplashScreen
