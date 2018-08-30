require('jasmine-collection-matchers');

describe("The AppHelper module", function() {
    var AppHelper = require('../../src/components/AppHelper');
    var helper;

    beforeEach(function() {
        helper = new AppHelper();
    });
    
    describe("when assigning ranks", function() {

        it("can derive the rank with unique diversityPercentage values", function() {
            const confListWithMissingFields = helper.assignRanks(helper.addDerivedFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }, { node: { totalSpeakers: 10, numberOfWomen: 2 } }, { node: { totalSpeakers: 10, numberOfWomen: 4 } }]));
            expect(confListWithMissingFields[0].node.index).toEqual(1);
            expect(confListWithMissingFields[1].node.index).toEqual(2);
            expect(confListWithMissingFields[2].node.index).toEqual(3);
        });
        
        it("can derive the rank with duplicate diversityPercentage values", function() {
            const confListWithMissingFields = helper.assignRanks(helper.addDerivedFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }, { node: { totalSpeakers: 5, numberOfWomen: 2 } }, { node: { totalSpeakers: 10, numberOfWomen: 4 } }]));
            expect(confListWithMissingFields[0].node.index).toEqual(1);
            expect(confListWithMissingFields[1].node.index).toEqual("");
            expect(confListWithMissingFields[2].node.index).toEqual(3);
        });
        
        it("can derive the rank with similar diversityPercentage values that appear duplicate with rounding", function() {
            const confListWithMissingFields = helper.assignRanks(helper.addDerivedFields([{ node: { totalSpeakers: 21, numberOfWomen: 11 } }, { node: { totalSpeakers: 23, numberOfWomen: 12 } }]));
            expect(confListWithMissingFields[0].node.index).toEqual(1);
            expect(confListWithMissingFields[1].node.index).toEqual("");
        });

    });

    describe("when adding derived fields", function() {
    
        it("can leaves a empty conf list unchanged", function() {
            expect(helper.addDerivedFields([])).toEqual([]);
        });
    
        it("can derive the numberOfMen field", function() {
            const confListWithMissingFields = helper.addDerivedFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }]);
            expect(confListWithMissingFields[0].node.numberOfMen).toEqual(7);
        });
        
        it("can derive the diversityPercentage field", function() {
            const confListWithMissingFields = helper.addDerivedFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }]);
            expect(confListWithMissingFields[0].node.diversityPercentage).toEqual(.3);
        });
        
        it("can returns confs in order of descending diversityPercentage", function() {
            const confListWithMissingFields = helper.addDerivedFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }, { node: { totalSpeakers: 10, numberOfWomen: 2 } }, { node: { totalSpeakers: 10, numberOfWomen: 4 } }]);
            expect(confListWithMissingFields[0].node.diversityPercentage).toEqual(.4);
            expect(confListWithMissingFields[1].node.diversityPercentage).toEqual(.3);
            expect(confListWithMissingFields[2].node.diversityPercentage).toEqual(.2);
        });
    });

});