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
    }
};

module.exports = ticketPaths;
