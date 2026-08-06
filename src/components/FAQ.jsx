import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

const FAQ = () => {
  const { t } = useTranslation()
  const [open, setOpen] = useState(null)

  const items = t('faq.items', { returnObjects: true })
  const list = Array.isArray(items) ? items : []

  return (
    <div className="space-y-4">
      {list.map((item, index) => {
        const isOpen = open === index
        return (
          <div
            key={index}
            className={`modern-surface border rounded-2xl overflow-hidden transition-colors duration-200 ${
              isOpen ? 'border-green-primary' : 'border-green-primary/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start bg-white hover:bg-gray-50 transition-colors"
            >
              <span
                className={`font-semibold text-lg ${
                  isOpen ? 'text-green-primary' : 'text-gray-900'
                }`}
              >
                {item.q}
              </span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className={`w-5 h-5 flex-shrink-0 ${
                  isOpen ? 'text-green-primary' : 'text-gray-400'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed border-t border-gray-100 pt-4 text-start">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default FAQ
