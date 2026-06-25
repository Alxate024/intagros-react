# 🚀 GUÍA DE INICIO RÁPIDO - INTAGROS

Instrucciones paso a paso para ejecutar el proyecto rediseñado.

## ✅ Pre-requisitos

- **Node.js** v16+ instalado ([Descargar](https://nodejs.org/))
- **npm** v7+ (viene con Node.js)
- Editor de código (VS Code recomendado)
- Terminal/Consola

## 📋 Pasos de Instalación

### 1️⃣ Navegar a la Carpeta del Proyecto

```bash
cd "C:\Users\Juan Pablo Alzate\intagros-react\intagros-react"
```

### 2️⃣ Instalar Dependencias

```bash
npm install
```

⏳ **Tiempo estimado**: 3-5 minutos

### 3️⃣ Iniciar Servidor de Desarrollo

```bash
npm run dev
```

📱 El servidor abrirá en: **http://localhost:5173**

---

## 🌐 Acceder al Sitio

Una vez el servidor esté corriendo, puedes acceder a:

### Páginas Principales
- **Inicio** → http://localhost:5173/
- **Fundadores** → http://localhost:5173/fundadores
- **Cultivos** → http://localhost:5173/cultivos
- **Productos** → http://localhost:5173/productos
- **Redes Sociales** → http://localhost:5173/redes
- **Contacto** → http://localhost:5173/contacto

### Características a Explorar

✨ **Animaciones Suaves**
- Hover en botones y cards
- Scroll animations en secciones
- Transiciones de página

🎨 **Diseño Verde Jade**
- Colores elegantes y profesionales
- Consistencia en todo el sitio
- Acentos dorados

📱 **Responsive Design**
- Redimensiona la ventana
- Prueba en dispositivo móvil
- Menu hamburguesa en mobile

---

## 🛠 Comandos Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor hot-reload

# Build
npm run build            # Compila para producción
npm run preview          # Preview del build

# Código
npm run lint             # Valida código
npm run lint:fix         # Arregla errores automáticos
npm run format           # Formatea código
npm run type-check       # Verifica tipos TypeScript

# Tests
npm run test             # Ejecuta tests
npm run test:ui          # Tests con interfaz visual
npm run test:coverage    # Cobertura de tests
```

---

## 📂 Estructura de Carpetas

```
intagros-react/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.jsx    ← Barra de navegación
│   │   │   └── Footer.jsx        ← Pie de página
│   │   ├── ui/
│   │   │   ├── Button.jsx        ← Componente de botón
│   │   │   ├── Card.jsx          ← Componente de tarjeta
│   │   │   ├── Badge.jsx         ← Etiquetas
│   │   │   ├── HeroSection.jsx   ← Sección hero
│   │   │   ├── Breadcrumb.jsx    ← Navegación migas
│   │   │   └── AnimatedSection.jsx ← Sección animada
│   │   └── sections/             ← Componentes específicos
│   ├── pages/
│   │   ├── Home.jsx              ← Página de inicio
│   │   ├── Fundadores.jsx        ← Equipo
│   │   ├── Cultivos.jsx          ← Productos
│   │   ├── Productos.jsx         ← Catálogo
│   │   ├── Redes.jsx             ← Redes sociales
│   │   └── Contacto.jsx          ← Formulario
│   ├── styles/
│   │   ├── index.css             ← Estilos principales
│   │   └── global.css            ← Estilos globales
│   ├── App.jsx                   ← Componente principal
│   └── main.jsx                  ← Punto de entrada
├── public/                        ← Archivos estáticos
├── tailwind.config.js             ← Configuración Tailwind
├── postcss.config.js              ← Configuración PostCSS
├── vite.config.js                 ← Configuración Vite
└── package.json                   ← Dependencias
```

---

## 🎨 Personalización

### Cambiar Colores Principales

Editar `tailwind.config.js`:

```javascript
colors: {
  jade: {
    700: '#1B4D3E',  // ← Verde principal (cambiar este)
    800: '#0D2B24',  // ← Verde oscuro (cambiar este)
    // ... otros colores
  }
}
```

### Agregar Nueva Página

1. Crear archivo en `src/pages/MiPagina.jsx`
2. Importar en `src/App.jsx`
3. Agregar ruta:

```jsx
const MiPagina = lazy(() => import('./pages/MiPagina'))

// En Routes:
<Route path="/mi-pagina" element={<MiPagina />} />
```

4. Actualizar `Navigation.jsx` si es necesario

### Modificar Contenido

- **Textos**: En cada archivo `.jsx` directamente
- **Imágenes**: Agregar en `public/` y referenciar
- **Datos**: En `src/data/` (crear si necesario)

---

## 🐛 Troubleshooting

### Error: "npm: command not found"
✅ **Solución**: Instalar Node.js desde https://nodejs.org/

### Error: "Port 5173 already in use"
✅ **Solución**: 
```bash
# Cambiar puerto
npm run dev -- --port 3000
```

### Error: "Module not found"
✅ **Solución**: Asegurar que importas correctamente
```jsx
// ✅ Correcto
import Button from '../components/ui/Button'

// ❌ Incorrecto
import Button from './Button'
```

### Los cambios no se reflejan
✅ **Solución**: 
1. Guardar archivo (Ctrl+S)
2. Esperar recarga automática
3. Si persiste, reiniciar servidor (Ctrl+C y npm run dev)

---

## 📱 Prueba en Móvil

### Desde otro dispositivo en la misma red:

```bash
npm run dev -- --host
```

Luego, en tu móvil accede a:
```
http://[TU_IP_LOCAL]:5173
```

Encontrar tu IP:
```bash
ipconfig getifaddr en0  # Mac
ipconfig               # Windows
hostname -I            # Linux
```

---

## 🚀 Deployment (Producción)

### Build para Producción

```bash
npm run build
```

Crea una carpeta `dist/` lista para deployment.

### Opciones de Hosting

- **Vercel** (Recomendado para React)
  ```bash
  npm i -g vercel
  vercel
  ```

- **Netlify**
  1. Conecta tu GitHub
  2. Automático en cada push

- **GitHub Pages**
  ```bash
  npm run build
  # Push a gh-pages branch
  ```

---

## 📊 Monitoreo

### Ver tamaño del build

```bash
npm run build -- --analyze
```

### Velocidad de carga

Usar Chrome DevTools:
1. F12 → Network
2. Desactivar caché
3. Recargar página
4. Ver tiempos de carga

---

## 💡 Tips Útiles

### Atajo de Teclado en VS Code
- `Ctrl+Shift+P` → Command Palette
- `Ctrl+/` → Comentar línea
- `Alt+Up/Down` → Mover línea
- `Ctrl+D` → Multi-select

### Acelerar npm install
```bash
npm install --legacy-peer-deps
```

### Actualizar todas las dependencias
```bash
npm update
```

### Ver versiones instaladas
```bash
npm list
```

---

## 🆘 Soporte

Si encuentras problemas:

1. **Lee los errores** - Son muy descriptivos
2. **Busca en Google** - Tu error probablemente ya fue resuelto
3. **Stack Overflow** - Comunidad activa de React
4. **GitHub Issues** - Busca en repositorio de librerías

---

## 🎯 Próximos Pasos Recomendados

1. ✅ **Ejecuta el proyecto** - Familiarízate con la UI
2. 📝 **Personaliza contenido** - Agrega tus textos
3. 🖼️ **Agrega imágenes** - Reemplaza placeholders
4. 📧 **Integra formularios** - Conecta a tu backend
5. 📱 **Prueba en móvil** - Asegúrate que todo funciona
6. 🚀 **Deploy** - Publica en producción

---

## 📚 Recursos Útiles

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **React Router**: https://reactrouter.com
- **Vite**: https://vitejs.dev

---

## ✨ ¡Listo para comenzar!

```bash
cd "C:\Users\Juan Pablo Alzate\intagros-react\intagros-react"
npm install
npm run dev
```

**Abre http://localhost:5173 en tu navegador y ¡disfruta!** 🎉

---

**Última actualización**: 23 de Mayo de 2026
**Versión de React**: 19.2.5
**Versión de Tailwind**: Latest
