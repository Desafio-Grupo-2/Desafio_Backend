const express = require('express');
const { authenticateToken } = require('../../middlewares/authentication');
const { getAllTickets, getTicketById, getTicketsByRuta, getTicketsByUsuario, getTotalTicketsSum, getUsuarioMetrics, getAllEmpleadosMetrics } = require('./ticket.controller');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/tickets - Obtener todos los tickets
router.get('/', getAllTickets);

// GET /api/tickets/sum - Obtener suma total de tickets
router.get('/sum', getTotalTicketsSum);

// GET /api/tickets/ruta/:rutaId - Obtener tickets por ruta
router.get('/ruta/:rutaId', getTicketsByRuta);

// GET /api/tickets/usuario/:usuarioId - Obtener tickets por usuario
router.get('/usuario/:usuarioId', getTicketsByUsuario);

// GET /api/tickets/metrics/empleados - Obtener métricas de todos los empleados
router.get('/metrics/empleados', getAllEmpleadosMetrics);

// GET /api/tickets/metrics/:usuarioId - Obtener métricas de usuario
router.get('/metrics/:usuarioId', getUsuarioMetrics);

// GET /api/tickets/:id - Obtener ticket por ID (debe ir al final)
router.get('/:id', getTicketById);

module.exports = router;