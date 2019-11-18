import numeral from 'numeral'

export default class ConfListFormatter {
  whoFormatter(confName: string, conf: { year: number; source: string }) {
    return `${confName} (${conf.year}) <a href='${conf.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`
  }

  genderDiversityFormatter(diversity: number) {
    return numeral(diversity).format('0%')
  }

  genderDiversityBar(diversity: number) {
    return Array(Math.round(diversity * 100) + 1).join('|')
  }

  newConferenceFormatter(conf: { dateAdded: string }): string {
    const daysSinceConfAdded =
      Math.abs(new Date().getTime() - new Date(conf.dateAdded).getTime()) /
      (1000 * 60 * 60 * 24)
    return daysSinceConfAdded < 30 ? 'NEW!' : ''
  }

  unconfirmedConferenceFormatter(conf: { status?: string }) {
    return conf.status && conf.status.toLowerCase() == 'unconfirmed'
      ? '*DRAFT*'
      : ''
  }
}
