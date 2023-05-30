/*eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }]*/
import test from 'ava'
import { AppHelper } from '../../src/components/AppHelper'

let helper: AppHelper

test.before((_) => {
  helper = new AppHelper()
})

function nodeWith(fields: any) {
  var allFields = {
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

test('#augmentConfData handles unique diversityPercentage values', (t) => {
  const confs = [
    nodeWith({ totalSpeakers: 10, numberOfWomen: 3 }),
    nodeWith({ totalSpeakers: 10, numberOfWomen: 2 }),
    nodeWith({ totalSpeakers: 10, numberOfWomen: 4 }),
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index as number)
  t.is(2, rankedConfList[1].node.index as number)
  t.is(3, rankedConfList[2].node.index as number)
})

test('#augmentConfData handles duplicate diversityPercentage values', (t) => {
  const confs = [
    nodeWith({ totalSpeakers: 10, numberOfWomen: 3 }),
    nodeWith({ totalSpeakers: 5, numberOfWomen: 2 }),
    nodeWith({ totalSpeakers: 10, numberOfWomen: 4 }),
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index as number)
  t.is('', rankedConfList[1].node.index as string)
  t.is(3, rankedConfList[2].node.index as number)
})

test('#augmentConfData handles similar diversityPercentage values that appear duplicate with rounding', (t) => {
  const confs = [
    nodeWith({ totalSpeakers: 21, numberOfWomen: 11 }),
    nodeWith({ totalSpeakers: 23, numberOfWomen: 12 }),
  ]

  const rankedConfList = helper.augmentConfData(confs)

  t.is(1, rankedConfList[0].node.index as number)
  t.is('', rankedConfList[1].node.index as string)
})

test('#addDerivedFields can leaves a empty conf list unchanged', (t) => {
  t.deepEqual([], helper.addDerivedFields([]))
})

test('#addDerivedFields can derive the numberOfMen field', (t) => {
  const confListWithMissingFields = helper.addDerivedFields([
    nodeWith({ totalSpeakers: 10, numberOfWomen: 3 }),
  ])

  t.is(7, confListWithMissingFields[0].node.numberOfMen)
})

test('#addDerivedFields can derive the diversityPercentage field', (t) => {
  const confListWithMissingFields = helper.addDerivedFields([
    nodeWith({ totalSpeakers: 10, numberOfWomen: 3 }),
  ])

  t.is(0.3, confListWithMissingFields[0].node.diversityPercentage)
})
