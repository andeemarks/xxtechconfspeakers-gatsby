var _ = require('underscore')
var numeral = require('numeral')

class ChartDataFormatter {
  constructor() {}

  addChartPoints(sortedConfs) {
    return _.map(sortedConfs, function(currentConf, index) {
      const conf = currentConf['node']
      const diversityPercentage = conf['diversityPercentage']

      return {
        color: Math.floor(diversityPercentage * 10),
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

  createCohortLine(from, to, cohortValue) {
    return [{ x: from, y: cohortValue }, { x: to, y: cohortValue }]
  }

  format(confs) {
    const sortedConfs = _.sortBy(confs, function(conf) {
      return conf.node.confDate
    })

    const chartData = this.addChartPoints(sortedConfs)
    const leftMostX = chartData[0].x
    const rightMostX = chartData[chartData.length - 1].x

    return {
      details: chartData,
      seventyLine: this.createCohortLine(leftMostX, rightMostX, 0.7),
      sixtyLine: this.createCohortLine(leftMostX, rightMostX, 0.6),
      fiftyLine: this.createCohortLine(leftMostX, rightMostX, 0.5),
      fortyLine: this.createCohortLine(leftMostX, rightMostX, 0.4),
      thirtyLine: this.createCohortLine(leftMostX, rightMostX, 0.3),
      twentyLine: this.createCohortLine(leftMostX, rightMostX, 0.2),
      tenLine: this.createCohortLine(leftMostX, rightMostX, 0.1),
    }
  }
}

module.exports = ChartDataFormatter
