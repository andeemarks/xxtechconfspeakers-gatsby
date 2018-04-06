var _ = require("underscore");

class ChartsHelper {
    constructor() { }

    countConfsByDiversityCohort(confs) {
        var confsByDiversityCohort = _.groupBy(confs, 
            function(conf) {
                var diversityCohort = Math.trunc(conf.diversityPercentage * 10);
                if (diversityCohort > 5) diversityCohort = 5;

                return diversityCohort;
            });

        return [
            this.populateCohort(confsByDiversityCohort['5'], " confs >= 50%", "white"),
            this.populateCohort(confsByDiversityCohort['4'], " confs >= 40%", "green"),
            this.populateCohort(confsByDiversityCohort['3'], " confs >= 30%", "blue"),
            this.populateCohort(confsByDiversityCohort['2'], " confs >= 20%", "orange"),
            this.populateCohort(confsByDiversityCohort['1'], " confs >= 10%", "fuchsia"),
            this.populateCohort(confsByDiversityCohort['0'], " confs < 10%", "red")
        ]
    };

    populateCohort(groupedCohort, cohortTitle, cohortColor) {
        var cohortSize = groupedCohort ? groupedCohort.length : 0;
        return { title: cohortSize + cohortTitle, value: cohortSize, color: cohortColor };
    };
    
}

module.exports = ChartsHelper;