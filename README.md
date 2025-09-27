# Desafío de Tripulaciones Grupo 2 - Backend

API REST para gestión de usuarios, vehículos, rutas, tickets y estaciones de servicio.

## Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Generar archivo .env con JWT_SECRET aleatorio:
```bash
npm run generate-env
```

Luego editar el archivo `.env` generado con tus datos de base de datos:
```env
DB_HOST=tu_host
DB_PORT=5432
DB_NAME=tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_SSL=false
```

### 3. Ejecutar la aplicación

#### Modo desarrollo (con nodemon)
```bash
npm run dev
```

#### Modo producción
```bash
npm start
```

## Modelos de Base de Datos

- **Usuario**: Gestión de usuarios del sistema
- **Vehiculo**: Información de vehículos asociados a usuarios
- **Ruta**: Rutas realizadas por vehículos
- **Ticket**: Tickets de combustible asociados a rutas
- **EstacionServicio**: Estaciones de servicio
- **TipoCombustible**: Precios de combustibles por estación

## Scripts Disponibles

- `npm start`: Ejecuta la aplicación en modo producción
- `npm run dev`: Ejecuta la aplicación en modo desarrollo con nodemon
- `npm run generate-env`: Genera archivo .env con JWT_SECRET aleatorio

## Despliegue

### Producción (Render)
La aplicación está desplegada en Render: https://desafio-backend-qb7w.onrender.com/

**Documentación API (Swagger):** https://desafio-backend-qb7w.onrender.com/api-docs

### Variables de Entorno para Producción
En Render, configura las siguientes variables de entorno:
- `DB_HOST`: Host de tu base de datos PostgreSQL
- `DB_PORT`: Puerto de la base de datos (5432)
- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña de la base de datos
- `DB_SSL`: true (para conexiones seguras)
- `JWT_SECRET`: Clave secreta para JWT (generar una segura)
- `JWT_EXPIRES_IN`: Tiempo de expiración del token (ej: 1h)
- `NODE_ENV`: production
- `CORS_ORIGIN`: URL de tu frontend (si aplica)

## Tecnologías Utilizadas

- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- JWT (autenticación)
- bcryptjs (encriptación de contraseñas)
- Swagger (documentación API)
- Helmet (seguridad)
- CORS (Cross-Origin Resource Sharing)
- Express Rate Limit (limitación de requests)
