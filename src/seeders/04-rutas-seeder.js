const { Ruta, Vehiculo, Empresa } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Buscar la empresa y vehículos
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            const vehiculos = await Vehiculo.findAll({ 
                where: { id_empresa: empresa.id_empresa } 
            });

            if (!empresa || vehiculos.length === 0) {
                throw new Error('Empresa o vehículos no encontrados. Ejecuta primero los seeders anteriores.');
            }

            // Crear rutas que salen de la cochera en BBK Kuna, Bilbao
            const rutas = [
                // Rutas escolares desde Bilbao
                {
                    matricula: vehiculos[0].matricula, // Mercedes Sprinter
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_escolar_vitoria',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '06:30', km: 0 },
                        { nombre: 'Colegio San Prudencio (Vitoria)', hora: '07:45', km: 62.5 },
                        { nombre: 'Colegio San Viator (Vitoria)', hora: '08:00', km: 65.8 },
                        { nombre: 'Instituto Mendizabala (Vitoria)', hora: '08:15', km: 68.1 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:00', km: 124.2 }
                    ]),
                    total_km: 124,
                    fecha_inicio: new Date('2024-01-15T06:30:00'),
                    fecha_fin: new Date('2024-01-15T09:00:00'),
                    tiempo_total: '2h 30min',
                    tiempos_paradas: JSON.stringify([15, 15, 15, 45]),
                    kms_paradas: JSON.stringify([62.5, 3.3, 2.3, 56.1]),
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: vehiculos[1].matricula, // Iveco Daily
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_escolar_san_sebastian',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '06:45', km: 0 },
                        { nombre: 'Colegio San Patricio (San Sebastián)', hora: '08:00', km: 66.1 },
                        { nombre: 'Colegio La Salle (San Sebastián)', hora: '08:15', km: 69.3 },
                        { nombre: 'Instituto Usandizaga (San Sebastián)', hora: '08:30', km: 72.2 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:15', km: 138.4 }
                    ]),
                    total_km: 138,
                    fecha_inicio: new Date('2024-01-15T06:45:00'),
                    fecha_fin: new Date('2024-01-15T09:15:00'),
                    tiempo_total: '2h 30min',
                    tiempos_paradas: JSON.stringify([15, 15, 15, 45]),
                    kms_paradas: JSON.stringify([66.1, 3.2, 2.9, 66.2]),
                    id_empresa: empresa.id_empresa
                },
                // Rutas universitarias desde Bilbao
                {
                    matricula: vehiculos[2].matricula, // Volvo híbrido
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_universidad_vitoria',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '07:00', km: 0 },
                        { nombre: 'Campus de Álava (Vitoria)', hora: '08:15', km: 62.5 },
                        { nombre: 'Universidad del País Vasco (Vitoria)', hora: '08:35', km: 68.0 },
                        { nombre: 'Campus de Leioa (Bilbao)', hora: '09:00', km: 75.3 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:30', km: 80.8 }
                    ]),
                    total_km: 81,
                    fecha_inicio: new Date('2024-01-15T07:00:00'),
                    fecha_fin: new Date('2024-01-15T09:30:00'),
                    tiempo_total: '2h 30min',
                    tiempos_paradas: JSON.stringify([20, 20, 25, 30]),
                    kms_paradas: JSON.stringify([62.5, 5.5, 7.3, 5.5]),
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: vehiculos[3].matricula, // Mercedes híbrido
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_universidad_san_sebastian',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '07:30', km: 0 },
                        { nombre: 'Universidad de Deusto (Bilbao)', hora: '07:50', km: 8.2 },
                        { nombre: 'Universidad de Mondragón (Mondragón)', hora: '08:20', km: 26.9 },
                        { nombre: 'Campus de San Sebastián', hora: '08:50', km: 43.6 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:30', km: 87.2 }
                    ]),
                    total_km: 87,
                    fecha_inicio: new Date('2024-01-15T07:30:00'),
                    fecha_fin: new Date('2024-01-15T09:30:00'),
                    tiempo_total: '2h 00min',
                    tiempos_paradas: JSON.stringify([20, 30, 30, 40]),
                    kms_paradas: JSON.stringify([8.2, 18.7, 16.7, 43.6]),
                    id_empresa: empresa.id_empresa
                },
                // Rutas eléctricas (más cortas, ideales para vehículos eléctricos)
                {
                    matricula: vehiculos[4].matricula, // BYD eléctrico
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_local_electrico',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '08:00', km: 0 },
                        { nombre: 'Universidad de Deusto (Bilbao)', hora: '08:20', km: 8.2 },
                        { nombre: 'Campus de Leioa (Bilbao)', hora: '08:40', km: 16.4 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:00', km: 24.6 }
                    ]),
                    total_km: 25,
                    fecha_inicio: new Date('2024-01-15T08:00:00'),
                    fecha_fin: new Date('2024-01-15T09:00:00'),
                    tiempo_total: '1h 00min',
                    tiempos_paradas: JSON.stringify([20, 20, 20]),
                    kms_paradas: JSON.stringify([8.2, 8.2, 8.2]),
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: vehiculos[5].matricula, // Irizar eléctrico
                    polyline: 'encoded_polyline_bilbao_bbk_kuna_local_electrico_2',
                    paradas: JSON.stringify([
                        { nombre: 'Cochera BBK Kuna (Salida)', hora: '08:30', km: 0 },
                        { nombre: 'Universidad de Mondragón (Mondragón)', hora: '09:00', km: 18.7 },
                        { nombre: 'Cochera BBK Kuna (Regreso)', hora: '09:30', km: 37.4 }
                    ]),
                    total_km: 37,
                    fecha_inicio: new Date('2024-01-15T08:30:00'),
                    fecha_fin: new Date('2024-01-15T09:30:00'),
                    tiempo_total: '1h 00min',
                    tiempos_paradas: JSON.stringify([30, 30]),
                    kms_paradas: JSON.stringify([18.7, 18.7]),
                    id_empresa: empresa.id_empresa
                }
            ];

            const rutasCreadas = await Ruta.bulkCreate(rutas);

            console.log('Rutas creadas:', rutasCreadas.length);
            console.log('   - Rutas escolares:', 2);
            console.log('   - Rutas universitarias:', 2);
            console.log('   - Rutas eléctricas:', 2);
            
            return rutasCreadas;
        } catch (error) {
            console.error('Error creando rutas:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            if (empresa) {
                await Ruta.destroy({
                    where: { id_empresa: empresa.id_empresa }
                });
            }
            console.log('Rutas eliminadas');
        } catch (error) {
            console.error('Error eliminando rutas:', error);
            throw error;
        }
    }
};
