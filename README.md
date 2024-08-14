# Device Crypto Toolkit

Device Crypto Toolkit is a simple JavaScript utility for generating key pairs, signing device IDs, and verifying signatures. This tool is primarily intended for demonstration and testing purposes in device authentication scenarios.

## Features

- Generate Ed25519 key pairs
- Sign device IDs using the private key
- Verify signatures using the public key

## Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your system. This project supports both [npm](https://www.npmjs.com/) and [yarn](https://yarnpkg.com/) as package managers.

## Usage

Run the script:

Using npm:
```
npm start
```

Or using Yarn:
```
yarn start
```

The script will prompt you to enter a device ID. After input, it will generate a key pair, sign the device ID using the private key, and then verify the signature using the public key.

Example output:

```
Please enter the device ID: myDevice123

Result:
Public Key: (base64 encoded public key)
Private Key: (base64 encoded private key)
Device ID: myDevice123
Signature: (base64 encoded signature)
Signature Verification: Valid
```

## Code Overview

The main functions in the script are:

- `generateKeyPair()`: Generates an Ed25519 key pair.
- `sign(privateKeyBase64, message)`: Signs a message using the private key.
- `verify(publicKeyBase64, signatureBase64, message)`: Verifies a signature using the public key.

## Project Structure

- `crypto-script.js`: The main script containing all the cryptographic functions.
- `package.json`: Defines the project dependencies and scripts.
