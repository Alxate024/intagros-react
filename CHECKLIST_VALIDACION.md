# ✅ CHECKLIST DE VALIDACIÓN - INTAGROS

Lista de verificación para asegurar que todo está funcionando correctamente.

## 🔧 INFRAESTRUCTURA

- [ ] **Node.js instalado** - `node --version` muestra v16+
- [ ] **npm actualizado** - `npm --version` muestra v7+
- [ ] **Dependencias instaladas** - `npm install` ejecutado sin errores
- [ ] **Tailwind CSS** - `npm list tailwindcss` instalado
- [ ] **Framer Motion** - `npm list framer-motion` instalado
- [ ] **React Router** - `npm list react-router-dom` instalado
- [ ] **Archivo .env** - Configurado (si es necesario)

## 🚀 SERVIDOR DE DESARROLLO

- [ ] **Server inicia** - `npm run dev` sin errores
- [ ] **Hot reload funciona** - Los cambios se reflejan automáticamente
- [ ] **URL correcta** - Accesible en http://localhost:5173
- [ ] **Consola limpia** - No hay errores en la consola del navegador
- [ ] **Sin warnings** - Advertencias minimales

## 🧭 NAVEGACIÓN

- [ ] **Home** (/) - Carga correctamente
- [ ] **Fundadores** (/fundadores) - Accesible
- [ ] **Cultivos** (/cultivos) - Accesible
- [ ] **Productos** (/productos) - Accesible
- [ ] **Redes** (/redes) - Accesible
- [ ] **Contacto** (/contacto) - Accesible
- [ ] **Breadcrumbs** - Visibles en todas las páginas
- [ ] **Links funcionan** - Navegación sin errores 404
- [ ] **Menú mobile** - Hamburguesa visible en pantallas pequeñas

## 🎨 DISEÑO VISUAL

### Colores
- [ ] **Verde principal** - #1B4D3E visible en botones
- [ ] **Verde secundario** - #2D6A52 en elementos
- [ ] **Dorado** - #D4AF37 en acentos
- [ ] **Gradientes** - Funcionan correctamente

### Tipografía
- [ ] **Headings** - Tamaños correctos (h1, h2, h3)
- [ ] **Body text** - Legible y bien espaciado
- [ ] **Font weights** - Bold, semibold, regular diferenciados

### Espaciado
- [ ] **Padding** - Consistente en componentes
- [ ] **Margins** - Espacios uniformes entre secciones
- [ ] **Container** - Ancho máximo respetado

## 🧩 COMPONENTES

### Button
- [ ] **Variante primary** - Verde, funciona hover
- [ ] **Variante secondary** - Blanco con borde
- [ ] **Variante outline** - Borde solamente
- [ ] **Variante gold** - Dorado
- [ ] **Hover effect** - Escala y sombra
- [ ] **Active state** - Feedback visual

### Card
- [ ] **Card default** - Fondo blanco, borde
- [ ] **Card elevated** - Sombra pronunciada
- [ ] **Card outlined** - Borde mayor
- [ ] **Card gradient** - Fondo degradado
- [ ] **Hover effect** - Levanta y sombra aumenta

### Badge
- [ ] **6 variantes** - default, success, warning, danger, info, gold
- [ ] **Colores correctos** - Cada variante con color distinto
- [ ] **Texto legible** - Contraste adecuado

### HeroSection
- [ ] **Título visible** - Texto grande y claro
- [ ] **Subtítulo** - Si existe, visible
- [ ] **Botones CTA** - Visibles y clickeables
- [ ] **Gradiente** - Overlay oscuro sobre fondo
- [ ] **Floating elements** - Animación de elementos fondo

### Breadcrumb
- [ ] **Visible en todas las páginas** - Excepto home
- [ ] **Separadores** - Íconos/texto entre niveles
- [ ] **Links funcionales** - Click para navegar
- [ ] **Página actual** - Resaltada sin link

## 🎬 ANIMACIONES

- [ ] **Fade in** - Al cargar página
- [ ] **Slide up** - Cards al entrar en vista
- [ ] **Hover buttons** - Escala y sombra
- [ ] **Scroll animations** - AnimatedSection funciona
- [ ] **Transiciones suaves** - Sin saltos bruscos
- [ ] **Smooth scrolling** - Efecto suave al navegar

## 📱 RESPONSIVE DESIGN

### Mobile (< 640px)
- [ ] **Layout funciona** - No se desborda
- [ ] **Menú hamburguesa** - Visible y funcional
- [ ] **Texto legible** - Tamaño adecuado
- [ ] **Botones clickeables** - Tamaño mínimo 44px
- [ ] **Imágenes responsive** - Escalan correctamente
- [ ] **Formularios** - Inputs ocupan pantalla

### Tablet (640px - 1024px)
- [ ] **Dos columnas** - Donde corresponde
- [ ] **Navegación** - Visible normalmente
- [ ] **Imágenes** - Tamaño intermedio
- [ ] **Cards** - 2 por fila

### Desktop (> 1024px)
- [ ] **Layout full** - Usa todo el ancho
- [ ] **Navegación completa** - Todos los links
- [ ] **Imágenes grandes** - Alta calidad
- [ ] **Grid layout** - 3+ columnas

## 📄 PÁGINAS ESPECÍFICAS

### Home
- [ ] **Hero section** - Visible y atractiva
- [ ] **Secciones** - Bien distribuidas
- [ ] **CTA buttons** - Claros y prominentes
- [ ] **Contenido** - Legible

