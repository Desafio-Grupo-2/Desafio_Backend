const jwt = require('jsonwebtoken');
const { User } = require('../../models');

// Generar token JWT
const generateToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });
};

// Registrar nuevo usuario
const register = async (req, res) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            phone,
            role = 'empleado',
        } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El usuario ya existe con este email',
            });
        }

        // Crear nuevo usuario
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            phone,
            role,
        });

        // Generar token
        const token = generateToken(user.id);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            data: {
                user: userResponse,
                token,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al registrar usuario',
            error: error.message,
        });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar si el usuario está activo
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Verificar contraseña
        const isValidPassword = await user.checkPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Actualizar último login
        await user.update({ lastLogin: new Date() });

        // Generar token
        const token = generateToken(user.id);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Inicio de sesión exitoso',
            data: {
                user: userResponse,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message,
        });
    }
};

// Obtener perfil del usuario actual
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
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
            message: 'Error al obtener perfil',
            error: error.message,
        });
    }
};

// Actualizar perfil
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateData = req.body;

        // No permitir actualizar ciertos campos
        delete updateData.id;
        delete updateData.password;
        delete updateData.role;
        delete updateData.isActive;

        const user = await User.findByPk(userId);
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
            message: 'Perfil actualizado exitosamente',
            data: userResponse,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar perfil',
            error: error.message,
        });
    }
};

// Cambiar contraseña
const changePassword = async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Verificar contraseña actual
        const isValidPassword = await user.checkPassword(currentPassword);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Contraseña actual incorrecta',
            });
        }

        // Actualizar contraseña
        await user.update({ password: newPassword });

        res.json({
            success: true,
            message: 'Contraseña actualizada exitosamente',
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al cambiar contraseña',
            error: error.message,
        });
    }
};

// Cerrar sesión (en el frontend se eliminará el token)
const logout = async (req, res) => {
    res.json({
        success: true,
        message: 'Sesión cerrada exitosamente',
    });
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar si el usuario está activo
        if (!user.isActive) {
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Verificar contraseña
        const isValidPassword = await user.checkPassword(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar que sea admin
        if (user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        // Actualizar último login
        await user.update({ lastLogin: new Date() });

        // Generar token JWT
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } //Corta duración
        );

        res.json({
            success: true,
            message: 'Inicio de sesión de administrador exitoso',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    isActive: user.isActive,
                },
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
            error: error.message,
        });
    }
};

module.exports = {
    register,
    login,
    adminLogin,
    getProfile,
    updateProfile,
    changePassword,
    logout,
};
