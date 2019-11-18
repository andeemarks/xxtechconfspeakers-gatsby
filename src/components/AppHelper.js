const numeral = require('numeral')
const _ = require('underscore')

class AppHelper {
  addDerivedFields(confs) {
    const confsWithDerivedFields = _.map(confs, function(currentConf) {
      const conf = currentConf.node
      conf['numberOfMen'] = conf.totalSpeakers - conf.numberOfWomen
      conf['diversityPercentage'] = conf.numberOfWomen / conf.totalSpeakers

      return currentConf
    })

    return confsWithDerivedFields
  }

  sortByDiversityPercentage(confs) {
    const sortedConfs = _.sortBy(confs, function(conf) {
      return conf.node.diversityPercentage
    })

    return sortedConfs.reverse()
  }

  isRankUnchanged(ranks, i) {
    return i >= 1 && ranks[i] == ranks[i - 1]
  }

  indexConfsBasedOnRank(confs, ranks) {
    for (let i = 0; i < confs.length; i += 1) {
      if (this.isRankUnchanged(ranks, i)) {
        confs[i].node['index'] = ''
      } else {
        confs[i].node['index'] = ranks[i]
      }
    }

    return confs
  }

  assignRanks(confs) {
    const sortedConfs = this.sortByDiversityPercentage(confs)
    /* eslint-disable implicit-arrow-linebreak */
    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    const ranks = sortedConfs.map(function(conf1) {
      return (
        sortedConfs.findIndex(
          conf2 =>
            numeral(conf2.node.diversityPercentage).format('0%') ===
            numeral(conf1.node.diversityPercentage).format('0%')
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
