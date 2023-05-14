const xdr = require('./codec/XDR')
const rot = require('./codec/ROT')
const tll = require('./codec/TLL')
const ttm = require('./codec/TTM')

var Decoders = {
  XDR: xdr.decodeSentence,
  ROT: rot.decodeSentence,
  TLL: tll.decodeSentence,
  TTM: ttm.decodeSentence
}

var Factory = (function () {
  function Factory(ableToParseBadChecksum) {
    if (ableToParseBadChecksum === void 0) { ableToParseBadChecksum = false }
    this.ableToParseBadChecksum = ableToParseBadChecksum
  }
  Factory.getParser = function (stub) {
    return Decoders[stub.sentenceId]
  }
  Factory.prototype.assemble = function (stub, fields) {
    var parser = Factory.getParser(stub)
    if (parser) {
      return parser(stub, fields)
    } else {
      return this.assembleCustomPacket(stub, fields)
    }
  }
  Factory.prototype.assembleCustomPacket = function (stub, fields) {
    return null
  }
  return Factory
}())

module.exports = { Factory, Decoders }