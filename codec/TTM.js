const helpers = require('nmea-simple/dist/helpers')
const PacketStub = require('nmea-simple/dist/codecs/PacketStub')
const { merge } = require('lodash')

exports.sentenceId = 'TTM'
exports.sentenceName = 'Tracked Target Message'

function decodeSentence(stub, fields) {
  const data = {
    number: helpers.parseIntSafe(fields[1]),
    distance: helpers.parseFloatSafe(fields[2]),
    bearing: helpers.parseFloatSafe(fields[3]),
    bearingType: fields[4],
    speed: helpers.parseFloatSafe(fields[5]),
    course: helpers.parseFloatSafe(fields[6]),
    courseType: fields[7],
    distanceCpa: helpers.parseFloatSafe(fields[8]),
    timeCpa: helpers.parseFloatSafe(fields[9]),
    unit: fields[10],
    name: fields[11],
    status: fields[12],
    reference: fields[13],
    time: helpers.parseTime(fields[14]),
    acquisition: fields[15]
  }

  const s = PacketStub.initStubFields(stub, exports.sentenceId, exports.sentenceName)
  return merge({}, s, data)
}

exports.decodeSentence = decodeSentence
