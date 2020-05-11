const { encrypt, decrypt } = require('../index')
const bsv = require('bsv')
const assert = require('assert')

let alicePub =
  '03e35344f623ddbbe1d1efde66be18960bf97d522888293b44338c24137a3e2020'
let alicePriv =
  '76aa67e33369aee9fc0b1e7575a3efaca996e057de1a2e8cdbbf499f26a32bcf'

let bobPub =
  '0235db552e975f92fa650b0aadf1e3ae066194da1cdd69d41407397ec6ff6d0bb1'
let bobPriv = 'f5ef02ca2ffd74114fb80d70e3ec42b621a1837bc5abcac7db7e4315a86a3ef4'

const message = 'Hello World!'
let encrypted = encrypt(bobPub, alicePriv, message)
let decrypted = decrypt(alicePub, bobPriv, encrypted)
assert.equal(decrypted.toString(), message)

const aliceKey = bsv.PrivateKey()
const bobKey = bsv.PrivateKey()
alicePub = aliceKey.publicKey.toString('hex')
alicePriv = aliceKey.toBuffer().toString('hex')

bobPub = bobKey.publicKey.toString('hex')
bobPriv = bobKey.toBuffer().toString('hex')

encrypted = encrypt(bobPub, alicePriv, message)
decrypted = decrypt(alicePub, bobPriv, encrypted)
assert.equal(decrypted.toString(), message)

console.log(`Passed!`, decrypted.toString())
