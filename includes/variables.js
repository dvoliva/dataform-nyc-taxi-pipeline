// includes/variables.js

// Detecta el entorno
const ENVIRONMENT = process.env.ENVIRONMENT || "staging";

// Configuración de fechas por entorno
const config = {
  staging: {
    START_DATE: "2016-01-01",
    END_DATE: "2016-12-31",
  },
  prod: {
    START_DATE: "2017-01-01",
    END_DATE: "2017-12-31",
  },
};

// Exporta las fechas correspondientes al entorno actual
module.exports = config[ENVIRONMENT];
