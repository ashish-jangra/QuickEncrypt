const test = require('tape')

const { generate, encrypt, decrypt } = require('../index')

const message = 'This is some super top secret text!'

test('QuickEncrypt tests', function(t) {
  const keys = generate(1024)

  t.test('Keypair Generation', function (t) {
    t.plan(5)
    t.ok(keys, 'Check keys are defined')
    t.equal(keys.public.slice(0, 31), '-----BEGIN RSA PUBLIC KEY-----\n', 'Public key begins correctly')
    t.equal(keys.public.slice(-29), '-----END RSA PUBLIC KEY-----\n', 'Public key ends correctly')
    t.equal(keys.private.slice(0, 32), '-----BEGIN RSA PRIVATE KEY-----\n', 'Private key begins correctly')
    t.equal(keys.private.slice(-30), '-----END RSA PRIVATE KEY-----\n', 'Private key ends correctly')
  })

  let encryptedText;

  // --- Test 2: Encrypt using public key ---
  t.test('Encryption using public key', function (t) {
    t.plan(2)
    t.ok(encrypt(message, keys.public), 'Encryption succeeds')
    encryptedText = encrypt(message, keys.public);

    let decryptedText;
    // --- Test 3: Decrypt using private key ---
    t.test('Decryption using private key', function (t) {
      t.plan(2)
      t.ok(decrypt(encryptedText, keys.private), 'Decryption succeeds')
      decryptedText = decrypt(encryptedText, keys.private);
      t.equal(decryptedText, message, 'Message is correctly decrypted')
    })
  })
})

