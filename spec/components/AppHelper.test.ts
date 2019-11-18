/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/
import test from 'ava'
import { AppHelper } from '../../src/components/AppHelper'

let helper: AppHelper

test.before(_ => {
  helper = new AppHelper()
})

test('#augmentConfData handles unique diversityPercentage values', t => {
  const confs = [
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 3,
      },
    },
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 2,
      },
    },
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 4,
      },
    },
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index)
  t.is(2, rankedConfList[1].node.index)
  t.is(3, rankedConfList[2].node.index)
})

test('#augmentConfData handles duplicate diversityPercentage values', t => {
  const confs = [
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 3,
      },
    },
    {
      node: {
        totalSpeakers: 5,
        numberOfWomen: 2,
      },
    },
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 4,
      },
    },
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index)
  t.is('', rankedConfList[1].node.index)
  t.is(3, rankedConfList[2].node.index)
})

test('#augmentConfData handles similar diversityPercentage values that appear duplicate with rounding', t => {
  const confs = [
    {
      node: {
        totalSpeakers: 21,
        numberOfWomen: 11,
      },
    },
    {
      node: {
        totalSpeakers: 23,
        numberOfWomen: 12,
      },
    },
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index)
  t.is('', rankedConfList[1].node.index)
})

test('#addDerivedFields can leaves a empty conf list unchanged', t => {
  t.deepEqual([], helper.addDerivedFields([]))
})

test('#addDerivedFields can derive the numberOfMen field', t => {
  const confListWithMissingFields = helper.addDerivedFields([
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 3,
      },
    },
  ])

  t.is(7, confListWithMissingFields[0].node.numberOfMen)
})

test('#addDerivedFields can derive the diversityPercentage field', t => {
  const confListWithMissingFields = helper.addDerivedFields([
    {
      node: {
        totalSpeakers: 10,
        numberOfWomen: 3,
      },
    },
  ])

  t.is(0.3, confListWithMissingFields[0].node.diversityPercentage)
})
