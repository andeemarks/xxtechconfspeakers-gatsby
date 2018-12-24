require('jasmine-collection-matchers');
var ta = require('time-ago');

describe("The ConfListFormatter module", function() {
    var ConfListFormatter = require('../../../src/components/ConfList/ConfListFormatter');
    var helper;

    beforeEach(function() {
        helper = new ConfListFormatter();
    });

    it("can highlight unconfirmed conferences", function() {
        expect(helper.unconfirmedConferenceFormatter({})).toEqual('');
        expect(helper.unconfirmedConferenceFormatter({status: ""})).toEqual('');
        expect(helper.unconfirmedConferenceFormatter({status: "unconfirmed"})).toContain("*DRAFT*");
        expect(helper.unconfirmedConferenceFormatter({status: "UNCONFIRMED"})).toContain("*DRAFT*");
        expect(helper.unconfirmedConferenceFormatter({status: "UNConfirmed"})).toContain("*DRAFT*");
        expect(helper.unconfirmedConferenceFormatter({status: "UnCOnFiRmEd"})).toContain("*DRAFT*");

    });

    it("can highlight conferences added in the last month", function() {
        const today = new Date();
        expect(helper.newConferenceFormatter({dateAdded: today})).toContain("NEW!");
        expect(helper.newConferenceFormatter({dateAdded: today.setDate(today.getDate() - 29)})).toContain("NEW!");
        expect(helper.newConferenceFormatter({dateAdded: today.setDate(today.getDate() - 30)})).toEqual('');

    });

    it("can format the conference name and year", function() {
        expect(helper.whoFormatter("Foo", {year: 2016, source: "bar"})).toContain("Foo (2016)");
        expect(helper.whoFormatter("Bar", {year: 2017, source: "foo"})).toContain("Bar (2017)");
    });

    it("can represent the diversity percentage as a variable length lo-fi sparkline", function() {
        expect(helper.genderDiversityBar(0)).toEqual("");
        expect(helper.genderDiversityBar(.05)).toEqual("|||||");
        expect(helper.genderDiversityBar(.2)).toEqual("||||||||||||||||||||");
    });

    it("can format the diversity as a percentage", function() {
        expect(helper.genderDiversityFormatter(.5)).toEqual("50%");
        expect(helper.genderDiversityFormatter(.50)).toEqual("50%");
        expect(helper.genderDiversityFormatter(.05)).toEqual("5%");
        expect(helper.genderDiversityFormatter(0)).toEqual("0%");
    });
});