import { motion } from 'framer-motion'
import './three-d-marquee.css'

export default function ThreeDMarquee({ images, className = '' }) {
  const columns = Array.from({ length: 4 }, (_, columnIndex) => images.filter((_, imageIndex) => imageIndex % 4 === columnIndex))

  return (
    <div className={`cesco-3d-marquee ${className}`} aria-hidden="true">
      <div className="cesco-3d-marquee-scene">
        <div className="cesco-3d-marquee-grid">
          {columns.map((column, columnIndex) => {
            const repeated = [...column, ...column]
            const reverse = columnIndex === 1 || columnIndex === 3
            return (
              <div className={`cesco-3d-marquee-column is-column-${columnIndex + 1}`} key={columnIndex}>
                <motion.div className="cesco-3d-marquee-track" animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }} transition={{ duration: 28 + columnIndex * 3, ease: 'linear', repeat: Infinity }}>
                  {repeated.map((src, imageIndex) => (
                    <motion.figure className="cesco-3d-marquee-tile" key={`${src}-${imageIndex}`} whileHover={{ scale: 1.14, z: 70, rotateY: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
                      <img src={src} alt="" loading={columnIndex === 0 && imageIndex < 2 ? 'eager' : 'lazy'} decoding="async" />
                    </motion.figure>
                  ))}
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
