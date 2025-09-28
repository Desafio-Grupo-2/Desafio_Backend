const { Ticket, Ruta, Empresa, Vehiculo } = require('../models');
const { Op } = require('sequelize');

// Función para generar fechas aleatorias en un rango
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Función para generar precios realistas según el mes (simulando fluctuaciones del mercado)
function getRealisticPrice(month, motorizacion) {
    const basePrices = {
        'Gasolina': 150, // 1.50€ base
        'Híbrido': 140,  // 1.40€ base
        'Eléctrico': 25  // 0.25€/kWh base
    };
    
    const basePrice = basePrices[motorizacion] || 150;
    
    // Simular fluctuaciones mensuales del mercado
    const monthlyVariations = {
        0: 0.95,  // Enero: más barato
        1: 0.98,  // Febrero
        2: 1.02,  // Marzo: subida
        3: 1.05,  // Abril: subida
        4: 1.08,  // Mayo: subida
        5: 1.10,  // Junio: pico verano
        6: 1.12,  // Julio: pico verano
        7: 1.10,  // Agosto: pico verano
        8: 1.05,  // Septiembre: bajada
        9: 1.02,  // Octubre: bajada
        10: 0.98, // Noviembre: bajada
        11: 0.95  // Diciembre: más barato
    };
    
    const variation = monthlyVariations[month] || 1.0;
    const finalPrice = Math.round(basePrice * variation);
    
    // Añadir variación aleatoria de ±5%
    const randomVariation = 0.95 + Math.random() * 0.1;
    return Math.round(finalPrice * randomVariation);
}

// Función para generar consumo realista según el vehículo
function getRealisticConsumption(vehiculo, month) {
    const baseConsumption = {
        'Gasolina': (vehiculo.consumo_min + vehiculo.consumo_max) / 2,
        'Híbrido': (vehiculo.consumo_min + vehiculo.consumo_max) / 2 * 0.6, // 40% menos consumo
        'Eléctrico': 0 // No litros para eléctrico
    };
    
    let consumption = baseConsumption[vehiculo.motorizacion] || 8;
    
    // Variación estacional (más consumo en invierno por calefacción)
    const seasonalVariation = {
        0: 1.15,  // Enero: más consumo
        1: 1.10,  // Febrero
        2: 1.05,  // Marzo
        3: 0.95,  // Abril
        4: 0.90,  // Mayo
        5: 0.85,  // Junio
        6: 0.80,  // Julio: menos consumo
        7: 0.80,  // Agosto: menos consumo
        8: 0.85,  // Septiembre
        9: 0.95,  // Octubre
        10: 1.05, // Noviembre
        11: 1.10  // Diciembre
    };
    
    const variation = seasonalVariation[month] || 1.0;
    consumption *= variation;
    
    // Añadir variación aleatoria de ±10%
    const randomVariation = 0.9 + Math.random() * 0.2;
    return Math.round(consumption * randomVariation);
}

