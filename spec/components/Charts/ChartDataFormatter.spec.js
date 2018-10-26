require('jasmine-collection-matchers');

describe("The ChartDataFormatter module", function() {
    var ChartDataFormatter = require('../../../src/components/Charts/ChartDataFormatter');
    var formatter;
    var chartData;

    beforeEach(function() {
      formatter = new ChartDataFormatter();
    });

    it("can return a collection of constant average datapoints matching the chart data", function() {
      const average = .25;
      const chartData = [{node: {confDate: "foo"}}, {node: {confDate: "bar"}}];
      const formattedData = formatter.format(chartData, average);
      expect(formattedData.average).toEqual([{x: 0, y: average}, {x: 1, y: average}]);

    });

    it("can return a collection of conf-specific datapoints matching the chart data", function() {
      const chartData = [{node: {confDate: "foo", diversityPercentage: 0.25}}, {node: {confDate: "bar", diversityPercentage: 0.6666}}];
      const formattedData = formatter.format(chartData, .25);
      expect(formattedData.details.length).toEqual(chartData.length);

    });

    it("can return a collection of conf-specific datapoints sorted by confDate", function() {
      const chartData = [{node: {confDate: "31-12-2018", diversityPercentage: 0.25}}, {node: {confDate: "01-01-2000", diversityPercentage: 0.6666}}];
      const formattedData = formatter.format(chartData, .25);
      expect(formattedData.details[0].confDate).toEqual('01-01-2000');
      expect(formattedData.details[1].confDate).toEqual('31-12-2018');

    });

    describe("can return a collection of chart datapoints based on the conf data", function() {

      beforeEach(function() {
        formatter = new ChartDataFormatter();
        chartData = [{node: {confDate: "foo", name: "name", year: 2001, location: "Paris, Texas"}}];
      });

      it("where confDate is carried forward from the chart data", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].confDate).toEqual("foo");
      });

      it("where name is carried forward from the chart data", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].name).toEqual("name");
      });

      it("where year is carried forward from the chart data", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].year).toEqual(2001);
      });

      it("where location is carried forward from the chart data", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].location).toEqual("Paris, Texas");
      });

      it("where y0 is always 0.5", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].y0).toEqual(0.5);
      });

      it("where y is the diversity percentage", function() {
        chartData[0].node.diversityPercentage = .324;
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].y).toEqual(0.324);
      });

      it("where diversityPercentage is formatted as a %age with no precision", function() {
        chartData[0].node.diversityPercentage = .324;
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].diversityPercentage).toEqual("32%");
      });

      it("where color is indexed against the diversity percentage", function() {
        chartData[0].node.diversityPercentage = 0;
        var formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].color).toEqual(0);

        chartData[0].node.diversityPercentage = .5;
        formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].color).toEqual(5);

        chartData[0].node.diversityPercentage = .8342244;
        formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].color).toEqual(8);
      });

      it("where x is corresponds to the sequential index of the chart data sorted by confDate", function() {
        const formattedData = formatter.format(chartData, .25);
        expect(formattedData.details[0].x).toEqual(0);
      });

    });
});