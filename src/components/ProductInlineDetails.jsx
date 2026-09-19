import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ROUTES } from '../utils/constants'
import './product-inline-details.css'

function BrandMark({ name, logo }) {
  const [broken, setBroken] = useState(false)
  if (logo && !broken) {
    return <img className="cesco-inline-brand-logo" src={logo} alt={name} onError={() => setBroken(true)} />
  }
  return <span className="cesco-inline-brand-fallback" dir="auto">{name}</span>
}

function BrandCard({ brand, index }) {
  return (
    <motion.article
      className="cesco-inline-product-card modern-surface"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      {brand.image && <div className="cesco-inline-product-image"><img src={brand.image} alt={brand.name} /></div>}
      <BrandMark name={brand.name} logo={brand.logo} />
      <p>{brand.blurb}</p>
      {Array.isArray(brand.datasheets) && brand.datasheets.length > 0 && (
        <div className="cesco-inline-datasheets">
          {brand.datasheets.map((sheet) => (
            <a key={sheet.file} href={sheet.file} target="_blank" rel="noopener noreferrer" download>{sheet.label}</a>
          ))}
        </div>
      )}
    </motion.article>
  )
}

function ItemCard({ item, index }) {
  return (
    <motion.article
      className="cesco-inline-product-card modern-surface is-item"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      {item.image ? (
        <div className="cesco-inline-product-image"><img src={item.image} alt={item.name} /></div>
      ) : (
        <div className="cesco-inline-product-placeholder">{item.name}</div>
      )}
      <h4>{item.name}</h4>
      {item.desc && <p>{item.desc}</p>}
    </motion.article>
  )
}

export default function ProductInlineDetails({ productKey, detailRoute }) {
  const { t } = useTranslation()
  const features = t(`products.${productKey}.features`, { returnObjects: true })
  const brands = t(`products.${productKey}.brands`, { returnObjects: true })
  const subsections = t(`products.${productKey}.subsections`, { returnObjects: true })
  const featureList = Array.isArray(features) ? features : []
  const brandList = Array.isArray(brands) ? brands : []
  const subsectionList = Array.isArray(subsections) ? subsections : []

  return (
    <motion.section
      id="product-live-details"
      className="cesco-inline-details"
      aria-live="polite"
      aria-labelledby={`inline-product-${productKey}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="cesco-inline-heading">
        <span>CESCO PRODUCT DETAILS</span>
        <h2 id={`inline-product-${productKey}`}>{t(`products.${productKey}.title`)}</h2>
        <p>{t(`products.${productKey}.description`)}</p>
      </div>

      {featureList.length > 0 && (
        <div className="cesco-inline-features">
          <h3>{t('products.featuresTitle')}</h3>
          <ul>
            {featureList.map((feature) => <li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}
          </ul>
        </div>
      )}

      {brandList.length > 0 && (
        <div className="cesco-inline-grid">
          {brandList.map((brand, index) => <BrandCard key={brand.name} brand={brand} index={index} />)}
        </div>
      )}

      {subsectionList.map((subsection) => (
        <section className="cesco-inline-subsection" key={subsection.title}>
          <div className="cesco-inline-subheading">
            <h3>{subsection.title}</h3>
            {subsection.blurb && <p>{subsection.blurb}</p>}
          </div>
          {Array.isArray(subsection.brands) && subsection.brands.length > 0 && (
            <div className="cesco-inline-grid">
              {subsection.brands.map((brand, index) => <BrandCard key={brand.name} brand={brand} index={index} />)}
            </div>
          )}
          {Array.isArray(subsection.items) && subsection.items.length > 0 && (
            <div className="cesco-inline-grid">
              {subsection.items.map((item, index) => <ItemCard key={item.name} item={item} index={index} />)}
            </div>
          )}
        </section>
      ))}

      <div className="cesco-inline-actions">
        <Link className="is-primary" to={ROUTES.contact}>{t('common.getQuote')}</Link>
        <Link className="is-secondary" to={detailRoute}>{t('common.viewDetails')}</Link>
      </div>
    </motion.section>
  )
}
