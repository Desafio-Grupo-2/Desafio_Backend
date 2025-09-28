const ticketPaths = {
    '/api/tickets': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener todos los tickets',
            description: 'Obtiene una lista paginada de todos los tickets almacenados en la base de datos',
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
                    description: 'Lista de tickets obtenida exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TicketListResponse'
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
    '/api/tickets/{id}': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener ticket por ID',
            description: 'Obtiene un ticket específico por su ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    description: 'ID del ticket',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Ticket obtenido exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TicketResponse'
                            }
                        }
                    }
                },
                404: {
                    description: 'Ticket no encontrado',
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
    '/api/tickets/ruta/{rutaId}': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener tickets por ruta',
            description: 'Obtiene todos los tickets asociados a una ruta específica por su ID',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'rutaId',
                    in: 'path',
                    description: 'ID de la ruta',
                    required: true,
                    schema: {
                        type: 'integer',
                        minimum: 1
                    }
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
                    description: 'Tickets de la ruta obtenidos exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TicketListResponse'
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

    '/api/tickets/usuario/{usuarioId}': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener tickets por usuario',
            description: 'Obtiene todos los tickets asociados a un usuario específico a través de sus vehículos y rutas',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'usuarioId',
                    in: 'path',
                    description: 'ID del usuario',
                    required: true,
                    schema: {
                        type: 'integer'
                    }
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
                    description: 'Tickets del usuario obtenidos exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TicketListResponse'
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

    '/api/tickets/sum': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener suma total de tickets',
            description: 'Calcula la suma total de importes de tickets, con filtros opcionales por usuario y fechas',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'usuarioId',
                    in: 'query',
                    description: 'ID del usuario para filtrar (opcional)',
                    required: false,
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    name: 'fechaInicio',
                    in: 'query',
                    description: 'Fecha de inicio para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                },
                {
                    name: 'fechaFin',
                    in: 'query',
                    description: 'Fecha de fin para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Suma total calculada exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            totalSum: {
                                                type: 'number',
                                                description: 'Suma total en euros',
                                                example: 1250.50
                                            },
                                            ticketCount: {
                                                type: 'integer',
                                                description: 'Número total de tickets',
                                                example: 45
                                            },
                                            breakdown: {
                                                type: 'object',
                                                properties: {
                                                    totalCoche: {
                                                        type: 'number',
                                                        description: 'Total importe coche',
                                                        example: 800.30
                                                    },
                                                    totalBus: {
                                                        type: 'number',
                                                        description: 'Total importe bus',
                                                        example: 450.20
                                                    }
                                                }
                                            }
                                        }
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

    '/api/tickets/metrics/{usuarioId}': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener métricas de usuario',
            description: 'Obtiene métricas completas de un usuario: importe total de tickets, kilómetros totales, número de tickets, vehículos y rutas',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'usuarioId',
                    in: 'path',
                    description: 'ID del usuario',
                    required: true,
                    schema: {
                        type: 'integer'
                    }
                },
                {
                    name: 'fechaInicio',
                    in: 'query',
                    description: 'Fecha de inicio para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                },
                {
                    name: 'fechaFin',
                    in: 'query',
                    description: 'Fecha de fin para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Métricas del usuario obtenidas exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            usuarioId: {
                                                type: 'integer',
                                                description: 'ID del usuario',
                                                example: 1
                                            },
                                            totalImporte: {
                                                type: 'number',
                                                description: 'Importe total de tickets en euros',
                                                example: 1250.50
                                            },
                                            totalKm: {
                                                type: 'number',
                                                description: 'Kilómetros totales recorridos',
                                                example: 2500.75
                                            },
                                            totalTickets: {
                                                type: 'integer',
                                                description: 'Número total de tickets',
                                                example: 45
                                            },
                                            vehiculosCount: {
                                                type: 'integer',
                                                description: 'Número de vehículos del usuario',
                                                example: 2
                                            },
                                            rutasCount: {
                                                type: 'integer',
                                                description: 'Número total de rutas',
                                                example: 12
                                            }
                                        }
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

    '/api/tickets/metrics/empleados': {
        get: {
            tags: ['Tickets'],
            summary: 'Obtener métricas de todos los empleados conductores',
            description: 'Obtiene métricas completas de todos los empleados con rol conductor, con filtros opcionales por período',
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'periodo',
                    in: 'query',
                    description: 'Período de filtrado: 30dias, semestre, anual',
                    required: false,
                    schema: {
                        type: 'string',
                        enum: ['30dias', 'semestre', 'anual']
                    }
                },
                {
                    name: 'fechaInicio',
                    in: 'query',
                    description: 'Fecha de inicio para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                },
                {
                    name: 'fechaFin',
                    in: 'query',
                    description: 'Fecha de fin para filtrar (YYYY-MM-DD)',
                    required: false,
                    schema: {
                        type: 'string',
                        format: 'date'
                    }
                }
            ],
            responses: {
                200: {
                    description: 'Métricas de empleados obtenidas exitosamente',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            periodo: {
                                                type: 'string',
                                                description: 'Período aplicado',
                                                example: 'anual'
                                            },
                                            fechaInicio: {
                                                type: 'string',
                                                format: 'date',
                                                description: 'Fecha de inicio del filtro'
                                            },
                                            fechaFin: {
                                                type: 'string',
                                                format: 'date',
                                                description: 'Fecha de fin del filtro'
                                            },
                                            empleados: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        usuarioId: {
                                                            type: 'integer',
                                                            description: 'ID del usuario',
                                                            example: 1
                                                        },
                                                        nombre: {
                                                            type: 'string',
                                                            description: 'Nombre del empleado',
                                                            example: 'Juan'
                                                        },
                                                        apellido: {
                                                            type: 'string',
                                                            description: 'Apellido del empleado',
                                                            example: 'Pérez'
                                                        },
                                                        email: {
                                                            type: 'string',
                                                            description: 'Email del empleado',
                                                            example: 'juan.perez@empresa.com'
                                                        },
                                                        totalImporte: {
                                                            type: 'number',
                                                            description: 'Importe total en euros',
                                                            example: 1250.50
                                                        },
                                                        totalKm: {
                                                            type: 'number',
                                                            description: 'Kilómetros totales',
                                                            example: 2500.75
                                                        },
                                                        totalTickets: {
                                                            type: 'integer',
                                                            description: 'Número total de tickets',
                                                            example: 45
                                                        },
                                                        vehiculosCount: {
                                                            type: 'integer',
                                                            description: 'Número de vehículos',
                                                            example: 2
                                                        },
                                                        rutasCount: {
                                                            type: 'integer',
                                                            description: 'Número de rutas',
                                                            example: 12
                                                        }
                                                    }
                                                }
                                            },
                                            totalesGenerales: {
                                                type: 'object',
                                                properties: {
                                                    totalImporte: {
                                                        type: 'number',
                                                        description: 'Importe total de todos los empleados',
                                                        example: 5000.00
                                                    },
                                                    totalKm: {
                                                        type: 'number',
                                                        description: 'Kilómetros totales de todos los empleados',
                                                        example: 10000.50
                                                    },
                                                    totalTickets: {
                                                        type: 'integer',
                                                        description: 'Total de tickets de todos los empleados',
                                                        example: 200
                                                    },
                                                    totalVehiculos: {
                                                        type: 'integer',
                                                        description: 'Total de vehículos',
                                                        example: 10
                                                    },
                                                    totalRutas: {
                                                        type: 'integer',
                                                        description: 'Total de rutas',
                                                        example: 50
                                                    }
                                                }
                                            },
                                            resumen: {
                                                type: 'object',
                                                properties: {
                                                    totalEmpleados: {
                                                        type: 'integer',
                                                        description: 'Número total de empleados',
                                                        example: 5
                                                    },
                                                    empleadosConDatos: {
                                                        type: 'integer',
                                                        description: 'Empleados con tickets en el período',
                                                        example: 4
                                                    }
                                                }
                                            }
                                        }
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

module.exports = ticketPaths;
