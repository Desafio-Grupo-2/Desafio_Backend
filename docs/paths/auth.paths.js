/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y autorización
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar nuevo usuario
 *     description: |
 *       Crea un nuevo usuario en el sistema. 
 *       **Seguridad**: La contraseña se hashea automáticamente con bcrypt (12 rounds).
 *       **Rate Limiting**: 3 intentos por 15 minutos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             username: "conductor01"
 *             email: "conductor@example.com"
 *             password: "Password123"
 *             nombre: "Juan"
 *             apellido: "Pérez"
 *             role: "conductor"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Usuario ya existe
 *       429:
 *         description: Demasiados intentos de registro
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: |
 *       Autentica un usuario y devuelve un token JWT.
 *       **Compatibilidad**: Funciona con contraseñas hasheadas y en texto plano.
 *       **Rate Limiting**: 5 intentos por 15 minutos.
 *       **Logs**: Registra intentos fallidos y exitosos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "sergionunez@deivibus.com"
 *             password: "Sergio01N"
 *     responses:
 *       200:
 *         description: Login exitoso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       401:
 *         description: Credenciales inválidas o usuario inactivo
 *       429:
 *         description: Demasiados intentos de login
 */

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Obtener perfil del usuario
 *     description: Obtiene la información del perfil del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Token inválido o expirado
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   post:
 *     tags: [Auth]
 *     summary: Cambiar contraseña (Solo administradores)
 *     description: |
 *       Permite a los administradores cambiar contraseñas de cualquier usuario.
 *       **Seguridad**: La nueva contraseña se hashea automáticamente con bcrypt.
 *       **Rate Limiting**: 3 intentos por 15 minutos.
 *       **Logs**: Registra cambios de contraseña en logs de seguridad.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordRequest'
 *           example:
 *             newPassword: "NewSecurePassword123"
 *             userId: 1
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Contraseña actualizada exitosamente"
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       404:
 *         description: Usuario no encontrado
 *       429:
 *         description: Demasiados intentos de cambio de contraseña
 */