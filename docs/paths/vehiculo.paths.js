/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestión de vehículos
 */

/**
 * @swagger
 * /api/vehiculos:
 *   get:
 *     tags: [Vehiculos]
 *     summary: Obtener lista de vehículos (Solo administradores)
 *     description: |
 *       Obtiene una lista paginada de todos los vehículos con filtros opcionales.
 *       **Permisos**: Solo administradores pueden acceder.
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
 *         description: Número de vehículos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por matrícula, marca o modelo
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtrar por marca
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de vehículo
 *       - in: query
 *         name: id_usuario
 *         schema:
 *           type: integer
 *         description: Filtrar por ID del usuario propietario
 *     responses:
 *       200:
 *         description: Lista de vehículos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehiculoListResponse'
 *       403:
 *         description: Acceso denegado - Solo administradores
 *   post:
 *     tags: [Vehiculos]
 *     summary: Crear nuevo vehículo (Solo administradores)
 *     description: |
 *       Crea un nuevo vehículo en el sistema.
 *       **Permisos**: Solo administradores pueden crear vehículos.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehiculoCreateRequest'
 *           example:
 *             matricula: "1234-ABC"
 *             id_usuario: 1
 *             marca: "Toyota"
 *             modelo: "Corolla"
 *             etiqueta: "ECO"
 *             tipo: "Turismo"
 *             consumo_min: 5
 *             consumo_max: 7
 *             emisiones_min: 95
 *             emisiones_max: 120
 *             motorizacion: "Híbrido"
 *             km: 50000
 *             kw_minimo: 85
 *             kw_maximo: 110
 *     responses:
 *       201:
 *         description: Vehículo creado exitosamente
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
 *                   example: "Vehículo creado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Vehiculo'
 *       400:
 *         description: Error de validación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       409:
 *         description: Ya existe un vehículo con esta matrícula
 */

/**
 * @swagger
 * /api/vehiculos/{matricula}:
 *   get:
 *     tags: [Vehiculos]
 *     summary: Obtener vehículo por matrícula
 *     description: |
 *       Obtiene la información de un vehículo específico por su matrícula.
 *       **Permisos**: Administradores y conductores pueden acceder.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del vehículo
 *         example: "1234-ABC"
 *     responses:
 *       200:
 *         description: Vehículo obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Vehiculo'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Vehículo no encontrado
 *   put:
 *     tags: [Vehiculos]
 *     summary: Actualizar vehículo (Solo administradores)
 *     description: |
 *       Actualiza la información de un vehículo existente.
 *       **Permisos**: Solo administradores pueden actualizar vehículos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del vehículo
 *         example: "1234-ABC"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VehiculoUpdateRequest'
 *           example:
 *             marca: "Toyota"
 *             modelo: "Corolla Hybrid"
 *             etiqueta: "ECO"
 *             km: 55000
 *     responses:
 *       200:
 *         description: Vehículo actualizado exitosamente
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
 *                   example: "Vehículo actualizado exitosamente"
 *                 data:
 *                   $ref: '#/components/schemas/Vehiculo'
 *       400:
 *         description: Error de validación
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       404:
 *         description: Vehículo no encontrado
 *   delete:
 *     tags: [Vehiculos]
 *     summary: Eliminar vehículo (Solo administradores)
 *     description: |
 *       Elimina un vehículo del sistema.
 *       **Permisos**: Solo administradores pueden eliminar vehículos.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: matricula
 *         required: true
 *         schema:
 *           type: string
 *         description: Matrícula del vehículo
 *         example: "1234-ABC"
 *     responses:
 *       200:
 *         description: Vehículo eliminado exitosamente
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
 *                   example: "Vehículo eliminado exitosamente"
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       404:
 *         description: Vehículo no encontrado
 */

/**
 * @swagger
 * /api/vehiculos/usuario/{id_usuario}:
 *   get:
 *     tags: [Vehiculos]
 *     summary: Obtener vehículos de un usuario
 *     description: |
 *       Obtiene todos los vehículos de un usuario específico.
 *       **Permisos**: Administradores y conductores pueden acceder.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *         example: 1
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
 *         description: Número de vehículos por página
 *     responses:
 *       200:
 *         description: Vehículos del usuario obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehiculoListResponse'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /api/vehiculos/empresa/{empresaId}:
 *   get:
 *     tags: [Vehiculos]
 *     summary: Obtener vehículos por empresa (Solo administradores)
 *     description: |
 *       Obtiene todos los vehículos de una empresa específica.
 *       **Permisos**: Solo administradores pueden acceder.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: empresaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *         example: 1
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
 *         description: Número de vehículos por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Buscar por matrícula, marca o modelo
 *       - in: query
 *         name: marca
 *         schema:
 *           type: string
 *         description: Filtrar por marca
 *       - in: query
 *         name: tipo
 *         schema:
 *           type: string
 *         description: Filtrar por tipo de vehículo
 *     responses:
 *       200:
 *         description: Vehículos de la empresa obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VehiculoListResponse'
 *       403:
 *         description: Acceso denegado - Solo administradores
 *       404:
 *         description: Empresa no encontrada
 */