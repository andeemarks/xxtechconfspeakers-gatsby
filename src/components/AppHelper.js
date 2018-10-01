/* global module */

const _ = require('underscore')
const ConfListHelper = require('../components/ConfList/ConfListHelper')

class AppHelper {
  isDataCompliantWithSchema(confs, confsSchema) {
    var Ajv = require('ajv')
    var schemaValidator = new Ajv()
    schemaValidator.addMetaSchema(
      require('ajv/lib/refs/json-schema-draft-06.json')
    )

    return schemaValidator.validate(confsSchema, confs)
  }

  addDerivedFields(confs) {
    var confsWithDerivedFields = _.map(confs, function(conf) {
      conf.node['numberOfMen'] =
        conf.node.totalSpeakers - conf.node.numberOfWomen
      conf.node['diversityPercentage'] =
        conf.node.numberOfWomen / conf.node.totalSpeakers

      return conf
    })

    return this.sortConfs(confsWithDerivedFields)
  }

  sortConfs(confs) {
    const ascendedSortConfs = _.sortBy(confs, function(conf) {
      return conf.node.diversityPercentage
    })

    return ascendedSortConfs.reverse()
  }

  assignRanks(confs) {
    const sortedConfs = this.sortConfs(confs)

    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    const ranks = sortedConfs.map(function(conf1) {
      return (
        sortedConfs.findIndex(
          conf2 => new ConfListHelper().genderDiversityFormatter(
              conf2.node.diversityPercentage
            ) ===
            new ConfListHelper().genderDiversityFormatter(
              conf1.node.diversityPercentage
            )
        ) + 1
      )
    })
    for (var j = 0; j < sortedConfs.length; j += 1) {
      if (j >= 1 && ranks[j] == ranks[j - 1]) {
        sortedConfs[j].node['index'] = ''
      } else {
        sortedConfs[j].node['index'] = ranks[j]
      }
    }

    return sortedConfs
  }

  augmentConfData(confs) {
    return this.assignRanks(this.addDerivedFields(confs))
  }
}

module.exports = AppHelper
