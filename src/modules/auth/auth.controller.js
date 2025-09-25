const jwt = require('jsonwebtoken');
const { Usuario } = require('../../models');
const { 
    logFailedLogin, 
    logSuccessfulLogin, 
    logRegistration, 
    logSecurityError,
    logSecurityEvent
} = require('../../utils/securityLogger');

// Generar token JWT con expiración corta
const generateToken = (userId, role = 'conductor') => {
    return jwt.sign(
        { userId, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );
};

// Registrar nuevo usuario
const register = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            nombre,
            apellido,
            role = 'conductor',
        } = req.body;

        const clientIp = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');

        // Verificar si el usuario ya existe por email o username
        const { Op } = require('sequelize');
        const existingUser = await Usuario.findOne({ 
            where: { 
                [Op.or]: [
                    { email },
                    { username }
                ]
            } 
        });
        
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'El usuario ya existe con este email o nombre de usuario',
            });
        }

        // Crear nuevo usuario
        const user = await Usuario.create({
            username,
            email,
            password,
            nombre,
            apellido,
            role,
            active: true,
        });

        // Log de registro
        logRegistration(user.id_usuario, email, clientIp);

        // Generar token
        const token = generateToken(user.id_usuario, user.role);

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
        logSecurityError(error, { action: 'register', ip: req.ip });
        res.status(400).json({
            success: false,
            message: 'Error al registrar usuario',
        });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const clientIp = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');

        // Buscar usuario por email
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar si el usuario está activo
        if (!user.active) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Verificar contraseña
        const isValidPassword = await user.checkPassword(password);
        if (!isValidPassword) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Log de login exitoso
        logSuccessfulLogin(user.id_usuario, email, clientIp);

        // Generar token
        const token = generateToken(user.id_usuario, user.role);

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
        logSecurityError(error, { action: 'login', ip: req.ip });
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
        });
    }
};

// Obtener perfil del usuario actual
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await Usuario.findOne({ 
            where: { id_usuario: userId },
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
        logSecurityError(error, { action: 'getProfile', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener perfil',
        });
    }
};

// Actualizar perfil
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const updateData = req.body;

        // No permitir actualizar ciertos campos sensibles
        delete updateData.id_usuario;
        delete updateData.password;
        delete updateData.role;
        delete updateData.active;

        const user = await Usuario.findByPk(userId);
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
        logSecurityError(error, { action: 'updateProfile', userId: req.user?.userId });
        res.status(400).json({
            success: false,
            message: 'Error al actualizar perfil',
        });
    }
};

// Cambiar contraseña (solo administradores)
const changePassword = async (req, res) => {
    try {
        // Verificar que sea administrador
        if (req.user.role !== 'administrador') {
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Solo los administradores pueden cambiar contraseñas',
            });
        }

        const { userId, newPassword } = req.body;
        const adminId = req.user.userId;

        // Si no se especifica userId, cambiar la contraseña del administrador actual
        const targetUserId = userId || adminId;

        const user = await Usuario.findByPk(targetUserId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Actualizar contraseña (se encriptará automáticamente por el hook)
        await user.update({ password: newPassword });

        // Log de cambio de contraseña
        logSecurityEvent('PASSWORD_CHANGED', {
            adminId,
            targetUserId,
            targetEmail: user.email,
            ip: req.ip,
            severity: 'HIGH'
        });

        res.json({
            success: true,
            message: 'Contraseña actualizada exitosamente',
        });
    } catch (error) {
        logSecurityError(error, { action: 'changePassword', userId: req.user?.userId });
        res.status(400).json({
            success: false,
            message: 'Error al cambiar contraseña',
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
        const clientIp = req.ip || req.connection.remoteAddress;
        const userAgent = req.get('User-Agent');

        // Buscar usuario por email
        const user = await Usuario.findOne({ where: { email } });
        if (!user) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar si el usuario está activo
        if (!user.active) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Usuario inactivo',
            });
        }

        // Verificar contraseña
        const isValidPassword = await user.checkPassword(password);
        if (!isValidPassword) {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas',
            });
        }

        // Verificar que sea administrador
        if (user.role !== 'administrador') {
            logFailedLogin(email, clientIp, userAgent);
            return res.status(403).json({
                success: false,
                message: 'Acceso denegado. Se requiere rol de administrador',
            });
        }

        // Log de login exitoso
        logSuccessfulLogin(user.id_usuario, email, clientIp);

        // Generar token JWT
        const token = generateToken(user.id_usuario, user.role);

        // Remover contraseña de la respuesta
        const userResponse = user.toJSON();
        delete userResponse.password;

        res.json({
            success: true,
            message: 'Inicio de sesión de administrador exitoso',
            data: {
                user: userResponse,
                token,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'adminLogin', ip: req.ip });
        res.status(500).json({
            success: false,
            message: 'Error al iniciar sesión',
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
