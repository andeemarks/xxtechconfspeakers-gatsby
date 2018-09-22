var numeral = require('numeral')
var ta = require('time-ago')

class ConfListHelper {
  constructor() {}

  whoFormatter(confName, conf) {
    return `${confName} (${conf.year}) <a href='${
      conf.source
    }' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`
  }

  dateAddedFormatter(dateAdded, conf) {
    return ta.ago(dateAdded)
  }

  genderDiversityFormatter(diversity) {
    return numeral(diversity).format('0%')
  }

  genderDiversityBar(diversity) {
    return Array(Math.round(diversity * 100) + 1).join('|')
  }

  newConferenceFormatter(conf) {
    var daysSinceConfAdded =
      Math.abs(new Date() - new Date(conf.dateAdded)) / (1000 * 60 * 60 * 24)
    return daysSinceConfAdded < 30 ? 'NEW!' : ''
  }
}

module.exports = ConfListHelper
