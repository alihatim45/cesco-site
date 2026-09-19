import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './service-story.css'

function StoryPanel({ service, index, title, description, detailsLabel, direction }) {
  const ref = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 18%'] })
  const rotation = useTransform(scrollYProgress, [0, 1], [direction === 'rtl' ? -9 : 9, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1])
  const Icon = service.Icon

  return (
    <section ref={ref} className={`service-story-panel service-story-panel--${index + 1}`} aria-label={title}>
      <motion.div
        className="service-story-panel__inner"
        style={reducedMotion ? undefined : { rotate: rotation, scale, transformOrigin: direction === 'rtl' ? 'bottom right' : 'bottom left' }}
      >
        <div className="service-story-panel__topline">
          <span>CESCO — {String(index + 1).padStart(2, '0')}</span>
          <span className="service-story-panel__category">SOLAR ENERGY SERVICES</span>
        </div>

        <div className="service-story-panel__content">
          <div className="service-story-panel__copy">
            <span className="service-story-panel__eyebrow">{String(index + 1).padStart(2, '0')} / 07</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={`/services/${service.slug}`}>
              {detailsLabel}
              <span aria-hidden="true">{direction === 'rtl' ? '←' : '→'}</span>
            </Link>
          </div>

          <div className="service-story-panel__visual" aria-hidden="true">
            <span className="service-story-panel__orbit" />
            <span className="service-story-panel__number">{String(index + 1).padStart(2, '0')}</span>
            <div className="service-story-panel__icon"><Icon size={110} /></div>
          </div>
        </div>

        <div className="service-story-panel__footer">
          <span>ENGINEERING</span><span>INSTALLATION</span><span>OPERATION</span>
        </div>
      </motion.div>
    </section>
  )
}

export default function ServiceStory({ services, t, language }) {
  const direction = language === 'ar' ? 'rtl' : 'ltr'
  const detailsLabel = language === 'ar' ? 'استكشف الخدمة' : 'Explore service'

  return (
    <div className="service-story" aria-label={language === 'ar' ? 'عرض خدماتنا' : 'Our services showcase'}>
      {services.map((service, index) => (
        <StoryPanel
          key={service.key}
          service={service}
          index={index}
          title={t(`services.list.${service.key}.title`)}
          description={t(`services.list.${service.key}.description`)}
          detailsLabel={detailsLabel}
          direction={direction}
        />
      ))}
    </div>
  )
}
