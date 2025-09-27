const { Ticket, Ruta, Empresa } = require('../models');
const { Op } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            console.log('🚌 Añadiendo tickets realistas para mejorar cálculos de costes...');
            
            // Buscar la empresa y rutas
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            const rutas = await Ruta.findAll({ 
                where: { id_empresa: empresa.id_empresa } 
            });

            if (!empresa || rutas.length === 0) {
                throw new Error('Empresa o rutas no encontradas. Ejecuta primero los seeders anteriores.');
            }

            // Tickets más realistas con precios actuales (enero 2024)
            const ticketsRealistas = [
                // Tickets de gasolina con precios reales (1.50-1.60€/litro)
                {
                    id_ruta: rutas[0].id, // Ruta escolar Vitoria
                    fecha: new Date('2024-01-20T07:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 155, // 1.55€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 80, // Repostaje completo
                    importecoche_euros: 0,
                    importebus_euros: 12400, // 80 * 155 = 124€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_realista_001.pdf',
                    'Precio por Litro': 155,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Ruta escolar San Sebastián
                    fecha: new Date('2024-01-20T07:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 158, // 1.58€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 85,
                    importecoche_euros: 0,
                    importebus_euros: 13430, // 85 * 158 = 134.30€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_realista_001.pdf',
                    'Precio por Litro': 158,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Ruta universitaria Vitoria
                    fecha: new Date('2024-01-21T08:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 152, // 1.52€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 75,
                    importecoche_euros: 0,
                    importebus_euros: 11400, // 75 * 152 = 114€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_realista_001.pdf',
                    'Precio por Litro': 152,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Ruta universitaria San Sebastián
                    fecha: new Date('2024-01-21T08:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 160, // 1.60€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 90,
                    importecoche_euros: 0,
                    importebus_euros: 14400, // 90 * 160 = 144€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_realista_001.pdf',
                    'Precio por Litro': 160,
                    id_empresa: empresa.id_empresa
                },
                // Tickets híbridos (gasolina + electricidad)
                {
                    id_ruta: rutas[4].id, // Ruta eléctrica Vitoria
                    fecha: new Date('2024-01-22T09:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 156, // 1.56€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 45, // Menos litros para híbrido
                    importecoche_euros: 0,
                    importebus_euros: 7020, // 45 * 156 = 70.20€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_hibrido_bilbao_001.pdf',
                    'Precio por Litro': 156,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[5].id, // Ruta eléctrica San Sebastián
                    fecha: new Date('2024-01-22T09:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 154, // 1.54€/litro
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 50,
                    importecoche_euros: 0,
                    importebus_euros: 7700, // 50 * 154 = 77€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_hibrido_bilbao_002.pdf',
                    'Precio por Litro': 154,
                    id_empresa: empresa.id_empresa
                },
                // Tickets de carga eléctrica (para vehículos eléctricos)
                {
                    id_ruta: rutas[4].id, // Ruta eléctrica Vitoria
                    fecha: new Date('2024-01-23T10:00:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0, // No aplicable para electricidad
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 0, // No litros para electricidad
                    importecoche_euros: 0,
                    importebus_euros: 2500, // 25€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_carga_electrica_bilbao_001.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[5].id, // Ruta eléctrica San Sebastián
                    fecha: new Date('2024-01-23T10:30:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253',
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 3000, // 30€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_carga_electrica_bilbao_002.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                // Tickets adicionales para rutas largas
                {
                    id_ruta: rutas[0].id, // Ruta escolar Vitoria - repostaje en Vitoria
                    fecha: new Date('2024-01-24T12:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 162, // 1.62€/litro (más caro en Vitoria)
                    coordenadas: '42.8467,-2.6716', // Vitoria
                    litroscoche: 0,
                    litrosbus: 70,
                    importecoche_euros: 0,
                    importebus_euros: 11340, // 70 * 162 = 113.40€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_001.pdf',
                    'Precio por Litro': 162,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Ruta escolar San Sebastián - repostaje en San Sebastián
                    fecha: new Date('2024-01-24T13:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 165, // 1.65€/litro (más caro en San Sebastián)
                    coordenadas: '43.3183,-1.9812', // San Sebastián
                    litroscoche: 0,
                    litrosbus: 75,
                    importecoche_euros: 0,
                    importebus_euros: 12375, // 75 * 165 = 123.75€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_cepsa_san_sebastian_001.pdf',
                    'Precio por Litro': 165,
                    id_empresa: empresa.id_empresa
                }
            ];

            // Insertar tickets realistas
            await Ticket.bulkCreate(ticketsRealistas);
            console.log(`✅ Creados ${ticketsRealistas.length} tickets realistas adicionales`);

        } catch (error) {
            console.error('❌ Error en seeder de tickets realistas:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            console.log('🗑️ Eliminando tickets realistas...');
            
            // Buscar la empresa
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            
            if (empresa) {
                // Eliminar tickets realistas (fechas específicas)
                await Ticket.destroy({
                    where: {
                        id_empresa: empresa.id_empresa,
                        fecha: {
                            [Op.gte]: new Date('2024-01-20T00:00:00')
                        }
                    }
                });
                console.log('✅ Tickets realistas eliminados');
            }
        } catch (error) {
            console.error('❌ Error eliminando tickets realistas:', error);
            throw error;
        }
    }
};
