import { Conference } from '../Charts/ChartDataFormatter'

export class CalloutsHelper {
  confFromCurrentYear(conf: Conference): boolean {
    return conf.node.year == new Date().getFullYear()
  }

  diversityAccumulator(accumulator: number, conf: Conference): number {
    return accumulator + conf.node.diversityPercentage
  }

  calculateAverageDiversity(confs: Array<Conference>): number {
    return confs.reduce(this.diversityAccumulator, 0) / confs.length
  }

  findConfsForCurrentYear(confs: Array<Conference>): Array<Conference> {
    return confs.filter(this.confFromCurrentYear)
  }

  findMostRecentlyAddedConference(confs: Array<Conference>): Conference {
    return confs.sort(this.dateAddedSorter)[0]
  }

  dateAddedSorter(confA: Conference, confB: Conference): number {
    if (confA.node.dateAdded < confB.node.dateAdded) {
      return 1
    }
    if (confA.node.dateAdded > confB.node.dateAdded) {
      return -1
    }

    return 0
  }
}
