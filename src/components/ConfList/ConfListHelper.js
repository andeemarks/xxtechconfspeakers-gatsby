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

    genderDiversityRowStyle(conf) {
        var percentage = conf.node.diversityPercentage;
        if (percentage < .10) {
            return `${s.percentageCohortFTrans}`;
        } else if (percentage < .20) {
            return `${s.percentageCohortETrans}`;
        } else if (percentage < .30) {
            return `${s.percentageCohortDTrans}`;
        } else if (percentage < .40) {
            return `${s.percentageCohortCTrans}`;
        } else if (percentage < .50) {
            return `${s.percentageCohortBTrans}`;
        } else {
            return `${s.percentageCohortATrans}`;
        }
    }

    genderDiversityCellStyle(conf) {
        var percentage = conf.diversityPercentage;
        if (percentage < .10) {
            return `s.percentageCohortF`;
        } else if (percentage < .20) {
            return `s.percentageCohortE`;
        } else if (percentage < .30) {
            return `s.percentageCohortD`;
        } else if (percentage < .40) {
            return `s.percentageCohortC`;
        } else if (percentage < .50) {
            return `s.percentageCohortB`;
        } else {
            return `s.percentageCohortA`;
        }

    }
    
}

module.exports = ConfListHelper;