require('jasmine-collection-matchers');

describe("The ConfListHelper module", function() {
    var ConfListHelper = require('../../../src/components/ConfList/ConfListHelper');
    var helper;

    beforeEach(function() {
        helper = new ConfListHelper();
    });
    
    it("can format the conference name and year", function() {
        expect(helper.whoFormatter("Foo", {year: 2016, source: "bar"})).toContain("Foo (2016)");
        expect(helper.whoFormatter("Bar", {year: 2017, source: "foo"})).toContain("Bar (2017)");
    });

    it("can format the diversity as a percentage", function() {
        expect(helper.genderDiversityFormatter(.5)).toEqual("50%");
        expect(helper.genderDiversityFormatter(.50)).toEqual("50%");
        expect(helper.genderDiversityFormatter(.05)).toEqual("5%");
        expect(helper.genderDiversityFormatter(0)).toEqual("0%");
    });
});