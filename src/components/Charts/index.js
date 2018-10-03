import React from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import { Chart, Axis, Series, Tooltip, Cursor, Bar } from 'react-charts'
var numeral = require('numeral')

const Charts = ({ confData }) => {
  const helper = new CalloutsHelper()

  const data = helper.sortByConfDate(confData)
  const averageDiversity = helper.calculateAverageDiversity(confData)

  return (
    <div className={cx('row', co.container)}>
      <div className="col-sm-12">
        <div className={co.title}>
          Diversity over time (dotted line = average diversity of{' '}
          {numeral(averageDiversity).format('0%')})
        </div>
        <div className={co.pop} style={{ height: '200px' }}>
          <Chart
            data={[data]}
            getLabel={'Conferences'}
            getSecondary={datum => datum[2]}
            dark
          >
            <Axis primary type="ordinal" />
            <Axis type="linear" min={0} max={100} />
            <Series type={Bar} />
            <Cursor primary />
            <Cursor />
            <Tooltip />
          </Chart>
        </div>
      </div>
    </div>
  )
}

export default Charts
