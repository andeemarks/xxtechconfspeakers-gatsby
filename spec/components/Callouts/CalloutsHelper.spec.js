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

      expect(helper.sortByConfDate([{ confDate: "2016-01-01" },
        { confDate: "2015-12-31" },
        { confDate: "2016-01-02" }])).toEqual([{ confDate: "2015-12-31" },
        { confDate: "2016-01-01" },
        { confDate: "2016-01-02" }]); 
    });

    it("can calculate the highest diversity change over the life of a conference", function() {
      expect(helper.findHighestDiversityChange([])).toEqual(undefined);
      expect(helper.findHighestDiversityChange(
        [
          { conf: { year: 2011, diversityPercentage: 0.3 }, diversityPercentageChange: 0 }, 
          { conf: { year: 2013, diversityPercentage: 0.3 }, diversityPercentageChange: .1 }, 
          { conf: { year: 2014, diversityPercentage: 0.25 }, diversityPercentageChange: -0.05 }
]
      )).toEqual({ conf: { year: 2013, diversityPercentage: 0.3 }, diversityPercentageChange: .1 });
    });

    it("can calculate the highest diversity change favouring more recent confs when change is same", function() {
      expect(helper.findHighestDiversityChange(
        [
          { conf: { year: 2014, diversityPercentage: 0.3 }, diversityPercentageChange: 0.15 }, 
          { conf: { year: 2013, diversityPercentage: 0.3 }, diversityPercentageChange: .1 }, 
          { conf: { year: 2016, diversityPercentage: 0.25 }, diversityPercentageChange: 0.15 }
]
      )).toEqual({ conf: { year: 2016, diversityPercentage: 0.25 }, diversityPercentageChange: .15 });
    });

    it("can group conferences by name", function() {
      expect(helper.groupConferencesByName([])).toEqual({});
      expect(helper.groupConferencesByName([{name: "Foo"}])).toEqual({ Foo: [{ name: 'Foo' }] });
      expect(helper.groupConferencesByName([
        {name: "Foo"},
        {name: "Foo"},
        {name: "Bar"}])).toEqual({ Foo: [{ name: 'Foo' },
        { name: 'Foo' }], Bar: [{ name: 'Bar' }] });
            });

    it("can calculate the diversity changes over successive years", function() {
      expect(helper.calculateHistoricalDiversityChanges(
        [ 
          { year: 2011, diversityPercentage: 0.3 }, 
          { year: 2013, diversityPercentage: 0.4 }, 
          { year: 2014, diversityPercentage: 0.6 }
]
        )).toEqual(
          [ 
            { conf: { year: 2011, diversityPercentage: 0.3 }, diversityPercentageChange: 0 }, 
            { conf: { year: 2013, diversityPercentage: 0.4 }, diversityPercentageChange: 0.1 }, 
            { conf: { year: 2014, diversityPercentage: 0.6 }, diversityPercentageChange: 0.2 }
]
        );
    });

    it("can calculate negative diversity changes over successive years", function() {
      expect(helper.calculateHistoricalDiversityChanges(
        [ 
          { year: 2011, diversityPercentage: 0.3 }, 
          { year: 2013, diversityPercentage: 0.3 }, 
          { year: 2014, diversityPercentage: 0.25 }
]
        )).toEqual(
          [ 
            { conf: { year: 2011, diversityPercentage: 0.3 }, diversityPercentageChange: 0 }, 
            { conf: { year: 2013, diversityPercentage: 0.3 }, diversityPercentageChange: 0 }, 
            { conf: { year: 2014, diversityPercentage: 0.25 }, diversityPercentageChange: -0.05 }
]
        );
    });

    it("can handle calculating the diversity changes over single year", function() {
      expect(helper.calculateHistoricalDiversityChanges(
        [{ year: 2011, diversityPercentage: 0.3 }]
        )).toEqual(
          [{ conf: { year: 2011, diversityPercentage: 0.3 }, diversityPercentageChange: 0 }]
        );
    });

    it("can sort a group of conferences by year", function() {
      expect(helper.sortConfGroupByYear({ Foo: [{ year: 2014 },
{ year: 2011 },
{ year: 2013 }]})).toEqual([{ Foo: [{ year: 2011 },
{ year: 2013 },
{ year: 2014 }]}]);
    })

    xit("can find the most improved conference", function() {
      expect(helper.findMostImprovedConference([])).toEqual(undefined);
      expect(helper.findMostImprovedConference([{name: "Foo", diversityPercentage: .25, year: 2015}])).toEqual(undefined);
      expect(helper.findMostImprovedConference([{name: "Foo", diversityPercentage: .25, year: 2015},
{name: "Foo", diversityPercentage: .55, year: 2016}])).toEqual({name: "Foo", diversityPercentage: .55, year: 2016});

    })

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