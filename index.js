const crypto = require('crypto-browserify');

function encrypt(publicKey, privateKey, text) {
  const ecdhA = crypto.createECDH('secp256k1');
  ecdhA.generateKeys('hex', 'compressed');
  ecdhA.setPrivateKey(privateKey, 'hex');
  const secret = ecdhA.computeSecret(publicKey, 'hex');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-ctr', secret, iv);
  let crypted = iv.toString('binary');
  crypted += cipher.update(text, 'binary', 'binary');
  crypted += cipher.final('binary');
  return crypted;
}
function decrypt(publicKey, privateKey, crypted) {
  const ecdhB = crypto.createECDH('secp256k1');
  ecdhB.generateKeys('hex');
  ecdhB.setPrivateKey(privateKey, 'hex');
  const secret = ecdhB.computeSecret(publicKey, 'hex');
  const iv = crypted.slice(0, 16);
  const decipher = crypto.createCipheriv(
    'aes-256-ctr',
    secret,
    new Buffer(iv, 'binary')
  );
  let text = decipher.update(crypted.slice(16), 'binary', 'binary');
  text += decipher.final('binary');
  return text;
}

module.exports = {
  encrypt,
  decrypt,
};
