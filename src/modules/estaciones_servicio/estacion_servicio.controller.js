const { EstacionServicio, TipoCombustible } = require('../../models');
const { Op } = require('sequelize');
const { logSecurityError } = require('../../utils/securityLogger');

// Obtener todas las estaciones de servicio
const getAllEstacionesServicio = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, provincia, municipio, ccaa } = req.query;
        const offset = (page - 1) * limit;

        // Construir filtros
        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { Rotulo: { [Op.iLike]: `%${search}%` } },
                { Direccion: { [Op.iLike]: `%${search}%` } },
                { Municipio: { [Op.iLike]: `%${search}%` } },
                { Localidad: { [Op.iLike]: `%${search}%` } },
            ];
        }
        if (provincia) whereClause.Provincia = { [Op.iLike]: `%${provincia}%` };
        if (municipio) whereClause.Municipio = { [Op.iLike]: `%${municipio}%` };
        if (ccaa) whereClause.CCAA = { [Op.iLike]: `%${ccaa}%` };

        const { count, rows: estaciones } = await EstacionServicio.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: TipoCombustible,
                    as: 'combustibles',
                    attributes: ['id_combustible', 'fecha', 'precio_gasoleo_a', 'precio_gasolina_95_e5'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['id_estacion', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: estaciones,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getAllEstacionesServicio', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estaciones de servicio',
        });
    }
};

// Obtener estación de servicio por ID
const getEstacionServicioById = async (req, res) => {
    try {
        const { id } = req.params;

        const estacion = await EstacionServicio.findByPk(id, {
            include: [
                {
                    model: TipoCombustible,
                    as: 'combustibles',
                    attributes: ['id_combustible', 'fecha', 'precio_gasoleo_a', 'precio_gasolina_95_e5'],
                },
            ],
        });

        if (!estacion) {
            return res.status(404).json({
                success: false,
                message: 'Estación de servicio no encontrada',
            });
        }

        res.json({
            success: true,
            data: estacion,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEstacionServicioById', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estación de servicio',
        });
    }
};

// Obtener estaciones de servicio por provincia
const getEstacionesByProvincia = async (req, res) => {
    try {
        const { provincia } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: estaciones } = await EstacionServicio.findAndCountAll({
            where: { Provincia: { [Op.iLike]: `%${provincia}%` } },
            include: [
                {
                    model: TipoCombustible,
                    as: 'combustibles',
                    attributes: ['id_combustible', 'fecha', 'precio_gasoleo_a', 'precio_gasolina_95_e5'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['Municipio', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: estaciones,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEstacionesByProvincia', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estaciones por provincia',
        });
    }
};

// Obtener estaciones de servicio por municipio
const getEstacionesByMunicipio = async (req, res) => {
    try {
        const { municipio } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: estaciones } = await EstacionServicio.findAndCountAll({
            where: { Municipio: { [Op.iLike]: `%${municipio}%` } },
            include: [
                {
                    model: TipoCombustible,
                    as: 'combustibles',
                    attributes: ['id_combustible', 'fecha', 'precio_gasoleo_a', 'precio_gasolina_95_e5'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['Localidad', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: estaciones,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEstacionesByMunicipio', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estaciones por municipio',
        });
    }
};

// Obtener estaciones cercanas por coordenadas
const getEstacionesCercanas = async (req, res) => {
    try {
        const { lat, lng, radius = 10 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                message: 'Se requieren coordenadas de latitud y longitud',
            });
        }

        const latitud = parseFloat(lat);
        const longitud = parseFloat(lng);
        const radio = parseFloat(radius);

        // Fórmula de distancia aproximada (simplificada)
        const { count, rows: estaciones } = await EstacionServicio.findAndCountAll({
            where: {
                CoordenadaXDec: {
                    [Op.between]: [latitud - radio, latitud + radio],
                },
                CoordenadaYDec: {
                    [Op.between]: [longitud - radio, longitud + radio],
                },
            },
            include: [
                {
                    model: TipoCombustible,
                    as: 'combustibles',
                    attributes: ['id_combustible', 'fecha', 'precio_gasoleo_a', 'precio_gasolina_95_e5'],
                },
            ],
            limit: 50, // Límite para estaciones cercanas
            order: [['id_estacion', 'ASC']],
        });

        res.json({
            success: true,
            data: estaciones,
            searchParams: {
                latitud,
                longitud,
                radio,
            },
            total: count,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEstacionesCercanas', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estaciones cercanas',
        });
    }
};

module.exports = {
    getAllEstacionesServicio,
    getEstacionServicioById,
    getEstacionesByProvincia,
    getEstacionesByMunicipio,
    getEstacionesCercanas,
};
