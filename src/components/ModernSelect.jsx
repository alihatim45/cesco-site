import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const ModernSelect = ({ label, value, onChange, options, required = false, error = null, name = 'establishment' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const selectRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
    setQuery('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue) => {
    onChange({ target: { name, value: optionValue } })
    setIsOpen(false)
    setQuery('')
  }

  const selectedOption = options.find(opt => opt.value === value)
  const isSearchable = options.length > 12
  const filteredOptions = options.filter((option) =>
    option.label.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )

  return (
    <div
      className="select-container relative w-full"
      ref={selectRef}
    >
      {/* Floating Label Container */}
      <div className="relative">
        {/* Select Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`select-button w-full px-4 py-4 rounded-[14px] border-2 transition-all duration-200 ${
            error
              ? 'border-red-500 bg-red-50'
              : isOpen
              ? 'border-green-primary bg-white shadow-lg'
              : 'border-gray-300 bg-white hover:border-green-primary/50 hover:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-green-primary/20`}
          style={{
            boxShadow: isOpen
              ? '0 4px 12px rgba(0, 0, 0, 0.12)'
              : '0 2px 4px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="flex items-center justify-between">
            {/* Icon and Text Container */}
            {selectedOption ? (
              <div className="select-option-content flex items-center gap-3 flex-1">
                <span className="text-2xl flex-shrink-0">{selectedOption.icon}</span>
                <span className="text-gray-900 font-medium">
                  {selectedOption.label}
                </span>
              </div>
            ) : (
              <div className="flex-1" style={{ minHeight: '24px' }} />
            )}

            {/* Arrow Icon */}
            <motion.svg
              className="select-arrow w-5 h-5 text-gray-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </div>
        </button>

        {/* Floating Label */}
        {!value && (
          <motion.label
            initial={false}
            className="select-label absolute top-4 text-gray-400 pointer-events-none"
            animate={{
              y: isOpen ? -28 : 0,
              scale: isOpen ? 0.85 : 1,
              color: isOpen ? '#30a84b' : '#9ca3af',
            }}
            transition={{ duration: 0.2 }}
          >
            {label} {required && <span className="text-red-500">*</span>}
          </motion.label>
        )}
      </div>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95,
            }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="dropdown absolute z-50 w-full mt-2 bg-white rounded-[14px] border-2 border-gray-200 shadow-xl overflow-hidden"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            }}
          >
            {isSearchable && (
              <div className="border-b border-gray-100 p-3 bg-white">
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث عن مدينة / Search city" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-green-primary focus:ring-2 focus:ring-green-primary/15" autoFocus />
              </div>
            )}
            <div className="max-h-72 overflow-y-auto overscroll-contain">
            {filteredOptions.map((option, index) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: index * 0.03,
                  duration: 0.2,
                  ease: 'easeOut',
                }}
                className={`select-option w-full px-4 py-4 flex items-center gap-3 transition-colors duration-150 ${
                  value === option.value
                    ? 'bg-green-primary/10 text-green-primary font-semibold'
                    : 'bg-white text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{
                  backgroundColor:
                    value === option.value
                      ? 'rgba(48, 168, 75, 0.15)'
                      : 'rgba(0, 0, 0, 0.05)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-2xl flex-shrink-0">{option.icon}</span>
                <span className="flex-1">
                  {option.label}
                </span>
                {value === option.value && (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="select-checkmark w-5 h-5 text-green-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </motion.svg>
                )}
              </motion.button>
            ))}
            {filteredOptions.length === 0 && <p className="px-4 py-6 text-center text-sm text-gray-500">لا توجد مدينة مطابقة</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm mt-2"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default ModernSelect
