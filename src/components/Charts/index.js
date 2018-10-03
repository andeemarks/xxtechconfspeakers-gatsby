import React from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import {
  Sparklines,
  SparklinesBars,
  SparklinesReferenceLine,
} from 'react-sparklines'
var numeral = require('numeral')

const Charts = ({ confData }) => {
  const helper = new CalloutsHelper()

  const sparklineData = helper.sortByConfDate(confData)
  const averageDiversity = helper.calculateAverageDiversity(confData)

  return (
    <div className={cx('row', co.container)}>
      <div className="col-sm-12">
        <div className={co.title}>
          Diversity over time (dotted line = average diversity of{' '}
          {numeral(averageDiversity).format('0%')})
        </div>
        <div className={co.pop}>
          <Sparklines color="white" max={1} margin={0} data={sparklineData}>
            <SparklinesBars color="white" />
            <SparklinesReferenceLine
              type="avg"
              style={{ stroke: 'white', strokeDasharray: '1, 1' }}
            />
          </Sparklines>
        </div>
      </div>
    </div>
  )
}

export default Charts
