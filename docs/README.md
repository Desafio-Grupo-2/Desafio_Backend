# Documentación de la API - Desafío Tripulaciones

## Configuración

La configuración principal de Swagger se encuentra en `config/swagger.config.js` y se importa en `src/app.js`.

### Características de la configuración:

- **Autenticación JWT**: Configurada con Bearer Token
- **Tags**: Organización por módulos (Auth, Users, Vehicles, Trips, Tickets)
- **Esquemas**: Referencias a los archivos de schemas
- **Paths**: Referencias a los archivos de paths

## Esquemas (Schemas)

Los esquemas definen la estructura de los datos que se envían y reciben en la API:

- **auth.schemas.js**: Esquemas de autenticación (LoginRequest, RegisterRequest, AuthResponse, etc.)
- **user.schemas.js**: Esquemas de usuarios (User, UserStats, UserListResponse)
- **vehicle.schemas.js**: Esquemas de vehículos (Vehicle, VehicleCreateRequest, VehicleUpdateRequest)
- **trip.schemas.js**: Esquemas de viajes (Trip, TripCreateRequest, TripUpdateRequest)
- **ticket.schemas.js**: Esquemas de tickets (Ticket, TicketCreateRequest, TicketUpdateRequest, TicketListResponse)

## Paths (Endpoints)

Los paths definen todos los endpoints de la API organizados por módulo:

- **auth.paths.js**: Endpoints de autenticación (/api/v1/auth/*)
- **user.paths.js**: Endpoints de usuarios (/api/v1/users/*)
- **vehicle.paths.js**: Endpoints de vehículos (/api/v1/vehicles/*)
- **trip.paths.js**: Endpoints de viajes (/api/v1/trips/*)
- **ticket.paths.js**: Endpoints de tickets (/api/v1/tickets/*)

## Uso

La documentación de Swagger está disponible en:
- **Desarrollo**: http://localhost:3000/api-docs
- **Producción**: 

## Mantenimiento

### Agregar un nuevo esquema:
1. Crear o editar el archivo correspondiente en `schemas/`
2. Definir el esquema con la sintaxis de OpenAPI
3. Referenciar el esquema en los paths que lo necesiten

### Agregar un nuevo endpoint:
1. Crear o editar el archivo correspondiente en `paths/`
2. Definir el endpoint con todos sus parámetros y respuestas
3. Referenciar los esquemas necesarios

### Modificar la configuración:
1. Editar `config/swagger.config.js`
2. Reiniciar el servidor para aplicar los cambios

## Verificación

Para verificar que la documentación esté funcionando correctamente:

1. Iniciar el servidor: `npm run dev`
2. Abrir http://localhost:3000/api-docs
3. Verificar que todos los endpoints estén documentados
4. Probar la autenticación y los endpoints

