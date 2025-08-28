# 🤖 AVI Shopper MVP

Un MVP de aplicación web para compras familiares inteligentes con asistencia de IA.

## 🚀 Características

- 🧠 **Asistente IA (AVI)** que aprende de los patrones familiares
- 📱 **Interfaz responsive** construida con React y Tailwind CSS
- 👥 **Gestión familiar** con diferentes roles y permisos
- 💰 **Comparación de precios** entre supermercados
- ✨ **Sugerencias inteligentes** basadas en historial

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Containerization**: Docker + Docker Compose

## 📦 Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

1. **Clona el repositorio**:
   ```bash
   git clone <tu-repo>
   cd mvp_avi_shopper
   ```

2. **Levanta la aplicación con Docker Compose**:
   ```bash
   docker-compose up --build
   ```

3. **Accede a la aplicación**:
   - Abre tu navegador en: http://localhost:3001
   - La aplicación se recargará automáticamente al hacer cambios

### Opción 2: Instalación local

1. **Instala las dependencias**:
   ```bash
   npm install
   ```

2. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

3. **Accede a la aplicación**:
   - Abre tu navegador en: http://localhost:5173

## 🎮 Cómo usar

1. **Login**: Selecciona un miembro de la familia
2. **Lista Smart**: Agrega productos y ve sugerencias de AVI
3. **Análisis IA**: Compara precios entre supermercados
4. **Confirmar**: Finaliza tu pedido (solo administradores)

### Usuarios de prueba:
- 👨 **Papá** (admin) - Puede confirmar pedidos
- 👩 **Mamá** (admin) - Puede confirmar pedidos
- 👵 **Nana** (member) - Puede agregar productos
- 👦 **Hijo** (member) - Puede agregar productos

## 🐳 Docker

### Comandos útiles:

```bash
# Iniciar los contenedores
docker-compose up

# Iniciar en background
docker-compose up -d

# Rebuild de las imágenes
docker-compose up --build

# Ver logs
docker-compose logs -f

# Parar los contenedores
docker-compose down
```

## 📁 Estructura del proyecto

```
mvp_avi_shopper/
├── src/
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos CSS + Tailwind
├── public/              # Archivos estáticos
├── docker-compose.yml   # Configuración Docker
├── Dockerfile          # Imagen Docker
├── package.json        # Dependencias NPM
├── vite.config.js      # Configuración Vite
├── tailwind.config.js  # Configuración Tailwind
└── README.md          # Este archivo
```

## 🔧 Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

## 🌟 Funcionalidades destacadas

### AVI (Asistente Virtual Inteligente):
- Sugerencias proactivas de productos
- Análisis de precios en tiempo real
- Recomendaciones basadas en patrones familiares
- Coordinación automática de pedidos

### Sistema familiar:
- Roles diferenciados (admin/member)
- Seguimiento de quién agrega cada producto
- Colaboración en tiempo real

### Análisis inteligente:
- Comparación automática de precios
- Identificación del supermercado más conveniente
- Cálculo de ahorros potenciales

## 🚧 Desarrollo

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit tus cambios: `git commit -m 'Agrega nueva funcionalidad'`
4. Push a la rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

---

**¡Desarrollado con ❤️ para hacer las compras familiares más inteligentes!**
