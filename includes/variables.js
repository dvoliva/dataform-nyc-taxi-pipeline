// includes/variables.js

// Detectar el entorno desde el archivo de configuración del proyecto
const ENVIRONMENT = dataform.projectConfig.ENVIRONMENT || "staging";

// Configuración de fechas según el entorno
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

// Exportar las configuraciones del entorno actual
module.exports = config[ENVIRONMENT];

