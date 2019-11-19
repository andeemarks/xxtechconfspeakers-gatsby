import React, { Component } from 'react'
import cx from 'classnames'
import s from './Charts.module.css'
import {
  FlexibleWidthXYPlot,
  LineSeries,
  MarkSeries,
  Hint,
  YAxis,
  XAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis'
import { ChartDataFormatter } from './ChartDataFormatter'

const numeral = require('numeral')

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

const hintStyle = {
  fontSize: 10,
  lineHeight: '100%',
  textAlign: 'left',
  borderColor: 'white',
  borderWidth: '1px',
  borderTopStyle: 'dotted',
  borderLeftStyle: 'dotted',
  title: { color: 'white', fontWeight: 'bold' },
  content: { backgroundColor: 'black', padding: '3px' },
  value: { color: 'white', fontStyle: 'italic' },
}

class Charts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hoverConf: false,
      confData: props.confData,
      chartData: new ChartDataFormatter().format(props.confData),
    }
  }

  yearMarkerFormatter(xValue, index) {
    // TODO: This is a nasty hack until I work out how to access this.state.chartData.yearMarkers here
    return 2010 + index
  }

  hintFormatter(conf) {
    return [
      {
        title: 'Name',
        value: conf.name + ' ' + conf.year + ' - ' + conf.location,
      },
      {
        title: 'Diversity',
        value:
          conf.diversityPercentage + ' of ' + conf.size + ' total speakers',
      },
    ]
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
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.seventyLine}
              />
              <LineSeries
                color="#ddd"
                opacity={0.1}
                data={this.state.chartData.sixtyLine}
              />
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
              <XAxis
                style={axisStyle}
                tickFormat={this.yearMarkerFormatter}
                tickValues={this.state.chartData.yearIndices}
              />
              <MarkSeries
                data={this.state.chartData.details}
                animation
                onNearestXY={conf => {
                  this.setState({ hoverConf: conf })
                }}
              />
              {this.state.hoverConf && (
                <Hint
                  value={this.state.hoverConf}
                  style={hintStyle}
                  format={this.hintFormatter}
                />
              )}
            </FlexibleWidthXYPlot>
          </div>
        </div>
      </div>
    )
  }
}

export default Charts
