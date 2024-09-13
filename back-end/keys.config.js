const crypto = require('node:crypto');
const fs = require('fs');

require('dotenv').config();

const ACCESS_TOKEN_PASSPHRASE = process.env.ACCESS_TOKEN_PASSPHRASE;
const ACCESS_PUBLIC_KEY_PATH = process.env.ACCESS_PUBLIC_KEY_PATH;
const ACCESS_PRIVATE_KEY_PATH = process.env.ACCESS_PRIVATE_KEY_PATH;

const REFRESH_TOKEN_PASSPHRASE = process.env.REFRESH_TOKEN_PASSPHRASE;
const REFRESH_PUBLIC_KEY_PATH = process.env.REFRESH_PUBLIC_KEY_PATH;
const REFRESH_PRIVATE_KEY_PATH = process.env.REFRESH_PRIVATE_KEY_PATH;

function generateKeyPair(passphrase, publicKeyPath, privateKeyPath) {
  crypto.generateKeyPair(
    'rsa',
    {
      modulusLength: 4096,
      publicExponent: 0x10001,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase,
      },
    },
    (err, publicKey, privateKey) => {
      fs.writeFileSync(publicKeyPath, publicKey);
      fs.writeFileSync(privateKeyPath, privateKey);
    },
  );
}

generateKeyPair(
  ACCESS_TOKEN_PASSPHRASE,
  ACCESS_PUBLIC_KEY_PATH,
  ACCESS_PRIVATE_KEY_PATH,
);

generateKeyPair(
  REFRESH_TOKEN_PASSPHRASE,
  REFRESH_PUBLIC_KEY_PATH,
  REFRESH_PRIVATE_KEY_PATH,
);
