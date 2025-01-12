
const ENVIRONMENT = dataform.projectConfig.ENVIRONMENT || "staging";


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


module.exports = config[ENVIRONMENT];

