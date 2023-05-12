const helpers = require('nmea-simple/dist/helpers')
const PacketStub = require('nmea-simple/dist/codecs/PacketStub')
const _ = require('lodash')

exports.sentenceId = 'XDR'
exports.sentenceName = 'Transducer Measurements'

function decodeSentence(stub, fields) {
  fields.shift()
  const data = _.map(_.chunk(fields, 4), f => {
    return {
      id: f[3],
      type: f[0],
      value: helpers.parseFloatSafe(f[1]),
      unit: f[2]
    }
  })
  const s = PacketStub.initStubFields(stub, exports.sentenceId, exports.sentenceName)
  return _.merge({}, s, { data })
}

exports.decodeSentence = decodeSentence
