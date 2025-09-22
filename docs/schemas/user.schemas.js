/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: ID único del usuario
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *           example: "admin@tripulaciones.com"
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Admin"
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *           example: "Usuario"
 *         phone:
 *           type: string
 *           description: Teléfono del usuario
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [admin, empleado]
 *           description: Rol del usuario - admin jefe de flota, empleado conductor
 *           example: "admin"
 *         isActive:
 *           type: boolean
 *           description: Si el usuario está activo
 *           example: true
 *         lastLogin:
 *           type: string
 *           format: date-time
 *           description: Último inicio de sesión
 *           example: "2024-01-15T10:30:00.000Z"
 *         profileImage:
 *           type: string
 *           description: URL de la imagen de perfil
 *           example: "https://example.com/profile.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: "2024-01-01T00:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de última actualización
 *           example: "2024-01-15T10:30:00.000Z"
 *
 *     UserStats:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: integer
 *           description: Total de usuarios registrados
 *           example: 25
 *         activeUsers:
 *           type: integer
 *           description: Usuarios activos
 *           example: 23
 *         adminUsers:
 *           type: integer
 *           description: Usuarios administradores
 *           example: 2
 *         driverUsers:
 *           type: integer
 *           description: Usuarios conductores
 *           example: 21
 *         recentLogins:
 *           type: integer
 *           description: Inicios de sesión en las últimas 24 horas
 *           example: 15
 *
 *     UserListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         message:
 *           type: string
 *           description: Mensaje de respuesta
 *           example: "Usuarios obtenidos exitosamente"
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         pagination:
 *           type: object
 *           properties:
 *             page:
 *               type: integer
 *               description: Página actual
 *               example: 1
 *             limit:
 *               type: integer
 *               description: Límite de elementos por página
 *               example: 10
 *             total:
 *               type: integer
 *               description: Total de elementos
 *               example: 25
 *             totalPages:
 *               type: integer
 *               description: Total de páginas
 *               example: 3
 */
