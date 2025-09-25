/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - nombre
 *         - apellido
 *       properties:
 *         id_usuario:
 *           type: integer
 *           description: ID único del usuario
 *         username:
 *           type: string
 *           description: Nombre de usuario único
 *         email:
 *           type: string
 *           format: email
 *           description: Email del usuario
 *         nombre:
 *           type: string
 *           description: Nombre del usuario
 *         apellido:
 *           type: string
 *           description: Apellido del usuario
 *         role:
 *           type: string
 *           enum: [conductor, administrador]
 *           description: Rol del usuario
 *         active:
 *           type: boolean
 *           description: Estado activo del usuario
 *     
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *     
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - nombre
 *         - apellido
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 8
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *         apellido:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *         role:
 *           type: string
 *           enum: [conductor, administrador]
 *           default: conductor
 *     
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 *             token:
 *               type: string
 *               description: JWT token
 *     
 *     ChangePasswordRequest:
 *       type: object
 *       required:
 *         - newPassword
 *       properties:
 *         userId:
 *           type: integer
 *           description: ID del usuario (opcional, por defecto el usuario actual)
 *         newPassword:
 *           type: string
 *           minLength: 8
 *           pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$'
 *           description: Nueva contraseña (se hasheará automáticamente con bcrypt)
 *     
 *     PasswordSecurityInfo:
 *       type: object
 *       properties:
 *         hashing:
 *           type: string
 *           description: "Las contraseñas se hashean automáticamente con bcrypt (12 rounds)"
 *         compatibility:
 *           type: string
 *           description: "Sistema híbrido compatible con contraseñas existentes en texto plano"
 *         newUsers:
 *           type: string
 *           description: "Nuevos usuarios tienen contraseñas hasheadas automáticamente"
 *         passwordChanges:
 *           type: string
 *           description: "Cambios de contraseña se hashean automáticamente"
 */
