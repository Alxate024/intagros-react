# Intagros React App 🌱

App React generada a partir del export de WordPress de **Intagros** (Inteligencia Agropecuaria Sostenible).

## 🚀 Características

- ✅ **TypeScript**: Type safety en todo el proyecto
- ✅ **Custom Hooks**: Lógica reutilizable (useCarousel, useScroll, useForm)
- ✅ **Context API**: Gestión de estado global
- ✅ **Error Boundaries**: Manejo robusto de errores
- ✅ **ESLint + Prettier**: Código limpio y consistente
- ✅ **Performance**: Optimizado para producción
- 🔄 **Testing**: Setup Vitest + React Testing Library (próxima fase)

## 🛠 Cómo empezar

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
# Abre http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev          # Inicia servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview de la build
npm run lint         # Verifica código con ESLint
npm run lint:fix     # Arregla automáticamente errores ESLint
npm run format       # Formatea código con Prettier
npm run format:check # Verifica formateo sin cambios
npm run type-check   # Verifica tipos TypeScript
```

## 📁 Estructura del proyecto

```
src/
├── assets/                  # Imágenes y recursos
├── components/
│   ├── common/             # Componentes globales (Header, Footer, ErrorBoundary)
│   ├── ui/                 # Componentes UI reutilizables
│   └── ...pages            # Componentes específicos de páginas
├── context/                # React Context API
│   ├── ContactContext.jsx  # Info de contacto global
│   └── UIContext.jsx       # Estado UI global
├── data/                   # Datos estáticos
├── hooks/                  # Custom hooks reutilizables
│   ├── useCarousel.js      # Carrusel de imágenes
│   ├── useScroll.js        # Tracking de scroll
│   └── useForm.js          # Gestión de formularios
├── pages/                  # Componentes de página (rutas)
├── styles/                 # Estilos globales
├── utils/
│   ├── validators.js       # Validaciones
│   └── formatters.js       # Formateadores de datos
├── types/                  # Definiciones de tipos JSDoc
├── constants/              # Constantes y configuración
└── App.jsx                 # Aplicación principal
```

## 🔧 Arquitectura

### Providers (Context API)

El app está envuelto en múltiples providers:

```jsx
<ErrorBoundary>
  <ContactProvider>
    <UIProvider>
      <App />
    </UIProvider>
  </ContactProvider>
</ErrorBoundary>
```

- **ErrorBoundary**: Captura errores de renderizado
- **ContactProvider**: Info de contacto global
- **UIProvider**: Estado UI (notificaciones, modales)

### Custom Hooks

Reutiliza lógica en múltiples componentes:

```jsx
// Carrusel
const { current, next, prev } = useCarousel(itemCount, interval)

// Scroll
const isScrolled = useScroll(threshold)

// Formulario
const { values, errors, handleChange, reset } = useForm(initialValues)
```

## 📊 Datos disponibles en `siteContent.js`

```js
import { contact, crops, units, company, heroSlides, partnerLogos } from './data/siteContent'

contact         // Info de contacto
company         // Info de la empresa
units           // Unidades de negocio
crops           // Cultivos y especialidades
heroSlides      // Imágenes hero
partnerLogos    // Logos de aliados
```

## 📝 Validación de formularios

Valida campos con `validateContactForm()`:

```js
import { validateContactForm } from './utils/validators'

const errors = validateContactForm(formData)
// Retorna objeto con errores por campo
```

## 🎨 Styling

- **Bootstrap 5**: Framework CSS
- **CSS Modules**: Estilos encapsulados
- **Global CSS**: Variables y utilities

## 🚀 Performance

- Lazy loading de imágenes
- Code splitting por ruta
- Optimización de bundle
- Compresión gzip

## 🔒 Seguridad

- Sanitización de HTML
- Validación de entrada
- CSRF protection en formularios
- No hay secrets en el código

## 📦 Dependencias principales

- **React 19** - UI Framework
- **Vite 8** - Build tool
- **React Router DOM v7** - Routing
- **React Bootstrap** - UI Components
- **Bootstrap 5** - CSS Framework

## 🐛 Manejo de errores

El proyecto incluye Error Boundary para capturar errores:

```jsx
<ErrorBoundary>
  <Component />
</ErrorBoundary>
```

Los errores se muestran con un UI amigable y detalles en desarrollo.

## 📈 Próximas mejoras (Roadmap)

- [ ] **Fase 2**: Testing (Vitest + RTL)
- [ ] **Fase 3**: Performance (lazy loading, images)
- [ ] **Fase 4**: Accesibilidad & SEO (WCAG AA)
- [ ] **Fase 5**: Polish (Storybook, CI/CD)

## 📄 Licencia

Proyecto privado de INTAGROS

