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

// Crear nueva ruta
const createRuta = async (req, res) => {
    try {
        const rutaData = req.body;
        
        // Procesar paradas si vienen como array de objetos
        if (rutaData.paradas && Array.isArray(rutaData.paradas)) {
            rutaData.paradas = JSON.stringify(rutaData.paradas);
        } else if (typeof rutaData.paradas === 'string') {
            // Si ya es string, mantenerlo
            rutaData.paradas = rutaData.paradas;
        }
        
        // Procesar tiempos_paradas si vienen como array
        if (rutaData.tiempos_paradas && Array.isArray(rutaData.tiempos_paradas)) {
            rutaData.tiempos_paradas = JSON.stringify(rutaData.tiempos_paradas);
        } else if (typeof rutaData.tiempos_paradas === 'string') {
            // Si ya es string, mantenerlo
            rutaData.tiempos_paradas = rutaData.tiempos_paradas;
        }
        
        // Procesar kms_paradas si vienen como array
        if (rutaData.kms_paradas && Array.isArray(rutaData.kms_paradas)) {
            rutaData.kms_paradas = JSON.stringify(rutaData.kms_paradas);
        } else if (typeof rutaData.kms_paradas === 'string') {
            // Si ya es string, mantenerlo
            rutaData.kms_paradas = rutaData.kms_paradas;
        }
        
        // Generar fechas si no se proporcionan
        if (!rutaData.fecha_inicio) {
            rutaData.fecha_inicio = new Date();
        }
        
        if (!rutaData.fecha_fin && rutaData.tiempo_total) {
            // Calcular fecha_fin basada en tiempo_total
            const inicio = new Date(rutaData.fecha_inicio);
            const tiempoMatch = rutaData.tiempo_total.match(/(\d+)h?\s*(\d+)?\s*min/);
            if (tiempoMatch) {
                const horas = parseInt(tiempoMatch[1]) || 0;
                const minutos = parseInt(tiempoMatch[2]) || 0;
                const fin = new Date(inicio.getTime() + (horas * 60 + minutos) * 60000);
                rutaData.fecha_fin = fin;
            }
        }
        
        // Generar polyline básico si no se proporciona
        if (!rutaData.polyline) {
            rutaData.polyline = `encoded_polyline_${rutaData.matricula}_${Date.now()}`;
        }
        
        const ruta = await Ruta.create(rutaData);
        
        res.status(201).json({
            success: true,
            message: 'Ruta creada exitosamente',
            data: ruta
        });
    } catch (error) {
        console.error('Error al crear ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al crear ruta',
            error: error.message
        });
    }
};

// Actualizar ruta
const updateRuta = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        const ruta = await Ruta.findByPk(id);
        if (!ruta) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }
        
        await ruta.update(updateData);
        
        res.json({
            success: true,
            message: 'Ruta actualizada exitosamente',
            data: ruta
        });
    } catch (error) {
        console.error('Error al actualizar ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar ruta',
            error: error.message
        });
    }
};

// Eliminar ruta
const deleteRuta = async (req, res) => {
    try {
        const { id } = req.params;
        
        const ruta = await Ruta.findByPk(id);
        if (!ruta) {
            return res.status(404).json({
                success: false,
                message: 'Ruta no encontrada'
            });
        }
        
        await ruta.destroy();
        
        res.json({
            success: true,
            message: 'Ruta eliminada exitosamente'
        });
    } catch (error) {
        console.error('Error al eliminar ruta:', error);
        res.status(500).json({
            success: false,
            message: 'Error al eliminar ruta'
        });
    }
};

module.exports = {
    getAllRutas,
    getRutaById,
    getRutasByVehiculo,
    createRuta,
    updateRuta,
    deleteRuta
};