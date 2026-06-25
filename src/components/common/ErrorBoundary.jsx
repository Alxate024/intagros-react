import React from 'react'

/**
 * Error Boundary component to catch rendering errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '4px',
            margin: '2rem',
            border: '1px solid #f5c6cb',
          }}
        >
          <h2>Ha ocurrido un error</h2>
          <p>Por favor, intenta recargar la página. Si el problema persiste, contacta a soporte.</p>
          {/* eslint-disable-next-line no-constant-binary-expression */}
          {false && (

            <pre style={{ marginTop: '1rem', fontSize: '0.85rem', overflow: 'auto' }}>
              {this.state.error?.toString()}
            </pre>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
