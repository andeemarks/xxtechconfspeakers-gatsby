import React from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import { XYPlot, VerticalBarSeries } from 'react-vis'
import ChartDataFormatter from './ChartDataFormatter'

var numeral = require('numeral')

const Charts = ({ confData }) => {
  const helper = new CalloutsHelper()

  const averageDiversity = helper.calculateAverageDiversity(confData)
  const chartData = new ChartDataFormatter().format(confData)

  return (
    <div className={cx('row', co.container)}>
      <div className="col-sm-12">
        <div className={co.title}>
          Diversity over time (dotted line = average diversity of{' '}
          {numeral(averageDiversity).format('0%')})
        </div>
        <div className={co.pop}>
          <XYPlot height={300} width={900}>
            <VerticalBarSeries data={chartData} />
          </XYPlot>
        </div>
      </div>
    </div>
  )
}

export default Charts
