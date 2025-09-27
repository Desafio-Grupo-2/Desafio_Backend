const { Usuario, Empresa } = require('../../models');
const { Op } = require('sequelize');
const { logSecurityError } = require('../../utils/securityLogger');

// Obtener todos los usuarios (solo admin)
const getAllUsers = async (req, res) => {
    try {
        // Verificar que sea admin
        if (req.user.role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        const { page = 1, limit = 10, role, search, active } = req.query;
        const offset = (page - 1) * limit;

        // Limitar el límite máximo
        const maxLimit = Math.min(parseInt(limit) || 10, 100);

        const whereClause = {};

        if (role) whereClause.role = role;
        if (active !== undefined) whereClause.active = active === 'true';
        if (search) {
            whereClause[Op.or] = [
                { email: { [Op.iLike]: `%${search}%` } },
                { username: { [Op.iLike]: `%${search}%` } },
                { nombre: { [Op.iLike]: `%${search}%` } },
                { apellido: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows: users } = await Usuario.findAndCountAll({
            where: whereClause,
            limit: maxLimit,
            offset: parseInt(offset),
            attributes: { exclude: ['password'] },
            include: [{
                model: Empresa,
                as: 'empresa',
                attributes: ['id_empresa', 'nombre', 'cif']
            }],
            order: [['id_usuario', 'DESC']],
        });

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: maxLimit,
                pages: Math.ceil(count / maxLimit),
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getAllUsers', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
        });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.user.userId;
        const currentUserRole = req.user.role;

        // Solo admin puede ver otros usuarios, usuarios normales solo pueden verse a sí mismos
        if (currentUserRole !== 'administrador' && parseInt(id) !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado',
            });
        }

        const user = await Usuario.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{
                model: Empresa,
                as: 'empresa',
                attributes: ['id_empresa', 'nombre', 'cif', 'direccion', 'telefono', 'email']
            }],
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        res.json({
            success: true,
            data: user,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getUserById', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario',
        });
    }
};

// Crear nuevo usuario (solo admin)
const createUser = async (req, res) => {
    try {
        // Verificar que sea admin
        if (req.user.role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        const userData = req.body;

        // Verificar si el email o username ya existe
        const existingUser = await Usuario.findOne({
            where: { 
                [Op.or]: [
                    { email: userData.email },
                    { username: userData.username }
                ]
            },
        });
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El email o nombre de usuario ya está registrado',
            });
        }

        const user = await Usuario.create(userData);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: userResponse,
        });
    } catch (error) {
        logSecurityError(error, { action: 'createUser', userId: req.user?.userId });
        res.status(400).json({
            success: false,
            message: 'Error al crear usuario',
        });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const currentUserId = req.user.userId;
        const currentUserRole = req.user.role;
        const updateData = req.body;

        // Solo admin puede actualizar otros usuarios, usuarios normales solo pueden actualizarse a sí mismos
        if (currentUserRole !== 'administrador' && parseInt(id) !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado',
            });
        }

        // No permitir actualizar ciertos campos sensibles
        delete updateData.id_usuario;
        delete updateData.password;

        // Solo admin puede cambiar el rol y estado activo
        if (currentUserRole !== 'administrador') {
            delete updateData.role;
            delete updateData.active;
        }

        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        await user.update(updateData);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Usuario actualizado exitosamente',
            data: userResponse,
        });
    } catch (error) {
        logSecurityError(error, { action: 'updateUser', userId: req.user?.userId, targetId: req.params.id });
        res.status(400).json({
            success: false,
            message: 'Error al actualizar usuario',
        });
    }
};

// Eliminar usuario (solo admin)
const deleteUser = async (req, res) => {
    try {
        // Verificar que sea admin
        if (req.user.role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        const { id } = req.params;

        // No permitir que un admin se elimine a sí mismo
        if (parseInt(id) === req.user.userId) {
            return res.status(400).json({
                success: false,
                message: 'No puedes eliminar tu propia cuenta',
            });
        }

        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        await user.destroy();

        res.json({
            success: true,
            message: 'Usuario eliminado exitosamente',
        });
    } catch (error) {
        logSecurityError(error, { action: 'deleteUser', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario',
        });
    }
};

// Obtener usuarios por empresa
const getUsersByEmpresa = async (req, res) => {
    try {
        const { empresaId } = req.params;
        const { page = 1, limit = 10, role, search, active } = req.query;
        const offset = (page - 1) * limit;
        const maxLimit = Math.min(parseInt(limit) || 10, 100);

        const whereClause = { id_empresa: empresaId };

        if (role) whereClause.role = role;
        if (active !== undefined) whereClause.active = active === 'true';
        if (search) {
            whereClause[Op.or] = [
                { email: { [Op.iLike]: `%${search}%` } },
                { username: { [Op.iLike]: `%${search}%` } },
                { nombre: { [Op.iLike]: `%${search}%` } },
                { apellido: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows: users } = await Usuario.findAndCountAll({
            where: whereClause,
            limit: maxLimit,
            offset: parseInt(offset),
            attributes: { exclude: ['password'] },
            include: [{
                model: Empresa,
                as: 'empresa',
                attributes: ['id_empresa', 'nombre', 'cif']
            }],
            order: [['id_usuario', 'DESC']],
        });

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: maxLimit,
                pages: Math.ceil(count / maxLimit),
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getUsersByEmpresa', userId: req.user?.userId, empresaId: req.params.empresaId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios de la empresa',
        });
    }
};

// Activar/desactivar usuario (solo admin)
const toggleUserStatus = async (req, res) => {
    try {
        // Verificar que sea admin
        if (req.user.role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        const { id } = req.params;

        // No permitir que un admin se desactive a sí mismo
        if (parseInt(id) === req.user.userId) {
            return res.status(400).json({
                success: false,
                message: 'No puedes desactivar tu propia cuenta',
            });
        }

        const user = await Usuario.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        await user.update({ active: !user.active });

        res.json({
            success: true,
            message: `Usuario ${user.active ? 'desactivado' : 'activado'} exitosamente`,
            data: {
                id: user.id_usuario,
                active: !user.active,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'toggleUserStatus', userId: req.user?.userId, targetId: req.params.id });
        res.status(500).json({
            success: false,
            message: 'Error al cambiar estado del usuario',
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    getUsersByEmpresa,
};