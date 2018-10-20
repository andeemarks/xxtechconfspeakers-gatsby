var _ = require('underscore')

const diversityStyles = {
  0: 'red',
  1: 'fuchsia',
  2: 'orange',
  3: 'blue',
  4: 'green',
  5: 'white',
  6: 'white',
  7: 'white',
  8: 'white',
  9: 'white',
}

class ChartDataFormatter {
  constructor() {}

  format(chartData) {
    const sortedConfs = _.sortBy(chartData, function(conf) {
      return conf.node.confDate
    })

    const formattedData = _.map(sortedConfs, function(conf, index) {
      const diversityPercentage = conf['node']['diversityPercentage']
      const percentageCohort = Math.floor(diversityPercentage * 10)

      return {
        color: percentageCohort,
        y0: 0.5,
        y: diversityPercentage,
        x: index,
      }
    })

    return formattedData
  }
}

module.exports = ChartDataFormatter
