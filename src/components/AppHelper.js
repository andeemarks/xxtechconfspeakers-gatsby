/* global module */

class AppHelper {
  isDataCompliantWithSchema(confs, confsSchema) {
      var Ajv = require('ajv');
      var schemaValidator = new Ajv();
      schemaValidator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

      return schemaValidator.validate(confsSchema, confs);
  }

  completeMissingFields(confs) {
    for (var i = 0; i < confs.length; i += 1) {
      confs[i]['numberOfMen'] = confs[i].totalSpeakers - confs[i].numberOfWomen;
      confs[i]['diversityPercentage'] = confs[i].numberOfWomen / confs[i].totalSpeakers
    }

    return confs;
  }

  augmentConfData(confs) {
    return this.completeMissingFields(confs);
  }
}


module.exports = AppHelper;