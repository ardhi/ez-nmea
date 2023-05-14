const decoders = require('./decoders')

class Factory {
  constructor (ableToParseBadChecksum = false) {
    this.ableToParseBadChecksum = ableToParseBadChecksum
  }

  getParser (stub) {
    return decoders[stub.sentenceId]
  }

  assemble (stub, fields) {
    const parser = this.getParser(stub)
    if (parser) {
      return parser(stub, fields)
    } else {
      return this.assembleCustomPacket(stub, fields)
    }
  }

  assembleCustomPacket (stub, fields) {
    return null
  }
}

module.exports = Factory