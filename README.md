# Proyecto ELT con Dataform en GCP - NYC Taxi Datapipeline

Este proyecto tiene como objetivo implementar un pipeline ELT (Extract, Load, Transform) utilizando Dataform en Google Cloud Platform (GCP). El proyecto utiliza el conjunto de datos público de taxis de Nueva York y se centra principalmente en la infraestructura del pipeline, con un enfoque en la demostración del uso de pruebas para asegurar la calidad de los datos y el establecimiento de un flujo de trabajo CI/CD con GitHub Actions.

## Introducción a Dataform

Dataform es una herramienta de orquestación de datos que permite construir y gestionar pipelines de datos en plataformas de Big Data como Google Cloud Platform (GCP). En Dataform, los conceptos de repositorios y ramas se manejan de manera similar a GitHub, pero en lugar de ramas, se utilizan "workspaces". Un workspace es un entorno de desarrollo aislado que permite trabajar con diferentes versiones de un pipeline sin interferir con otros.

### Conexión con GitHub

Dataform se conecta con GitHub para gestionar versiones de los pipelines. La integración permite que los cambios en el repositorio de GitHub desencadenen la ejecución de los pipelines en Dataform, lo que facilita la automatización mediante CI/CD.

### Uso de Secretos y Variables

Los secretos (como claves de API o credenciales) y las variables (como fechas o entornos) se gestionan de forma segura en Dataform. Los secretos se almacenan en GitHub como variables de entorno en los flujos de trabajo, mientras que las variables de Dataform pueden ser definidas en archivos de configuración para su uso en los pipelines.

## Estructura del Proyecto

El proyecto está organizado en varios archivos y carpetas que definen las transformaciones y el flujo de trabajo del pipeline. A continuación, se describen los principales archivos y su propósito:

### Archivos Principales

1. **`workflow_settings.yaml`**: Define la configuración global del proyecto, como el nombre del proyecto, ubicación y conjuntos de datos predeterminados.

2. **`definitions/01_staging/stg_nyc_taxi.sqlx`**: Contiene la definición de la tabla de "staging", donde se extraen los datos del conjunto de datos público de taxis de Nueva York. Aquí también se configuran las variables para el entorno (producción o staging), y se aplican transformaciones básicas.

3. **`definitions/02_analytics/an_nyc_taxi.sqlx`**: Define la tabla de análisis que toma los datos de "staging" y los carga para ser utilizados en análisis posteriores. Esta tabla no realiza transformaciones adicionales, solo carga los datos.

4. **`definitions/tests/data_quality_test.sqlx`**: Contiene un test de calidad de datos, en particular, para verificar que no haya registros con valores negativos en la columna `total_amount`. Este es un ejemplo básico de prueba para asegurar la integridad de los datos.

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

En Dataform, es posible realizar pruebas de calidad de los datos utilizando consultas SQL (sqlx). Estas pruebas se configuran como afirmaciones, donde se define una consulta que valida las condiciones de los datos. La lógica básica de un test en sqlx es que la consulta debe devolver filas si la calidad de los datos no cumple con los requisitos establecidos. Si la consulta no devuelve filas, significa que los datos son válidos y el test pasa. Si devuelve alguna fila, el test falla, lo que indica que hay datos inconsistentes o erróneos. Este enfoque permite realizar validaciones simples y complejas, como verificar rangos de valores, la ausencia de registros nulos, la duplicidad de datos, y otras reglas de calidad personalizadas.

## Conclusión

Esta primera versión del proyecto de implementación de un datapipeline ELT en GCP utilizando Dataform. Se ha dado prioridad a la infraestructura del proyecto, la automatización del flujo de trabajo y la demostración del cómo hacer pruebas de calidad de los datos.
