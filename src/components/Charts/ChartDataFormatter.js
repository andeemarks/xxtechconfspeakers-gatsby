var _ = require('underscore')
var numeral = require('numeral')

class ChartDataFormatter {
  constructor() {}

  calculateConfDetails(sortedConfs) {
    return _.map(sortedConfs, function(currentConf, index) {
      const conf = currentConf['node']
      const diversityPercentage = conf['diversityPercentage']

      return {
        color: Math.floor(diversityPercentage * 10),
        y0: 0.5,
        y: diversityPercentage,
        diversityPercentage: numeral(diversityPercentage).format('0%'),
        x: index,
        size: conf['totalSpeakers'],
        confDate: conf['confDate'],
        name: conf['name'],
        year: conf['year'],
        location: conf['location'],
      }
    })
  }

  createCohortLine(startX, finishX, cohortValue) {
    return [{ x: startX, y: cohortValue }, { x: finishX, y: cohortValue }]
  }

  format(chartData, averageDiversity) {
    const sortedConfs = _.sortBy(chartData, function(conf) {
      return conf.node.confDate
    })

    const confData = this.calculateConfDetails(sortedConfs)
    const leftMostX = confData[0].x
    const rightMostX = confData[confData.length - 1].x

    return {
      details: confData,
      seventyLine: this.createCohortLine(leftMostX, rightMostX, 0.7),
      sixtyLine: this.createCohortLine(leftMostX, rightMostX, 0.6),
      fiftyLine: this.createCohortLine(leftMostX, rightMostX, 0.5),
      fortyLine: this.createCohortLine(leftMostX, rightMostX, 0.4),
      thirtyLine: this.createCohortLine(leftMostX, rightMostX, 0.3),
      twentyLine: this.createCohortLine(leftMostX, rightMostX, 0.2),
      tenLine: this.createCohortLine(leftMostX, rightMostX, 0.1),
      average: this.createCohortLine(leftMostX, rightMostX, averageDiversity),
    }
  }
}

module.exports = ChartDataFormatter
