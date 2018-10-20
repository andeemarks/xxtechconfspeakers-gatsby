import React from 'react'
import { Component } from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import { XYPlot, VerticalBarSeries, Crosshair } from 'react-vis'
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

class Charts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: false,
      confData: props.confData,
    }
  }

  render() {
    const averageDiversity = new CalloutsHelper().calculateAverageDiversity(
      this.state.confData
    )

    const chartData = new ChartDataFormatter().format(this.state.confData)

    return (
      <div className={cx('row', co.container)}>
        <div className="col-sm-12">
          <div className={co.title}>
            Diversity over time (dotted line = average diversity of{' '}
            {numeral(averageDiversity).format('0%')})
          </div>
          <div className={co.pop}>
            <XYPlot
              onMouseLeave={() => this.setState({ value: false })}
              height={300}
              width={900}
              colorType="linear"
              colorDomain={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              colorRange={colorPalette}
            >
              <VerticalBarSeries
                data={chartData}
                onValueClick={(conf, event) => {
                  window.location.href = '#' + conf.y
                }}
                onNearestX={(conf, event) => {
                  this.setState({ value: conf })
                }}
              />
              {this.state.value && <Crosshair values={[this.state.value]} />}
            </XYPlot>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts
