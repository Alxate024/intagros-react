import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPhone, isEmpty, validateContactForm } from '../validators'

describe('Validators', () => {
  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
    })
  })

  describe('isValidPhone', () => {
    it('validates Colombian phone number', () => {
      expect(isValidPhone('573160445577')).toBe(true)
      expect(isValidPhone('+573160445577')).toBe(true)
    })

    it('rejects invalid phone', () => {
      expect(isValidPhone('12345')).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('detects empty values', () => {
      expect(isEmpty('')).toBe(true)
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty([])).toBe(true)
    })

    it('detects non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1, 2])).toBe(false)
    })
  })

  describe('validateContactForm', () => {
    it('validates complete form', () => {
      const data = {
        nombre: 'Juan',
        email: 'juan@example.com',
        telefono: '573160445577',
        empresa: 'Mi Empresa',
        mensaje: 'Hola',
      }
      const errors = validateContactForm(data)
      expect(Object.keys(errors)).toHaveLength(0)
    })

    it('catches missing required fields', () => {
      const data = { nombre: '', email: '', telefono: '', empresa: '', mensaje: '' }
      const errors = validateContactForm(data)
      expect(Object.keys(errors).length).toBeGreaterThan(0)
    })

    it('validates email format in form', () => {
      const data = {
        nombre: 'Juan',
        email: 'invalid',
        telefono: '573160445577',
        empresa: 'Mi Empresa',
        mensaje: 'Hola',
      }
      const errors = validateContactForm(data)
      expect(errors.email).toBeDefined()
    })
  })
})
