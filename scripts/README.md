# Scripts de Base de Datos

## 🔄 Reset Completo de Base de Datos

### Descripción
Script que realiza un reset completo de la base de datos, eliminando todas las tablas, ejecutando migraciones y seeders desde cero.

### Uso

#### Opción 1: Usando npm script (Recomendado)
```bash
npm run db:reset:full
```

#### Opción 2: Ejecutando directamente
```bash
node scripts/reset-database.js
```

### ¿Qué hace el script?

1. **🗑️ DROP**: Elimina todas las tablas y tipos ENUM existentes
2. **🏗️ MIGRATE**: Ejecuta las migraciones para crear la estructura
3. **🌱 SEED**: Pobla la base de datos con datos de prueba
4. **🔍 VERIFY**: Verifica que todo se haya creado correctamente

### Resultado
- ✅ Base de datos completamente limpia
- ✅ Datos de prueba creados
- ✅ Listo para desarrollo

### Credenciales de Prueba

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | `admin@tripulaciones.com` | `admin123` |
| Jefe de Flota | `jefe.flota@empresademo.com` | `admin123` |
| Empleado | `jon.uranga@empresademo.com` | `admin123` |

### ⚠️ Advertencias

- **Este script elimina TODOS los datos** de la base de datos
- Solo usar en **entornos de desarrollo**
- **NO ejecutar en producción**

### Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run db:reset:full` | Reset completo (drop + migrate + seed) |
| `npm run db:migrate` | Solo ejecutar migraciones |
| `npm run db:seed` | Solo ejecutar seeders |
| `npm run db:reset` | Reset usando Sequelize CLI |

### Troubleshooting

Si el script falla:
1. Verificar que PostgreSQL esté ejecutándose
2. Verificar las credenciales en `.env`
3. Verificar que la base de datos existe
4. Revisar los logs de error para más detalles
