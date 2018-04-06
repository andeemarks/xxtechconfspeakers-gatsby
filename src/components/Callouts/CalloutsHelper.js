var _ = require('underscore');

class CalloutsHelper {
  constructor() { }
  
  findMostImprovedConference(confs) {
    
  }

  groupConferencesByName(confs) {
    return _.groupBy(confs, "name");;
  }

  diffDiversityPercentageBetweenYears(conf, index, confGroup) {
    var diversityPercentageChange = 0;
    if (index < (confGroup.length - 1)) {
      diversityPercentageChange = conf.diversityPercentage - confGroup[index + 1].diversityPercentage;
      diversityPercentageChange = Math.round(diversityPercentageChange * 100) / 100;
    }
    return {diversityPercentageChange: diversityPercentageChange, conf: conf};
  }

  findHighestDiversityChange(confGroup) {
    var confGroupSortedByDiversityChange = _(confGroup).chain().sortBy('diversityPercentageChange').sortBy('conf.year').value();
    
    return _.last(confGroupSortedByDiversityChange);
  }

  calculateHistoricalDiversityChanges(confGroup) {
    return _.map(confGroup.reverse(), this.diffDiversityPercentageBetweenYears, this).reverse();     
  }

  sortByYear(conferences, confName) {
    return {[confName]: _.sortBy(conferences, 'year')};
  }

  sortConfGroupByYear(confGroup) {
    return _.map(confGroup, this.sortByYear, this);;     
  }

  confFromCurrentYear(conf) {
    return conf.year == (new Date()).getFullYear();
  }
  
  diversityAccumulator(accumulator, conf) { 
    return accumulator + conf.diversityPercentage; 
  }
  
  calculateAverageDiversity(confs) {
    return confs.reduce(this.diversityAccumulator, 0) / confs.length;
  }

  findConfsForCurrentYear(confs) {
    return confs.filter(this.confFromCurrentYear);
  }

  findMostRecentlyAddedConference(confs) {
    return confs.sort(this.dateAddedSorter)[0];
  }

  diversitySorter(confA, confB) {
    if (confA.diversityPercentage < confB.diversityPercentage) {
      return 1;
    }
    if (confA.diversityPercentage > confB.diversityPercentage) {
      return -1;
    }
  
    return 0;
  }
  
  dateAddedSorter(confA, confB) {
    if (confA.dateAdded < confB.dateAdded) {
      return 1;
    }
    if (confA.dateAdded > confB.dateAdded) {
      return -1;
    }
  
    return 0;
  }
}

module.exports = CalloutsHelper;
