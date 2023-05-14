const helpers = require('nmea-simple/dist/helpers')
const PacketStub = require('nmea-simple/dist/codecs/PacketStub')
const { merge } = require('lodash')

exports.sentenceId = 'ROT'
exports.sentenceName = 'Rate Of Turn'

function decodeSentence(stub, fields) {
  const data = {
    rateOfTurn: helpers.parseFloatSafe(fields[1]),
    status: fields[2]
  }
  const s = PacketStub.initStubFields(stub, exports.sentenceId, exports.sentenceName)
  return merge({}, s, data)
}

exports.decodeSentence = decodeSentence
