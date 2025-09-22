const { User } = require('../../models');
const { Op } = require('sequelize');

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, role, search, isActive } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = {};

        if (role) whereClause.role = role;
        if (isActive !== undefined) whereClause.isActive = isActive === 'true';
        if (search) {
            whereClause[Op.or] = [
                { email: { [Op.iLike]: `%${search}%` } },
                { firstName: { [Op.iLike]: `%${search}%` } },
                { lastName: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { count, rows: users } = await User.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']],
        });

        res.json({
            success: true,
            data: users,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(count / limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuarios',
            error: error.message,
        });
    }
};

// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id, {
            attributes: { exclude: ['password'] },
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
        res.status(500).json({
            success: false,
            message: 'Error al obtener usuario',
            error: error.message,
        });
    }
};

// Crear nuevo usuario
const createUser = async (req, res) => {
    try {
        const userData = req.body;

        // Verificar si el email ya existe
        const existingUser = await User.findOne({
            where: { email: userData.email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'El email ya está registrado',
            });
        }

        const user = await User.create(userData);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Usuario creado exitosamente',
            data: userResponse,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear usuario',
            error: error.message,
        });
    }
};

// Actualizar usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // No permitir actualizar contraseña desde aquí
        delete updateData.password;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Si se está cambiando el email, verificar que no exista
        if (updateData.email && updateData.email !== user.email) {
            const existingUser = await User.findOne({
                where: {
                    email: updateData.email,
                    id: { [Op.ne]: id },
                },
            });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'El email ya está registrado por otro usuario',
                });
            }
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
        res.status(400).json({
            success: false,
            message: 'Error al actualizar usuario',
            error: error.message,
        });
    }
};

// Eliminar usuario (soft delete)
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // No permitir eliminar el último admin
        if (user.role === 'admin') {
            const adminCount = await User.count({
                where: {
                    role: 'admin',
                    isActive: true,
                    id: { [Op.ne]: id },
                },
            });

            if (adminCount === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No se puede eliminar el último administrador',
                });
            }
        }

        // Eliminar físicamente el usuario de la base de datos
        await user.destroy();

        res.json({
            success: true,
            message: 'Usuario eliminado exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar usuario',
            error: error.message,
        });
    }
};

// Activar/Desactivar usuario
const toggleUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // No permitir desactivar el último admin
        if (user.role === 'admin' && user.isActive) {
            const adminCount = await User.count({
                where: {
                    role: 'admin',
                    isActive: true,
                    id: { [Op.ne]: id },
                },
            });

            if (adminCount === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'No se puede desactivar el último administrador',
                });
            }
        }

        await user.update({ isActive: !user.isActive });

        res.json({
            success: true,
            message: `Usuario ${
                user.isActive ? 'desactivado' : 'activado'
            } exitosamente`,
            data: {
                id: user.id,
                isActive: !user.isActive,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al cambiar estado del usuario',
            error: error.message,
        });
    }
};

// Obtener conductores activos
const getActiveDrivers = async (req, res) => {
    try {
        const drivers = await User.findAll({
            where: {
                role: 'empleado',
                isActive: true,
            },
            attributes: { exclude: ['password'] },
            order: [['firstName', 'ASC']],
        });

        res.json({
            success: true,
            data: drivers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener conductores',
            error: error.message,
        });
    }
};

// Obtener estadísticas de usuarios
const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.count();
        const activeUsers = await User.count({ where: { isActive: true } });
        const admins = await User.count({
            where: { role: 'admin', isActive: true },
        });
        const drivers = await User.count({
            where: { role: 'empleado', isActive: true },
        });

        res.json({
            success: true,
            data: {
                total: totalUsers,
                active: activeUsers,
                inactive: totalUsers - activeUsers,
                admins,
                drivers,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener estadísticas',
            error: error.message,
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
    getActiveDrivers,
    getUserStats,
};
