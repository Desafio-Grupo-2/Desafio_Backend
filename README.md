# Desafío de Tripulaciones - Backend

API REST para gestión de usuarios y autenticación.

## Inicio Rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
```bash
# Opción 1: Copiar manualmente
cp env/config.env .env

# Opción 2: Usar script automático
npm run setup:env

# Editar variables según tu configuración
```

### 3. Configurar base de datos
```bash
# Opción 1: Reset completo (recomendado)
npm run db:reset:full

# Opción 2: Configuración inicial completa
npm run setup:init
```

### 4. Iniciar servidor
```bash
npm run dev
```

## Documentación

- **API Docs**: http://localhost:3000/api-docs
- **Postman**: Importar colección desde `postman/`
- **Scripts**: Ver `scripts/README.md`


## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run setup:env` - Crear archivo .env desde plantilla
- `npm run setup:init` - Configuración inicial completa (env + migrate + seed)
- `npm run db:reset:full` - Reset completo de BD
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:seed` - Ejecutar seeders

