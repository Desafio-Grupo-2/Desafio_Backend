const express = require('express');
const router = express.Router();
const { executeRealisticTicketsSeeder } = require('./seeder.controller');
const { authenticateToken } = require('../../middlewares/authentication');

// POST /api/seeders/execute-realistic-tickets
router.post('/execute-realistic-tickets', authenticateToken, executeRealisticTicketsSeeder);

module.exports = router;
