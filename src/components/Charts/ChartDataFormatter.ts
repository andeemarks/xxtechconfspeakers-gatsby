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
    dateAdded: string
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
  daysBetweenDates(laterDate: Date, earlierDate: Date): number {
    return Math.trunc(
      Math.abs(laterDate.getTime() - earlierDate.getTime()) /
        1000 /
        60 /
        60 /
        24
    )
  }

  createChartPoint(conf: Conference, daysSinceFirstConf: number): ChartPoint {
    return {
      color: Math.floor(conf.node.diversityPercentage * 10),
      y: conf.node.diversityPercentage,
      diversityPercentage: numeral(conf.node.diversityPercentage).format('0%'),
      x: daysSinceFirstConf,
      size: conf.node.totalSpeakers,
      confDate: conf.node.confDate,
      name: conf.node.name,
      year: conf.node.year,
      location: conf.node.location,
    }
  }

  createChartPoints(sortedConfs: Array<Conference>): Array<ChartPoint> {
    return _.map(sortedConfs, currentConf => {
      const firstConfDate = new Date(sortedConfs[0].node.confDate)

      const conf = currentConf.node
      const thisConfDate = new Date(conf.confDate)
      const daysSinceFirstConf = this.daysBetweenDates(
        thisConfDate,
        firstConfDate
      )

      return this.createChartPoint(currentConf, daysSinceFirstConf)
    })
  }

  createCohortLine = (
    from: number,
    to: number,
    cohortValue: number
  ): Array<CohortPoint> => {
    return [
      { x: from, y: cohortValue },
      { x: to, y: cohortValue },
    ]
  }

  findFirstConfForEachYear = (sortedConfs: Array<Conference>) => {
    const firstConfsForYear = [
      { confDate: sortedConfs[0].node.confDate, index: 0 },
    ]
    sortedConfs.filter((conf, index) => {
      if (index == 0) {
        return
      }

      const thisConfDate = new Date(conf.node.confDate)
      const lastConfDate = new Date(sortedConfs[index - 1].node.confDate)
      if (thisConfDate.getFullYear() != lastConfDate.getFullYear()) {
        const daysSinceFirstConf = this.daysBetweenDates(
          thisConfDate,
          new Date(firstConfsForYear[firstConfsForYear.length - 1].confDate)
        )
        firstConfsForYear.push({
          confDate: thisConfDate.toDateString(),
          index:
            firstConfsForYear[firstConfsForYear.length - 1].index +
            daysSinceFirstConf,
        })
      }
    })

    return firstConfsForYear
  }

  format(confs: Array<Conference>): ChartData {
    const sortedConfs = _.sortBy(confs, function(conf) {
      return conf.node.confDate
    })

    const chartData = this.createChartPoints(sortedConfs)
    const leftMostX = chartData[0].x
    const rightMostX = chartData[chartData.length - 1].x

    return {
      details: chartData,
      yearIndices: _.pluck(this.findFirstConfForEachYear(sortedConfs), 'index'),
      yearMarkers: _.pluck(
        this.findFirstConfForEachYear(sortedConfs),
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
