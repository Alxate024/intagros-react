# 🌿 INTAGROS - Agroindustria Moderna

Sitio web rediseñado de Intagros con arquitectura moderna, diseño hermoso y experiencia de usuario mejorada.

## ✨ Características Principales

### 🎨 Diseño Visual
- **Paleta Verde Jade Elegante**: Sistema de colores profesional y coherente
- **Framer Motion**: Animaciones suaves y transiciones hermosas
- **Tailwind CSS**: Estilos modernos y responsive design
- **Componentes Reutilizables**: Architecture limpia y mantenible

### 📄 Páginas
- **Inicio**: Hero section con llamadas a la acción claras
- **Fundadores**: Equipo directivo, historia, valores
- **Cultivos**: Caña de azúcar, frutales, flores con detalles completos
- **Productos**: Catálogo premium con certificaciones
- **Redes Sociales**: Integración con múltiples plataformas
- **Contacto**: Formulario hermoso, mapa, horarios
- **Acerca de**: Historia de la empresa

### 🔧 Tecnología
- **React 19+** - Framework moderno
- **React Router v7** - Navegación
- **Tailwind CSS** - Styling
- **Framer Motion** - Animaciones
- **React Icons** - Iconografía
- **Vite** - Build tool rápido

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎯 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/           # Componentes de layout
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── ui/               # Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Badge.jsx
│   │   ├── HeroSection.jsx
│   │   ├── Breadcrumb.jsx
│   │   └── AnimatedSection.jsx
│   └── sections/         # Secciones complejas
├── pages/                # Páginas principales
│   ├── Home.jsx
│   ├── Fundadores.jsx
│   ├── Cultivos.jsx
│   ├── Productos.jsx
│   ├── Redes.jsx
│   ├── Contacto.jsx
│   └── ...
├── styles/               # Estilos globales
│   ├── index.css
│   └── global.css
├── utils/                # Utilidades
│   └── cn.js
└── App.jsx              # Rutas principales
```

## 🎨 Sistema de Diseño

### Colores Principales
```css
- Jade Oscuro: #1B4D3E (verde principal)
- Jade Medio: #2D6A52
- Jade Claro: #E8F5F0
- Dorado: #D4AF37 (acentos)
```

### Componentes Base
- **Button**: primary, secondary, outline, gold, ghost
- **Card**: default, elevated, outlined, gradient
- **Badge**: Múltiples variantes
- **AnimatedSection**: Animaciones de entrada
- **HeroSection**: Sección hero con gradientes

## 🚀 Scripts Disponibles

```bash
npm run dev              # Inicia servidor de desarrollo
npm run build            # Build para producción
npm run preview          # Preview del build
npm run lint             # Ejecuta ESLint
npm run lint:fix         # Fix automático de linting
npm run format           # Formatea código con Prettier
npm run format:check     # Verifica formato
npm run type-check       # TypeScript type checking
npm run test             # Ejecuta tests
npm run test:ui          # Tests con UI
npm run test:coverage    # Coverage de tests
```

## 🌐 Rutas Disponibles

- `/` - Inicio
- `/nosotros` - Acerca de
- `/fundadores` - Equipo directivo
- `/cultivos` - Productos agrícolas
- `/productos` - Catálogo completo
- `/redes` - Redes sociales
- `/contacto` - Formulario de contacto
- `/servicios` - Servicios
- `/unidades` - Unidades de negocio

## 📱 Responsive Design

Totalmente responsive para:
- 📱 Mobile (< 640px)
- 📱 Tablet (640px - 1024px)
- 💻 Desktop (> 1024px)

## ♿ Accesibilidad

- Contraste adecuado de colores
- Navegación clara y breadcrumbs
- ARIA labels en componentes interactivos
- Focus states visibles
- Semántica HTML correcta

## 🔒 SEO

- Meta tags configurables
- Títulos y descripciones
- Estructura de heading correcta
- Open Graph tags

## 🛠 Desarrollo

### Agregar una nueva página

1. Crear archivo en `src/pages/MiPagina.jsx`
2. Importar componentes necesarios
3. Añadir ruta en `App.jsx`
4. Actualizar Navigation si es necesario

### Personalizar colores

Editar `tailwind.config.js` en la sección de colores extendidos.

### Añadir animaciones

Usar Framer Motion en componentes:
```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Contenido animado
</motion.div>
```

## 📊 Performance

- ✅ Code splitting automático
- ✅ Lazy loading de páginas
- ✅ Optimización de imágenes
- ✅ CSS purificado con Tailwind
- ✅ Tree-shaking automático

## 🐛 Debugging

```bash
# Ver bundle size
npm run build -- --analyze

# Dev con más verbosidad
DEBUG=* npm run dev
```

## 📝 Licencia

Todos los derechos reservados © 2024 INTAGROS

## 📧 Contacto

- Email: info@intagros.com
- Teléfono: +57 (2) 3456-7890
- WhatsApp: +57 300 123 4567

---

Desarrollado con ❤️ usando React, Tailwind CSS y Framer Motion
