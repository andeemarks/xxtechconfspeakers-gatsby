import test from 'ava';

var AppHelper = require('../../src/components/AppHelper');
var helper = new AppHelper();

test.before(t => {
    helper = new AppHelper();
});

test('#augmentConfData handles unique diversityPercentage values', t => {

    const confs = [{
            node: {
                totalSpeakers: 10,
                numberOfWomen: 3
            }
        },
        {
            node: {
                totalSpeakers: 10,
                numberOfWomen: 2
            }
        },
        {
            node: {
                totalSpeakers: 10,
                numberOfWomen: 4
            }
        }
    ];

    const rankedConfList = helper.augmentConfData(confs);

    t.is(1, rankedConfList[0].node.index)
    t.is(2, rankedConfList[1].node.index)
    t.is(3, rankedConfList[2].node.index)
});

test('#augmentConfData handles duplicate diversityPercentage values', t => {

    const confs = [{
            node: {
                totalSpeakers: 10,
                numberOfWomen: 3
            }
        },
        {
            node: {
                totalSpeakers: 5,
                numberOfWomen: 2
            }
        },
        {
            node: {
                totalSpeakers: 10,
                numberOfWomen: 4
            }
        }
    ];
    
    const rankedConfList = helper.augmentConfData(confs);

    t.is(1, rankedConfList[0].node.index)
    t.is("", rankedConfList[1].node.index)
    t.is(3, rankedConfList[2].node.index)
});