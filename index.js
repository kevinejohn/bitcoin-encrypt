const crypto = require('crypto-browserify')

function encrypt (publicKey, privateKey, buf) {
  if (!Buffer.isBuffer(buf)) buf = Buffer.from(buf)
  const ecdhA = crypto.createECDH('secp256k1')
  ecdhA.generateKeys('hex', 'compressed')
  ecdhA.setPrivateKey(privateKey, 'hex')
  const secret = ecdhA.computeSecret(publicKey, 'hex')
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv)
  const crypted = Buffer.concat([iv, cipher.update(buf), cipher.final()])
  return crypted
}
function decrypt (publicKey, privateKey, crypted) {
  if (!Buffer.isBuffer(crypted)) throw new Error(`Must be a buffer!`)
  const ecdhB = crypto.createECDH('secp256k1')
  ecdhB.generateKeys('hex')
  ecdhB.setPrivateKey(privateKey, 'hex')
  const secret = ecdhB.computeSecret(publicKey, 'hex')
  const iv = crypted.slice(0, 16)
  const decipher = crypto.createCipheriv('aes-256-ctr', secret, iv)
  const buf = Buffer.concat([
    decipher.update(crypted.slice(16)),
    decipher.final()
  ])
  return buf
}

module.exports = {
  encrypt,
  decrypt
}
