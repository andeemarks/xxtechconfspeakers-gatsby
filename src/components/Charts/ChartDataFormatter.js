var _ = require('underscore')
var numeral = require('numeral')

class ChartDataFormatter {
  constructor() {}

  calculateAverageDiversitySeries(startX, finishX, averageDiversity) {
    return [
      { x: startX, y: averageDiversity },
      { x: finishX, y: averageDiversity },
    ]
  }

  calculateCohortSeries(startX, finishX, cohortValue) {
    return [{ x: startX, y: cohortValue }, { x: finishX, y: cohortValue }]
  }

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

  format(chartData, averageDiversity) {
    const sortedConfs = _.sortBy(chartData, function(conf) {
      return conf.node.confDate
    })

    const confData = this.calculateConfDetails(sortedConfs)
    const leftMostX = confData[0].x
    const rightMostX = confData[confData.length - 1].x

    return {
      details: confData,
      fiftyLine: this.calculateCohortSeries(leftMostX, rightMostX, 0.5),
      fortyLine: this.calculateCohortSeries(leftMostX, rightMostX, 0.4),
      thirtyLine: this.calculateCohortSeries(leftMostX, rightMostX, 0.3),
      twentyLine: this.calculateCohortSeries(leftMostX, rightMostX, 0.2),
      tenLine: this.calculateCohortSeries(leftMostX, rightMostX, 0.1),
      average: this.calculateAverageDiversitySeries(
        leftMostX,
        rightMostX,
        averageDiversity
      ),
    }
  }
}

module.exports = ChartDataFormatter
