/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       properties:
 *         id_empresa:
 *           type: integer
 *           description: ID único de la empresa
 *         nombre:
 *           type: string
 *           description: Nombre de la empresa
 *           example: "San Millán Bus"
 *         cif:
 *           type: string
 *           description: CIF de la empresa
 *           example: "A12345678"
 *         direccion:
 *           type: string
 *           description: Dirección de la empresa
 *           example: "Calle Principal 123, 28001 Madrid"
 *         telefono:
 *           type: string
 *           description: Teléfono de contacto
 *           example: "+34 91 123 45 67"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contacto
 *           example: "contacto@empresa.com"
 *         sector:
 *           type: string
 *           description: Sector de actividad
 *           example: "Transporte"
 *         descripcion:
 *           type: string
 *           description: Descripción de la empresa
 *           example: "Empresa dedicada al transporte de mercancías"
 *         activa:
 *           type: boolean
 *           description: Estado de la empresa
 *           example: true
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación
 *           example: "2024-01-15T10:30:00Z"
 *     
 *     EmpresaListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Empresa'
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
 *     EmpresaCreateRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - cif
 *         - direccion
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Nombre de la empresa
 *           example: "San Millán Bus"
 *         cif:
 *           type: string
 *           pattern: "^[A-Z][0-9]{8}$"
 *           description: CIF de la empresa (letra seguida de 8 números)
 *           example: "A12345678"
 *         direccion:
 *           type: string
 *           minLength: 10
 *           maxLength: 200
 *           description: Dirección de la empresa
 *           example: "Calle Principal 123, 28001 Madrid"
 *         telefono:
 *           type: string
 *           minLength: 9
 *           maxLength: 15
 *           description: Teléfono de contacto
 *           example: "+34 91 123 45 67"
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contacto
 *           example: "contacto@empresa.com"
 *         sector:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Sector de actividad
 *           example: "Transporte"
 *         descripcion:
 *           type: string
 *           maxLength: 1000
 *           description: Descripción de la empresa
 *           example: "Empresa dedicada al transporte de mercancías"
 *         activa:
 *           type: boolean
 *           description: Estado de la empresa
 *           example: true
 *     
 *     EmpresaUpdateRequest:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           description: Nombre de la empresa
 *         cif:
 *           type: string
 *           pattern: "^[A-Z][0-9]{8}$"
 *           description: CIF de la empresa (letra seguida de 8 números)
 *         direccion:
 *           type: string
 *           minLength: 10
 *           maxLength: 200
 *           description: Dirección de la empresa
 *         telefono:
 *           type: string
 *           minLength: 9
 *           maxLength: 15
 *           description: Teléfono de contacto
 *         email:
 *           type: string
 *           format: email
 *           description: Email de contacto
 *         sector:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Sector de actividad
 *         descripcion:
 *           type: string
 *           maxLength: 1000
 *           description: Descripción de la empresa
 *         activa:
 *           type: boolean
 *           description: Estado de la empresa
 *     
 *     EmpresaResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Empresa'
 *     
 *     EmpresaToggleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             activa:
 *               type: boolean
 */
