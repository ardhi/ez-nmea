const xdr = require('../codec/XDR')
const rot = require('../codec/ROT')
const tll = require('../codec/TLL')
const ttm = require('../codec/TTM')
const mwd = require('../codec/MWD')

module.exports = {
  XDR: xdr.decodeSentence,
  ROT: rot.decodeSentence,
  TLL: tll.decodeSentence,
  TTM: ttm.decodeSentence,
  MWD: mwd.decodeSentence
}
