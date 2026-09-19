import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import './thought-line.css'

const formatTime = (tenths) => `${(tenths / 10).toFixed(1)}s`

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2c.7 5.2 2.8 7.3 8 8-5.2.7-7.3 2.8-8 8-.7-5.2-2.8-7.3-8-8 5.2-.7 7.3-2.8 8-8Z" />
      <path d="M19 16c.25 1.7.95 2.4 2.65 2.65C19.95 18.9 19.25 19.6 19 21.3c-.25-1.7-.95-2.4-2.65-2.65C18.05 18.4 18.75 17.7 19 16Z" />
    </svg>
  )
}

export default function ThoughtLine({
  working = true,
  steps = [],
  label = 'Thinking…',
  doneLabel = 'Completed in',
  collapseOnSettle = true,
  showTimer = true,
  className = '',
}) {
  const reduceMotion = useReducedMotion()
  const startedAt = useRef(performance.now())
  const [elapsed, setElapsed] = useState(0)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (working) {
      startedAt.current = performance.now()
      setElapsed(0)
      setOpen(true)
      const timer = window.setInterval(() => {
        setElapsed(Math.floor((performance.now() - startedAt.current) / 100))
      }, 100)
      return () => window.clearInterval(timer)
    }
    if (collapseOnSettle) setOpen(false)
    return undefined
  }, [working, collapseOnSettle])

  return (
    <div
      className={`thought-line ${className}`}
      data-working={working ? '' : undefined}
      data-open={open ? '' : undefined}
      data-reduced-motion={reduceMotion ? '' : undefined}
      aria-live="polite"
    >
      <button
        type="button"
        className="thought-line__head"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="thought-line__glyph"><SparkleIcon /></span>
        <span className="thought-line__labels">
          <span className="thought-line__working-label">{label}</span>
          <span className="thought-line__done-label">{doneLabel}</span>
        </span>
        {showTimer && <span className="thought-line__timer">{formatTime(elapsed)}</span>}
        <svg className="thought-line__chevron" viewBox="0 0 20 20" aria-hidden="true">
          <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      <div className="thought-line__trace" aria-hidden={!open}>
        <div className="thought-line__fold">
          <div className="thought-line__steps">
            {steps.map((step, index) => (
              <div className="thought-line__step" data-done={!working || index < steps.length - 1 ? '' : undefined} key={step}>
                <span className="thought-line__mark" aria-hidden="true">
                  {!working || index < steps.length - 1 ? '✓' : <i />}
                </span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
