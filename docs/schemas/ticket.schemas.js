const ticketSchemas = {
    Ticket: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                description: 'ID único del ticket',
                example: 366746
            },
            id_ruta: {
                type: 'integer',
                description: 'ID de la ruta asociada',
                example: 5
            },
            fecha: {
                type: 'string',
                format: 'date-time',
                description: 'Fecha del ticket',
                example: '2022-03-10T23:00:00.000Z'
            },
            tipocarburante: {
                type: 'string',
                description: 'Tipo de carburante',
                example: 'Precio Gases licuados del petróleo'
            },
            precioporlitro: {
                type: 'integer',
                description: 'Precio por litro',
                example: 150
            },
            coordenadas: {
                type: 'string',
                description: 'Coordenadas de la estación',
                example: '40.4168,-3.7038'
            },
            litroscoche: {
                type: 'integer',
                description: 'Litros para coche',
                example: 45
            },
            litrosbus: {
                type: 'integer',
                description: 'Litros para bus',
                example: 200
            },
            importecoche_euros: {
                type: 'integer',
                description: 'Importe coche en euros',
                example: 6750
            },
            importebus_euros: {
                type: 'integer',
                description: 'Importe bus en euros',
                example: 30000
            },
            latitud: {
                type: 'integer',
                description: 'Latitud',
                example: 404168
            },
            longitud: {
                type: 'integer',
                description: 'Longitud',
                example: -37038
            },
            pdf: {
                type: 'string',
                description: 'Ruta del archivo PDF',
                example: '/uploads/ticket_366746.pdf'
            },
            'Precio por Litro': {
                type: 'integer',
                description: 'Precio por litro (campo alternativo)',
                example: 150
            }
        }
    },
    TicketListResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true
            },
            data: {
                type: 'array',
                items: {
                    $ref: '#/components/schemas/Ticket'
                }
            },
            pagination: {
                type: 'object',
                properties: {
                    total: {
                        type: 'integer',
                        example: 10
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
    TicketResponse: {
        type: 'object',
        properties: {
            success: {
                type: 'boolean',
                example: true
            },
            data: {
                $ref: '#/components/schemas/Ticket'
            }
        }
    }
};

module.exports = ticketSchemas;
