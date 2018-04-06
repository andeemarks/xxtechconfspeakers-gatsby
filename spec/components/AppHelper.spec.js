require('jasmine-collection-matchers');

describe("The AppHelper module", function() {
    var AppHelper = require('../../src/components/AppHelper');
    var helper;

    beforeEach(function() {
        helper = new AppHelper();
    });
    
    it("can complete the necessary fields", function() {
        expect(helper.completeMissingFields([{totalSpeakers: 10, numberOfWomen: 3}])).toEqual([{totalSpeakers: 10, numberOfWomen: 3, numberOfMen: 7, diversityPercentage: .3}]);
        expect(helper.completeMissingFields([])).toEqual([]);
    });

});