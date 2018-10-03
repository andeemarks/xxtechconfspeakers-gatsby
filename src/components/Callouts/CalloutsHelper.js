var _ = require('underscore')

class CalloutsHelper {
  constructor() {}

  sortByConfDate(conferences) {
    const sortedConfs = _.sortBy(conferences, function(conf) {
      return conf.node.confDate
    })
    return _.map(sortedConfs, function(conf, index) {
      return [
        index + 1,
        conf.node.confDate,
        conf.node.diversityPercentage * 100,
      ]
    })
  }

  sortByYear(conferences, confName) {
    return { [confName]: _.sortBy(conferences, 'year') }
  }

  confFromCurrentYear(conf) {
    return conf.node.year == new Date().getFullYear()
  }

  diversityAccumulator(accumulator, conf) {
    return accumulator + conf.node.diversityPercentage
  }

  calculateAverageDiversity(confs) {
    return confs.reduce(this.diversityAccumulator, 0) / confs.length
  }

  findConfsForCurrentYear(confs) {
    return confs.filter(this.confFromCurrentYear)
  }

  findMostRecentlyAddedConference(confs) {
    return confs.sort(this.dateAddedSorter)[0]
  }

  diversitySorter(confA, confB) {
    if (confA.diversityPercentage < confB.diversityPercentage) {
      return 1
    }
    if (confA.diversityPercentage > confB.diversityPercentage) {
      return -1
    }

    return 0
  }

  dateAddedSorter(confA, confB) {
    if (confA.node.dateAdded < confB.node.dateAdded) {
      return 1
    }
    if (confA.node.dateAdded > confB.node.dateAdded) {
      return -1
    }

    return 0
  }
}

module.exports = CalloutsHelper
