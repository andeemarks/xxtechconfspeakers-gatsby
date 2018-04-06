describe("The ChartsHelper module", function() {
    var ChartsHelper = require('../../../src/components/Charts/ChartsHelper');
    var helper;

    beforeEach(function() {
        helper = new ChartsHelper();
    });
    
    it("can group an empty set of conf data into an empty set of cohorts", function() {
        expect(helper.countConfsByDiversityCohort([])).toEqual([
            { title: "0 confs >= 50%", value: 0, color: "white" },
            { title: "0 confs >= 40%", value: 0, color: "green" },
            { title: "0 confs >= 30%", value: 0, color: "blue" },
            { title: "0 confs >= 20%", value: 0, color: "orange" },
            { title: "0 confs >= 10%", value: 0, color: "fuchsia" },
            { title: "0 confs < 10%", value: 0, color: "red" },
        ]);
    });

    it("group conf data into set cohorts", function () {
        expected = helper.countConfsByDiversityCohort([{ diversityPercentage: 0.02 }, { diversityPercentage: 0.13 }, { diversityPercentage: 0.24 }, { diversityPercentage: 0.35 }, { diversityPercentage: 0.46 }, { diversityPercentage: 0.57 }]);
        
        expect(expected['0'].value).toEqual(1);
        expect(expected['0'].title).toEqual("1 confs >= 50%");
        expect(expected['1'].value).toEqual(1);
        expect(expected['1'].title).toEqual("1 confs >= 40%");
        expect(expected['2'].value).toEqual(1);
        expect(expected['2'].title).toEqual("1 confs >= 30%");
        expect(expected['3'].value).toEqual(1);
        expect(expected['3'].title).toEqual("1 confs >= 20%");
        expect(expected['4'].value).toEqual(1);
        expect(expected['4'].title).toEqual("1 confs >= 10%");
        expect(expected['5'].value).toEqual(1);
        expect(expected['5'].title).toEqual("1 confs < 10%");
    });

    it("can group all confs > 50% diversity into a single category", function () {
        expected = helper.countConfsByDiversityCohort([{ diversityPercentage: 0.50 }, { diversityPercentage: 0.79 }, { diversityPercentage: 0.68 }, { diversityPercentage: 0.57 }]);

        expect(expected['0'].value).toEqual(4);
        expect(expected['0'].title).toEqual("4 confs >= 50%");
    });
    
});