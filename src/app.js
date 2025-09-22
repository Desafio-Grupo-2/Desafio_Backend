//PLACEHOLDER CODE
// const express = require('express');
// const path = require('path');
// const app = express();
// const { typeError } = require('./middlewares/errors');
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const PORT = 3000;

// app.use((err, req, res, next) => {
//     console.error('ERROR:', err);

//     const statusCode = err.status || 500;
//     const message = err.message || 'Error interno del servidor';

//     res.status(statusCode).json({
//         message,
//         ...(err.code && { code: err.code }),
//     });
// });

// app.use('/auth', require('./modules/auth/auth.routes'));
// app.use('/users', require('./modules/users/user.routes'));
// app.use('/tickets', require('./modules/tickets/ticket.routes'));
// app.use('/trips', require('./modules/trips/trip.routes'));

// app.use(typeError);

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
