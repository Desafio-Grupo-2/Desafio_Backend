# Colección de Postman - Desafío Tripulaciones API

Esta colección de Postman contiene todos los endpoints implementados en la API del Desafío Tripulaciones para facilitar las pruebas y el desarrollo.

## Contenido de la Colección

### Auth - Autenticación
- **Register - Registrar Usuario**: Crea un nuevo usuario conductor
- **Register Admin - Registrar Administrador**: Crea un nuevo usuario administrador
- **Login - Iniciar Sesión**: Autentica un usuario existente
- **Admin Login - Login Administrador**: Autentica específicamente como administrador
- **Get Profile - Obtener Perfil**: Obtiene información del usuario autenticado
- **Update Profile - Actualizar Perfil**: Actualiza datos del perfil
- **Change Password - Cambiar Contraseña**: Cambia contraseñas (solo admin)
- **Logout - Cerrar Sesión**: Cierra la sesión del usuario

### Users - Gestión de Usuarios
- **Get All Users - Obtener Todos los Usuarios**: Lista paginada de usuarios (solo admin)
- **Get User by ID - Obtener Usuario por ID**: Obtiene un usuario específico
- **Create User - Crear Usuario**: Crea un nuevo usuario (solo admin)
- **Update User - Actualizar Usuario**: Actualiza datos de un usuario
- **Delete User - Eliminar Usuario**: Elimina un usuario (solo admin)
- **Toggle User Status - Cambiar Estado Usuario**: Activa/desactiva usuario (solo admin)

### Health Check - Verificación de Estado
- **API Health Check**: Verifica el estado de la API
- **Swagger Documentation**: Accede a la documentación de Swagger

### Error Testing - Pruebas de Error
- **Invalid Login**: Prueba credenciales inválidas
- **Unauthorized Access**: Prueba acceso sin token
- **Invalid Token**: Prueba token inválido
- **Conductor Access Admin Route**: Prueba restricciones de rol

## Configuración Inicial

### 1. Importar la Colección
1. Abre Postman
2. Haz clic en "Import"
3. Selecciona el archivo `Desafio_Tripulaciones_API.postman_collection.json`
4. La colección se importará automáticamente

### 2. Configurar Variables de Entorno
La colección incluye las siguientes variables:

- **`base_url`**: `http://localhost:3000` (URL base de la API)
- **`auth_token`**: Token JWT para usuarios conductores (se llena automáticamente)
- **`admin_token`**: Token JWT para usuarios administradores (se llena automáticamente)

### 3. Iniciar el Servidor
```bash
npm run dev
```

## Flujo de Pruebas Recomendado

### Paso 1: Registrar Usuarios
1. **Register Admin**: Crea un usuario administrador
2. **Register**: Crea un usuario conductor

### Paso 2: Autenticación
1. **Admin Login**: Inicia sesión como administrador
2. **Login**: Inicia sesión como conductor
3. Los tokens se guardarán automáticamente en las variables

### Paso 3: Pruebas de Perfil
1. **Get Profile**: Obtiene el perfil del usuario autenticado
2. **Update Profile**: Actualiza datos del perfil

### Paso 4: Gestión de Usuarios (Solo Admin)
1. **Get All Users**: Lista todos los usuarios
2. **Create User**: Crea un nuevo usuario
3. **Get User by ID**: Obtiene un usuario específico
4. **Update User**: Actualiza datos de un usuario
5. **Toggle User Status**: Cambia el estado de un usuario

### Paso 5: Funciones Administrativas
1. **Change Password**: Cambia contraseña de un usuario
2. **Delete User**: Elimina un usuario

### Paso 6: Pruebas de Seguridad
1. **Register New User**: Verifica hasheo automático de contraseñas
2. **Login New User**: Verifica funcionamiento con contraseñas hasheadas
3. **Test Password Complexity**: Verifica validación de contraseñas débiles
4. **Invalid Login**: Verifica manejo de credenciales inválidas
5. **Unauthorized Access**: Verifica protección de rutas
6. **Conductor Access Admin Route**: Verifica restricciones de rol

## 🔧 Configuración de Tests Automáticos

### Extracción Automática de Tokens
Los requests de login incluyen scripts de test que extraen automáticamente los tokens:

