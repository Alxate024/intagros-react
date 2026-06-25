import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useForm } from '../useForm'

describe('useForm Hook', () => {
  it('initializes with provided initial values', () => {
    const initialValues = { name: 'Juan', email: 'juan@test.com' }
    const { result } = renderHook(() => useForm(initialValues))
    expect(result.current.values).toEqual(initialValues)
    expect(result.current.errors).toEqual({})
  })

  it('updates field value on handleChange', () => {
    const { result } = renderHook(() => useForm({ name: '' }))
    const event = { target: { name: 'name', value: 'María' } }
    act(() => result.current.handleChange(event))
    expect(result.current.values.name).toBe('María')
  })

  it('clears field error on handleChange', () => {
    const { result } = renderHook(() => useForm({ name: '' }))
    act(() => result.current.setFieldError('name', 'Required'))
    expect(result.current.errors.name).toBe('Required')
    const event = { target: { name: 'name', value: 'Ana' } }
    act(() => result.current.handleChange(event))
    expect(result.current.errors.name).toBe('')
  })

  it('resets values and errors to initial state', () => {
    const initialValues = { name: 'Carlos' }
    const { result } = renderHook(() => useForm(initialValues))
    act(() => result.current.handleChange({ target: { name: 'name', value: 'Luis' } }))
    act(() => result.current.setFieldError('name', 'Error'))
    act(() => result.current.reset())
    expect(result.current.values).toEqual(initialValues)
    expect(result.current.errors).toEqual({})
  })

  it('sets error for a specific field with setFieldError', () => {
    const { result } = renderHook(() => useForm({ name: '', email: '' }))
    act(() => result.current.setFieldError('email', 'Invalid email'))
    expect(result.current.errors.email).toBe('Invalid email')
    expect(result.current.errors.name).toBeUndefined()
  })

  it('updates values directly with setValues', () => {
    const { result } = renderHook(() => useForm({ name: '' }))
    act(() => result.current.setValues({ name: 'Pedro', email: 'pedro@test.com' }))
    expect(result.current.values).toEqual({ name: 'Pedro', email: 'pedro@test.com' })
  })
})
