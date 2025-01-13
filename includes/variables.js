
const ENVIRONMENT = dataform.projectConfig.ENVIRONMENT || "staging";

const config = {
  staging: {
    START_DATE: "2016-01-01",
    END_DATE: "2016-12-31",
    SOURCE_TABLE: "bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_2016",
  },
  prod: {
    START_DATE: "2017-01-01",
    END_DATE: "2017-12-31",
    SOURCE_TABLE: "bigquery-public-data.new_york_taxi_trips.tlc_yellow_trips_2017",
  },
};

module.exports = config[ENVIRONMENT];


