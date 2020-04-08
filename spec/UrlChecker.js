const request = require('request')
const confs = require('../src/data/confs.json')
const _ = require('underscore')

_.map(confs, function (conf, index, confs) {
  request(conf.source, function (error, response) {
    console.log('Checking conf ' + (index + 1) + ' of ' + confs.length)
    if (error || response.statusCode != 200) {
      console.log(conf.source + ': Fail')
    }
  })
})
