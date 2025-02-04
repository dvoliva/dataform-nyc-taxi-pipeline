
# Proyecto ELT con Dataform en GCP - NYC Taxi Data

Este proyecto tiene como objetivo implementar un pipeline ELT (Extract, Load, Transform) utilizando Dataform en Google Cloud Platform (GCP). El proyecto utiliza el conjunto de datos público de taxis de Nueva York y se centra principalmente en la infraestructura del pipeline y el establecimiento de un flujo de trabajo CI/CD con GitHub Actions.

## Estructura del Proyecto

El proyecto está organizado en varios archivos y carpetas que definen las transformaciones y el flujo de trabajo del pipeline. A continuación, se describen los principales archivos y su propósito:

### Archivos Principales

1. **`workflow_settings.yaml`**: Define la configuración global del proyecto, como el nombre del proyecto, ubicación y conjuntos de datos predeterminados.

2. **`definitions/01_staging/stg_nyc_taxi.sqlx`**: Contiene la definición de la tabla de "staging", donde se extraen los datos del conjunto de datos público de taxis de Nueva York. Aquí también se configuran las variables para el entorno (producción o staging), y se aplican transformaciones básicas.

3. **`definitions/02_analytics/an_nyc_taxi.sqlx`**: Define la tabla de análisis que toma los datos de "staging" y los carga para ser utilizados en análisis posteriores. Esta tabla no realiza transformaciones adicionales, solo carga los datos.

4. **`definitions/tests/data_quality_test.sqlx`**: Contiene un test de calidad de datos, en particular, para verificar que no haya registros con valores negativos en la columna `total_amount`. Este es un ejemplo básico de prueba para demostrar como se asegura la integridad de los datos.

5. **`includes/variables.js`**: Define las variables utilizadas en el proyecto, como las fechas de inicio y fin para los datos, que pueden cambiar dependiendo del entorno (producción o staging).

6. **`.github/workflows/dataform-ci.yml`**: Define el flujo de trabajo CI/CD en GitHub Actions, el cual automatiza el proceso de ejecución de Dataform en los entornos de staging y producción. Este archivo asegura que el pipeline se ejecute automáticamente cada vez que se cree un Pull Request hacia la rama principal (`main`).

## Descripción de la Infraestructura

### `workflow_settings.yaml`
Este archivo configura los parámetros globales de Dataform, como el nombre del proyecto, el dataset predeterminado y la versión de Dataform que se utilizará. Es un archivo esencial para la correcta configuración del entorno.

### `stg_nyc_taxi.sqlx`
Este archivo es el punto de entrada para los datos de taxis de Nueva York. En él, se extraen los datos del conjunto público de BigQuery y se les aplica una transformación básica, como el cálculo del costo promedio por milla. Dependiendo del entorno (staging o producción), se seleccionan diferentes fuentes de datos.

### `an_nyc_taxi.sqlx`
Una vez que los datos son transformados en el archivo `stg_nyc_taxi.sqlx`, este archivo se encarga de cargar los datos transformados en una tabla de análisis. Aquí no se aplican transformaciones adicionales, ya que el objetivo es simplemente cargar los datos procesados en el entorno de producción.

### `data_quality_test.sqlx`
Este es un ejemplo de test de calidad de datos que verifica que no existan registros con valores negativos en la columna `total_amount` del conjunto de datos de taxis de Nueva York. Si se encuentran registros con valores negativos, el test fallará y el pipeline se detendrá.

Este test es solo un ejemplo y puede ser extendido para incluir otras validaciones de calidad de los datos según las necesidades del proyecto.

## Workflow CI/CD

### Configuración de GitHub Actions

En el archivo `.github/workflows/dataform-ci.yml`, se define un flujo de trabajo CI/CD que se activa cuando se crea un Pull Request hacia la rama `main`. El workflow tiene los siguientes pasos:

1. **Descargar el repositorio**: Se descarga el repositorio del proyecto para poder ejecutar los pasos siguientes.

2. **Configurar Node.js**: Se configura la versión de Node.js necesaria para ejecutar Dataform.

3. **Instalar Dataform CLI**: Se instala la herramienta de línea de comandos de Dataform, que permite ejecutar las transformaciones definidas en el proyecto.

4. **Autenticar con GCP**: Utilizando una clave de servicio de Google Cloud Platform, se autentica el proyecto para poder ejecutar las transformaciones en GCP.

5. **Autenticar con Dataform**: Se autentica el proyecto en Dataform utilizando las credenciales definidas como secretos en GitHub.

6. **Ejecutar el pipeline en staging**: Se ejecuta el pipeline de Dataform en el entorno de staging, utilizando las variables correspondientes.

7. **Ejecutar el pipeline en producción**: Si el paso anterior fue exitoso, se ejecuta el pipeline en el entorno de producción.

### ¿Por qué es importante este workflow?

El flujo de trabajo CI/CD asegura que las transformaciones de datos se ejecuten automáticamente en los entornos de staging y producción, sin intervención manual. Además, se ejecutan los tests de calidad de los datos para garantizar que los datos procesados sean correctos antes de ser cargados en producción.

## Pruebas de Calidad de los Datos

El test de calidad de los datos es una parte crucial de este proyecto. El archivo `data_quality_test.sqlx` contiene un test sencillo que asegura que no haya registros con valores negativos en la columna `total_amount`. Si se encuentran registros con valores negativos, el test fallará y el pipeline se detendrá.

Este test es solo un ejemplo y puede ser extendido para incluir otras validaciones de calidad de los datos según las necesidades del proyecto.

## ¿Cómo Ejecutar el Proyecto?

1. **Clonar el repositorio**:

   ```bash
   git clone <repositorio>
   cd <repositorio>
   ```

2. **Instalar las dependencias**:

   Asegúrate de tener Node.js instalado. Luego, instala las dependencias del proyecto:

   ```bash
   npm install
   ```

3. **Configurar el entorno**:

   Configura las variables de entorno necesarias en el archivo `variables.js`, dependiendo de si estás trabajando en un entorno de producción o staging.

4. **Ejecutar Dataform**:

   Una vez que todo esté configurado, puedes ejecutar las transformaciones de Dataform localmente:

   ```bash
   dataform run --vars ENVIRONMENT=staging --tags staging,test
   ```

   Esto ejecutará las transformaciones en el entorno de staging. Puedes también ejecutar en producción de forma similar.

5. **Crear un Pull Request**:

   Cuando estés listo para implementar los cambios, crea un Pull Request hacia la rama `main` y el flujo de trabajo CI/CD se encargará de ejecutar las pruebas y las transformaciones automáticamente.

## Conclusión
Esta primera versión del proyecto de implementación de un pipeline ELT en GCP utilizando Dataform prioriza la infraestructura del proyecto, la automatización del flujo de trabajo y demostrar el uso de las pruebas de calidad de los datos (ventaja de SQLX). 
