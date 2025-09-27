const Empresa = require('./empresa.model');
const { Op } = require('sequelize');
const { logSecurityError } = require('../../utils/securityLogger');

// Obtener todas las empresas
const getAllEmpresas = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, activa, sector } = req.query;
        const offset = (page - 1) * limit;

        const maxLimit = Math.min(parseInt(limit) || 10, 100);

        const whereClause = {};

        if (activa !== undefined) whereClause.activa = activa === 'true';
        if (sector) whereClause.sector = sector;
        if (search) {
            whereClause[Op.or] = [
                { nombre: { [Op.iLike]: `%${search}%` } },
                { cif: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { sector: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows: empresas } = await Empresa.findAndCountAll({
            where: whereClause,
            limit: maxLimit,
            offset: parseInt(offset),
            order: [['id_empresa', 'DESC']],
        });

        res.json({
            success: true,
            data: empresas,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: maxLimit,
                pages: Math.ceil(count / maxLimit),
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getAllEmpresas', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener empresas',
        });
    }
};

// Obtener empresa por ID
const getEmpresaById = async (req, res) => {
    try {
        const { id } = req.params;
        const { include } = req.query;

        let includeOptions = [];
        
        if (include) {
            const includes = include.split(',');
            if (includes.includes('usuarios')) {
                includeOptions.push({
                    association: 'usuarios',
                    attributes: { exclude: ['password'] }
                });
            }
            if (includes.includes('vehiculos')) {
                includeOptions.push('vehiculos');
            }
            if (includes.includes('rutas')) {
                includeOptions.push('rutas');
            }
            if (includes.includes('tickets')) {
                includeOptions.push('tickets');
            }
        }

        const empresa = await Empresa.findByPk(id, {
            include: includeOptions
        });

        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }

        res.json({
            success: true,
            data: empresa,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEmpresaById', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al obtener empresa',
        });
    }
};

// Crear nueva empresa
const createEmpresa = async (req, res) => {
    try {
        const empresaData = req.body;

        // Verificar si el CIF ya existe
        const existingEmpresa = await Empresa.findOne({
            where: { cif: empresaData.cif },
        });
        
        if (existingEmpresa) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una empresa con este CIF',
            });
        }

        const empresa = await Empresa.create(empresaData);

        res.status(201).json({
            success: true,
            message: 'Empresa creada exitosamente',
            data: empresa,
        });
    } catch (error) {
        logSecurityError(error, { action: 'createEmpresa', userId: req.user?.userId });
        res.status(400).json({
            success: false,
            message: 'Error al crear empresa',
        });
    }
};

// Actualizar empresa
const updateEmpresa = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // No permitir actualizar el ID
        delete updateData.id_empresa;

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }

        // Si se está actualizando el CIF, verificar que no exista otra empresa con el mismo CIF
        if (updateData.cif && updateData.cif !== empresa.cif) {
            const existingEmpresa = await Empresa.findOne({
                where: { 
                    cif: updateData.cif,
                    id_empresa: { [Op.ne]: id }
                },
            });
            
            if (existingEmpresa) {
                return res.status(400).json({
                    success: false,
                    message: 'Ya existe otra empresa con este CIF',
                });
            }
        }

        await empresa.update(updateData);

        res.json({
            success: true,
            message: 'Empresa actualizada exitosamente',
            data: empresa,
        });
    } catch (error) {
        logSecurityError(error, { action: 'updateEmpresa', userId: req.user?.userId, targetId: req.params.id });
        res.status(400).json({
            success: false,
            message: 'Error al actualizar empresa',
        });
    }
};

// Eliminar empresa
const deleteEmpresa = async (req, res) => {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }

        await empresa.destroy();

        res.json({
            success: true,
            message: 'Empresa eliminada exitosamente',
        });
    } catch (error) {
        logSecurityError(error, { action: 'deleteEmpresa', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al eliminar empresa',
        });
    }
};

// Activar/desactivar empresa
const toggleEmpresaStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }

        await empresa.update({ activa: !empresa.activa });

        res.json({
            success: true,
            message: `Empresa ${empresa.activa ? 'desactivada' : 'activada'} exitosamente`,
            data: {
                id: empresa.id_empresa,
                activa: !empresa.activa,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'toggleEmpresaStatus', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al cambiar estado de la empresa',
        });
    }
};

// Obtener estadísticas de la empresa
const getEmpresaStats = async (req, res) => {
    try {
        const { id } = req.params;

        const empresa = await Empresa.findByPk(id);
        if (!empresa) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }

        // Obtener conteos de cada entidad relacionada
        const [usuariosCount, vehiculosCount, rutasCount, ticketsCount] = await Promise.all([
            empresa.countUsuarios(),
            empresa.countVehiculos(),
            empresa.countRutas(),
            empresa.countTickets()
        ]);

        res.json({
            success: true,
            data: {
                empresa: {
                    id: empresa.id_empresa,
                    nombre: empresa.nombre,
                    activa: empresa.activa
                },
                estadisticas: {
                    total_usuarios: usuariosCount,
                    total_vehiculos: vehiculosCount,
                    total_rutas: rutasCount,
                    total_tickets: ticketsCount
                }
            }
        });
    } catch (error) {
        logSecurityError(error, { action: 'getEmpresaStats', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas de la empresa',
        });
    }
};

module.exports = {
    getAllEmpresas,
    getEmpresaById,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa,
    toggleEmpresaStatus,
    getEmpresaStats,
};
