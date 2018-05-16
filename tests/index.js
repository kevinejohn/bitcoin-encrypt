const test = require('tape');
const { encrypt, decrypt } = require('../index');
const bcoin = require('bcoin');

function genKeypair(phrase) {
  const mn = new bcoin.hd.Mnemonic({ phrase });
  const master = bcoin.hd.from(mn);
  const key = master.derivePath(`m/44'/0'/0'/0/0`);
  const keyring = new bcoin.keyring(key.privateKey);
  const pub = keyring.getPublicKey('hex');
  const priv = keyring.getPrivateKey('hex');
  return { pub, priv };
}

test('1 Test encrypt and decrypt using Bitcoin address', t => {
  t.plan(1);
  const alicePub =
    '03e35344f623ddbbe1d1efde66be18960bf97d522888293b44338c24137a3e2020';
  const alicePriv =
    '76aa67e33369aee9fc0b1e7575a3efaca996e057de1a2e8cdbbf499f26a32bcf';

  const bobPub =
    '0235db552e975f92fa650b0aadf1e3ae066194da1cdd69d41407397ec6ff6d0bb1';
  const bobPriv =
    'f5ef02ca2ffd74114fb80d70e3ec42b621a1837bc5abcac7db7e4315a86a3ef4';

  const message = 'Hello World!';
  const encrypted = encrypt(bobPub, alicePriv, message);
  const decrypted = decrypt(alicePub, bobPriv, encrypted);
  t.equal(decrypted, message);
  t.end();
});

test('2 Test encrypt and decrypt using a generated Bitcoin address using bcoin', t => {
  t.plan(1);
  const keyAlice = genKeypair();
  const keyBob = genKeypair();

  const message = 'Hello World!';
  const encrypted = encrypt(keyBob.pub, keyAlice.priv, message);
  const decrypted = decrypt(keyAlice.pub, keyBob.priv, encrypted);
  t.equal(decrypted, message);
  t.end();
});
