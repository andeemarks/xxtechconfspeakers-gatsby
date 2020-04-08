/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/
import test from 'ava'
import {
  ChartDataFormatter,
  Conference,
} from '../../../src/components/Charts/ChartDataFormatter'

let formatter: ChartDataFormatter
let confData: Array<Conference>

test.before((_) => {
  formatter = new ChartDataFormatter()
  confData = [
    {
      node: {
        confDate: 'foo',
        name: 'name',
        year: 2001,
        diversityPercentage: 0.324,
        location: 'Paris, Texas',
        dateAdded: '2019',
      },
    },
  ]
})

test('#format needs at least one conf to format', (t) => {
  t.throws(() => {
    formatter.format([])
  }, "Cannot read property 'x' of undefined")
})

test('#format returns datapoint for each conf', (t) => {
  const confData = [
    {
      node: {
        confDate: 'foo',
        diversityPercentage: 0.25,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: 'bar',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
  ]
  const { details } = formatter.format(confData)

  t.is(confData.length, details.length)
})

test('#format returns a colleciton of conf-specific datapoints sorted by confDate', (t) => {
  const confData = [
    {
      node: {
        confDate: '31-12-2018',
        diversityPercentage: 0.25,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '01-01-2000',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
  ]
  const { details } = formatter.format(confData)

  t.is(details[0].confDate, '01-01-2000')
  t.is(details[1].confDate, '31-12-2018')
})

test('#format result includes the confDate', (t) => {
  const { details } = formatter.format(confData)

  t.is(details[0].confDate, 'foo')
})

test('#format result includes the name', (t) => {
  const { details } = formatter.format(confData)

  t.is(details[0].name, 'name')
})

test('#format result includes the year', (t) => {
  const { details } = formatter.format(confData)

  t.is(details[0].year, 2001)
})

test('#format result includes the location', (t) => {
  const { details } = formatter.format(confData)

  t.is(details[0].location, 'Paris, Texas')
})

test('#format result maps the diversityPercentage to y', (t) => {
  const { details } = formatter.format(confData)

  t.is(details[0].y, 0.324)
})

test('#format result maps the totalSpeakers to size', (t) => {
  confData[0].node.totalSpeakers = 0.324
  const { details } = formatter.format(confData)

  t.is(details[0].size, 0.324)
})

test('#format result maps the diversityPercentage to a formatted %age with no precision', (t) => {
  confData[0].node.diversityPercentage = 0.324
  const { details } = formatter.format(confData)

  t.is(details[0].diversityPercentage, '32%')
})

test('#format result uses diversityPercentage as an index for color', (t) => {
  confData[0].node.diversityPercentage = 0
  let formattedData = formatter.format(confData)

  t.is(formattedData.details[0].color, 0)

  confData[0].node.diversityPercentage = 0.5
  formattedData = formatter.format(confData)

  t.is(formattedData.details[0].color, 5)

  confData[0].node.diversityPercentage = 0.8342244
  formattedData = formatter.format(confData)

  t.is(formattedData.details[0].color, 8)
})

test('#format generates an array of markers to first conf in each year', (t) => {
  const confData = [
    {
      node: {
        confDate: '2015-12-01',
        diversityPercentage: 0.25,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2016-12-01',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2017-12-01',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2018-12-01',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
  ]

  const { yearIndices } = formatter.format(confData)

  t.deepEqual(yearIndices, [0, 366, 366 + 365, 366 + 365 + 365])
})

test('#format maps x to the difference in days between confDate', (t) => {
  const confData = [
    {
      node: {
        confDate: '2018-12-01',
        diversityPercentage: 0.25,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2018-12-02',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2018-12-11',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
    {
      node: {
        confDate: '2019-12-01',
        diversityPercentage: 0.6666,
        dateAdded: '2019',
      },
    },
  ]

  const { details } = formatter.format(confData)

  t.is(details[0].x, 0)
  t.is(details[1].x, 1)
  t.is(details[2].x, 10)
  t.is(details[3].x, 365)
})
