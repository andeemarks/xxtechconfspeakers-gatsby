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

/* eslint-disable @typescript-eslint/no-explicit-any */
function confWith(fields: any) {
  const allFields = {
    totalSpeakers: 0,
    numberOfWomen: 0,
    numberOfMen: 0,
    diversityPercentage: 0,
    index: 0,
    ...fields,
  }

  return {
    node: allFields,
  }
}

test('#findMostRecentlyAddedConference does as the name suggests :-)', (t) => {
  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      confWith({ dateAdded: '2000' }),
      confWith({ dateAdded: '2000' }),
    ]),
    confWith({ dateAdded: '2000' })
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      confWith({ dateAdded: '2001' }),
      confWith({ dateAdded: '2000' }),
    ]),
    confWith({ dateAdded: '2001' })
  )

  t.deepEqual(
    helper.findMostRecentlyAddedConference([
      confWith({ dateAdded: '2001' }),
      confWith({ dateAdded: '2002' }),
    ]),
    confWith({ dateAdded: '2002' })
  )
})

test('#findConfsForCurrentYear does as the name suggests :-)', (t) => {
  t.deepEqual(
    helper.findConfsForCurrentYear([
      confWith({ year: 2017 }),
      confWith({ year: 2018 }),
    ]),
    [confWith({ year: 2018 })]
  )

  t.deepEqual(helper.findConfsForCurrentYear([confWith({ year: 2017 })]), [])

  t.deepEqual(
    helper.findConfsForCurrentYear([
      confWith({ year: 2017 }),
      confWith({ name: 'A', year: 2018 }),
      confWith({ name: 'B', year: 2018 }),
    ]),
    [confWith({ name: 'A', year: 2018 }), confWith({ name: 'B', year: 2018 })]
  )
})

test('#calculateAverageDiversity does as the name suggests :-)', (t) => {
  t.is(
    helper.calculateAverageDiversity([
      confWith({ diversityPercentage: 0 }),
      confWith({ diversityPercentage: 1 }),
    ]),
    0.5
  )

  t.is(
    helper.calculateAverageDiversity([
      confWith({ diversityPercentage: 0.25 }),
      confWith({ diversityPercentage: 0.75 }),
    ]),
    0.5
  )

  t.is(
    helper.calculateAverageDiversity([
      confWith({ diversityPercentage: 0.2 }),
      confWith({ diversityPercentage: 0.3 }),
      confWith({ diversityPercentage: 0.4 }),
    ]),
    0.3
  )

  t.is(
    helper.calculateAverageDiversity([confWith({ diversityPercentage: 0.0 })]),
    0
  )
})

test('#confFromCurrentYear can determine whether a conf year is in the current year', (t) => {
  t.false(helper.confFromCurrentYear(confWith({ year: 2000 })))
  t.true(helper.confFromCurrentYear(confWith({ year: 2018 })))
})

test('#dateAddedSorter returns a value determining the relative order of dateAdded of its arguments', (t) => {
  t.is(
    helper.dateAddedSorter(
      confWith({ dateAdded: '2000' }),
      confWith({ dateAdded: '2000' })
    ),
    0
  )
  t.is(
    helper.dateAddedSorter(
      confWith({ dateAdded: '2000' }),
      confWith({ dateAdded: '2001' })
    ),
    1
  )
  t.is(
    helper.dateAddedSorter(
      confWith({ dateAdded: '2001' }),
      confWith({ dateAdded: '2000' })
    ),
    -1
  )
})
