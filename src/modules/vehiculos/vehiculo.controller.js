const { Vehiculo, Usuario, Empresa, Ticket } = require('../../models');
const { Op } = require('sequelize');
const { logSecurityError } = require('../../utils/securityLogger');

// Obtener todos los vehículos
const getAllVehiculos = async (req, res) => {
    try {
        const { page = 1, limit = 10, search, marca, tipo, id_usuario } = req.query;
        const offset = (page - 1) * limit;

        // Construir filtros
        const whereClause = {};
        if (search) {
            whereClause[Op.or] = [
                { matricula: { [Op.iLike]: `%${search}%` } },
                { marca: { [Op.iLike]: `%${search}%` } },
                { modelo: { [Op.iLike]: `%${search}%` } },
            ];
        }
        if (marca) whereClause.marca = { [Op.iLike]: `%${marca}%` };
        if (tipo) whereClause.tipo = { [Op.iLike]: `%${tipo}%` };
        if (id_usuario) whereClause.id_usuario = id_usuario;

        const { count, rows: vehiculos } = await Vehiculo.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
                {
                    model: Empresa,
                    as: 'empresa',
                    attributes: ['id_empresa', 'nombre', 'cif'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['matricula', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: vehiculos,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getAllVehiculos', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener vehículos',
        });
    }
};

// Obtener vehículo por matrícula
const getVehiculoByMatricula = async (req, res) => {
    try {
        const { matricula } = req.params;

        const vehiculo = await Vehiculo.findOne({
            where: { matricula },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
            ],
        });

        if (!vehiculo) {
            return res.status(404).json({
                success: false,
                message: 'Vehículo no encontrado',
            });
        }

        res.json({
            success: true,
            data: vehiculo,
        });
    } catch (error) {
        logSecurityError(error, { action: 'getVehiculoByMatricula', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener vehículo',
        });
    }
};

// Crear nuevo vehículo
const createVehiculo = async (req, res) => {
    try {
        const {
            matricula,
            id_usuario,
            marca,
            modelo,
            etiqueta,
            tipo,
            consumo_min,
            consumo_max,
            emisiones_min,
            emisiones_max,
            motorizacion,
            km,
            kw_minimo,
            kw_maximo,
        } = req.body;

        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        // Verificar que la matrícula no existe
        const vehiculoExistente = await Vehiculo.findByPk(matricula);
        if (vehiculoExistente) {
            return res.status(409).json({
                success: false,
                message: 'Ya existe un vehículo con esta matrícula',
            });
        }

        const vehiculo = await Vehiculo.create({
            matricula,
            id_usuario,
            marca,
            modelo,
            etiqueta,
            tipo,
            consumo_min,
            consumo_max,
            emisiones_min,
            emisiones_max,
            motorizacion,
            km,
            kw_minimo,
            kw_maximo,
        });

        // Obtener el vehículo con la información del usuario
        const vehiculoCompleto = await Vehiculo.findByPk(matricula, {
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
            ],
        });

        res.status(201).json({
            success: true,
            message: 'Vehículo creado exitosamente',
            data: vehiculoCompleto,
        });
    } catch (error) {
        logSecurityError(error, { action: 'createVehiculo', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al crear vehículo',
        });
    }
};

// Actualizar vehículo
const updateVehiculo = async (req, res) => {
    try {
        const { matricula } = req.params;
        const updateData = req.body;

        // Verificar que el vehículo existe
        const vehiculo = await Vehiculo.findByPk(matricula);
        if (!vehiculo) {
            return res.status(404).json({
                success: false,
                message: 'Vehículo no encontrado',
            });
        }

        // Si se está cambiando el usuario, verificar que existe
        if (updateData.id_usuario) {
            const usuario = await Usuario.findByPk(updateData.id_usuario);
            if (!usuario) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado',
                });
            }
        }

        await vehiculo.update(updateData);

        // Obtener el vehículo actualizado con la información del usuario
        const vehiculoActualizado = await Vehiculo.findByPk(matricula, {
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
            ],
        });

        res.json({
            success: true,
            message: 'Vehículo actualizado exitosamente',
            data: vehiculoActualizado,
        });
    } catch (error) {
        logSecurityError(error, { action: 'updateVehiculo', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al actualizar vehículo',
        });
    }
};

// Eliminar vehículo
const deleteVehiculo = async (req, res) => {
    try {
        const { matricula } = req.params;

        const vehiculo = await Vehiculo.findByPk(matricula);
        if (!vehiculo) {
            return res.status(404).json({
                success: false,
                message: 'Vehículo no encontrado',
            });
        }

        await vehiculo.destroy();

        res.json({
            success: true,
            message: 'Vehículo eliminado exitosamente',
        });
    } catch (error) {
        logSecurityError(error, { action: 'deleteVehiculo', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al eliminar vehículo',
        });
    }
};

