import { createContext, useState, useContext } from 'react'
import { contact as defaultContact } from '../data/siteContent'

/**
 * Contact context for global contact information
 */
const ContactContext = createContext(null)

export function ContactProvider({ children }) {
  const [contact] = useState(defaultContact)

  return (
    <ContactContext.Provider value={contact}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContact() {
  const context = useContext(ContactContext)
  if (!context) {
    throw new Error('useContact must be used within ContactProvider')
  }
  return context
}
