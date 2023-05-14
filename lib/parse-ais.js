const AisDecoder = require('ais-stream-decoder').default
const decoder = new AisDecoder({ silent: true })
const transform = require('kea-transformer')
const { parseStub } = require('nmea-simple/dist/codecs/PacketStub')
const { merge, cloneDeep, isEqual, isFunction, omit } = require('lodash')

let oldResult
let result
decoder.on('data', data => {
  oldResult = cloneDeep(result)
  result = JSON.parse(data)
})

module.exports = ({ msg, token, transformer }) => {
  decoder.write(msg)
  return new Promise((resolve, reject) => {
    if (!isEqual(oldResult, result)) {
      const stub = parseStub(msg.split(',')[0])
      result = merge(stub, result)
      Promise.resolve().then(() => {
        if (isFunction(transformer)) return transformer(result, msg)
        return transform({ rec: result, token, transformer })
      }).then(data => {
        resolve(omit(data, ['sentences']))
      }).catch(reject)
    }
  })
}
