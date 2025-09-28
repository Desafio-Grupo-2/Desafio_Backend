const { Ticket, Ruta, Vehiculo, Usuario, EstacionServicio } = require('../../models');
const { Op } = require('sequelize');

const getAllTickets = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const tickets = await Ticket.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: tickets.rows,
            pagination: {
                total: tickets.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(tickets.count / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tickets'
        });
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;

        const ticket = await Ticket.findByPk(id);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket no encontrado'
            });
        }

        res.json({
            success: true,
            data: ticket
        });
    } catch (error) {
        console.error('Error al obtener ticket:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener ticket'
        });
    }
};

const getTicketsByRuta = async (req, res) => {
    try {
        const { rutaId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const tickets = await Ticket.findAndCountAll({
            where: { id_ruta: rutaId },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: tickets.rows,
            pagination: {
                total: tickets.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(tickets.count / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener tickets por ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tickets por ruta'
        });
    }
};

// Obtener tickets por usuario
const getTicketsByUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Obtener tickets a través de: Usuario -> Vehiculos -> Rutas -> Tickets
        const tickets = await Ticket.findAndCountAll({
            include: [{
                model: Ruta,
                as: 'ruta',
                include: [{
                    model: Vehiculo,
                    as: 'vehiculo',
                    where: { id_usuario: usuarioId }
                }]
            }],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: tickets.rows,
            pagination: {
                total: tickets.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(tickets.count / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener tickets por usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener tickets por usuario'
        });
    }
};

// Obtener suma total de tickets
const getTotalTicketsSum = async (req, res) => {
    try {
        const { usuarioId, fechaInicio, fechaFin } = req.query;
        
        // Empezar con una consulta simple
        let queryOptions = {};
        
        // Filtrar por fechas si se especifican
        if (fechaInicio || fechaFin) {
            queryOptions.where = {};
            if (fechaInicio) queryOptions.where.fecha = { [Op.gte]: fechaInicio };
            if (fechaFin) queryOptions.where.fecha = { ...queryOptions.where.fecha, [Op.lte]: fechaFin };
        }

        const tickets = await Ticket.findAll(queryOptions);
        
        // Calcular suma total
        const totalSum = tickets.reduce((sum, ticket) => {
            const importeCoche = ticket.importecoche_euros || 0;
            const importeBus = ticket.importebus_euros || 0;
            return sum + importeCoche + importeBus;
        }, 0);

        res.json({
            success: true,
            data: {
                totalSum: totalSum,
                ticketCount: tickets.length,
                breakdown: {
                    totalCoche: tickets.reduce((sum, t) => sum + (t.importecoche_euros || 0), 0),
                    totalBus: tickets.reduce((sum, t) => sum + (t.importebus_euros || 0), 0)
                }
            }
        });
    } catch (error) {
        console.error('Error al calcular suma de tickets:', error);
        res.status(500).json({
            success: false,
            message: 'Error al calcular suma de tickets'
        });
    }
};

// Obtener métricas de usuario
const getUsuarioMetrics = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const { fechaInicio, fechaFin } = req.query;

        // Obtener vehículos del usuario
        const vehiculos = await Vehiculo.findAll({
            where: { id_usuario: usuarioId },
            include: [{
                model: Ruta,
                as: 'rutas',
                include: [{
                    model: Ticket,
                    as: 'tickets'
                }]
            }]
        });

        // Calcular métricas
        let totalImporte = 0;
        let totalKm = 0;
        let totalTickets = 0;

        vehiculos.forEach(vehiculo => {
            vehiculo.rutas.forEach(ruta => {
                totalKm += ruta.total_km || 0;
                ruta.tickets.forEach(ticket => {
                    totalImporte += (ticket.importecoche_euros || 0) + (ticket.importebus_euros || 0);
                    totalTickets++;
                });
            });
        });

        res.json({
            success: true,
            data: {
                usuarioId: parseInt(usuarioId),
                totalImporte: totalImporte,
                totalKm: totalKm,
                totalTickets: totalTickets,
                vehiculosCount: vehiculos.length,
                rutasCount: vehiculos.reduce((sum, v) => sum + v.rutas.length, 0)
            }
        });
    } catch (error) {
        console.error('Error al obtener métricas de usuario:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de usuario'
        });
    }
};

