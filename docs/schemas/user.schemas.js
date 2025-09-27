/**
 * @swagger
 * components:
 *   schemas:
 *     UserListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/User'
 *         pagination:
 *           type: object
 *           properties:
 *             total:
 *               type: integer
 *             page:
 *               type: integer
 *             limit:
 *               type: integer
 *             pages:
 *               type: integer
 *     
 *     UserUpdateRequest:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           minLength: 3
 *           maxLength: 30
 *         email:
 *           type: string
 *           format: email
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
 *         active:
 *           type: boolean
 *         id_empresa:
 *           type: integer
 *           description: ID de la empresa a la que pertenece el usuario
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Mensaje de error
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: Lista de errores de validación
 */
