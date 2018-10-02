require('jasmine-collection-matchers');

describe("The CalloutsHelper module", function() {
    var CalloutsHelper = require('../../../src/components/Callouts/CalloutsHelper');
    var MockDate = require('mockdate');
    var helper;

    beforeEach(function() {
        helper = new CalloutsHelper();
        MockDate.set('1/1/2018');
    });

    afterEach(function() {
        MockDate.reset();
    });

    it("can sort a group of conferences chronologically", function() {
      expect(helper.sortByConfDate([])).toEqual([]);

      const confsByDate = helper.sortByConfDate([{ node: { confDate: "2016-01-01", diversityPercentage: 0.5 }},
        { node: { confDate: "2015-12-31", diversityPercentage: 0.4 }},
        { node: { confDate: "2016-01-02", diversityPercentage: 0.6 }}]);

      expect(confsByDate.length).toEqual(3);
      expect(confsByDate[0]).toEqual(0.4);
      expect(confsByDate[1]).toEqual(0.5);
      expect(confsByDate[2]).toEqual(0.6);
    });

    it("can find the most recently added conference", function() {
      expect(helper.findMostRecentlyAddedConference([{node: {dateAdded: 2000}}, {node: {dateAdded: 2000}}])).toEqual({node: {dateAdded: 2000}});
      expect(helper.findMostRecentlyAddedConference([{ node: { dateAdded: 2001 } }, { node: { dateAdded: 2000 } }])).toEqual({node: {dateAdded: 2001}});
      expect(helper.findMostRecentlyAddedConference([{ node: { dateAdded: 2001 } }, { node: { dateAdded: 2002 } }])).toEqual({node: {dateAdded: 2002}});
      expect(helper.findMostRecentlyAddedConference([])).toEqual(undefined);
    });

    it("can separate the conferences for the current year", function() {
      expect(helper.findConfsForCurrentYear([{node: {year: 2017}}, {node: {year: 2018}}])).toEqual([{node: {year: 2018}}]);
      expect(helper.findConfsForCurrentYear([{node: {year: 2017}}])).toEqual([]);
      expect(helper.findConfsForCurrentYear([{node: {year: 2017}}, {node: {name: "A", year: 2018}}, {node: {name: "B", year: 2018}}])).toEqual([{node: {name: "A", year: 2018}}, {node: {name: "B", year: 2018}}]);
    });
    
    it("can calculate the average diversity across a set of conferences", function() {
      expect(helper.calculateAverageDiversity([{node: {diversityPercentage: 0}},
{node: {diversityPercentage: 1}}])).toBe(.5);
      expect(helper.calculateAverageDiversity([{node: {diversityPercentage: .25}},
{node: {diversityPercentage: .75}}])).toBe(.5);
      expect(helper.calculateAverageDiversity([{node: {diversityPercentage: .2}},
{node: {diversityPercentage: .3}},
{node: {diversityPercentage: .4}}])).toBe(.3);
      expect(helper.calculateAverageDiversity([{node: {diversityPercentage: 0}}])).toBe(0);
    });

    it("can work out whether a conference is from the current year", function() {
      expect(helper.confFromCurrentYear({node: {year: 2000}})).toBe(false);
      expect(helper.confFromCurrentYear({node: {year: 2018}})).toBe(true);
      expect(helper.confFromCurrentYear({node: {}})).toBe(false);
    });
    
    it("can determine which conference has a higher diversity percentage", function() {
      expect(helper.diversitySorter({}, {})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.49})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.50})).toBe(1);
      expect(helper.diversitySorter({diversityPercentage: 0.49}, {diversityPercentage: 0.48})).toBe(-1);
      expect(helper.diversitySorter({diversityPercentage: 0}, {})).toBe(0);
      expect(helper.diversitySorter({diversityPercentage: 0.1}, {})).toBe(0);
      expect(helper.diversitySorter({}, {diversityPercentage: 0.1})).toBe(0);
    });
    
    it("can determine which conference has been added more recently", function() {
      expect(helper.dateAddedSorter({ node: {} }, { node: {}})).toBe(0);
      expect(helper.dateAddedSorter({ node: { dateAdded: 2000}}, { node: { dateAdded: 2000}})).toBe(0);
      expect(helper.dateAddedSorter({ node: { dateAdded: 2000}}, { node: { dateAdded: 2001}})).toBe(1);
      expect(helper.dateAddedSorter({ node: { dateAdded: 2001}}, { node: { dateAdded: 2000}})).toBe(-1);
      expect(helper.dateAddedSorter({ node: { dateAdded: 0}}, { node: {}})).toBe(0);
      expect(helper.dateAddedSorter({ node: { dateAdded: 2000}}, { node: {}})).toBe(0);
      expect(helper.dateAddedSorter({ node: {}}, { node: { dateAdded: 0}})).toBe(0);
    });
});