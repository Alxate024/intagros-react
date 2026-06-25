import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCarousel } from '../../hooks/useCarousel'

describe('useCarousel Hook', () => {
  it('initializes with index 0', () => {
    const { result } = renderHook(() => useCarousel(5, 1000))
    expect(result.current.current).toBe(0)
  })

  it('increments current slide with next()', () => {
    const { result } = renderHook(() => useCarousel(5, 1000))
    
    act(() => {
      result.current.next()
    })
    
    expect(result.current.current).toBe(1)
  })

  it('wraps around when reaching end', () => {
    const { result } = renderHook(() => useCarousel(3, 1000))
    
    act(() => {
      result.current.goTo(2)
      result.current.next()
    })
    
    expect(result.current.current).toBe(0)
  })

  it('decrements with prev()', () => {
    const { result } = renderHook(() => useCarousel(5, 1000))
    
    act(() => {
      result.current.goTo(2)
      result.current.prev()
    })
    
    expect(result.current.current).toBe(1)
  })

  it('can jump to specific index with goTo()', () => {
    const { result } = renderHook(() => useCarousel(5, 1000))
    
    act(() => {
      result.current.goTo(3)
    })
    
    expect(result.current.current).toBe(3)
  })

  it('clamps goTo to valid range', () => {
    const { result } = renderHook(() => useCarousel(5, 1000))
    
    act(() => {
      result.current.goTo(10)
    })
    
    expect(result.current.current).toBe(4)
  })
})
