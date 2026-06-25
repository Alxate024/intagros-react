/**
 * Email validation
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Phone validation (Colombian format)
 */
export function isValidPhone(phone) {
  const phoneRegex = /^\+?57[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Required field validation
 */
export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value.trim() === '') ||
    (Array.isArray(value) && value.length === 0)
  )
}

/**
 * Validate contact form
 */
export function validateContactForm(data) {
  const errors = {}

  if (isEmpty(data.nombre)) {
    errors.nombre = 'El nombre es requerido'
  }

  if (isEmpty(data.email)) {
    errors.email = 'El email es requerido'
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Email inválido'
  }

  if (isEmpty(data.telefono)) {
    errors.telefono = 'El teléfono es requerido'
  } else if (!isValidPhone(data.telefono)) {
    errors.telefono = 'Teléfono inválido (formato: +57 310 0000000)'
  }

  if (isEmpty(data.empresa)) {
    errors.empresa = 'La empresa/finca es requerida'
  }

  if (isEmpty(data.mensaje)) {
    errors.mensaje = 'El mensaje es requerido'
  }

  return errors
}
