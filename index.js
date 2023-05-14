const { isFunction, keys } = require('lodash')
const { parseStub } = require('nmea-simple/dist/codecs/PacketStub')
const transform = require('kea-transformer')
const nmea = require('nmea-simple')
const Factory = require('./lib/factory')
const decoders = require('./lib/decoders')
const parseAis = require('./lib/parse-ais')

const factory = new Factory()

exports.decode = async (msg = '', transformer = {}) => {
  const stub = parseStub(msg.split(',')[0])
  const token = stub.sentenceId
  if (['VDM', 'VDO'].includes(token)) return parseAis({ msg, token, transformer })
  let rec
  if (keys(decoders).includes(token)) rec = nmea.parseGenericPacket(msg, factory)
  else rec = nmea.parseUnsafeNmeaSentence(msg)
  if (isFunction(transformer)) return transformer(rec, msg)
  return transform({ rec, token, transformer })
}