// Obtener vehículos por empresa
const getVehiculosByEmpresa = async (req, res) => {
    try {
        const { empresaId } = req.params;
        const { page = 1, limit = 10, search, marca, tipo } = req.query;
        const offset = (page - 1) * limit;

        const whereClause = { id_empresa: empresaId };

        if (search) {
            whereClause[Op.or] = [
                { matricula: { [Op.iLike]: `%${search}%` } },
                { marca: { [Op.iLike]: `%${search}%` } },
                { modelo: { [Op.iLike]: `%${search}%` } },
            ];
        }
        if (marca) whereClause.marca = { [Op.iLike]: `%${marca}%` };
        if (tipo) whereClause.tipo = { [Op.iLike]: `%${tipo}%` };

        const { count, rows: vehiculos } = await Vehiculo.findAndCountAll({
            where: whereClause,
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
                {
                    model: Empresa,
                    as: 'empresa',
                    attributes: ['id_empresa', 'nombre', 'cif'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['matricula', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: vehiculos,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getVehiculosByEmpresa', userId: req.user?.userId, empresaId: req.params.empresaId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener vehículos de la empresa',
        });
    }
};

// Obtener vehículos de un usuario específico
const getVehiculosByUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Verificar que el usuario existe
        const usuario = await Usuario.findByPk(id_usuario);
        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado',
            });
        }

        const { count, rows: vehiculos } = await Vehiculo.findAndCountAll({
            where: { id_usuario },
            include: [
                {
                    model: Usuario,
                    as: 'usuario',
                    attributes: ['id_usuario', 'username', 'nombre', 'apellido', 'email'],
                },
            ],
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [['matricula', 'ASC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.json({
            success: true,
            data: vehiculos,
            pagination: {
                total: count,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: totalPages,
            },
        });
    } catch (error) {
        logSecurityError(error, { action: 'getVehiculosByUsuario', userId: req.user?.userId });
        res.status(500).json({
            success: false,
            message: 'Error al obtener vehículos del usuario',
        });
    }
};

const getVehiculosConCostesReales = async (req, res) => {
  try {
    const { id_empresa } = req.params;
    const { total_km = 200 } = req.query; // KM por defecto
    
    // Obtener vehículos con sus tickets
    const vehiculos = await Vehiculo.findAll({
      where: { id_empresa },
      include: [
        {
          model: Empresa,
          as: 'empresa'
        }
      ]
    });

    // Calcular costes reales basados en tickets
    const vehiculosConCostes = await Promise.all(vehiculos.map(async (vehiculo) => {
      // Buscar tickets recientes para este vehículo
      const tickets = await Ticket.findAll({
        where: {
          id_empresa: id_empresa,
          fecha: {
            [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Últimos 30 días
          }
        },
        order: [['fecha', 'DESC']],
        limit: 10
      });

      let costeReal = 0;
      let consumoReal = 0;
      let precioPromedio = 0;
      
      if (tickets.length > 0) {
        // Calcular promedios reales
        const totalImporte = tickets.reduce((sum, ticket) => 
          sum + (ticket.importebus_euros || 0), 0);
        const totalLitros = tickets.reduce((sum, ticket) => 
          sum + (ticket.litrosbus || 0), 0);
        const precios = tickets
          .filter(ticket => ticket.precioporlitro > 0)
          .map(ticket => ticket.precioporlitro);
        
        if (totalLitros > 0) {
          consumoReal = totalLitros / tickets.length; // Litros por repostaje promedio
          precioPromedio = precios.length > 0 ? 
            precios.reduce((sum, precio) => sum + precio, 0) / precios.length : 0;
          
          // Calcular coste para los KM solicitados
          const kmPorRepostaje = 400; // KM promedio entre repostajes
          const repostajesNecesarios = total_km / kmPorRepostaje;
          costeReal = (totalImporte / tickets.length) * repostajesNecesarios;
        }
      }

      // Si no hay datos reales, usar datos del vehículo
      if (costeReal === 0) {
        const consumoMedio = (vehiculo.consumo_min + vehiculo.consumo_max) / 2;
        const precio = vehiculo.motorizacion === 'Eléctrico' ? 0.25 : 1.5;
        costeReal = (total_km / 100) * consumoMedio * precio;
      }

      return {
        ...vehiculo.toJSON(),
        coste_real: Math.round(costeReal * 100) / 100,
        consumo_real: Math.round(consumoReal * 100) / 100,
        precio_promedio: Math.round(precioPromedio * 100) / 100,
        tickets_count: tickets.length
      };
    }));

    res.json({
      success: true,
      data: vehiculosConCostes,
      message: 'Vehículos con costes reales calculados'
    });
  } catch (error) {
    console.error('Error al obtener vehículos con costes reales:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
};

module.exports = {
    getAllVehiculos,
    getVehiculoByMatricula,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    getVehiculosByUsuario,
    getVehiculosByEmpresa,
    getVehiculosConCostesReales,
};
