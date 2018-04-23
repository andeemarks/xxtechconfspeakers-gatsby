/* global module */

var _ = require('underscore');

class AppHelper {
  isDataCompliantWithSchema(confs, confsSchema) {
      var Ajv = require('ajv');
      var schemaValidator = new Ajv();
      schemaValidator.addMetaSchema(require('ajv/lib/refs/json-schema-draft-06.json'));

      return schemaValidator.validate(confsSchema, confs);
  }

  completeMissingFields(confs) {
    for (var i = 0; i < confs.length; i += 1) {
      confs[i].node['numberOfMen'] = confs[i].node.totalSpeakers - confs[i].node.numberOfWomen;
      confs[i].node['diversityPercentage'] = confs[i].node.numberOfWomen / confs[i].node.totalSpeakers
    }

    return _.sortBy(confs, 'node.diversityPercentage');
  }

  augmentConfData(confs) {
    return this.completeMissingFields(confs);
  }
}


module.exports = AppHelper;