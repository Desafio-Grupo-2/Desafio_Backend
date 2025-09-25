const { Ticket, Ruta, EstacionServicio } = require('../../models');

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

module.exports = {
    getAllTickets,
    getTicketById,
    getTicketsByRuta
};