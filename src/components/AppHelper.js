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
    
    const sortedConfs = _.sortBy(confs, function (conf) {return conf.node.diversityPercentage;}).reverse();

    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    var ranks = sortedConfs.map(function (conf1) {return sortedConfs.findIndex(conf2 => new ConfListHelper().genderDiversityFormatter(conf2.node.diversityPercentage) === new ConfListHelper().genderDiversityFormatter(conf1.node.diversityPercentage)) + 1});
    for (var j = 0; j < sortedConfs.length; j += 1) {
      if (j >= 1 && ranks[j] == ranks[j - 1]) {
        sortedConfs[j].node['index'] = "";
      } else {
        sortedConfs[j].node['index'] = ranks[j];
      }
    }

    return sortedConfs;
  }

  augmentConfData(confs) {
    return this.completeMissingFields(confs);
  }
}


module.exports = AppHelper;