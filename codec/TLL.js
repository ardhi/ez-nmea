const helpers = require('nmea-simple/dist/helpers')
const PacketStub = require('nmea-simple/dist/codecs/PacketStub')
const { merge } = require('lodash')

exports.sentenceId = 'TLL'
exports.sentenceName = 'Target Latitude and Longitude'

function decodeSentence(stub, fields) {
  const data = {
    number: helpers.parseIntSafe(fields[1]),
    latitude: helpers.parseLatitude(fields[2], fields[3]),
    longitude: helpers.parseLongitude(fields[4], fields[5]),
    name: fields[6],
    time: helpers.parseTime(fields[7]),
    status: fields[8],
    reference: fields[9]
  }

  const s = PacketStub.initStubFields(stub, exports.sentenceId, exports.sentenceName)
  return merge({}, s, data)
}

exports.decodeSentence = decodeSentence
