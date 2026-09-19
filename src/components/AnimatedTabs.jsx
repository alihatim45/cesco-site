import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './animated-tabs.css'

export default function AnimatedTabs({ tabs, ariaLabel, value, onValueChange }) {
  const reduced = useReducedMotion()
  const [internalValue, setInternalValue] = useState(tabs[0]?.value)
  const [hovering, setHovering] = useState(false)
  const tabRefs = useRef([])
  const activeValue = value ?? internalValue

  const selectValue = (nextValue) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  useEffect(() => {
    if (!tabs.some((tab) => tab.value === activeValue)) selectValue(tabs[0]?.value)
  }, [activeValue, tabs])

  const orderedTabs = useMemo(() => {
    const active = tabs.find((tab) => tab.value === activeValue)
    return active ? [active, ...tabs.filter((tab) => tab.value !== activeValue)] : tabs
  }, [activeValue, tabs])

  const activate = (index) => {
    selectValue(tabs[index].value)
    tabRefs.current[index]?.focus()
  }

  const onKeyDown = (event, index) => {
    const rtl = document.documentElement.dir === 'rtl'
    let next = index
    if (event.key === 'ArrowRight') next = (index + (rtl ? -1 : 1) + tabs.length) % tabs.length
    else if (event.key === 'ArrowLeft') next = (index + (rtl ? 1 : -1) + tabs.length) % tabs.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else return
    event.preventDefault()
    activate(next)
  }

  return (
    <div className="cesco-tabs">
      <div className="cesco-tabs-list no-visible-scrollbar" role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => {
          const selected = activeValue === tab.value
          return (
            <button
              key={tab.value}
              ref={(node) => { tabRefs.current[index] = node }}
              id={`cesco-tab-${tab.value}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`cesco-panel-${tab.value}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectValue(tab.value)}
              onKeyDown={(event) => onKeyDown(event, index)}
              onPointerEnter={() => setHovering(true)}
              onPointerLeave={() => setHovering(false)}
              className="cesco-tab-button"
            >
              {selected && (
                <motion.span
                  layoutId="cesco-active-product-tab"
                  className="cesco-tab-active"
                  transition={reduced ? { duration: 0 } : { type: 'spring', bounce: 0.24, duration: 0.55 }}
                />
              )}
              <span className="cesco-tab-icon" aria-hidden="true">{tab.icon}</span>
              <span className="cesco-tab-label">{tab.title}</span>
            </button>
          )
        })}
      </div>

      <div className={`cesco-tabs-stage ${hovering ? 'is-hovering' : ''}`}>
        {orderedTabs.map((tab, index) => {
          const active = index === 0
          return (
            <motion.div
              key={tab.value}
              id={`cesco-panel-${tab.value}`}
              role="tabpanel"
              aria-labelledby={`cesco-tab-${tab.value}`}
              aria-hidden={!active}
              inert={active ? undefined : ''}
              className="cesco-tab-panel"
              style={{ zIndex: tabs.length - index, pointerEvents: active ? 'auto' : 'none' }}
              initial={false}
              animate={{
                y: 0,
                scale: 1,
                opacity: active ? 1 : 0,
                rotateX: 0,
              }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 250, damping: 28 }}
            >
              {tab.content}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}