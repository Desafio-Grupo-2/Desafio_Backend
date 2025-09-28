const { Vehiculo, Usuario, Empresa, Ticket, Ruta } = require('../../models');
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
    const { total_km = 200, periodo = '30dias' } = req.query; // KM por defecto, período por defecto
    
    // Calcular fecha límite según el período (dinámico desde la fecha actual)
    let fechaLimite, fechaFin;
    const ahora = new Date();
    const fechaMaxima = new Date(ahora.getTime() - 365 * 24 * 60 * 60 * 1000); // Máximo 1 año hacia atrás
    
    // Para desarrollo: incluir 2024 como año base si no hay datos recientes
    const añoBase = 2024;
    const fechaBase2024 = new Date(`${añoBase}-01-01T00:00:00.000Z`);
    
    switch (periodo) {
      case 'semestre':
        // Últimos 6 meses desde hoy, pero si no hay datos, usar 2024
        fechaLimite = new Date(ahora.getTime() - 6 * 30 * 24 * 60 * 60 * 1000);
        fechaFin = ahora;
        break;
      case 'anual':
        // Último año completo (desde hace 12 meses hasta hace 1 mes)
        fechaLimite = new Date(ahora.getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
        fechaFin = new Date(ahora.getTime() - 1 * 30 * 24 * 60 * 60 * 1000);
        break;
      case '30dias':
      default:
        // Últimos 30 días desde hoy
        fechaLimite = new Date(ahora.getTime() - 30 * 24 * 60 * 60 * 1000);
        fechaFin = ahora;
        break;
    }
    
    // Asegurar que no exceda el límite legal de 1 año
    if (fechaLimite < fechaMaxima) {
      fechaLimite = fechaMaxima;
    }
    
    // Para desarrollo: si no hay datos recientes, usar 2024 como fallback
    const tieneDatosRecientes = await Ticket.count({
      where: {
        id_empresa: id_empresa,
        fecha: {
          [Op.gte]: fechaLimite,
          [Op.lte]: fechaFin
        }
      }
    });
    
    if (tieneDatosRecientes === 0) {
      console.log('No hay datos recientes, usando 2024 como fallback para desarrollo');
      switch (periodo) {
        case 'semestre':
          fechaLimite = new Date(`${añoBase}-07-01T00:00:00.000Z`);
          fechaFin = new Date(`${añoBase}-12-31T23:59:59.999Z`);
          break;
        case 'anual':
          fechaLimite = new Date(`${añoBase}-01-01T00:00:00.000Z`);
          fechaFin = new Date(`${añoBase}-12-31T23:59:59.999Z`);
          break;
        case '30dias':
        default:
          fechaLimite = new Date(`${añoBase}-01-01T00:00:00.000Z`);
          fechaFin = new Date(`${añoBase}-01-31T23:59:59.999Z`);
          break;
      }
    }
    
    console.log(`Buscando tickets desde: ${fechaLimite.toISOString()} hasta: ${fechaFin.toISOString()} (período: ${periodo})`);
    console.log(`Fecha actual: ${ahora.toISOString()}`);
    console.log(`Límite legal máximo: ${fechaMaxima.toISOString()}`);
    
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
      // Buscar tickets específicos del vehículo a través de las rutas
      const tickets = await Ticket.findAll({
        where: {
          id_empresa: id_empresa,
          fecha: {
            [Op.gte]: fechaLimite,
            [Op.lte]: fechaFin
          }
        },
        include: [{
          model: Ruta,
          as: 'ruta',
          where: {
            matricula: vehiculo.matricula 
          }
        }],
        order: [['fecha', 'DESC']],
        limit: 50 // Aumentar límite para períodos más largos
      });

      let costeReal = 0;
      let consumoReal = 0;
      let precioPromedio = 0;
      
      console.log(`Vehículo ${vehiculo.matricula}: ${tickets.length} tickets encontrados en el período ${periodo}`);
      
      if (tickets.length > 0) {
        console.log(`Vehículo ${vehiculo.matricula}: ${tickets.length} tickets encontrados`);
        
        // Calcular promedios reales específicos del vehículo
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
          
          // Calcular coste específico para este vehículo
          const consumoPorKm = consumoReal / 400; // Consumo por km basado en datos reales
          const precioPorLitro = precioPromedio > 0 ? precioPromedio : 
            (vehiculo.motorizacion === 'Eléctrico' ? 0.25 : 1.5);
          
          costeReal = total_km * consumoPorKm * precioPorLitro;
          
          console.log(`${vehiculo.matricula}: consumo=${consumoReal}L, precio=${precioPorLitro}€/L, coste=${costeReal}€`);
        }
      }

      // Si no hay datos reales, usar datos específicos del vehículo
      if (costeReal === 0) {
        const consumoMedio = (vehiculo.consumo_min + vehiculo.consumo_max) / 2;
        const precio = vehiculo.motorizacion === 'Eléctrico' ? 0.25 : 
                     vehiculo.motorizacion === 'Híbrido' ? 1.4 : 1.7;
        costeReal = (total_km / 100) * consumoMedio * precio;
        
        console.log(`${vehiculo.matricula}: Sin tickets, usando datos del vehículo - consumo=${consumoMedio}L/100km, precio=${precio}€/L, coste=${costeReal}€`);
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
      message: `Vehículos con costes reales calculados (período: ${periodo})`,
      periodo: periodo,
      fecha_limite: fechaLimite.toISOString(),
      total_vehiculos: vehiculosConCostes.length
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
