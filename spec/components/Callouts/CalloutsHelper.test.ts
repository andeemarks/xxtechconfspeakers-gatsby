/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/
import test from 'ava'
import { CalloutsHelper } from '../../../src/components/Callouts/CalloutsHelper'
import MockDate from 'mockdate'

let helper: CalloutsHelper

test.before((_) => {
  helper = new CalloutsHelper()
  MockDate.set('1/1/2018')
})

test.after((_) => {
  MockDate.reset()
})

test('#findMostRecentlyAddedConference does as the name suggests :-)', (t) => {
  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: '2000',
          diversityPercentage: 0,
          confDate: '',
        },
      },
      {
        node: {
          dateAdded: '2000',
          diversityPercentage: 0,
          confDate: '',
        },
      },
    ]),
    {
      node: {
        dateAdded: '2000',
        diversityPercentage: 0,
        confDate: '',
      },
    }
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: '2001',
          diversityPercentage: 0,
          confDate: '',
        },
      },
      {
        node: {
          dateAdded: '2000',
          diversityPercentage: 0,
          confDate: '',
        },
      },
    ]),
    {
      node: {
        dateAdded: '2001',
        diversityPercentage: 0,
        confDate: '',
      },
    }
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      {
        node: {
          dateAdded: '2001',
          diversityPercentage: 0,
          confDate: '',
        },
      },
      {
        node: {
          dateAdded: '2002',
          diversityPercentage: 0,
          confDate: '',
        },
      },
    ]),
    {
      node: {
        dateAdded: '2002',
        diversityPercentage: 0,
        confDate: '',
      },
    }
  )

  // t.is(helper.findMostRecentlyAddedConference([]), undefined)
})

test('#findConfsForCurrentYear does as the name suggests :-)', (t) => {
  t.deepEqual(
    helper.findConfsForCurrentYear([
      {
        node: {
          year: 2017,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '',
        },
      },
      {
        node: {
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '',
        },
      },
    ]),
    [
      {
        node: {
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '',
        },
      },
    ]
  )

  t.deepEqual(
    helper.findConfsForCurrentYear([
      {
        node: {
          year: 2017,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
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
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          name: 'A',
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          name: 'B',
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
    ]),
    [
      {
        node: {
          name: 'A',
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          name: 'B',
          year: 2018,
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
    ]
  )
})

test('#calculateAverageDiversity does as the name suggests :-)', (t) => {
  t.is(
    helper.calculateAverageDiversity([
      {
        node: {
          diversityPercentage: 0,
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          diversityPercentage: 1,
          confDate: '',
          dateAdded: '2019',
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
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          diversityPercentage: 0.75,
          confDate: '',
          dateAdded: '2019',
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
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          diversityPercentage: 0.3,
          confDate: '',
          dateAdded: '2019',
        },
      },
      {
        node: {
          diversityPercentage: 0.4,
          confDate: '',
          dateAdded: '2019',
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
          confDate: '',
          dateAdded: '2019',
        },
      },
    ]),
    0
  )
})

test('#confFromCurrentYear can determine whether a conf year is in the current year', (t) => {
  t.false(
    helper.confFromCurrentYear({
      node: {
        year: 2000,
        diversityPercentage: 0,
        confDate: '',
        dateAdded: '2019',
      },
    })
  )

  t.true(
    helper.confFromCurrentYear({
      node: {
        year: 2018,
        diversityPercentage: 0,
        confDate: '',
        dateAdded: '2019',
      },
    })
  )
})

test('#dateAddedSorter returns a value determining the relative order of dateAdded of its arguments', (t) => {
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: '2000', diversityPercentage: 0, confDate: '' } },
      { node: { dateAdded: '2000', diversityPercentage: 0, confDate: '' } }
    ),
    0
  )
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: '2000', diversityPercentage: 0, confDate: '' } },
      { node: { dateAdded: '2001', diversityPercentage: 0, confDate: '' } }
    ),
    1
  )
  t.is(
    helper.dateAddedSorter(
      { node: { dateAdded: '2001', diversityPercentage: 0, confDate: '' } },
      { node: { dateAdded: '2000', diversityPercentage: 0, confDate: '' } }
    ),
    -1
  )
})
