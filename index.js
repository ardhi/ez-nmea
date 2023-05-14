const { isFunction, keys } = require('lodash')
const nmea = require('nmea-simple')
const { Decoders, Factory } = require('./lib')
const { parseStub } = require('nmea-simple/dist/codecs/PacketStub')
const factory = new Factory()
const transform = require('kea-transformer')
const parseAis = require('./parse-ais')

exports.decode = async (msg = '', transformer = {}) => {
  const stub = parseStub(msg.split(',')[0])
  const token = stub.sentenceId
  if (['VDM', 'VDO'].includes(token)) return parseAis({ msg, token, transformer })
  let rec
  if (keys(Decoders).includes(token)) rec = nmea.parseGenericPacket(msg, factory)
  else rec = nmea.parseUnsafeNmeaSentence(msg)
  if (isFunction(transformer)) return transformer(rec, msg)
  return transform({ rec, token, transformer })
}
