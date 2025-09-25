const { TipoCombustible, EstacionServicio } = require('../../models');
const { Op } = require('sequelize');
const { logSecurityError } = require('../../utils/securityLogger');

// Obtener todos los tipos de combustible
const getAllTiposCombustible = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, fecha_desde, fecha_hasta } = req.query;
        const offset = (page - 1) * limit;

        // Construir filtros
        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { codigo_postal: { [Op.iLike]: `%${search}%` } },
            ];
        }

        // Filtro por rango de fechas
        if (fecha_desde || fecha_hasta) {
            whereClause.fecha = {};
            if (fecha_desde) whereClause.fecha[Op.gte] = new Date(fecha_desde);
            if (fecha_hasta) whereClause.fecha[Op.lte] = new Date(fecha_hasta);
        }

        const { count, rows: combustibles } = await TipoCombustible.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: EstacionServicio,
                    as: 'estacion',
                    attributes: ['id_estacion', 'Rotulo', 'Direccion', 'Municipio', 'Provincia'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['fecha', 'DESC'], ['id_combustible', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: combustibles,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getAllTiposCombustible', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener tipos de combustible',
        });
    }
};

// Obtener tipo de combustible por ID
const getTipoCombustibleById = async (req, res) => {
    try {
        const { id } = req.params;

        const combustible = await TipoCombustible.findByPk(id, {
            include: [
                {
                    model: EstacionServicio,
                    as: 'estacion',
                    attributes: ['id_estacion', 'Rotulo', 'Direccion', 'Municipio', 'Provincia'],
                },
            ],
        });

        if (!combustible) {
            return res.status(404).json({
                success: false,
                message: 'Tipo de combustible no encontrado',
            });
        }

        res.json({
            success: true,
            data: combustible,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getTipoCombustibleById', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener tipo de combustible',
        });
    }
};

// Obtener tipos de combustible por estación
const getCombustiblesByEstacion = async (req, res) => {
    try {
        const { id_estacion } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows: combustibles } = await TipoCombustible.findAndCountAll({
            where: { id_estacion },
            include: [
                {
                    model: EstacionServicio,
                    as: 'estacion',
                    attributes: ['id_estacion', 'Rotulo', 'Direccion', 'Municipio', 'Provincia'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['fecha', 'DESC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: combustibles,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getCombustiblesByEstacion', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener combustibles por estación',
        });
    }
};

// Obtener precios por tipo de combustible
const getPreciosByTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        const { page = 1, limit = 10, fecha_desde, fecha_hasta } = req.query;
        const offset = (page - 1) * limit;

        // Mapear tipos de combustible a campos de la base de datos
        const tipoFields = {
            'biodiesel': 'precio_biodiesel',
            'bioetanol': 'precio_bioetanol',
            'gas_natural_comprimido': 'precio_gas_natural_comprimido',
            'gas_natural_licuado': 'precio_gas_natural_licuado',
            'gases_licuados_petroleo': 'precio_gases_licuados_petroleo',
            'gasoleo_a': 'precio_gasoleo_a',
            'gasoleo_b': 'precio_gasoleo_b',
            'gasoleo_premium': 'precio_gasoleo_premium',
            'gasolina_95_e5': 'precio_gasolina_95_e5',
            'gasolina_95_e5_premium': 'precio_gasolina_95_e5_premium',
            'gasolina_98_e5': 'precio_gasolina_98_e5',
        };

        const campoPrecio = tipoFields[tipo];
        if (!campoPrecio) {
            return res.status(400).json({
                success: false,
                message: 'Tipo de combustible no válido',
                tiposDisponibles: Object.keys(tipoFields),
            });
        }

        // Construir filtros
        const whereClause = {
            [campoPrecio]: { [Op.ne]: null },
        };

        // Filtro por rango de fechas
        if (fecha_desde || fecha_hasta) {
            whereClause.fecha = {};
            if (fecha_desde) whereClause.fecha[Op.gte] = new Date(fecha_desde);
            if (fecha_hasta) whereClause.fecha[Op.lte] = new Date(fecha_hasta);
        }

        const { count, rows: combustibles } = await TipoCombustible.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: EstacionServicio,
                    as: 'estacion',
                    attributes: ['id_estacion', 'Rotulo', 'Direccion', 'Municipio', 'Provincia'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [[campoPrecio, 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: combustibles,
            tipoCombustible: tipo,
            campoPrecio,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getPreciosByTipo', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener precios por tipo de combustible',
        });
    }
};

// Obtener estadísticas de precios
const getEstadisticasPrecios = async (req, res) => {
    try {
        const { fecha_desde, fecha_hasta } = req.query;

        // Construir filtros de fecha
        const whereClause = {};
        if (fecha_desde || fecha_hasta) {
            whereClause.fecha = {};
            if (fecha_desde) whereClause.fecha[Op.gte] = new Date(fecha_desde);
            if (fecha_hasta) whereClause.fecha[Op.lte] = new Date(fecha_hasta);
        }

        const combustibles = await TipoCombustible.findAll({
            where: whereClause,
            attributes: [
                'precio_gasoleo_a',
                'precio_gasolina_95_e5',
                'precio_gasolina_98_e5',
                'precio_gasoleo_premium',
            ],
        });

        // Calcular estadísticas
        const estadisticas = {
            gasoleo_a: calcularEstadisticas(combustibles, 'precio_gasoleo_a'),
            gasolina_95_e5: calcularEstadisticas(combustibles, 'precio_gasolina_95_e5'),
            gasolina_98_e5: calcularEstadisticas(combustibles, 'precio_gasolina_98_e5'),
            gasoleo_premium: calcularEstadisticas(combustibles, 'precio_gasoleo_premium'),
        };

        res.json({
            success: true,
            data: estadisticas,
            periodo: {
                desde: fecha_desde || 'Todos los registros',
                hasta: fecha_hasta || 'Todos los registros',
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEstadisticasPrecios', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas de precios',
        });
    }
};

// Función auxiliar para calcular estadísticas
const calcularEstadisticas = (combustibles, campo) => {
    const precios = combustibles
        .map(c => c[campo])
        .filter(precio => precio !== null && precio !== undefined)
        .map(precio => parseFloat(precio));

    if (precios.length === 0) {
        return { count: 0, min: null, max: null, promedio: null };
    }

    return {
        count: precios.length,
        min: Math.min(...precios),
        max: Math.max(...precios),
        promedio: precios.reduce((sum, precio) => sum + precio, 0) / precios.length,
    };
};

module.exports = {
    getAllTiposCombustible,
    getTipoCombustibleById,
    getCombustiblesByEstacion,
    getPreciosByTipo,
    getEstadisticasPrecios,
};
