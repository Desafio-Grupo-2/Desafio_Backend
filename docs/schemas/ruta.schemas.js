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
                example: 'BI-1234-AB'
            },
            polyline: {
                type: 'string',
                description: 'Polilínea de la ruta',
                example: 'encoded_polyline_string'
            },
            paradas: {
                type: 'string',
                description: 'Información de las paradas',
                example: 'BBK Kuna (Salida),Plaza Moyua,Universidad de Deusto,Colegio Salesianos Cruces'
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
                example: '5m,8m,12m,18m'
            },
            kms_paradas: {
                type: 'string',
                description: 'Kilómetros entre paradas',
                example: '2.5km,5.2km,8.7km,12.3km'
            },
            id_empresa: {
                type: 'integer',
                description: 'ID de la empresa',
                example: 1
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
    },
    RutaCreateRequest: {
        type: 'object',
        required: ['matricula'],
        properties: {
            matricula: {
                type: 'string',
                description: 'Matrícula del vehículo',
                example: 'BI-1234-AB'
            },
            id_empresa: {
                type: 'integer',
                description: 'ID de la empresa',
                example: 1
            },
            total_km: {
                type: 'number',
                description: 'Total de kilómetros de la ruta',
                example: 25.5
            },
            tiempo_total: {
                type: 'string',
                description: 'Tiempo total de la ruta',
                example: '45 min'
            },
            paradas: {
                type: 'string',
                description: 'Paradas en formato JSON stringificado',
                example: '[{"nombre":"BBK Kuna (Salida)","hora":"08:00","km":0},{"nombre":"Plaza Circular, Bilbao","hora":"08:15","km":5.2},{"nombre":"Universidad de Deusto","hora":"08:30","km":12.8},{"nombre":"Colegio Salesianos, Cruces","hora":"08:45","km":25.5}]'
            },
            tiempos_paradas: {
                type: 'string',
                description: 'Tiempos de paradas en formato JSON stringificado',
                example: '[15,30,45]'
            },
            kms_paradas: {
                type: 'string',
                description: 'Kilómetros entre paradas en formato JSON stringificado',
                example: '[5.2,12.8,25.5]'
            },
            fecha_inicio: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de inicio de la ruta (opcional, se genera automáticamente si no se proporciona)',
                example: '2024-01-20T08:00:00.000Z'
            },
            fecha_fin: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de fin de la ruta (opcional, se calcula automáticamente si no se proporciona)',
                example: '2024-01-20T08:45:00.000Z'
            },
            polyline: {
                type: 'string',
                description: 'Polilínea de la ruta (opcional, se genera automáticamente si no se proporciona)',
                example: 'encoded_polyline_BI-1234-AB_1758970988867'
            }
        }
    },
    RutaUpdateRequest: {
        type: 'object',
        properties: {
            matricula: {
                type: 'string',
                description: 'Matrícula del vehículo',
                example: 'BI-1234-AB'
            },
            id_empresa: {
                type: 'integer',
                description: 'ID de la empresa',
                example: 1
            },
            total_km: {
                type: 'number',
                description: 'Total de kilómetros de la ruta',
                example: 25.5
            },
            tiempo_total: {
                type: 'string',
                description: 'Tiempo total de la ruta',
                example: '45 min'
            },
            paradas: {
                type: 'string',
                description: 'Paradas en formato JSON stringificado',
                example: '[{"nombre":"BBK Kuna (Salida)","hora":"08:00","km":0},{"nombre":"Plaza Circular, Bilbao","hora":"08:15","km":5.2},{"nombre":"Universidad de Deusto","hora":"08:30","km":12.8},{"nombre":"Colegio Salesianos, Cruces","hora":"08:45","km":25.5}]'
            },
            tiempos_paradas: {
                type: 'string',
                description: 'Tiempos de paradas en formato JSON stringificado',
                example: '[15,30,45]'
            },
            kms_paradas: {
                type: 'string',
                description: 'Kilómetros entre paradas en formato JSON stringificado',
                example: '[5.2,12.8,25.5]'
            },
            fecha_inicio: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de inicio de la ruta',
                example: '2024-01-20T08:00:00.000Z'
            },
            fecha_fin: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha de fin de la ruta',
                example: '2024-01-20T08:45:00.000Z'
            },
            polyline: {
                type: 'string',
                description: 'Polilínea de la ruta',
                example: 'encoded_polyline_BI-1234-AB_1758970988867'
            }
        }
    }
};

module.exports = rutaSchemas;
