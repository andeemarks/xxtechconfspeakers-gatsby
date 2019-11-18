import numeral from 'numeral'
import _ from 'underscore'

interface Conference {
  node: {
    totalSpeakers: number
    numberOfWomen: number
    numberOfMen?: number
    diversityPercentage?: number
    index?: number | string
  }
}

export class AppHelper {
  addDerivedFields(confs: Array<Conference>) {
    const confsWithDerivedFields = _.map(confs, function(
      currentConf: Conference
    ) {
      const conf = currentConf.node
      conf['numberOfMen'] = conf.totalSpeakers - conf.numberOfWomen
      conf['diversityPercentage'] = conf.numberOfWomen / conf.totalSpeakers

      return currentConf
    })

    return confsWithDerivedFields
  }

  sortByDiversityPercentage(confs: Array<Conference>): Array<Conference> {
    const sortedConfs = _.sortBy(confs, function(conf: Conference) {
      return conf.node.diversityPercentage
    })

    return sortedConfs.reverse()
  }

  isRankUnchanged(ranks: Array<string | number>, i: number) {
    return i >= 1 && ranks[i] == ranks[i - 1]
  }

  indexConfsBasedOnRank(
    confs: Array<Conference>,
    ranks: Array<string | number>
  ) {
    for (let i = 0; i < confs.length; i += 1) {
      if (this.isRankUnchanged(ranks, i)) {
        confs[i].node.index = ''
      } else {
        confs[i].node.index = ranks[i]
      }
    }

    return confs
  }

  assignRanks(confs: Array<Conference>): Array<Conference> {
    const sortedConfs = this.sortByDiversityPercentage(confs)
    /* eslint-disable implicit-arrow-linebreak */
    // rank generation solution from https://stackoverflow.com/questions/14834571/ranking-array-elements
    const ranks = sortedConfs.map(function(conf1: Conference) {
      return (
        sortedConfs.findIndex(
          (conf2: Conference) =>
            numeral(conf2.node.diversityPercentage).format('0%') ===
            numeral(conf1.node.diversityPercentage).format('0%')
        ) + 1
      )
    })
    /* eslint-enable implicit-arrow-linebreak */

    return this.indexConfsBasedOnRank(sortedConfs, ranks)
  }

  augmentConfData(confs: Array<Conference>): Array<Conference> {
    return this.assignRanks(this.addDerivedFields(confs))
  }
}
