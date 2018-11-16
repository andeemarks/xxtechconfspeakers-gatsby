import React from 'react'
import { Component } from 'react'
import cx from 'classnames'
import s from './Charts.module.css'
import CalloutsHelper from '../Callouts/CalloutsHelper'
import {
  FlexibleWidthXYPlot,
  LineSeries,
  MarkSeries,
  Hint,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
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

const axisStyle = {
  ticks: {
    fontSize: '10px',
    color: '#f00',
  },
}

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
      <div className={cx('row', s.container)}>
        <div className="col-sm-12">
          <div className={s.title}>Diversity over time</div>
          <div className={s.pop}>
            <FlexibleWidthXYPlot
              onMouseLeave={() => this.setState({ value: false })}
              height={500}
              colorType="linear"
              colorDomain={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
              colorRange={colorPalette}
            >
              {/* <LineSeries
                style={{ strokeDasharray: '2 2 ' }}
                data={this.state.chartData.average}
              /> */}
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.fiftyLine}
              />
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.fortyLine}
              />
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.thirtyLine}
              />
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.twentyLine}
              />
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.tenLine}
              />
              <VerticalGridLines />
              <HorizontalGridLines tickTotal={5} />
              <YAxis
                style={axisStyle}
                tickValues={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7]}
                tickFormat={v => numeral(v).format('0%')}
              />
              <MarkSeries
                data={this.state.chartData.details}
                onNearestX={(conf, event) => {
                  this.setState({ hoverConf: conf })
                }}
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
