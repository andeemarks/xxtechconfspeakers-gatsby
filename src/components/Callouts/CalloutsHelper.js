class CalloutsHelper {
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
