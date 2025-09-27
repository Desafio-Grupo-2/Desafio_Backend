const { Ticket, Ruta, Empresa } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Buscar la empresa y rutas
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            const rutas = await Ruta.findAll({ 
                where: { id_empresa: empresa.id_empresa } 
            });

            if (!empresa || rutas.length === 0) {
                throw new Error('Empresa o rutas no encontradas. Ejecuta primero los seeders anteriores.');
            }

            // Crear tickets de combustible con gasolineras reales de Bilbao y alrededores
            const tickets = [
                // Tickets de salida desde BBK Kuna (Bilbao)
                {
                    id_ruta: rutas[0].id, // Ruta escolar Vitoria
                    fecha: new Date('2024-01-15T06:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao Centro
                    litroscoche: 0,
                    litrosbus: 60,
                    importecoche_euros: 0,
                    importebus_euros: 8700, // 60 * 145 = 8700 céntimos = 87.00€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_centro_001.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Ruta escolar San Sebastián
                    fecha: new Date('2024-01-15T06:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 65,
                    importecoche_euros: 0,
                    importebus_euros: 9620, // 65 * 148 = 9620 céntimos = 96.20€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_001.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Ruta universitaria Vitoria
                    fecha: new Date('2024-01-15T06:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 142,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 40,
                    importecoche_euros: 0,
                    importebus_euros: 5680, // 40 * 142 = 5680 céntimos = 56.80€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_001.pdf',
                    'Precio por Litro': 142,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Ruta universitaria San Sebastián
                    fecha: new Date('2024-01-15T06:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 45,
                    importecoche_euros: 0,
                    importebus_euros: 6570, // 45 * 146 = 6570 céntimos = 65.70€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_001.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                // Tickets de llegada a Vitoria
                {
                    id_ruta: rutas[0].id, // Ruta escolar Vitoria
                    fecha: new Date('2024-01-15T08:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 144,
                    coordenadas: '42.8467,-2.6716', // Repsol Vitoria
                    litroscoche: 0,
                    litrosbus: 25,
                    importecoche_euros: 0,
                    importebus_euros: 3600, // 25 * 144 = 3600 céntimos = 36.00€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_001.pdf',
                    'Precio por Litro': 144,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Ruta universitaria Vitoria
                    fecha: new Date('2024-01-15T08:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 143,
                    coordenadas: '42.8467,-2.6716', // Cepsa Vitoria
                    litroscoche: 0,
                    litrosbus: 30,
                    importecoche_euros: 0,
                    importebus_euros: 4290, // 30 * 143 = 4290 céntimos = 42.90€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_cepsa_vitoria_001.pdf',
                    'Precio por Litro': 143,
                    id_empresa: empresa.id_empresa
                },
                // Tickets de llegada a San Sebastián
                {
                    id_ruta: rutas[1].id, // Ruta escolar San Sebastián
                    fecha: new Date('2024-01-15T08:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.3183,-1.9812', // Repsol San Sebastián
                    litroscoche: 0,
                    litrosbus: 30,
                    importecoche_euros: 0,
                    importebus_euros: 4410, // 30 * 147 = 4410 céntimos = 44.10€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_repsol_san_sebastian_001.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Ruta universitaria San Sebastián
                    fecha: new Date('2024-01-15T08:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.3183,-1.9812', // BP San Sebastián
                    litroscoche: 0,
                    litrosbus: 35,
                    importecoche_euros: 0,
                    importebus_euros: 5075, // 35 * 145 = 5075 céntimos = 50.75€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_bp_san_sebastian_001.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                // Tickets de vuelta a Bilbao
                {
                    id_ruta: rutas[0].id, // Vuelta ruta escolar Vitoria
                    fecha: new Date('2024-01-15T14:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '42.8467,-2.6716', // Cepsa Vitoria
                    litroscoche: 0,
                    litrosbus: 40,
                    importecoche_euros: 0,
                    importebus_euros: 5840, // 40 * 146 = 5840 céntimos = 58.40€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_cepsa_vitoria_002.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Vuelta ruta escolar San Sebastián
                    fecha: new Date('2024-01-15T14:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 144,
                    coordenadas: '43.3183,-1.9812', // Shell San Sebastián
                    litroscoche: 0,
                    litrosbus: 35,
                    importecoche_euros: 0,
                    importebus_euros: 5040, // 35 * 144 = 5040 céntimos = 50.40€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_shell_san_sebastian_001.pdf',
                    'Precio por Litro': 144,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Vuelta ruta universitaria Vitoria
                    fecha: new Date('2024-01-15T15:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '42.8467,-2.6716', // Repsol Vitoria
                    litroscoche: 0,
                    litrosbus: 25,
                    importecoche_euros: 0,
                    importebus_euros: 3625, // 25 * 145 = 3625 céntimos = 36.25€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_002.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Vuelta ruta universitaria San Sebastián
                    fecha: new Date('2024-01-15T15:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.3183,-1.9812', // BP San Sebastián
                    litroscoche: 0,
                    litrosbus: 30,
                    importecoche_euros: 0,
                    importebus_euros: 4410, // 30 * 147 = 4410 céntimos = 44.10€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_bp_san_sebastian_002.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                // Tickets de llegada a Bilbao (final de jornada)
                {
                    id_ruta: rutas[0].id, // Final ruta escolar Vitoria
                    fecha: new Date('2024-01-15T16:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 143,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao
                    litroscoche: 0,
                    litrosbus: 20,
                    importecoche_euros: 0,
                    importebus_euros: 2860, // 20 * 143 = 2860 céntimos = 28.60€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_002.pdf',
                    'Precio por Litro': 143,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Final ruta escolar San Sebastián
                    fecha: new Date('2024-01-15T16:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 25,
                    importecoche_euros: 0,
                    importebus_euros: 3625, // 25 * 145 = 3625 céntimos = 36.25€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_002.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Final ruta universitaria Vitoria
                    fecha: new Date('2024-01-15T17:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 144,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 15,
                    importecoche_euros: 0,
                    importebus_euros: 2160, // 15 * 144 = 2160 céntimos = 21.60€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_002.pdf',
                    'Precio por Litro': 144,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Final ruta universitaria San Sebastián
                    fecha: new Date('2024-01-15T17:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 20,
                    importecoche_euros: 0,
                    importebus_euros: 2920, // 20 * 146 = 2920 céntimos = 29.20€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_002.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                // Tickets para autobuses eléctricos (carga eléctrica)
                {
                    id_ruta: rutas[4].id, // Ruta eléctrica local
                    fecha: new Date('2024-01-15T07:30:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 1500, // 15€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_001.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[5].id, // Ruta eléctrica local 2
                    fecha: new Date('2024-01-15T08:00:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 1200, // 12€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_002.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                // Tickets adicionales para días posteriores
                {
                    id_ruta: rutas[0].id, // Día siguiente - Ruta escolar Vitoria
                    fecha: new Date('2024-01-16T06:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao
                    litroscoche: 0,
                    litrosbus: 55,
                    importecoche_euros: 0,
                    importebus_euros: 8030, // 55 * 146 = 8030 céntimos = 80.30€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_003.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Día siguiente - Ruta escolar San Sebastián
                    fecha: new Date('2024-01-16T06:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 60,
                    importecoche_euros: 0,
                    importebus_euros: 8820, // 60 * 147 = 8820 céntimos = 88.20€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_003.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Día siguiente - Ruta universitaria Vitoria
                    fecha: new Date('2024-01-16T06:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 35,
                    importecoche_euros: 0,
                    importebus_euros: 5075, // 35 * 145 = 5075 céntimos = 50.75€
                    latitud: 432627,
                    longitude: -29253,
                    pdf: 'ticket_bp_bilbao_003.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Día siguiente - Ruta universitaria San Sebastián
                    fecha: new Date('2024-01-16T06:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 40,
                    importecoche_euros: 0,
                    importebus_euros: 5920, // 40 * 148 = 5920 céntimos = 59.20€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_003.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                // Tickets adicionales para completar 40 tickets
                // Día 16 - Vuelta desde Vitoria
                {
                    id_ruta: rutas[0].id, // Vuelta ruta escolar Vitoria día 16
                    fecha: new Date('2024-01-16T14:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '42.8467,-2.6716', // Repsol Vitoria
                    litroscoche: 0,
                    litrosbus: 35,
                    importecoche_euros: 0,
                    importebus_euros: 5075, // 35 * 145 = 5075 céntimos = 50.75€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_003.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Vuelta ruta universitaria Vitoria día 16
                    fecha: new Date('2024-01-16T15:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '42.8467,-2.6716', // Cepsa Vitoria
                    litroscoche: 0,
                    litrosbus: 20,
                    importecoche_euros: 0,
                    importebus_euros: 2920, // 20 * 146 = 2920 céntimos = 29.20€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_cepsa_vitoria_003.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                // Día 16 - Vuelta desde San Sebastián
                {
                    id_ruta: rutas[1].id, // Vuelta ruta escolar San Sebastián día 16
                    fecha: new Date('2024-01-16T14:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.3183,-1.9812', // Repsol San Sebastián
                    litroscoche: 0,
                    litrosbus: 30,
                    importecoche_euros: 0,
                    importebus_euros: 4410, // 30 * 147 = 4410 céntimos = 44.10€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_repsol_san_sebastian_002.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Vuelta ruta universitaria San Sebastián día 16
                    fecha: new Date('2024-01-16T15:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 144,
                    coordenadas: '43.3183,-1.9812', // BP San Sebastián
                    litroscoche: 0,
                    litrosbus: 25,
                    importecoche_euros: 0,
                    importebus_euros: 3600, // 25 * 144 = 3600 céntimos = 36.00€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_bp_san_sebastian_003.pdf',
                    'Precio por Litro': 144,
                    id_empresa: empresa.id_empresa
                },
                // Día 16 - Llegada a Bilbao
                {
                    id_ruta: rutas[0].id, // Final ruta escolar Vitoria día 16
                    fecha: new Date('2024-01-16T16:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 142,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao
                    litroscoche: 0,
                    litrosbus: 18,
                    importecoche_euros: 0,
                    importebus_euros: 2556, // 18 * 142 = 2556 céntimos = 25.56€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_004.pdf',
                    'Precio por Litro': 142,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Final ruta escolar San Sebastián día 16
                    fecha: new Date('2024-01-16T16:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 143,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 22,
                    importecoche_euros: 0,
                    importebus_euros: 3146, // 22 * 143 = 3146 céntimos = 31.46€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_004.pdf',
                    'Precio por Litro': 143,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Final ruta universitaria Vitoria día 16
                    fecha: new Date('2024-01-16T17:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 12,
                    importecoche_euros: 0,
                    importebus_euros: 1740, // 12 * 145 = 1740 céntimos = 17.40€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_004.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Final ruta universitaria San Sebastián día 16
                    fecha: new Date('2024-01-16T17:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 15,
                    importecoche_euros: 0,
                    importebus_euros: 2190, // 15 * 146 = 2190 céntimos = 21.90€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_004.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                // Día 17 - Nuevas rutas
                {
                    id_ruta: rutas[0].id, // Día 17 - Ruta escolar Vitoria
                    fecha: new Date('2024-01-17T06:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 149,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao
                    litroscoche: 0,
                    litrosbus: 50,
                    importecoche_euros: 0,
                    importebus_euros: 7450, // 50 * 149 = 7450 céntimos = 74.50€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_005.pdf',
                    'Precio por Litro': 149,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Día 17 - Ruta escolar San Sebastián
                    fecha: new Date('2024-01-17T06:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 150,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 55,
                    importecoche_euros: 0,
                    importebus_euros: 8250, // 55 * 150 = 8250 céntimos = 82.50€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_005.pdf',
                    'Precio por Litro': 150,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Día 17 - Ruta universitaria Vitoria
                    fecha: new Date('2024-01-17T06:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 32,
                    importecoche_euros: 0,
                    importebus_euros: 4736, // 32 * 148 = 4736 céntimos = 47.36€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_005.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Día 17 - Ruta universitaria San Sebastián
                    fecha: new Date('2024-01-17T06:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 151,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 38,
                    importecoche_euros: 0,
                    importebus_euros: 5738, // 38 * 151 = 5738 céntimos = 57.38€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_005.pdf',
                    'Precio por Litro': 151,
                    id_empresa: empresa.id_empresa
                },
                // Día 17 - Repostaje en destinos
                {
                    id_ruta: rutas[0].id, // Día 17 - Llegada Vitoria
                    fecha: new Date('2024-01-17T08:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '42.8467,-2.6716', // Repsol Vitoria
                    litroscoche: 0,
                    litrosbus: 28,
                    importecoche_euros: 0,
                    importebus_euros: 4116, // 28 * 147 = 4116 céntimos = 41.16€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_004.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Día 17 - Llegada San Sebastián
                    fecha: new Date('2024-01-17T08:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.3183,-1.9812', // Repsol San Sebastián
                    litroscoche: 0,
                    litrosbus: 32,
                    importecoche_euros: 0,
                    importebus_euros: 4736, // 32 * 148 = 4736 céntimos = 47.36€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_repsol_san_sebastian_003.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Día 17 - Llegada Vitoria universitaria
                    fecha: new Date('2024-01-17T08:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '42.8467,-2.6716', // Cepsa Vitoria
                    litroscoche: 0,
                    litrosbus: 24,
                    importecoche_euros: 0,
                    importebus_euros: 3504, // 24 * 146 = 3504 céntimos = 35.04€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_cepsa_vitoria_004.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Día 17 - Llegada San Sebastián universitaria
                    fecha: new Date('2024-01-17T08:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 149,
                    coordenadas: '43.3183,-1.9812', // BP San Sebastián
                    litroscoche: 0,
                    litrosbus: 26,
                    importecoche_euros: 0,
                    importebus_euros: 3874, // 26 * 149 = 3874 céntimos = 38.74€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_bp_san_sebastian_004.pdf',
                    'Precio por Litro': 149,
                    id_empresa: empresa.id_empresa
                },
                // Día 17 - Vuelta a Bilbao
                {
                    id_ruta: rutas[0].id, // Día 17 - Vuelta Vitoria
                    fecha: new Date('2024-01-17T14:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '42.8467,-2.6716', // Cepsa Vitoria
                    litroscoche: 0,
                    litrosbus: 33,
                    importecoche_euros: 0,
                    importebus_euros: 4785, // 33 * 145 = 4785 céntimos = 47.85€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_cepsa_vitoria_005.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Día 17 - Vuelta San Sebastián
                    fecha: new Date('2024-01-17T14:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.3183,-1.9812', // Shell San Sebastián
                    litroscoche: 0,
                    litrosbus: 28,
                    importecoche_euros: 0,
                    importebus_euros: 4116, // 28 * 147 = 4116 céntimos = 41.16€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_shell_san_sebastian_002.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Día 17 - Vuelta Vitoria universitaria
                    fecha: new Date('2024-01-17T15:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 144,
                    coordenadas: '42.8467,-2.6716', // Repsol Vitoria
                    litroscoche: 0,
                    litrosbus: 19,
                    importecoche_euros: 0,
                    importebus_euros: 2736, // 19 * 144 = 2736 céntimos = 27.36€
                    latitud: 428467,
                    longitud: -26716,
                    pdf: 'ticket_repsol_vitoria_005.pdf',
                    'Precio por Litro': 144,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Día 17 - Vuelta San Sebastián universitaria
                    fecha: new Date('2024-01-17T15:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.3183,-1.9812', // BP San Sebastián
                    litroscoche: 0,
                    litrosbus: 22,
                    importecoche_euros: 0,
                    importebus_euros: 3256, // 22 * 148 = 3256 céntimos = 32.56€
                    latitud: 433183,
                    longitud: -19812,
                    pdf: 'ticket_bp_san_sebastian_005.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                // Día 17 - Final en Bilbao
                {
                    id_ruta: rutas[0].id, // Día 17 - Final Vitoria
                    fecha: new Date('2024-01-17T16:30:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 146,
                    coordenadas: '43.2627,-2.9253', // Repsol Bilbao
                    litroscoche: 0,
                    litrosbus: 16,
                    importecoche_euros: 0,
                    importebus_euros: 2336, // 16 * 146 = 2336 céntimos = 23.36€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_repsol_bilbao_006.pdf',
                    'Precio por Litro': 146,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[1].id, // Día 17 - Final San Sebastián
                    fecha: new Date('2024-01-17T16:45:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 147,
                    coordenadas: '43.2627,-2.9253', // Cepsa Bilbao
                    litroscoche: 0,
                    litrosbus: 20,
                    importecoche_euros: 0,
                    importebus_euros: 2940, // 20 * 147 = 2940 céntimos = 29.40€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_cepsa_bilbao_006.pdf',
                    'Precio por Litro': 147,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[2].id, // Día 17 - Final Vitoria universitaria
                    fecha: new Date('2024-01-17T17:00:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 145,
                    coordenadas: '43.2627,-2.9253', // BP Bilbao
                    litroscoche: 0,
                    litrosbus: 14,
                    importecoche_euros: 0,
                    importebus_euros: 2030, // 14 * 145 = 2030 céntimos = 20.30€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_bp_bilbao_006.pdf',
                    'Precio por Litro': 145,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[3].id, // Día 17 - Final San Sebastián universitaria
                    fecha: new Date('2024-01-17T17:15:00'),
                    tipocarburante: 'Gasolina 95',
                    precioporlitro: 148,
                    coordenadas: '43.2627,-2.9253', // Shell Bilbao
                    litroscoche: 0,
                    litrosbus: 18,
                    importecoche_euros: 0,
                    importebus_euros: 2664, // 18 * 148 = 2664 céntimos = 26.64€
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_shell_bilbao_006.pdf',
                    'Precio por Litro': 148,
                    id_empresa: empresa.id_empresa
                },
                // Tickets eléctricos adicionales
                {
                    id_ruta: rutas[4].id, // Día 16 - Ruta eléctrica local
                    fecha: new Date('2024-01-16T07:30:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 1800, // 18€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_003.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[5].id, // Día 16 - Ruta eléctrica local 2
                    fecha: new Date('2024-01-16T08:00:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 1600, // 16€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_004.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[4].id, // Día 17 - Ruta eléctrica local
                    fecha: new Date('2024-01-17T07:30:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 2000, // 20€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_005.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                },
                {
                    id_ruta: rutas[5].id, // Día 17 - Ruta eléctrica local 2
                    fecha: new Date('2024-01-17T08:00:00'),
                    tipocarburante: 'Electricidad',
                    precioporlitro: 0,
                    coordenadas: '43.2627,-2.9253', // Punto de carga BBK Kuna
                    litroscoche: 0,
                    litrosbus: 0,
                    importecoche_euros: 0,
                    importebus_euros: 1400, // 14€ de carga eléctrica
                    latitud: 432627,
                    longitud: -29253,
                    pdf: 'ticket_electrico_bbk_kuna_006.pdf',
                    'Precio por Litro': 0,
                    id_empresa: empresa.id_empresa
                }
            ];

            const ticketsCreados = await Ticket.bulkCreate(tickets);

            console.log('Tickets creados:', ticketsCreados.length);
            console.log('   - Tickets gasolina:', 36);
            console.log('   - Tickets eléctricos:', 6);
            
            // Calcular totales
            const totalGasolina = tickets.filter(t => t.tipocarburante === 'Gasolina 95')
                .reduce((sum, t) => sum + t.importebus_euros, 0);
            const totalElectrico = tickets.filter(t => t.tipocarburante === 'Electricidad')
                .reduce((sum, t) => sum + t.importebus_euros, 0);
            
            console.log('Gastos totales:');
            console.log('   - Gasolina/Híbrido:', (totalGasolina / 100).toFixed(2) + '€');
            console.log('   - Electricidad:', (totalElectrico / 100).toFixed(2) + '€');
            console.log('   - Total:', ((totalGasolina + totalElectrico) / 100).toFixed(2) + '€');
            console.log('');
            console.log('Hotspots de repostaje:');
            console.log('   - Bilbao (BBK Kuna): 18 tickets');
            console.log('   - Vitoria: 10 tickets');
            console.log('   - San Sebastián: 8 tickets');
            console.log('   - Eléctricos: 6 tickets');
            
            return ticketsCreados;
        } catch (error) {
            console.error('Error creando tickets:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            if (empresa) {
                await Ticket.destroy({
                    where: { id_empresa: empresa.id_empresa }
                });
            }
            console.log('Tickets eliminados');
        } catch (error) {
            console.error('Error eliminando tickets:', error);
            throw error;
        }
    }
};
