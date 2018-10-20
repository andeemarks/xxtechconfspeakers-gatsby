var _ = require('underscore')
var numeral = require('numeral')

class ChartDataFormatter {
  constructor() {}

  format(chartData, averageDiversity) {
    const sortedConfs = _.sortBy(chartData, function(conf) {
      return conf.node.confDate
    })

    const detailedConfData = _.map(sortedConfs, function(conf, index) {
      const diversityPercentage = conf['node']['diversityPercentage']
      const percentageCohort = Math.floor(diversityPercentage * 10)

      return {
        color: percentageCohort,
        y0: 0.5,
        y: diversityPercentage,
        diversityPercentage: numeral(diversityPercentage).format('0%'),
        x: index,
        confDate: conf['node']['confDate'],
        name: conf['node']['name'],
        year: conf['node']['year'],
        location: conf['node']['location'],
      }
    })

    const averageData = [
      { x: detailedConfData[0].x, y: averageDiversity },
      {
        x: detailedConfData[detailedConfData.length - 1].x,
        y: averageDiversity,
      },
    ]

    return { details: detailedConfData, average: averageData }
  }
}

module.exports = ChartDataFormatter
