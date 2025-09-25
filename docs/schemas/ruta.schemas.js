const rutaSchemas = {
    Ruta: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único de la ruta',
                example: 5
            },
            matricula: {
                type: 'string',
                description: 'Matrícula del vehículo',
                example: '0004 AAA'
            },
            polyline: {
                type: 'string',
                description: 'Polilínea de la ruta',
                example: 'encoded_polyline_string'
            },
            paradas: {
                type: 'string',
                description: 'Información de las paradas',
                example: 'parada1,parada2,parada3'
            },
            total_km: {
                type: 'number',
                description: 'Total de kilómetros de la ruta',
                example: 151.574
            },
            fecha_inicio: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de inicio de la ruta',
                example: '2025-09-24T18:09:03.000Z'
            },
            fecha_fin: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de fin de la ruta',
                example: '2025-09-24T20:15:30.000Z'
            },
            tiempo_total: {
                type: 'string',
                description: 'Tiempo total de la ruta',
                example: '2h 6m'
            },
            tiempos_paradas: {
                type: 'string',
                description: 'Tiempos de las paradas',
                example: '5m,10m,3m'
            },
            kms_paradas: {
                type: 'string',
                description: 'Kilómetros entre paradas',
                example: '50km,75km,25km'
            }
        }
    },
    RutaListResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true
            },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Ruta'
                }
            },
            pagination: {
                type: 'object',
                properties: {
                    total: {
                        type: 'integer',
                        example: 5
                    },
                    page: {
                        type: 'integer',
                        example: 1
                    },
                    limit: {
                        type: 'integer',
                        example: 10
                    },
                    totalPages: {
                        type: 'integer',
                        example: 1
                    }
                }
            }
        }
    },
    RutaResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true
            },
            data: {
                $ref: '#/components/schemas/Ruta'
            }
        }
    }
};

module.exports = rutaSchemas;
