require('jasmine-collection-matchers');

describe("The AppHelper module", function() {
    var AppHelper = require('../../src/components/AppHelper');
    var helper;

    beforeEach(function() {
        helper = new AppHelper();
    });
    
    describe("when augmenting conf data", function() {

        it("handles unique diversityPercentage values", function() {
            const confs = [
                { node: { totalSpeakers: 10, numberOfWomen: 3 } }, 
                { node: { totalSpeakers: 10, numberOfWomen: 2 } }, 
                { node: { totalSpeakers: 10, numberOfWomen: 4 } }];

            const rankedConfList = helper.augmentConfData(confs);

            expect(rankedConfList[0].node.index).toEqual(1);
            expect(rankedConfList[1].node.index).toEqual(2);
            expect(rankedConfList[2].node.index).toEqual(3);
        });
        
        it("handles duplicate diversityPercentage values", function() {
            const confs = [
                { node: { totalSpeakers: 10, numberOfWomen: 3 } }, 
                { node: { totalSpeakers: 5, numberOfWomen: 2 } }, 
                { node: { totalSpeakers: 10, numberOfWomen: 4 } }];
                
            const rankedConfList = helper.augmentConfData(confs);

            expect(rankedConfList[0].node.index).toEqual(1);
            expect(rankedConfList[1].node.index).toEqual("");
            expect(rankedConfList[2].node.index).toEqual(3);
        });
        
        it("handles similar diversityPercentage values that appear duplicate with rounding", function() {
            const confs = [
                { node: { totalSpeakers: 21, numberOfWomen: 11 } }, 
                { node: { totalSpeakers: 23, numberOfWomen: 12 } }];

            const rankedConfList = helper.augmentConfData(confs);

            expect(rankedConfList[0].node.index).toEqual(1);
            expect(rankedConfList[1].node.index).toEqual("");
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
    });

});