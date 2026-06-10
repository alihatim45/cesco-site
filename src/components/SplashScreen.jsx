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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: '#FFFFFF',
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 1.2,
        }}
        className="relative"
      >
        <motion.img
          src="/images/cesco-logo.png"
          alt="CESCO Logo"
          className="h-12 w-auto md:h-16 lg:h-20 rounded-lg shadow-2xl"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(254, 200, 25, 0.6))',
          }}
          animate={{
            filter: [
              'drop-shadow(0 0 30px rgba(254, 200, 25, 0.6))',
              'drop-shadow(0 0 50px rgba(254, 200, 25, 0.8))',
              'drop-shadow(0 0 30px rgba(254, 200, 25, 0.6))',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

export default SplashScreen
