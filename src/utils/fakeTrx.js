const {customAlphabet} = require("nanoid")

function generateTrx() {
    let tx = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 33)
    let txId = `T${tx()}`

    return txId
  }

function generateRef() {
    let refCode = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5)
    let ref = refCode()

    return ref
  }

function generateTxId() {
    let generateTxId = customAlphabet('abcdefghijklmnopqrstuvwxyz', 5)
    let txId = generateTxId()
    return txId
  }

  module.exports = {generateTrx, generateRef, generateTxId};