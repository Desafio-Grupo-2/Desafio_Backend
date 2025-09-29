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
        
        // Calcular fechas según el período
        let fechaLimite, fechaFinFiltro;
        const ahora = new Date();
        
        switch (periodo) {
            case '30dias':
                fechaLimite = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
            case 'semestre':
                fechaLimite = new Date(ahora.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
            case 'todos':
            default:
                // Para rutas escolares, usar datos de 2024
                fechaLimite = new Date('2024-01-01');
                fechaFinFiltro = new Date('2024-12-31');
                break;
        }
        
        console.log(`Filtro de fechas: ${fechaLimite.toISOString()} a ${fechaFinFiltro.toISOString()}`);
        
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
                            as: 'tickets',
                            where: {
                                fecha: {
                                    [Op.gte]: fechaLimite,
                                    [Op.lte]: fechaFinFiltro
                                }
                            },
                            required: false
                        }]
                    }]
                });

                let totalImporte = 0;
                let totalKm = 0;
                let totalTickets = 0;

                vehiculos.forEach(vehiculo => {
                    vehiculo.rutas.forEach(ruta => {
                        const kmPorViaje = parseFloat(ruta.total_km) || 0;
                        
                        // Calcular kilómetros según el período
                        let factorPeriodo;
                        switch (periodo) {
                            case '30dias':
                                factorPeriodo = 30 / 200; // 30 días de 200 días escolares
                                break;
                            case 'semestre':
                                factorPeriodo = 100 / 200; // 6 meses de 12 meses
                                break;
                            case 'todos':
                            default:
                                factorPeriodo = 1; // Año completo
                                break;
                        }
                        
                        const kmPeriodo = kmPorViaje * 2 * 200 * factorPeriodo; // Proporcional al período
                        totalKm += kmPeriodo;
                        
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

// Obtener coordenadas de tickets para mapas
const getTicketsCoordenadas = async (req, res) => {
    try {
        const { periodo, fechaInicio, fechaFin, id_empresa } = req.query;
        
        // Calcular fechas según el período
        let fechaLimite, fechaFinFiltro;
        const ahora = new Date();
        
        switch (periodo) {
            case '1mes':
                fechaLimite = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
            case '6meses':
                fechaLimite = new Date(ahora.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
            case '1año':
                fechaLimite = new Date(ahora.getTime() - 365 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
            case 'custom':
                if (fechaInicio && fechaFin) {
                    fechaLimite = new Date(fechaInicio);
                    fechaFinFiltro = new Date(fechaFin);
                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Para período custom se requieren fechaInicio y fechaFin'
                    });
                }
                break;
            default:
                // Por defecto, último año
                fechaLimite = new Date(ahora.getTime() - 365 * 24 * 60 * 60 * 1000);
                fechaFinFiltro = ahora;
                break;
        }
        
        // Construir condiciones de filtro
        const whereConditions = {
            fecha: {
                [Op.gte]: fechaLimite,
                [Op.lte]: fechaFinFiltro
            },
            [Op.or]: [
                { latitud: { [Op.ne]: null } },
                { longitud: { [Op.ne]: null } },
                { coordenadas: { [Op.ne]: null } }
            ]
        };
        
        // Filtrar por empresa si se especifica
        if (id_empresa) {
            whereConditions.id_empresa = id_empresa;
        }
        
        const tickets = await Ticket.findAll({
            where: whereConditions,
            attributes: [
                'id',
                'fecha',
                'latitud',
                'longitud',
                'coordenadas'
            ],
            order: [['fecha', 'DESC']]
        });
        
        // Procesar coordenadas
        const coordenadas = tickets.map(ticket => {
            let lat, lng;
            
            // Priorizar latitud/longitud separadas
            if (ticket.latitud && ticket.longitud) {
                lat = parseFloat(ticket.latitud);
                lng = parseFloat(ticket.longitud);
            } 
            // Si no, intentar parsear el campo coordenadas
            else if (ticket.coordenadas) {
                const coords = ticket.coordenadas.split(',');
                if (coords.length >= 2) {
                    lat = parseFloat(coords[0].trim());
                    lng = parseFloat(coords[1].trim());
                }
            }
            
            // Solo incluir si tenemos coordenadas válidas
            if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
                return {
                    id: ticket.id,
                    fecha: ticket.fecha,
                    latitud: lat,
                    longitud: lng
                };
            }
            return null;
        }).filter(coord => coord !== null);
        
        res.json({
            success: true,
            data: {
                periodo: periodo || '1año',
                fechaInicio: fechaLimite,
                fechaFin: fechaFinFiltro,
                totalCoordenadas: coordenadas.length,
                coordenadas: coordenadas
            }
        });
    } catch (error) {
        console.error('Error al obtener coordenadas de tickets:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener coordenadas de tickets'
        });
    }
};

// Endpoint temporal para debug - verificar tickets con coordenadas
const debugTicketsCoordenadas = async (req, res) => {
    try {
        const { sequelize } = require('../../config/database');
        
        // 1. Verificar estructura de la tabla ticket
        const [tableStructure] = await sequelize.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'ticket' 
            ORDER BY ordinal_position
        `);
        
        // 2. Buscar cualquier campo que contenga coordenadas
        const [coordsResults] = await sequelize.query(`
            SELECT id, fecha, latitud, longitud, coordenadas 
            FROM ticket 
            WHERE latitud IS NOT NULL 
               OR longitud IS NOT NULL 
               OR coordenadas IS NOT NULL 
               OR latitud != 0
               OR longitud != 0
            ORDER BY id DESC 
            LIMIT 10
        `);
        
        // 3. Buscar en todos los campos de algunos tickets
        const [sampleTickets] = await sequelize.query(`
            SELECT * FROM ticket 
            WHERE id IN (773, 774, 775, 776, 777, 778, 779, 780)
            ORDER BY id
        `);

        res.json({
            success: true,
            data: {
                tableStructure,
                ticketsConCoordenadas: coordsResults.length,
                coordenadasEncontradas: coordsResults,
                ticketsMuestra: sampleTickets
            }
        });
    } catch (error) {
        console.error('Error en debug:', error);
        res.status(500).json({
            success: false,
            message: 'Error en debug',
            error: error.message
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
    getAllEmpleadosMetrics,
    getTicketsCoordenadas,
    debugTicketsCoordenadas
};