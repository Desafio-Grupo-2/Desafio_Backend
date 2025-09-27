const express = require('express');
const router = express.Router();
const { predictBatch } = require('./prediccion.controller');
const { authenticateToken } = require('../../middlewares/authentication');

// POST /api/prediccion/predict_batch
router.post('/predict_batch', authenticateToken, predictBatch);

module.exports = router;
