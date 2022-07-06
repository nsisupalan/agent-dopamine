'use strict';

const crypto = require('crypto');
const ENC_KEY = "5VvXB4zxY7aka8jbw4mz6gQDWGL7NW8q"; // set random encryption key
const IV = "mzedW7VKdJ85yrSQ"; // set random initialisation vector
// ENC_KEY and IV can be generated as crypto.randomBytes(32).toString('hex');

const phrase = "who let the dogs out";

const encrypt = ((val) => {
  let cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, IV);
  let encrypted = cipher.update(val, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
});

const decrypt = ((encrypted) => {
  let decipher = crypto.createDecipheriv('aes-256-cbc', ENC_KEY, IV);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  return (decrypted + decipher.final('utf8'));
});

module.exports = {
    encrypt,
    decrypt
}