const express = require('express');
const router = express.Router();

router.use('/auth', require('./modules/auth/auth.routes'));
router.use('/users', require('./modules/users/user.routes'));
router.use('/tickets', require('./modules/tickets/ticket.routes'));
router.use('/trips', require('./modules/trips/trip.routes'));

module.exports = router;
