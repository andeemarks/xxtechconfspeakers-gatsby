/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/

import test from 'ava'

const CalloutsHelper = require('../../../src/components/Callouts/CalloutsHelper')
const MockDate = require('mockdate')
let helper

test.before(_ => {
  helper = new CalloutsHelper()
  MockDate.set('1/1/2018')
})

test.after(_ => {
  MockDate.reset()
})

test('#findMostRecentlyAddedConference does as the name suggests :-)', t => {
  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: 2000,
        },
      },
      {
        node: {
          dateAdded: 2000,
        },
      },
    ]),
    {
      node: {
        dateAdded: 2000,
      },
    }
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: 2001,
        },
      },
      {
        node: {
          dateAdded: 2000,
        },
      },
    ]),
    {
      node: {
        dateAdded: 2001,
      },
    }
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: 2001,
        },
      },
      {
        node: {
          dateAdded: 2002,
        },
      },
    ]),
    {
      node: {
        dateAdded: 2002,
      },
    }
  )

  t.is(helper.findMostRecentlyAddedConference([]), undefined)
})

test('#findConfsForCurrentYear does as the name suggests :-)', t => {
  t.deepEqual(
    helper.findConfsForCurrentYear([
      {
        node: {
          year: 2017,
        },
      },
      {
        node: {
          year: 2018,
        },
      },
    ]),
    [
      {
        node: {
          year: 2018,
        },
      },
    ]
  )

  t.deepEqual(
    helper.findConfsForCurrentYear([
      {
        node: {
          year: 2017,
        },
      },
    ]),
    []
  )

  t.deepEqual(
    helper.findConfsForCurrentYear([
      {
        node: {
          year: 2017,
        },
      },
      {
        node: {
          name: 'A',
          year: 2018,
        },
      },
      {
        node: {
          name: 'B',
          year: 2018,
        },
      },
    ]),
    [
      {
        node: {
          name: 'A',
          year: 2018,
        },
      },
      {
        node: {
          name: 'B',
          year: 2018,
        },
      },
    ]
  )
})

test('#calculateAverageDiversity does as the name suggests :-)', t => {
  t.is(
    helper.calculateAverageDiversity([
      {
        node: {
          diversityPercentage: 0,
        },
      },
      {
        node: {
          diversityPercentage: 1,
        },
      },
    ]),
    0.5
  )

  t.is(
    helper.calculateAverageDiversity([
      {
        node: {
          diversityPercentage: 0.25,
        },
      },
      {
        node: {
          diversityPercentage: 0.75,
        },
      },
    ]),
    0.5
  )

  t.is(
    helper.calculateAverageDiversity([
      {
        node: {
          diversityPercentage: 0.2,
        },
      },
      {
        node: {
          diversityPercentage: 0.3,
        },
      },
      {
        node: {
          diversityPercentage: 0.4,
        },
      },
    ]),
    0.3
  )

  t.is(
    helper.calculateAverageDiversity([
      {
        node: {
          diversityPercentage: 0,
        },
      },
    ]),
    0
  )
})

test('#confFromCurrentYear can determine whether a conf year is in the current year', t => {
  t.false(
    helper.confFromCurrentYear({
      node: {
        year: 2000,
      },
    })
  )

  t.true(
    helper.confFromCurrentYear({
      node: {
        year: 2018,
      },
    })
  )

  t.false(
    helper.confFromCurrentYear({
      node: {},
    })
  )
})

test('#diversitySorter returns a value determining the relative order of diversityPercentage of its arguments', t => {
  t.is(helper.diversitySorter({}, {}), 0)
  t.is(
    helper.diversitySorter(
      { diversityPercentage: 0.49 },
      { diversityPercentage: 0.49 }
    ),
    0
  )
  t.is(
    helper.diversitySorter(
      { diversityPercentage: 0.49 },
      { diversityPercentage: 0.5 }
    ),
    1
  )
  t.is(
    helper.diversitySorter(
      { diversityPercentage: 0.49 },
      { diversityPercentage: 0.48 }
    ),
    -1
  )
  t.is(helper.diversitySorter({ diversityPercentage: 0 }, {}), 0)
  t.is(helper.diversitySorter({ diversityPercentage: 0.1 }, {}), 0)
  t.is(helper.diversitySorter({}, { diversityPercentage: 0.1 }), 0)
})

test('#dateAddedSorter returns a value determining the relative order of dateAdded of its arguments', t => {
  t.is(helper.dateAddedSorter({ node: {} }, { node: {} }), 0)
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: 2000 } },
      { node: { dateAdded: 2000 } }
    ),
    0
  )
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: 2000 } },
      { node: { dateAdded: 2001 } }
    ),
    1
  )
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: 2001 } },
      { node: { dateAdded: 2000 } }
    ),
    -1
  )
  t.is(helper.dateAddedSorter({ node: { dateAdded: 0 } }, { node: {} }), 0)
  t.is(helper.dateAddedSorter({ node: { dateAdded: 2000 } }, { node: {} }), 0)
  t.is(helper.dateAddedSorter({ node: {} }, { node: { dateAdded: 0 } }), 0)
})
