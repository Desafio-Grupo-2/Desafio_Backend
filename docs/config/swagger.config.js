module.exports = {
  "definition": {
    "openapi": "3.0.0",
    "info": {
      "title": "Desafío Tripulaciones API",
      "version": "1.0.0",
      "description": "API para gestión de usuarios y autenticación",
      "license": {
        "name": "ISC",
        "url": "https://opensource.org/licenses/ISC"
      }
    },
    "servers": [
      {
        "url": "https://desafio-fullback.onrender.com",
        "description": "Servidor de producción (Render)"
      },
      {
        "url": "http://localhost:3000",
        "description": "Servidor de desarrollo"
      }
    ],
    "components": {
      "securitySchemes": {
        "bearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "Token JWT obtenido del endpoint /api/auth/login"
        }
      }
    },
    "security": [
      {
        "bearerAuth": []
      }
    ],
    "tags": [
      {
        "name": "Auth",
        "description": "Endpoints de autenticación y autorización"
      },
      {
        "name": "Users",
        "description": "Gestión de usuarios (conductores y administradores)"
      },
      {
        "name": "Vehiculos",
        "description": "Gestión de vehículos"
      },
      {
        "name": "Rutas",
        "description": "Consulta de rutas almacenadas"
      },
      {
        "name": "Tickets",
        "description": "Consulta de tickets de combustible"
      }
    ],
    "paths": {
      "/api/rutas": {
        "post": {
          "tags": [
            "Rutas"
          ],
          "summary": "Crear nueva ruta",
          "description": "Crea una nueva ruta con datos estructurados (paradas, tiempos, kms en formato JSON)",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RutaCreateRequest"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Ruta creada exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RutaResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Datos de entrada inválidos",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/rutas/{id}": {
        "put": {
          "tags": [
            "Rutas"
          ],
          "summary": "Actualizar ruta",
          "description": "Actualiza una ruta existente por su ID",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID de la ruta",
              "required": true,
              "schema": {
                "type": "integer",
                "minimum": 1
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/RutaUpdateRequest"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Ruta actualizada exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RutaResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Datos de entrada inválidos",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Ruta no encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "tags": [
            "Rutas"
          ],
          "summary": "Eliminar ruta",
          "description": "Elimina una ruta existente por su ID",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID de la ruta",
              "required": true,
              "schema": {
                "type": "integer",
                "minimum": 1
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Ruta eliminada exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "success": {
                        "type": "boolean",
                        "example": true
                      },
                      "message": {
                        "type": "string",
                        "example": "Ruta eliminada exitosamente"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Ruta no encontrada",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/rutas/vehiculo/{matricula}": {
        "get": {
          "tags": [
            "Rutas"
          ],
          "summary": "Obtener rutas por vehículo",
          "description": "Obtiene todas las rutas asociadas a un vehículo específico por su matrícula",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "matricula",
              "in": "path",
              "description": "Matrícula del vehículo",
              "required": true,
              "schema": {
                "type": "string"
              },
              "example": "BI-1234-AB"
            },
            {
              "name": "page",
              "in": "query",
              "description": "Número de página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 1,
                "minimum": 1
              }
            },
            {
              "name": "limit",
              "in": "query",
              "description": "Número de elementos por página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 10,
                "minimum": 1,
                "maximum": 100
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Rutas del vehículo obtenidas exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/RutaListResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/tickets": {
        "get": {
          "tags": [
            "Tickets"
          ],
          "summary": "Obtener todos los tickets",
          "description": "Obtiene una lista paginada de todos los tickets almacenados en la base de datos",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "page",
              "in": "query",
              "description": "Número de página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 1,
                "minimum": 1
              }
            },
            {
              "name": "limit",
              "in": "query",
              "description": "Número de elementos por página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 10,
                "minimum": 1,
                "maximum": 100
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Lista de tickets obtenida exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketListResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/tickets/{id}": {
        "get": {
          "tags": [
            "Tickets"
          ],
          "summary": "Obtener ticket por ID",
          "description": "Obtiene un ticket específico por su ID",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "id",
              "in": "path",
              "description": "ID del ticket",
              "required": true,
              "schema": {
                "type": "integer",
                "minimum": 1
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Ticket obtenido exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Ticket no encontrado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/tickets/ruta/{rutaId}": {
        "get": {
          "tags": [
            "Tickets"
          ],
          "summary": "Obtener tickets por ruta",
          "description": "Obtiene todos los tickets asociados a una ruta específica por su ID",
          "security": [
            {
              "bearerAuth": []
            }
          ],
          "parameters": [
            {
              "name": "rutaId",
              "in": "path",
              "description": "ID de la ruta",
              "required": true,
              "schema": {
                "type": "integer",
                "minimum": 1
              }
            },
            {
              "name": "page",
              "in": "query",
              "description": "Número de página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 1,
                "minimum": 1
              }
            },
            {
              "name": "limit",
              "in": "query",
              "description": "Número de elementos por página",
              "required": false,
              "schema": {
                "type": "integer",
                "default": 10,
                "minimum": 1,
                "maximum": 100
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Tickets de la ruta obtenidos exitosamente",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/TicketListResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Token de autenticación inválido o expirado",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            },
            "500": {
              "description": "Error interno del servidor",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ErrorResponse"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};