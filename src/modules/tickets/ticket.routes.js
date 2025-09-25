const express = require('express');
const { authenticateToken } = require('../../middlewares/authentication');
const { getAllTickets, getTicketById, getTicketsByRuta } = require('./ticket.controller');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/tickets - Obtener todos los tickets
router.get('/', getAllTickets);

// GET /api/tickets/:id - Obtener ticket por ID
router.get('/:id', getTicketById);

// GET /api/tickets/ruta/:rutaId - Obtener tickets por ruta
router.get('/ruta/:rutaId', getTicketsByRuta);

module.exports = router;