```javascript
// Para login normal
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.token) {
        pm.collectionVariables.set("auth_token", response.data.token);
    }
}

// Para admin login
if (pm.response.code === 200) {
    const response = pm.response.json();
    if (response.data && response.data.token) {
        pm.collectionVariables.set("admin_token", response.data.token);
    }
}
```

## Datos de Prueba

### Usuario Conductor (Real)
```json
{
  "username": "conductor01",
  "email": "carlosgarcia@gmail.com",
  "password": "NewPassword123",
  "nombre": "Carlos",
  "apellido": "García",
  "role": "conductor"
}
```

### Usuario Administrador (Real)
```json
{
  "username": "admin01",
  "email": "sergionunez@deivibus.com",
  "password": "Sergio01N",
  "nombre": "Sergio",
  "apellido": "Núñez",
  "role": "administrador"
}
```

### Usuario de Prueba (Nuevo)
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "TestPassword123",
  "nombre": "Test",
  "apellido": "User",
  "role": "conductor"
}
```

## Seguridad Implementada

### Hasheo de Contraseñas
- **Sistema Híbrido**: Compatible con contraseñas existentes en texto plano
- **Nuevos Usuarios**: Contraseñas hasheadas automáticamente con bcrypt 
- **Cambios de Contraseña**: Se hashean automáticamente
- **Verificación**: Detecta automáticamente el tipo de contraseña

### Rate Limiting
- **Login**: 5 intentos por 15 minutos
- **Register**: 3 intentos por 15 minutos
- **Change Password**: 3 intentos por 15 minutos
- **General**: 100 requests por 15 minutos

### Validaciones
- **Contraseñas**: Mínimo 8 caracteres, al menos 1 mayúscula, 1 minúscula, 1 número
- **Email**: Formato válido
- **Username**: 3-30 caracteres, alfanumérico
- **Nombres**: 2-50 caracteres

### Roles y Permisos
- **Conductor**: Puede ver su perfil y actualizarlo
- **Administrador**: Acceso completo a gestión de usuarios y cambio de contraseñas

## Monitoreo y Logs

### Logs de Seguridad
Los siguientes eventos se registran en `logs/security.log`:
- Intentos de login fallidos
- Logins exitosos
- Registros de usuarios
- Cambios de contraseña
- Errores críticos
- Exceso de rate limiting

### Verificación de Logs
```bash
# Ver logs de seguridad
tail -f logs/security.log

# Ver logs en tiempo real
npm run dev
```

## Sistema Híbrido de Contraseñas

### Características
- **Compatibilidad Total**: Funciona con contraseñas existentes
- **Seguridad Automática**: Nuevos usuarios tienen contraseñas hasheadas
- **Transición Gradual**: Migración natural a contraseñas hasheadas
- **Sin Modificación de BD**: No requiere cambios en la base de datos existente

### Cómo Funciona
1. **Usuarios Existentes**: Contraseñas en texto plano siguen funcionando
2. **Nuevos Usuarios**: Contraseñas se hashean automáticamente al registrarse
3. **Cambios de Contraseña**: Nuevas contraseñas se hashean automáticamente
4. **Verificación**: Sistema detecta automáticamente el tipo de contraseña

## Documentación Adicional

- **Swagger UI**: `http://localhost:3000/api-docs`
- **Health Check**: `http://localhost:3000/api/health`
- **Código fuente**: Revisar `src/modules/` para implementación

## Solución de Problemas

### Error 401 - Unauthorized
- Verificar que el token esté configurado correctamente
- Comprobar que el token no haya expirado (1 hora de duración)

### Error 403 - Forbidden
- Verificar que el usuario tenga el rol correcto
- Solo administradores pueden acceder a ciertas rutas

### Error 429 - Too Many Requests
- Esperar 15 minutos o reiniciar el servidor
- Verificar configuración de rate limiting

### Error 500 - Internal Server Error
- Revisar logs del servidor
- Verificar conexión a la base de datos
- Comprobar configuración de variables de entorno

## Soporte

Para problemas o dudas:
1. Revisar los logs de seguridad
2. Verificar la documentación de Swagger
3. Comprobar la configuración de la base de datos
4. Validar las variables de entorno en `.env`