/* global module */

var _ = require('underscore');
var ConfListHelper = require('../components/ConfList/ConfListHelper');

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

    const sortColumnFormatter = new ConfListHelper();
    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    var ranks = sortedConfs.map(function (conf1) { return sortedConfs.findIndex(conf2 => sortColumnFormatter.genderDiversityFormatter(conf2.node.diversityPercentage) === sortColumnFormatter.genderDiversityFormatter(conf1.node.diversityPercentage)) + 1 });
    for (var i = 0; i < sortedConfs.length; i += 1) {
      if (i >= 1 && ranks[i] == ranks[i - 1]) {
        sortedConfs[i].node['index'] = "";
      } else {
        sortedConfs[i].node['index'] = ranks[i];
      }
    }

    return sortedConfs;
  }

  augmentConfData(confs) {
    return this.completeMissingFields(confs);
  }
}


module.exports = AppHelper;