### Fundadores
- [ ] **Timeline** - Visible y clara
- [ ] **Cards de equipo** - 4 miembros visibles
- [ ] **Redes sociales** - Links en cada card
- [ ] **Valores** - Sección visible

### Cultivos
- [ ] **3 cultivos** - Caña, Frutales, Flores
- [ ] **Cards expandibles** - Con detalles
- [ ] **Estadísticas** - Hectáreas, rendimiento
- [ ] **Prácticas sostenibles** - Sección visible

### Productos
- [ ] **6+ productos** - Listados y detallados
- [ ] **Certificaciones** - Visibles en cada uno
- [ ] **Botones cotización** - Funcionales
- [ ] **Categorías** - Filtro por tipo

### Redes
- [ ] **6 plataformas** - Instagram, FB, YouTube, etc.
- [ ] **Followers** - Números mostrados
- [ ] **Tipos de contenido** - 6 categorías
- [ ] **Newsletter** - Formulario visible

### Contacto
- [ ] **Formulario** - Todos los campos
- [ ] **Validación** - Campos obligatorios
- [ ] **Envío** - Función submit funciona
- [ ] **Contacto info** - Teléfono, email, ubicación
- [ ] **Horarios** - Mostrados correctamente
- [ ] **Formulario lateral** - Visible en desktop

## ♿ ACCESIBILIDAD

- [ ] **Contraste de colores** - WCAG AA mínimo
- [ ] **ARIA labels** - En botones e inputs
- [ ] **Keyboard navigation** - Tab funciona
- [ ] **Focus visible** - Se ve dónde está focus
- [ ] **Images alt text** - Descripciones presentes
- [ ] **Heading order** - H1, H2, H3 en orden
- [ ] **Form labels** - Asociados a inputs
- [ ] **Skip links** - Saltar a contenido principal (opcional)

## 🔍 SEO

- [ ] **Title tag** - Único por página
- [ ] **Meta description** - Presente en head
- [ ] **Open Graph tags** - Para compartir en redes
- [ ] **Sitemap** - (Generar después)
- [ ] **robots.txt** - (Generar después)
- [ ] **Canonical URLs** - (Si es necesario)
- [ ] **Structured data** - Schema.org (opcional)

## 🔒 SEGURIDAD

- [ ] **HTTPS ready** - Para producción
- [ ] **No console errors** - Errores verificados
- [ ] **Input validation** - En formularios
- [ ] **Sanitización** - De inputs de usuario
- [ ] **No secrets expuestos** - APIs keys protegidas
- [ ] **CSP headers** - (Para producción)

## ⚡ PERFORMANCE

### Velocidad
- [ ] **First Contentful Paint** < 2.5s
- [ ] **Largest Contentful Paint** < 4s
- [ ] **Cumulative Layout Shift** < 0.1
- [ ] **Bundle size** < 500KB

### Imágenes
- [ ] **Comprimidas** - < 200KB por imagen
- [ ] **Formato correcto** - WebP con fallback
- [ ] **Lazy loaded** - Imágenes no críticas
- [ ] **Responsive sizes** - Srcset presente

### Code
- [ ] **Minificado** - CSS/JS comprimido
- [ ] **Tree shaking** - Código muerto removido
- [ ] **Code splitting** - Lazy loading rutas
- [ ] **No inline CSS** - Separado en archivos

## 🧪 TESTING

- [ ] **Sin errores de React** - Consola limpia
- [ ] **Console.log removidos** - Código limpio
- [ ] **Links rotos** - Verificados todos
- [ ] **Imágenes cargan** - Sin 404
- [ ] **Formularios envían** - Sin errores
- [ ] **Eventos funcionan** - Click, submit, etc.

## 📦 BUILD PRODUCTION

- [ ] **`npm run build` sin errores** - Build exitoso
- [ ] **Archivos generados** - Carpeta `dist/`
- [ ] **Size razonable** - Archivo JS < 500KB
- [ ] **`npm run preview` funciona** - Preview correcto
- [ ] **Assets copiados** - Imágenes en dist/

## 🚀 DEPLOYMENT CHECKLIST

### Antes de Deployar
- [ ] **Todos los checks anteriores pasados**
- [ ] **README actualizado**
- [ ] **Env variables documentadas**
- [ ] **Version bumped** (package.json)
- [ ] **Changelog actualizado**
- [ ] **Tests pasando** (si existen)

### Producción
- [ ] **Domain configurado**
- [ ] **SSL/HTTPS habilitado**
- [ ] **Analytics instalado**
- [ ] **Error tracking** (Sentry, etc.)
- [ ] **Backups automáticos**
- [ ] **Monitoring habilitado**

## 📊 VALIDACIÓN FINAL

### Google Lighthouse
- [ ] **Performance** ≥ 80
- [ ] **Accessibility** ≥ 90
- [ ] **Best Practices** ≥ 80
- [ ] **SEO** ≥ 90

### Browser Compatibility
- [ ] **Chrome** - Última versión
- [ ] **Firefox** - Última versión
- [ ] **Safari** - Última versión
- [ ] **Edge** - Última versión

### Manual Testing
- [ ] **Funcionalidad** - Todo funciona
- [ ] **Apariencia** - Looks good
- [ ] **Performance** - Carga rápido
- [ ] **UX** - Flujo intuitivo

---

## 📋 FIRMA DE VALIDACIÓN

```
Validado por: ___________________
Fecha: ___________________
Versión: 1.0.0
Status: ✅ LISTO PARA PRODUCCIÓN
```

---

**Nota**: Ejecutar este checklist antes de cada deployment a producción.

Última actualización: 23 de Mayo de 2026
