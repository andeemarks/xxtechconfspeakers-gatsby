import React from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import { XYPlot, VerticalBarSeries } from 'react-vis'
import ChartDataFormatter from './ChartDataFormatter'

var numeral = require('numeral')

const colorPalette = [
  'red',
  'fuchsia',
  'orange',
  'blue',
  'green',
  'white',
  'white',
  'white',
  'white',
  'white',
]

const Charts = ({ confData }) => {
  const averageDiversity = new CalloutsHelper().calculateAverageDiversity(
    confData
  )
  const chartData = new ChartDataFormatter().format(confData)

  return (
    <div className={cx('row', co.container)}>
      <div className="col-sm-12">
        <div className={co.title}>
          Diversity over time (dotted line = average diversity of{' '}
          {numeral(averageDiversity).format('0%')})
        </div>
        <div className={co.pop}>
          <XYPlot
            height={300}
            width={900}
            colorType="linear"
            colorDomain={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
            colorRange={colorPalette}
          >
            <VerticalBarSeries
              data={chartData}
              onNearestX={(datapoint, event) => {
                console.log(datapoint)
              }}
            />
          </XYPlot>
        </div>
      </div>
    </div>
  )
}

export default Charts
