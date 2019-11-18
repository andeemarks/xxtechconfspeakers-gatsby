/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/

import test from 'ava'

const ConfListFormatter = require('../../../src/components/ConfList/ConfListFormatter')
let helper

test.before(_ => {
  helper = new ConfListFormatter()
})

test('#unconfirmedConferenceFormatter highlights unconfirmed conferences', t => {
  t.is('', helper.unconfirmedConferenceFormatter({}))
  t.is(
    '',
    helper.unconfirmedConferenceFormatter({
      status: '',
    })
  )
  t.is(
    '*DRAFT*',
    helper.unconfirmedConferenceFormatter({
      status: 'unconfirmed',
    })
  )
  t.is(
    '*DRAFT*',
    helper.unconfirmedConferenceFormatter({
      status: 'UNCONFIRMED',
    })
  )
  t.is(
    '*DRAFT*',
    helper.unconfirmedConferenceFormatter({
      status: 'UNcOnFirmED',
    })
  )
})

test('#newConferenceFormatter highlights conferences added in the last month', t => {
  const today = new Date()

  t.is('NEW!', helper.newConferenceFormatter({ dateAdded: today }))
  t.is(
    'NEW!',
    helper.newConferenceFormatter({
      dateAdded: today.setDate(today.getDate() - 29),
    })
  )
  t.is(
    '',
    helper.newConferenceFormatter({
      dateAdded: today.setDate(today.getDate() - 30),
    })
  )
})

test('#whoFormatter formats the conference name and year', t => {
  t.regex(
    helper.whoFormatter('Foo', {
      year: 2016,
      source: 'bar',
    }),
    /Foo \(2016\)/
  )

  t.regex(
    helper.whoFormatter('Bar', {
      year: 2017,
      source: 'foo',
    }),
    /Bar \(2017\)/
  )
})

test('#genderDiversityBar represents the diversity percentage as a variable length lo-fi sparkline', t => {
  t.is('', helper.genderDiversityBar(0))
  t.is('|||||', helper.genderDiversityBar(0.05))
  t.is('||||||||||||||||||||', helper.genderDiversityBar(0.2))
})

test('#genderDiversityFormatter formats the diversity as a percentage', t => {
  t.is('50%', helper.genderDiversityFormatter(0.5))
  t.is('50%', helper.genderDiversityFormatter(0.5))
  t.is('5%', helper.genderDiversityFormatter(0.05))
  t.is('0%', helper.genderDiversityFormatter(0))
})
