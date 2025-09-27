const { Empresa } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Crear empresa de autobuses en Bilbao
            const empresa = await Empresa.create({
                nombre: 'San Millán Bus',
                cif: 'A12345678',
                direccion: 'Urazurrutia Kalea, 3, Ibaiondo, 48003 Bilbao, Vizcaya',
                telefono: '+34 944 123 456',
                email: 'info@sanmillanbus.com',
                sector: 'Transporte Escolar y Universitario',
                descripcion: 'Empresa especializada en transporte escolar y universitario en el País Vasco. Con sede en el emblemático edificio BBK Kuna de Bilbao, ofrecemos servicios de autobús para colegios, institutos y universidades con una flota moderna y ecológica.',
                activa: true,
                fecha_creacion: new Date()
            });

            console.log('Empresa creada:', empresa.nombre);
            return empresa;
        } catch (error) {
            console.error('Error creando empresa:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await Empresa.destroy({
                where: { cif: 'A12345678' }
            });
            console.log('Empresa eliminada');
        } catch (error) {
            console.error('Error eliminando empresa:', error);
            throw error;
        }
    }
};
