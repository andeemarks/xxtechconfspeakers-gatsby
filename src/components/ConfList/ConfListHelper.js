var numeral = require("numeral");
var ta = require('time-ago');

class ConfListHelper {
    constructor() { }

    whoFormatter(confName, conf) {
        return `${confName} (${conf.year}) <a href='${conf.source}' target='_other'><span style='font-size: 10px' class='glyphicon glyphicon-link'></span></a>`;
    }

    dateAddedFormatter(dateAdded, conf) {
        return ta.ago(dateAdded);
    }

    genderDiversityFormatter(diversity) {
        return numeral(diversity).format('0%')
    }
}

module.exports = ConfListHelper;