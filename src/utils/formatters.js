/**
 * Format date to Colombian locale
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Format phone number to Colombian format
 */
export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('57')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  return `+57 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
}

/**
 * Truncate text to specified length
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

/**
 * Sanitize HTML (prevent XSS)
 */
export function sanitizeHTML(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * Generate unique ID
 */
export function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}