// Función para generar coordenadas realistas de estaciones de servicio en el País Vasco
function getRealisticCoordinates() {
    const stations = [
        { lat: 43.2627, lng: -2.9253, name: 'Bilbao Centro' },
        { lat: 43.3183, lng: -1.9812, name: 'San Sebastián Centro' },
        { lat: 42.8467, lng: -2.6716, name: 'Vitoria Centro' },
        { lat: 43.3074, lng: -2.9888, name: 'Bilbao Norte' },
        { lat: 43.2856, lng: -2.9345, name: 'Bilbao Sur' },
        { lat: 43.3401, lng: -1.7890, name: 'San Sebastián Norte' },
        { lat: 43.2956, lng: -2.1234, name: 'San Sebastián Sur' },
        { lat: 42.8901, lng: -2.7123, name: 'Vitoria Norte' },
        { lat: 42.8012, lng: -2.6345, name: 'Vitoria Sur' }
    ];
    
    const station = stations[Math.floor(Math.random() * stations.length)];
    return {
        lat: Math.round(station.lat * 1000000),
        lng: Math.round(station.lng * 1000000),
        coords: `${station.lat},${station.lng}`
    };
}

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            console.log('Verificando tickets anuales realistas (2024)...');
            
            // Buscar la empresa y vehículos
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            const vehiculos = await Vehiculo.findAll({ 
                where: { id_empresa: empresa.id_empresa },
                include: [{ model: Ruta, as: 'rutas' }]
            });

            if (!empresa || vehiculos.length === 0) {
                throw new Error('Empresa o vehículos no encontrados. Ejecuta primero los seeders anteriores.');
            }

            // Verificar si ya existen tickets de 2024
            const existingTickets = await Ticket.count({
                where: {
                    id_empresa: empresa.id_empresa,
                    fecha: {
                        [Op.gte]: new Date('2024-01-01'),
                        [Op.lte]: new Date('2024-12-31')
                    }
                }
            });

            if (existingTickets > 0) {
                console.log(`Ya existen ${existingTickets} tickets de 2024. Saltando generación.`);
                return;
            }

            console.log(`Encontrados ${vehiculos.length} vehículos para generar tickets`);

            const allTickets = [];
            const startDate = new Date('2024-01-01');
            const endDate = new Date('2024-12-31');

            // Generar tickets para cada vehículo
            for (const vehiculo of vehiculos) {
                console.log(`Generando tickets para ${vehiculo.matricula} (${vehiculo.motorizacion})`);
                
                // Determinar frecuencia de repostajes según el tipo de vehículo
                const repostajesPorMes = {
                    'Gasolina': 8,    // Repostaje cada 3-4 días
                    'Híbrido': 6,     // Repostaje cada 5 días
                    'Eléctrico': 12   // Carga cada 2-3 días
                };
                
                const frecuencia = repostajesPorMes[vehiculo.motorizacion] || 8;
                
                // Generar tickets para cada mes del año
                for (let month = 0; month < 12; month++) {
                    const monthStart = new Date(2024, month, 1);
                    const monthEnd = new Date(2024, month + 1, 0);
                    
                    // Generar tickets para este mes
                    for (let i = 0; i < frecuencia; i++) {
                        const fecha = randomDate(monthStart, monthEnd);
                        const coords = getRealisticCoordinates();
                        
                        // Generar datos realistas
                        const precioPorLitro = getRealisticPrice(month, vehiculo.motorizacion);
                        const litros = getRealisticConsumption(vehiculo, month);
                        
                        // Para vehículos eléctricos, simular carga en kWh
                        let importeEuros, litrosFinal;
                        if (vehiculo.motorizacion === 'Eléctrico') {
                            const kwh = Math.round(20 + Math.random() * 30); // 20-50 kWh
                            importeEuros = Math.round(kwh * precioPorLitro);
                            litrosFinal = 0;
                        } else {
                            importeEuros = Math.round(litros * precioPorLitro);
                            litrosFinal = litros;
                        }
                        
                        // Seleccionar una ruta aleatoria del vehículo
                        const ruta = vehiculo.rutas[Math.floor(Math.random() * vehiculo.rutas.length)];
                        
                        const ticket = {
                            id_ruta: ruta.id,
                            fecha: fecha,
                            tipocarburante: vehiculo.motorizacion === 'Eléctrico' ? 'Electricidad' : 'Gasolina 95',
                            precioporlitro: precioPorLitro,
                            coordenadas: coords.coords,
                            litroscoche: 0,
                            litrosbus: litrosFinal,
                            importecoche_euros: 0,
                            importebus_euros: importeEuros,
                            latitud: coords.lat,
                            longitud: coords.lng,
                            pdf: `ticket_${vehiculo.matricula}_${month + 1}_${i + 1}.pdf`,
                            'Precio por Litro': precioPorLitro,
                            id_empresa: empresa.id_empresa
                        };
                        
                        allTickets.push(ticket);
                    }
                }
            }

            console.log(`Generando ${allTickets.length} tickets...`);
            
            // Insertar tickets en lotes para mejor rendimiento
            const batchSize = 100;
            for (let i = 0; i < allTickets.length; i += batchSize) {
                const batch = allTickets.slice(i, i + batchSize);
                await Ticket.bulkCreate(batch);
                console.log(`Insertados ${Math.min(i + batchSize, allTickets.length)}/${allTickets.length} tickets`);
            }

            console.log(`Creados ${allTickets.length} tickets anuales realistas`);
            
            // Mostrar estadísticas
            const stats = {
                total: allTickets.length,
                porMotorizacion: {},
                porMes: {}
            };
            
            allTickets.forEach(ticket => {
                const month = new Date(ticket.fecha).getMonth();
                const motorizacion = vehiculos.find(v => v.rutas.some(r => r.id === ticket.id_ruta))?.motorizacion || 'Desconocida';
                
                stats.porMotorizacion[motorizacion] = (stats.porMotorizacion[motorizacion] || 0) + 1;
                stats.porMes[month] = (stats.porMes[month] || 0) + 1;
            });
            
            console.log('Estadísticas generadas:');
            console.log('   Por motorización:', stats.porMotorizacion);
            console.log('   Por mes:', Object.keys(stats.porMes).length, 'meses con datos');

        } catch (error) {
            console.error('Error en seeder de tickets anuales:', error);
            throw error;
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            console.log('Eliminando tickets anuales...');
            
            // Buscar la empresa
            const empresa = await Empresa.findOne({ where: { cif: 'A12345678' } });
            
            if (empresa) {
                // Contar tickets antes de eliminar
                const ticketsToDelete = await Ticket.count({
                    where: {
                        id_empresa: empresa.id_empresa,
                        fecha: {
                            [Op.gte]: new Date('2024-01-01'),
                            [Op.lte]: new Date('2024-12-31')
                        }
                    }
                });
                
                if (ticketsToDelete > 0) {
                    // Eliminar todos los tickets de 2024
                    await Ticket.destroy({
                        where: {
                            id_empresa: empresa.id_empresa,
                            fecha: {
                                [Op.gte]: new Date('2024-01-01'),
                                [Op.lte]: new Date('2024-12-31')
                            }
                        }
                    });
                    console.log(`${ticketsToDelete} tickets anuales eliminados`);
                } else {
                    console.log('No hay tickets de 2024 para eliminar');
                }
            } else {
                console.log('Empresa no encontrada, no hay tickets que eliminar');
            }
        } catch (error) {
            console.error('Error eliminando tickets anuales:', error);
            throw error;
        }
    }
};
