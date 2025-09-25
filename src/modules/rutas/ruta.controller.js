const { Ruta, Vehiculo, Usuario, Ticket } = require('../../models');

const getAllRutas = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const rutas = await Ruta.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: rutas.rows,
            pagination: {
                total: rutas.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(rutas.count / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener rutas:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener rutas'
        });
    }
};

const getRutaById = async (req, res) => {
    try {
        const { id } = req.params;

        const ruta = await Ruta.findByPk(id);

        if (!ruta) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }

        res.json({
            success: true,
            data: ruta
        });
    } catch (error) {
        console.error('Error al obtener ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener ruta'
        });
    }
};

const getRutasByVehiculo = async (req, res) => {
    try {
        const { matricula } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const rutas = await Ruta.findAndCountAll({
            where: { matricula },
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id', 'DESC']]
        });

        res.json({
            success: true,
            data: rutas.rows,
            pagination: {
                total: rutas.count,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: Math.ceil(rutas.count / limit)
            }
        });
    } catch (error) {
        console.error('Error al obtener rutas por vehículo:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener rutas por vehículo'
        });
    }
};

module.exports = {
    getAllRutas,
    getRutaById,
    getRutasByVehiculo
};