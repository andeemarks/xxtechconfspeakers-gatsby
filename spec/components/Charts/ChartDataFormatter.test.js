import test from 'ava'

var ChartDataFormatter = require('../../../src/components/Charts/ChartDataFormatter')
var formatter
var chartData

test.before(t => {
  formatter = new ChartDataFormatter()
  chartData = [
    {
      node: {
        confDate: 'foo',
        name: 'name',
        year: 2001,
        diversityPercentage: 0.324,
        location: 'Paris, Texas',
      },
    },
  ]
})

test('#format needs at least one conf to format', t => {
  t.throws(() => {
    formatter.format([], 0)
  }, "Cannot read property 'x' of undefined")
})

test('#format returns a collection of constant average datapoints matching the chart data', t => {
  const average = 0.25
  const chartData = [
    {
      node: {
        confDate: 'foo',
      },
    },
    {
      node: {
        confDate: 'bar',
      },
    },
  ]
  const formattedData = formatter.format(chartData, average)

  t.deepEqual(formattedData.average, [
    {
      x: 0,
      y: average,
    },
    {
      x: 1,
      y: average,
    },
  ])
})

test('#format returns a collection of conf-specific datapoints matching the chart data', t => {
  const chartData = [
    {
      node: {
        confDate: 'foo',
        diversityPercentage: 0.25,
      },
    },
    {
      node: {
        confDate: 'bar',
        diversityPercentage: 0.6666,
      },
    },
  ]
  const formattedData = formatter.format(chartData, 0.25)

  t.is(chartData.length, formattedData.details.length)
})

test('#format returns a colleciton of conf-specific datapoints sorted by confDate', t => {
  const chartData = [
    {
      node: {
        confDate: '31-12-2018',
        diversityPercentage: 0.25,
      },
    },
    {
      node: {
        confDate: '01-01-2000',
        diversityPercentage: 0.6666,
      },
    },
  ]
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].confDate, '01-01-2000')
  t.is(formattedData.details[1].confDate, '31-12-2018')
})

test('#format result includes the confDate', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].confDate, 'foo')
})

test('#format result includes the name', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].name, 'name')
})

test('#format result includes the year', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].year, 2001)
})

test('#format result includes the location', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].location, 'Paris, Texas')
})

test('#format result maps the diversityPercentage to y', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].y, 0.324)
})

test('#format result maps the diversityPercentage to a formatted %age with no precision', t => {
  chartData[0].node.diversityPercentage = 0.324
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].diversityPercentage, '32%')
})

test('#format result uses diversityPercentage as an index for color', t => {
  chartData[0].node.diversityPercentage = 0
  var formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].color, 0)

  chartData[0].node.diversityPercentage = 0.5
  formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].color, 5)

  chartData[0].node.diversityPercentage = 0.8342244
  formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].color, 8)
})

test('#format maps x to the sequential index of the chart data sorted by confDate', t => {
  const formattedData = formatter.format(chartData, 0.25)

  t.is(formattedData.details[0].x, 0)
})
