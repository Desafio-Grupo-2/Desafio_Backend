const express = require('express');
const { authenticateToken } = require('../../middlewares/authentication');
const { getAllRutas, getRutaById, getRutasByVehiculo, createRuta, updateRuta, deleteRuta } = require('./ruta.controller');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// GET /api/rutas - Obtener todas las rutas
router.get('/', getAllRutas);

// GET /api/rutas/:id - Obtener ruta por ID
router.get('/:id', getRutaById);

// GET /api/rutas/vehiculo/:matricula - Obtener rutas por vehículo
router.get('/vehiculo/:matricula', getRutasByVehiculo);

// POST /api/rutas - Crear nueva ruta
router.post('/', createRuta);

// PUT /api/rutas/:id - Actualizar ruta
router.put('/:id', updateRuta);

// DELETE /api/rutas/:id - Eliminar ruta
router.delete('/:id', deleteRuta);

module.exports = router;