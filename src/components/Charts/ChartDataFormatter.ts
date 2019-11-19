import _ from 'underscore'
import numeral from 'numeral'

export interface Conference {
  node: {
    totalSpeakers?: number
    numberOfWomen?: number
    numberOfMen?: number
    diversityPercentage: number
    index?: number | string
    confDate: string
    name?: string
    year?: number
    location?: string
  }
}

interface ChartData {
  details: Array<ChartPoint>
  yearIndices: Array<number | string>
  yearMarkers: Array<string>
  seventyLine: Array<CohortPoint>
  sixtyLine: Array<CohortPoint>
  fiftyLine: Array<CohortPoint>
  fortyLine: Array<CohortPoint>
  thirtyLine: Array<CohortPoint>
  twentyLine: Array<CohortPoint>
  tenLine: Array<CohortPoint>
}

interface CohortPoint {
  x: number
  y: number
}

interface ChartPoint {
  color: number
  y: number
  diversityPercentage: string
  x: number
  size?: number
  confDate: string
  name?: string
  year?: number
  location?: string
}

export class ChartDataFormatter {
  addChartPoints(sortedConfs: Array<Conference>): Array<ChartPoint> {
    return _.map(sortedConfs, function(currentConf) {
      const conf = currentConf.node
      const diversityPercentage = conf.diversityPercentage
      const firstConfDate = new Date(sortedConfs[0].node.confDate)
      const thisConfDate = new Date(conf.confDate)
      const daysSinceFirstConf =
        Math.abs(thisConfDate.getTime() - firstConfDate.getTime()) /
        1000 /
        60 /
        60 /
        24

      return {
        color: Math.floor(diversityPercentage * 10),
        y: diversityPercentage,
        diversityPercentage: numeral(diversityPercentage).format('0%'),
        x: daysSinceFirstConf,
        size: conf.totalSpeakers,
        confDate: conf.confDate,
        name: conf.name,
        year: conf.year,
        location: conf.location,
      }
    })
  }

  createCohortLine(
    from: number,
    to: number,
    cohortValue: number
  ): Array<CohortPoint> {
    return [
      { x: from, y: cohortValue },
      { x: to, y: cohortValue },
    ]
  }

  findYearControlBreakIndices(sortedConfs: Array<Conference>) {
    const indices = [{ confDate: sortedConfs[0].node.confDate, index: 0 }]
    sortedConfs.filter(function(conf, index) {
      if (index == 0) {
        return
      }

      const thisConfDate = new Date(conf.node.confDate)
      const lastConfDate = new Date(sortedConfs[index - 1].node.confDate)
      if (thisConfDate.getFullYear() != lastConfDate.getFullYear()) {
        const daysSinceFirstConf = Math.trunc(
          Math.abs(
            thisConfDate.getTime() -
              new Date(indices[indices.length - 1].confDate).getTime()
          ) /
            1000 /
            60 /
            60 /
            24
        )
        indices.push({
          confDate: thisConfDate.toDateString(),
          index: indices[indices.length - 1].index + daysSinceFirstConf,
        })
      }
    })

    return indices
  }

  format(confs: Array<Conference>): ChartData {
    const sortedConfs = _.sortBy(confs, function(conf) {
      return conf.node.confDate
    })

    const chartData = this.addChartPoints(sortedConfs)
    const leftMostX = chartData[0].x
    const rightMostX = chartData[chartData.length - 1].x

    return {
      details: chartData,
      yearIndices: _.pluck(
        this.findYearControlBreakIndices(sortedConfs),
        'index'
      ),
      yearMarkers: _.pluck(
        this.findYearControlBreakIndices(sortedConfs),
        'confDate'
      ),
      seventyLine: this.createCohortLine(leftMostX, rightMostX, 0.7),
      sixtyLine: this.createCohortLine(leftMostX, rightMostX, 0.6),
      fiftyLine: this.createCohortLine(leftMostX, rightMostX, 0.5),
      fortyLine: this.createCohortLine(leftMostX, rightMostX, 0.4),
      thirtyLine: this.createCohortLine(leftMostX, rightMostX, 0.3),
      twentyLine: this.createCohortLine(leftMostX, rightMostX, 0.2),
      tenLine: this.createCohortLine(leftMostX, rightMostX, 0.1),
    }
  }
}
