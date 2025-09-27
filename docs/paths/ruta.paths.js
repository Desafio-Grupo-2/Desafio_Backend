const rutaPaths = {
    '/api/rutas': {
        get: {
            tags: ['Rutas'],
            summary: 'Obtener todas las rutas',
            description: 'Obtiene una lista paginada de todas las rutas almacenadas en la base de datos',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'page',
                    in: 'query',
                    description: 'Número de página',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1,
                        minimum: 1
                    }
                },
                {
                    name: 'limit',
                    in: 'query',
                    description: 'Número de elementos por página',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 10,
                        minimum: 1,
                        maximum: 100
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Lista de rutas obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RutaListResponse'
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/rutas/{id}': {
        get: {
            tags: ['Rutas'],
            summary: 'Obtener ruta por ID',
            description: 'Obtiene una ruta específica por su ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID de la ruta',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Ruta obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RutaResponse'
                            }
                        }
                    }
                },
                404: {
                    description: 'Ruta no encontrada',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/rutas/vehiculo/{matricula}': {
        get: {
            tags: ['Rutas'],
            summary: 'Obtener rutas por vehículo',
            description: 'Obtiene todas las rutas asociadas a un vehículo específico por su matrícula',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'matricula',
                    in: 'path',
                    description: 'Matrícula del vehículo',
                    required: true,
                    schema: {
                        type: 'string'
                    },
                    example: 'BI-1234-AB'
                },
                {
                    name: 'page',
                    in: 'query',
                    description: 'Número de página',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 1,
                        minimum: 1
                    }
                },
                {
                    name: 'limit',
                    in: 'query',
                    description: 'Número de elementos por página',
                    required: false,
                    schema: {
                        type: 'integer',
                        default: 10,
                        minimum: 1,
                        maximum: 100
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Rutas del vehículo obtenidas exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RutaListResponse'
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/rutas': {
        post: {
            tags: ['Rutas'],
            summary: 'Crear nueva ruta',
            description: 'Crea una nueva ruta con datos estructurados (paradas, tiempos, kms en formato JSON)',
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RutaCreateRequest'
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: 'Ruta creada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RutaResponse'
                            }
                        }
                    }
                },
                400: {
                    description: 'Datos de entrada inválidos',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    },
    '/api/rutas/{id}': {
        put: {
            tags: ['Rutas'],
            summary: 'Actualizar ruta',
            description: 'Actualiza una ruta existente por su ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID de la ruta',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RutaUpdateRequest'
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: 'Ruta actualizada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/RutaResponse'
                            }
                        }
                    }
                },
                400: {
                    description: 'Datos de entrada inválidos',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                404: {
                    description: 'Ruta no encontrada',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        },
        delete: {
            tags: ['Rutas'],
            summary: 'Eliminar ruta',
            description: 'Elimina una ruta existente por su ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID de la ruta',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Ruta eliminada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Ruta eliminada exitosamente'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Token de autenticación inválido o expirado',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                404: {
                    description: 'Ruta no encontrada',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                },
                500: {
                    description: 'Error interno del servidor',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ErrorResponse'
                            }
                        }
                    }
                }
            }
        }
    }
};

module.exports = rutaPaths;
