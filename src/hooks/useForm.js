import { useState, useCallback } from 'react'

/**
 * Custom hook for form state management and validation
 * @param {object} initialValues - Initial form values
 * @returns {object} - values, errors, handleChange, handleSubmit, reset
 */
export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }, [errors])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  const setFieldError = useCallback((fieldName, error) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }))
  }, [])

  return { values, errors, handleChange, reset, setFieldError, setValues }
}
