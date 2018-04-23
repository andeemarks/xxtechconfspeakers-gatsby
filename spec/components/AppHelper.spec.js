require('jasmine-collection-matchers');

describe("The AppHelper module", function() {
    var AppHelper = require('../../src/components/AppHelper');
    var helper;

    beforeEach(function() {
        helper = new AppHelper();
    });
    
    it("can leaves a empty conf list unchanged", function() {
        expect(helper.completeMissingFields([])).toEqual([]);
    });
    
    it("can derive the numberOfMen field", function() {
        const confListWithMissingFields = helper.completeMissingFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }]);
        expect(confListWithMissingFields[0].node.numberOfMen).toEqual(7);
    });
    
    it("can derive the diversityPercentage field", function() {
        const confListWithMissingFields = helper.completeMissingFields([{ node: { totalSpeakers: 10, numberOfWomen: 3 } }]);
        expect(confListWithMissingFields[0].node.diversityPercentage).toEqual(.3);
    });

});