/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestión de usuarios (conductores y administradores)
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Obtener lista de usuarios (Solo administradores)
 *     description: Obtiene una lista paginada de todos los usuarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de usuarios por página
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [conductor, administrador]
 *         description: Filtrar por rol
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre, email o username
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       403:
 *         description: Acceso denegado - Solo administradores
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener usuario por ID
 *     description: Obtiene la información de un usuario específico
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/users/empresa/{empresaId}:
 *   get:
 *     tags: [Users]
 *     summary: Obtener usuarios por empresa (Solo administradores)
 *     description: Obtiene una lista paginada de usuarios de una empresa específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: empresaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Número de usuarios por página
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [conductor, administrador]
 *         description: Filtrar por rol
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por nombre, email o username
 *       - in: query
 *         name: active
 *         schema:
 *           type: boolean
 *         description: Filtrar por estado activo
 *     responses:
 *       200:
 *         description: Lista de usuarios de la empresa obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       404:
 *         description: Empresa no encontrada
 */