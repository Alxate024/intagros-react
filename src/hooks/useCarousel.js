import { useEffect, useState, useCallback } from 'react'

/**
 * Custom hook for managing carousel/slideshow functionality
 * @param {number} itemCount - Total number of items
 * @param {number} interval - Interval in milliseconds
 * @returns {object} - current, next, prev, goTo
 */
export function useCarousel(itemCount, interval = 5200) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (itemCount <= 1) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % itemCount)
    }, interval)

    return () => clearInterval(timer)
  }, [itemCount, interval])

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % itemCount)
  }, [itemCount])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + itemCount) % itemCount)
  }, [itemCount])

  const goTo = useCallback((index) => {
    setCurrent(Math.max(0, Math.min(index, itemCount - 1)))
  }, [itemCount])

  return { current, next, prev, goTo }
}
