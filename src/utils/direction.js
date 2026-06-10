import i18n from '../i18n/config'

/**
 * Get the current text direction based on i18n language
 * @returns {string} 'rtl' or 'ltr'
 */
export const getDirection = () => {
  const lang = i18n.language || 'ar'
  return lang === 'ar' ? 'rtl' : 'ltr'
}

/**
 * Get text alignment based on current direction
 * @returns {string} 'right' or 'left'
 */
export const getAlignment = () => {
  return getDirection() === 'rtl' ? 'right' : 'left'
}

/**
 * Get icon side position based on current direction
 * @returns {string} 'start' or 'end'
 */
export const getIconSide = () => {
  return getDirection() === 'rtl' ? 'start' : 'end'
}

/**
 * Get flex direction based on current direction
 * @returns {string} 'row-reverse' for RTL, 'row' for LTR
 */
export const getFlexDirection = () => {
  return getDirection() === 'rtl' ? 'row-reverse' : 'row'
}

/**
 * Get animation direction for slide animations
 * @returns {number} Positive for LTR (slide from left), Negative for RTL (slide from right)
 */
export const getAnimationDirection = () => {
  return getDirection() === 'rtl' ? 1 : -1
}

/**
 * Get CSS classes for text alignment
 * @returns {string} Tailwind classes for text alignment
 */
export const getTextAlignClasses = () => {
  return getDirection() === 'rtl' ? 'text-right' : 'text-left'
}

/**
 * Get CSS classes for flex direction
 * @returns {string} Tailwind classes for flex direction
 */
export const getFlexDirectionClasses = () => {
  return getDirection() === 'rtl' ? 'flex-row-reverse' : 'flex-row'
}

