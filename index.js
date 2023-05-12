const _ = require('lodash')
const nmea = require('nmea-simple')
const Factory = require('./factory')
const factory = new Factory()

const setNewPacket = ({ key, value, packet, newPacket, oldPacket, definition, setNull }) => {
  if (value === '' && setNull) value = null
  if (!definition) {
    newPacket[key] = value
    return
  }
  let item = {}
  if (_.isString(definition)) item = { key: definition, value }
  else if (_.isPlainObject(definition)) item = definition
  else if (_.isFunction(definition)) {
    const result = def(value, packet)
    if (_.isPlainObject(result)) item = result
    else item = { value: result }
  }

  if (_.isEmpty(item)) newPacket[key] = value
  else newPacket[item.key || key] = (_.isFunction(item.value) ? item.value(value, oldPacket) : item.value) || value
}

exports.decode = (msg = '', transformer = {}) => {
  let packet = nmea.parseUnsafeNmeaSentence(msg)
  if (packet.sentenceId === '?') packet = nmea.parseGenericPacket(msg, factory)
  if (_.isFunction(transformer)) return transformer(packet, msg)
  const sid = packet.sentenceId
  const oldPacket = _.cloneDeep(packet)
  if (_.get(transformer, '_common._omit')) packet = _.omit(packet, _.get(transformer, '_common._omit'))
  let newPacket = {}
  if (transformer[sid]) {
    if (_.get(transformer, `${sid}._omit`)) packet = _.omit(packet, _.get(transformer, `${sid}._omit`))
    _.forOwn(packet, (v, k) => {
      const setNull = _.get(transformer, `${sid}._setNull`) || _.get(transformer, '_common._setNull')
      const definition = _.get(transformer, `${sid}.${k}`) || _.get(transformer, `_common.${k}`)
      setNewPacket({ key: k, value: v, definition, packet, newPacket, oldPacket, setNull })
    })
  } else {
    _.forOwn(packet, (v, k) => {
      const setNull = _.get(transformer, '_common._setNull')
      const definition = _.get(transformer, `_common.${k}`)
      setNewPacket({ key: k, value: v, definition, packet, newPacket, oldPacket, setNull })
    })
  }
  return newPacket
}


