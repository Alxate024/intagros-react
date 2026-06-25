import { createContext, useState, useContext } from 'react'
import { generateId } from '../utils'

/**
 * UI State context for managing global UI states like modals, notifications
 */
const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const addNotification = (message, type = 'info', duration = 3000) => {
    const id = generateId('notif-')
    const notification = { id, message, type }
    setNotifications((prev) => [...prev, notification])

    if (duration > 0) {
      setTimeout(() => removeNotification(id), duration)
    }

    return id
  }

  return (
    <UIContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within UIProvider')
  }
  return context
}
