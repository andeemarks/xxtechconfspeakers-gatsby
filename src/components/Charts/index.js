import React from 'react'
import { Component } from 'react'
import cx from 'classnames'
import co from '../Callouts/Callouts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import {
  FlexibleWidthXYPlot,
  VerticalBarSeries,
  LineSeries,
  Hint,
} from 'react-vis'
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

    const averageDiversity = new CalloutsHelper().calculateAverageDiversity(
      props.confData
    )

    this.state = {
      hoverConf: false,
      confData: props.confData,
      averageDiversity: numeral(averageDiversity).format('0%'),
      chartData: new ChartDataFormatter().format(
        props.confData,
        averageDiversity
      ),
    }
  }

  render() {
    return (
      <div className={cx('row', co.container)}>
        <div className="col-sm-12">
          <div className={co.title}>
            Diversity over time (dotted line = average diversity of{' '}
            {this.state.averageDiversity})
          </div>
          <div className={co.pop}>
            <FlexibleWidthXYPlot
              onMouseLeave={() => this.setState({ value: false })}
              height={300}
              colorType="linear"
              colorDomain={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              colorRange={colorPalette}
            >
              <VerticalBarSeries
                data={this.state.chartData.details}
                onValueClick={(conf, event) => {
                  window.location.href = '#' + conf.y
                }}
                onNearestX={(conf, event) => {
                  this.setState({ hoverConf: conf })
                }}
              />
              <LineSeries
                style={{ strokeDasharray: '2 2' }}
                data={this.state.chartData.average}
              />
              {this.state.hoverConf && (
                <Hint
                  value={this.state.hoverConf}
                  align={{
                    horizontal: Hint.ALIGN.RIGHT,
                    vertical: Hint.ALIGN.BOTTOM_EDGE,
                  }}
                >
                  <div style={{ background: 'black' }}>
                    <h3>
                      {this.state.hoverConf.name} ({this.state.hoverConf.year})
                    </h3>
                    <p>
                      {this.state.hoverConf.location}
                      <br />
                      {this.state.hoverConf.diversityPercentage}
                    </p>
                  </div>
                </Hint>
              )}
            </FlexibleWidthXYPlot>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts
