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
    
    const sortedConfs = _.sortBy(confs, function (confs) { return confs.node.diversityPercentage; }).reverse();

    // I feel like the following could/should be done using a list comprehension
    var ranks = sortedConfs.map(function (conf1) { return sortedConfs.findIndex(conf2 => conf2.node.diversityPercentage === conf1.node.diversityPercentage) + 1 });
    for (var i = 0; i < sortedConfs.length; i += 1) {
      sortedConfs[i].node['index'] = ranks[i];
    }

    // console.log(ranks);

    return sortedConfs;
  }

  augmentConfData(confs) {
    return this.completeMissingFields(confs);
  }
}


module.exports = AppHelper;