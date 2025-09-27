const express = require('express');
const router = express.Router();
const { predictBatch } = require('./prediccion.controller');
const { authenticateToken } = require('../../middlewares/authentication');

// GET /api/prediccion/test
router.get('/test', (req, res) => {
  console.log('🔍 Test endpoint called');
  res.json({ message: 'Prediccion module working' });
});

// POST /api/prediccion/predict_batch
router.post('/predict_batch', authenticateToken, predictBatch);

module.exports = router;
