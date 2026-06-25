# Testing Guide

## Overview

El proyecto utiliza **Vitest** + **React Testing Library** para testing.

## Setup

```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/ui
```

## Scripts disponibles

```bash
npm test              # Ejecuta tests en watch mode
npm run test:ui       # Abre UI de Vitest
npm run test:coverage # Genera reporte de cobertura
```

## Estructura de tests

Los tests están ubicados en carpetas `__tests__` junto a los archivos que testean:

```
src/
├── components/
│   └── __tests__/
│       └── Header.test.jsx
├── hooks/
│   └── __tests__/
│       └── useCarousel.test.js
└── utils/
    └── __tests__/
        └── validators.test.js
```

## Escribir tests

### Ejemplo: Test de componente

```jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Ejemplo: Test de hook

```js
import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '../useMyHook'

describe('useMyHook', () => {
  it('returns initial value', () => {
    const { result } = renderHook(() => useMyHook())
    expect(result.current.value).toBe(0)
  })

  it('updates value', () => {
    const { result } = renderHook(() => useMyHook())
    act(() => {
      result.current.increment()
    })
    expect(result.current.value).toBe(1)
  })
})
```

### Ejemplo: Test de utilidades

```js
import { describe, it, expect } from 'vitest'
import { myFunction } from '../myFunction'

describe('myFunction', () => {
  it('returns correct result', () => {
    expect(myFunction(5)).toBe(10)
  })
})
```

## Mejores prácticas

1. **Nombre descriptivo**: Tests deben describir qué hacen
   - ✅ `it('renders button when user is logged in')`
   - ❌ `it('works')`

2. **AAA Pattern**: Arrange, Act, Assert
   ```js
   it('increments counter', () => {
     // Arrange
     const { result } = renderHook(() => useCounter())
     
     // Act
     act(() => result.current.increment())
     
     // Assert
     expect(result.current.count).toBe(1)
   })
   ```

3. **Un concepto por test**: Cada test debe validar una sola cosa

4. **Uso de queries correctas**:
   - `getByRole()` - Para elementos interactivos
   - `getByText()` - Para texto visible
   - `getByLabelText()` - Para inputs
   - `queryBy*()` - Para elementos que NO deben existir
   - `findBy*()` - Para elementos que aparecen async

## Cobertura de tests

Meta: **70% de cobertura** (statements, branches, functions, lines)

Ver cobertura:
```bash
npm run test:coverage
```

Esto genera un reporte HTML en `coverage/index.html`

## Debugging tests

```js
import { screen, debug } from '@testing-library/react'

// Ver el DOM en la consola
debug()

// Ver solo un elemento
debug(screen.getByText('Hello'))
```

## Recursos

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Playground](https://testing-playground.com/) - Herramienta para encontrar selectores
