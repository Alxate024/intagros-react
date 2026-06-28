import { useEffect, useState } from 'react'

/**
 * Custom hook for scroll position tracking
 * @param {number} threshold - Scroll threshold in pixels
 * @returns {boolean} - isScrolled
 */
export function useScroll(threshold = 18) {
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== 'undefined' && window.scrollY > threshold)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold)
    }

    const options = { passive: true }
    window.addEventListener('scroll', handleScroll, options)

    return () => window.removeEventListener('scroll', handleScroll, options)
  }, [threshold])

  return isScrolled
}
