var _ = require('underscore')

class ChartDataFormatter {
  constructor() {}

  format(chartData) {
    const sortedConfs = _.sortBy(chartData, function(conf) {
      return conf.node.confDate
    })

    const formattedData = _.map(sortedConfs, function(conf, index) {
      return { y0: 0.5, y: conf['node']['diversityPercentage'], x: index }
    })

    // console.log(formattedData);

    return formattedData
  }
}

module.exports = ChartDataFormatter
