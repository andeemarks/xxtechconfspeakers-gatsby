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

  calculateConfDetails(confs) {
    return _.map(confs, function(currentConf, index) {
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

    const detailedConfData = this.calculateConfDetails(sortedConfs)

    return {
      details: detailedConfData,
      average: this.calculateAverageDiversitySeries(
        detailedConfData[0].x,
        detailedConfData[detailedConfData.length - 1].x,
        averageDiversity
      ),
    }
  }
}

module.exports = ChartDataFormatter
