const express = require('express');
const router = express.Router();

router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/users', require('./modules/users/user.routes'));
router.use('/vehiculos', require('./modules/vehiculos/vehiculo.routes'));
router.use('/rutas', require('./modules/rutas/ruta.routes'));
router.use('/tickets', require('./modules/tickets/ticket.routes'));
router.use('/trips', require('./modules/trips/trip.routes'));
router.use('/empresas', require('./modules/empresas/empresa.routes'));
router.use('/prediccion', require('./modules/prediccion/prediccion.routes'));

module.exports = router;
