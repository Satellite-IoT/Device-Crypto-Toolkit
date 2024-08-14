const crypto = require('crypto');
const readline = require('readline');

function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  return {
    publicKey: publicKey.export({ format: 'der', type: 'spki' }).toString('base64'),
    privateKey: privateKey.export({ format: 'der', type: 'pkcs8' }).toString('base64'),
  };
}

function sign(privateKeyBase64, message) {
  const privateKeyDer = Buffer.from(privateKeyBase64, 'base64');
  const key = crypto.createPrivateKey({
    key: privateKeyDer,
    format: 'der',
    type: 'pkcs8',
  });
  const signature = crypto.sign(null, Buffer.from(message), key);
  return signature.toString('base64');
}

function verify(publicKeyBase64, signatureBase64, message) {
  try {
    const publicKeyDer = Buffer.from(publicKeyBase64, 'base64');
    const key = crypto.createPublicKey({
      key: publicKeyDer,
      format: 'der',
      type: 'spki',
    });
    const signature = Buffer.from(signatureBase64, 'base64');
    return crypto.verify(null, Buffer.from(message), key, signature);
  } catch (error) {
    console.error('Verification Error:', error);
    return false;
  }
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter the device ID: ', (deviceId) => {
    const { publicKey, privateKey } = generateKeyPair();
    const signature = sign(privateKey, deviceId);
    const isValid = verify(publicKey, signature, deviceId);

    console.log('\nResult:');
    console.log('Public Key:', publicKey);
    console.log('Private Key:', privateKey);
    console.log('Device ID:', deviceId);
    console.log('Signature:', signature);
    console.log('Signature Verification:', isValid ? 'Valid' : 'Invalid');

    rl.close();
  });
}

main();
