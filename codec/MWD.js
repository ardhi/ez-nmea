const helpers = require('nmea-simple/dist/helpers')
const PacketStub = require('nmea-simple/dist/codecs/PacketStub')
const _ = require('lodash')

exports.sentenceId = 'MWD'
exports.sentenceName = 'Wind Direction and Speed'

function decodeSentence(stub, fields) {
  const data = {
    windDirTrue: helpers.parseFloatSafe(fields[1]),
    windDirMagnetic: helpers.parseFloatSafe(fields[3]),
    speedKnots: fields[5],
    speedMs: field[7]
  }
  const s = PacketStub.initStubFields(stub, exports.sentenceId, exports.sentenceName)
  return _.merge({}, s, data)
}

exports.decodeSentence = decodeSentence
