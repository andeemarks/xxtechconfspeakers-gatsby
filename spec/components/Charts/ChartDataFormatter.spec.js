require('jasmine-collection-matchers');

describe("The ChartDataFormatter module", function() {
    var ChartDataFormatter = require('../../../src/components/Charts/ChartDataFormatter');
    var formatter;

    beforeEach(function() {
      formatter = new ChartDataFormatter();
    });

    it("can return a collection of constant average datapoints matching the chart data", function() {
      const average = .25;
      const chartData = [{index: 1, node: {confDate: "foo"}}, {index: 2, node: {confDate: "bar"}}];
      const formattedData = formatter.format(chartData, average);
      expect(formattedData.average).toEqual([{x: 0, y: average}, {x: 1, y: average}]);

    });
});