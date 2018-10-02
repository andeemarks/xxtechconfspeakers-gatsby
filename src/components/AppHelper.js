/* global module */

const _ = require('underscore')
const ConfListFormatter = require('./ConfList/ConfListFormatter')

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
    var confsWithDerivedFields = _.map(confs, function(currentConf) {
      const conf = currentConf.node
      conf['numberOfMen'] = conf.totalSpeakers - conf.numberOfWomen
      conf['diversityPercentage'] = conf.numberOfWomen / conf.totalSpeakers

      return currentConf
    })

    return this.sortConfs(confsWithDerivedFields)
  }

  sortConfs(confs) {
    // console.log(confs)
    const ascendedSortConfs = _.sortBy(confs, function(conf) {
      return conf.node.diversityPercentage
    })

    // console.log(ascendedSortConfs)

    return ascendedSortConfs.reverse()
  }

  isRankUnchanged(ranks, i) {
    return i >= 1 && ranks[i] == ranks[i - 1]
  }

  indexConfsBasedOnRank(confs, ranks) {
    for (var i = 0; i < confs.length; i += 1) {
      if (this.isRankUnchanged(ranks, i)) {
        confs[i].node['index'] = ''
      } else {
        confs[i].node['index'] = ranks[i]
      }
    }

    return confs
  }

  assignRanks(confs) {
    const sortedConfs = this.sortConfs(confs)

    /* eslint-disable implicit-arrow-linebreak */
    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    const ranks = sortedConfs.map(function(conf1) {
      return (
        sortedConfs.findIndex(
          conf2 =>
            new ConfListFormatter().genderDiversityFormatter(
              conf2.node.diversityPercentage
            ) ===
            new ConfListFormatter().genderDiversityFormatter(
              conf1.node.diversityPercentage
            )
        ) + 1
      )
    })
    /* eslint-enable implicit-arrow-linebreak */

    return this.indexConfsBasedOnRank(sortedConfs, ranks)
  }

  augmentConfData(confs) {
    return this.assignRanks(this.addDerivedFields(confs))
  }
}

module.exports = AppHelper
