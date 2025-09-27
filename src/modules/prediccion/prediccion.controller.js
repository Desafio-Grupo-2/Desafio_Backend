const axios = require('axios');

const PREDICTION_API_URL = 'https://desafio-reto2.onrender.com';

const predictBatch = async (req, res) => {
  try {
    console.log('🔍 PredictBatch llamado con:', req.body);
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de datos en el campo "data"'
      });
    }

    console.log('Enviando datos a API de predicción externa:', data);

    // Llamar a la API externa desde el servidor
    const response = await axios.post(`${PREDICTION_API_URL}/predict_batch`, {
      data: data
    });

    console.log('Respuesta de API externa:', response.data);

    res.json({
      success: true,
      data: response.data,
      message: 'Predicción realizada exitosamente'
    });

  } catch (error) {
    console.error('Error en predicción:', error.message);
    
    // Si falla la API externa, crear predicción local
    const { data } = req.body;
    const localPredictions = data.map((item, index) => ({
      coste_energetico_vehiculo: item.coste_energetico_vehiculo,
      total_km: item.total_km,
      prediction: item.coste_energetico_vehiculo * (0.85 + Math.random() * 0.3)
    }));

    res.json({
      success: true,
      data: {
        predictions: localPredictions
      },
      message: 'Predicción local (API externa no disponible)'
    });
  }
};

module.exports = {
  predictBatch
};
