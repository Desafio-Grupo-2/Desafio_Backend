/**
 * @swagger
 * components:
 *   schemas:
 *     Vehiculo:
 *       type: object
 *       required:
 *         - matricula
 *         - id_usuario
 *         - marca
 *         - modelo
 *         - tipo
 *       properties:
 *         matricula:
 *           type: string
 *           description: Matrícula del vehículo (clave primaria)
 *           example: "1234-ABC"
 *         id_usuario:
 *           type: integer
 *           description: ID del usuario propietario
 *           example: 1
 *         marca:
 *           type: string
 *           description: Marca del vehículo
 *           example: "Toyota"
 *         modelo:
 *           type: string
 *           description: Modelo del vehículo
 *           example: "Corolla"
 *         etiqueta:
 *           type: string
 *           description: Etiqueta ambiental del vehículo
 *           example: "ECO"
 *         tipo:
 *           type: string
 *           description: Tipo de vehículo
 *           example: "Turismo"
 *         consumo_min:
 *           type: integer
 *           description: Consumo mínimo en L/100km
 *           example: 5
 *         consumo_max:
 *           type: integer
 *           description: Consumo máximo en L/100km
 *           example: 7
 *         emisiones_min:
 *           type: integer
 *           description: Emisiones mínimas en g CO2/km
 *           example: 95
 *         emisiones_max:
 *           type: integer
 *           description: Emisiones máximas en g CO2/km
 *           example: 120
 *         motorizacion:
 *           type: string
 *           description: Tipo de motorización
 *           example: "Híbrido"
 *         km:
 *           type: integer
 *           description: Kilómetros del vehículo
 *           example: 50000
 *         kw_minimo:
 *           type: integer
 *           description: Potencia mínima en kW
 *           example: 85
 *         kw_maximo:
 *           type: integer
 *           description: Potencia máxima en kW
 *           example: 110
 *         usuario:
 *           $ref: '#/components/schemas/User'
 *     
 *     VehiculoCreateRequest:
 *       type: object
 *       required:
 *         - matricula
 *         - id_usuario
 *         - marca
 *         - modelo
 *         - tipo
 *       properties:
 *         matricula:
 *           type: string
 *           pattern: '^[A-Z0-9\s-]+$'
 *           minLength: 1
 *           maxLength: 20
 *           example: "1234-ABC"
 *         id_usuario:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         marca:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Toyota"
 *         modelo:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Corolla"
 *         etiqueta:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *           example: "ECO"
 *         tipo:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Turismo"
 *         consumo_min:
 *           type: integer
 *           minimum: 0
 *           example: 5
 *         consumo_max:
 *           type: integer
 *           minimum: 0
 *           example: 7
 *         emisiones_min:
 *           type: integer
 *           minimum: 0
 *           example: 95
 *         emisiones_max:
 *           type: integer
 *           minimum: 0
 *           example: 120
 *         motorizacion:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Híbrido"
 *         km:
 *           type: integer
 *           minimum: 0
 *           example: 50000
 *         kw_minimo:
 *           type: integer
 *           minimum: 0
 *           example: 85
 *         kw_maximo:
 *           type: integer
 *           minimum: 0
 *           example: 110
 *     
 *     VehiculoUpdateRequest:
 *       type: object
 *       properties:
 *         id_usuario:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *         marca:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Toyota"
 *         modelo:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Corolla"
 *         etiqueta:
 *           type: string
 *           minLength: 1
 *           maxLength: 20
 *           example: "ECO"
 *         tipo:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Turismo"
 *         consumo_min:
 *           type: integer
 *           minimum: 0
 *           example: 5
 *         consumo_max:
 *           type: integer
 *           minimum: 0
 *           example: 7
 *         emisiones_min:
 *           type: integer
 *           minimum: 0
 *           example: 95
 *         emisiones_max:
 *           type: integer
 *           minimum: 0
 *           example: 120
 *         motorizacion:
 *           type: string
 *           minLength: 1
 *           maxLength: 50
 *           example: "Híbrido"
 *         km:
 *           type: integer
 *           minimum: 0
 *           example: 50000
 *         kw_minimo:
 *           type: integer
 *           minimum: 0
 *           example: 85
 *         kw_maximo:
 *           type: integer
 *           minimum: 0
 *           example: 110
 *     
 *     VehiculoListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Vehiculo'
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
 */
