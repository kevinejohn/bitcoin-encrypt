# Bitcoin Encrypt

[![NPM Package](https://img.shields.io/npm/v/bitcoin-encrypt.svg?style=flat-square)](https://www.npmjs.org/package/bitcoin-encrypt)


Using Bitcoin address key pairs for encrypted messaging

# Install

```
npm install bitcoin-encrypt --save
```

# Use

```
const { encrypt, decrypt } = require('bitcoin-encrypt');

// https://bitcore.io/playground/#/address

// Alice's Bitcoin Address: 1McM18AHhVp6FkjGjQevskr7H755KWseM9
const alicePub = '036b019a209248bc2e2485dca4741aa089e389b32283fc8198d8d9ac402ccb7aa9'
const alicePriv = '395ab0d7a5a9ab9518cf9fd4b79ce567ed4ae4c413bc4c5b9c68ad4bce1ccd3b';

// Bob's Bitcoin Address: 1DopxgTr1UqiLNQEEPqC2TbP4eqyVSvi1a
const bobPub = '03f082645af35a40687188f87291b1e21a511731bbea804ac468ed6384ae44adbc';
const bobPriv = '1d42b09be4d78519331f1d6034d07397322e5cb427428cdc4ac7fd04fd154f09';

// Alice encrypts message to Bob using Bob's public key
const message = 'Hello World!';
const encrypted = encrypt(bobPub, alicePriv, message);

// Bob decrypts message using Alice's public key
const decrypted = decrypt(alicePub, bobPriv, encrypted);

assert(message === decrypted);
```

# Tests

```
npm test
```

# Other

Inspired by: https://medium.com/@dealancer/how-to-using-bitcoin-key-pairs-to-for-encrypted-messaging-a0a980e627b1
