const { Vehiculo, Usuario, Empresa } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Buscar la empresa y conductores
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            const conductores = await Usuario.findAll({ 
                where: { 
                    id_empresa: empresa.id_empresa,
                    role: 'conductor' 
                } 
            });

            if (!empresa || conductores.length === 0) {
                throw new Error('Empresa o conductores no encontrados. Ejecuta primero los seeders anteriores.');
            }

            // Crear autobuses con diferentes tipos de motorización
            const autobuses = [
                // Autobuses de gasolina
                {
                    matricula: 'BI-1234-AB',
                    id_usuario: conductores[0].id_usuario,
                    marca: 'Mercedes-Benz',
                    modelo: 'Sprinter',
                    etiqueta: 'ECO',
                    tipo: 'Autobús Escolar',
                    consumo_min: 8,
                    consumo_max: 12,
                    emisiones_min: 120,
                    emisiones_max: 150,
                    motorizacion: 'Gasolina',
                    km: 45000,
                    kw_minimo: 120,
                    kw_maximo: 140,
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: 'SS-5678-CD',
                    id_usuario: conductores[1].id_usuario,
                    marca: 'Iveco',
                    modelo: 'Daily',
                    etiqueta: 'ECO',
                    tipo: 'Autobús Escolar',
                    consumo_min: 9,
                    consumo_max: 13,
                    emisiones_min: 130,
                    emisiones_max: 160,
                    motorizacion: 'Gasolina',
                    km: 32000,
                    kw_minimo: 110,
                    kw_maximo: 130,
                    id_empresa: empresa.id_empresa
                },
                // Autobuses híbridos
                {
                    matricula: 'VI-9012-EF',
                    id_usuario: conductores[2].id_usuario,
                    marca: 'Volvo',
                    modelo: 'B5LH',
                    etiqueta: 'ECO',
                    tipo: 'Autobús Universitario',
                    consumo_min: 6,
                    consumo_max: 9,
                    emisiones_min: 80,
                    emisiones_max: 110,
                    motorizacion: 'Híbrido',
                    km: 28000,
                    kw_minimo: 200,
                    kw_maximo: 250,
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: 'BI-3456-GH',
                    id_usuario: conductores[3].id_usuario,
                    marca: 'Mercedes-Benz',
                    modelo: 'Citaro Hybrid',
                    etiqueta: 'ECO',
                    tipo: 'Autobús Escolar',
                    consumo_min: 7,
                    consumo_max: 10,
                    emisiones_min: 90,
                    emisiones_max: 120,
                    motorizacion: 'Híbrido',
                    km: 15000,
                    kw_minimo: 180,
                    kw_maximo: 220,
                    id_empresa: empresa.id_empresa
                },
                // Autobuses eléctricos
                {
                    matricula: 'SS-7890-IJ',
                    id_usuario: conductores[4].id_usuario,
                    marca: 'BYD',
                    modelo: 'K9',
                    etiqueta: 'CERO',
                    tipo: 'Autobús Universitario',
                    consumo_min: 0,
                    consumo_max: 0,
                    emisiones_min: 0,
                    emisiones_max: 0,
                    motorizacion: 'Eléctrico',
                    km: 12000,
                    kw_minimo: 200,
                    kw_maximo: 300,
                    id_empresa: empresa.id_empresa
                },
                {
                    matricula: 'VI-2468-KL',
                    id_usuario: conductores[0].id_usuario, // Asignar a conductor existente
                    marca: 'Irizar',
                    modelo: 'ie bus',
                    etiqueta: 'CERO',
                    tipo: 'Autobús Escolar',
                    consumo_min: 0,
                    consumo_max: 0,
                    emisiones_min: 0,
                    emisiones_max: 0,
                    motorizacion: 'Eléctrico',
                    km: 8000,
                    kw_minimo: 250,
                    kw_maximo: 350,
                    id_empresa: empresa.id_empresa
                }
            ];

            const vehiculosCreados = await Vehiculo.bulkCreate(autobuses);

            console.log('Autobuses creados:', vehiculosCreados.length);
            console.log('   - Gasolina:', 2);
            console.log('   - Híbridos:', 2);
            console.log('   - Eléctricos:', 2);
            
            return vehiculosCreados;
        } catch (error) {
            console.error('Error creando vehículos:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            if (empresa) {
                await Vehiculo.destroy({
                    where: { id_empresa: empresa.id_empresa }
                });
            }
            console.log('Vehículos eliminados');
        } catch (error) {
            console.error('Error eliminando vehículos:', error);
            throw error;
        }
    }
};
