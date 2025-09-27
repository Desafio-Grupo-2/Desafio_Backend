const express = require('express');
const router = express.Router();

console.log('🔧 Cargando rutas...');

router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/users', require('./modules/users/user.routes'));
router.use('/vehiculos', require('./modules/vehiculos/vehiculo.routes'));
router.use('/rutas', require('./modules/rutas/ruta.routes'));
router.use('/tickets', require('./modules/tickets/ticket.routes'));
router.use('/trips', require('./modules/trips/trip.routes'));
router.use('/empresas', require('./modules/empresas/empresa.routes'));

console.log('🔧 Cargando módulo de predicción...');
try {
  router.use('/prediccion', require('./modules/prediccion/prediccion.routes'));
  console.log('✅ Módulo de predicción cargado correctamente');
} catch (error) {
  console.error('❌ Error cargando módulo de predicción:', error.message);
}

module.exports = router;
