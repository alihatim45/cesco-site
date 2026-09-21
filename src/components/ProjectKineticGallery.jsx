import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import './project-kinetic-gallery.css'

export default function ProjectKineticGallery({ images }) {
  const { i18n } = useTranslation()
  const arabic = i18n.language === 'ar'
  const [activeCard, setActiveCard] = useState(null)
  const labels = arabic
    ? ['منظومة ري زراعية', 'محطة مصنع أغذية', 'مستودعات تبريد زراعية', 'مجمع تجاري', 'مزرعة دواجن']
    : ['Solar Irrigation System', 'Food Factory Solar Plant', 'Agricultural Cold Storage', 'Commercial Complex', 'Poultry Farm']
  const cards = images.slice(0, 5)

  return (
    <div
      className="cesco-project-gallery"
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return
        const stage = event.currentTarget.querySelector('.cesco-project-gallery__stage')
        if (!stage) return
        const bounds = stage.getBoundingClientRect()
        const pointerX = event.clientX - bounds.left
        const scale = bounds.width / 840
        const centers = [-300, -150, 0, 150, 300].map((offset) => bounds.width / 2 + offset * scale)
        const nearest = centers.reduce((best, center, index) =>
          Math.abs(pointerX - center) < Math.abs(pointerX - centers[best]) ? index : best, 0)
        setActiveCard(nearest)
      }}
      onPointerLeave={() => setActiveCard(null)}
      role="group"
      tabIndex="0"
      aria-label={arabic ? 'معرض متحرك لمشاريع سيسكو للطاقة الشمسية' : 'Animated gallery of CESCO solar projects'}
    >
      <div className="cesco-project-gallery__stage">
        {cards.map((image, index) => {
          const offset = index - 2
          const x = offset * 150
          const z = -Math.abs(offset) * 18
          const rotate = offset * -10
          return (
            <Link
              to={`/projects/${index + 1}`}
              key={image}
              className={`cesco-project-gallery__card${activeCard === index ? ' is-active' : ''}`}
              tabIndex="0"
              style={{
                '--base': `translate3d(${x}px,0,${z}px) rotateY(${rotate}deg)`,
                '--delay': `${index * -0.4}s`,
                '--accent-card': index % 2 ? '#fec819' : '#29ad5f',
              }}
            >
              <div className="cesco-project-gallery__image">
                <img src={image} alt={`${arabic ? 'مشروع طاقة شمسية' : 'Solar project'} ${index + 1}`} loading="lazy" />
              </div>
              <b>{String(index + 1).padStart(2, '0')}</b>
              <small>{labels[index]}</small>
            </Link>
          )
        })}
      </div>
      <p className="cesco-project-gallery__hint">
        {arabic ? 'مرّر المؤشر أو اضغط لإيقاف الحركة واستكشاف المشاريع' : 'Hover or focus to pause and explore the projects'}
      </p>
    </div>
  )
}





