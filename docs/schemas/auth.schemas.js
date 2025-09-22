/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *           example: "admin@tripulaciones.com"
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *           example: "admin123"
 *
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - firstName
 *         - lastName
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *           example: "conductor@tripulaciones.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Contraseña del usuario
 *           example: "password123"
 *         firstName:
 *           type: string
 *           description: Nombre del usuario
 *           example: "Juan"
 *         lastName:
 *           type: string
 *           description: Apellido del usuario
 *           example: "Pérez"
 *         phone:
 *           type: string
 *           description: Teléfono del usuario
 *           example: "+1234567890"
 *         role:
 *           type: string
 *           enum: [admin, empleado]
 *           description: Rol del usuario - admin jefe de flota, empleado conductor
 *           example: "empleado"
 *
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - currentPassword
 *         - newPassword
 *       properties:
 *         currentPassword:
 *           type: string
 *           description: Contraseña actual
 *           example: "oldpassword123"
 *         newPassword:
 *           type: string
 *           minLength: 6
 *           description: Nueva contraseña
 *           example: "newpassword123"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: true
 *         message:
 *           type: string
 *           description: Mensaje de respuesta
 *           example: "Login exitoso"
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             token:
 *               type: string
 *               description: Token JWT para autenticación
 *               example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indica si la operación fue exitosa
 *           example: false
 *         message:
 *           type: string
 *           description: Mensaje de error
 *           example: "Credenciales inválidas"
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 description: Campo que tiene el error
 *               message:
 *                 type: string
 *                 description: Mensaje de error específico
 */