// Obtener métricas de todos los empleados conductores
const getAllEmpleadosMetrics = async (req, res) => {
    try {
        const { periodo, fechaInicio, fechaFin } = req.query;
        
        // Obtener solo usuarios con rol conductor
        const usuarios = await Usuario.findAll({
            where: { role: 'conductor' }
        });
        
        console.log(`Usuarios conductores encontrados: ${usuarios.length}`);
        console.log('Usuarios encontrados:', usuarios.map(u => `${u.nombre} ${u.apellido} (${u.role})`));

        // Calcular métricas para cada usuario
        const empleadosMetrics = [];
        
        for (const usuario of usuarios) {
            try {
                // Obtener vehículos del usuario
                const vehiculos = await Vehiculo.findAll({
                    where: { id_usuario: usuario.id_usuario },
                    include: [{
                        model: Ruta,
                        as: 'rutas',
                        include: [{
                            model: Ticket,
                            as: 'tickets'
                        }]
                    }]
                });

                let totalImporte = 0;
                let totalKm = 0;
                let totalTickets = 0;

                vehiculos.forEach(vehiculo => {
                    vehiculo.rutas.forEach(ruta => {
                        // Para rutas escolares: ida y vuelta (x2) x 5 días/semana x ~40 semanas/año
                        // Aproximadamente 200 días escolares por año
                        const kmPorViaje = parseFloat(ruta.total_km) || 0;
                        const kmAnuales = kmPorViaje * 2 * 200; // ida y vuelta x días escolares
                        totalKm += kmAnuales;
                        
                        ruta.tickets.forEach(ticket => {
                            totalImporte += (ticket.importecoche_euros || 0) + (ticket.importebus_euros || 0);
                            totalTickets++;
                        });
                    });
                });

                empleadosMetrics.push({
                    usuarioId: usuario.id_usuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    totalImporte: totalImporte,
                    totalKm: totalKm,
                    totalTickets: totalTickets,
                    vehiculosCount: vehiculos.length,
                    rutasCount: vehiculos.reduce((sum, v) => sum + v.rutas.length, 0)
                });
            } catch (error) {
                console.error(`Error procesando usuario ${usuario.id_usuario}:`, error);
                // Agregar usuario con métricas en 0 si hay error
                empleadosMetrics.push({
                    usuarioId: usuario.id_usuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    totalImporte: 0,
                    totalKm: 0,
                    totalTickets: 0,
                    vehiculosCount: 0,
                    rutasCount: 0
                });
            }
        }

        // Calcular totales generales
        const totalesGenerales = empleadosMetrics.reduce((acc, empleado) => ({
            totalImporte: acc.totalImporte + (parseFloat(empleado.totalImporte) || 0),
            totalKm: acc.totalKm + (parseFloat(empleado.totalKm) || 0),
            totalTickets: acc.totalTickets + (parseInt(empleado.totalTickets) || 0),
            totalVehiculos: acc.totalVehiculos + (parseInt(empleado.vehiculosCount) || 0),
            totalRutas: acc.totalRutas + (parseInt(empleado.rutasCount) || 0)
        }), {
            totalImporte: 0,
            totalKm: 0,
            totalTickets: 0,
            totalVehiculos: 0,
            totalRutas: 0
        });

        res.json({
            success: true,
            data: {
                periodo: periodo || 'todos',
                fechaInicio: null,
                fechaFin: null,
                empleados: empleadosMetrics,
                totalesGenerales: totalesGenerales,
                resumen: {
                    totalEmpleados: empleadosMetrics.length,
                    empleadosConDatos: empleadosMetrics.filter(e => e.totalTickets > 0).length
                }
            }
        });
    } catch (error) {
        console.error('Error al obtener métricas de empleados:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener métricas de empleados'
        });
    }
};

module.exports = {
    getAllTickets,
    getTicketById,
    getTicketsByRuta,
    getTicketsByUsuario,
    getTotalTicketsSum,
    getUsuarioMetrics,
    getAllEmpleadosMetrics
};