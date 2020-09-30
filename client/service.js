var CryptoJS = require('crypto-js');

const getSecretKey = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const encryptMessage = (message, key) => {
  return CryptoJS.AES.encrypt(message, key).toString();
};

const decryptMessage = (message, key) => {
  return CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8);
};

const createHmac = (message, key) => {
  return CryptoJS.HmacSHA1(message, key).toString();
};

const isDataUntouched = (message, recievedHmac, key) => {
  const ownHmac = createHmac(message, key);
  return ownHmac === recievedHmac;
};

module.exports = { getSecretKey, encryptMessage, decryptMessage, createHmac, isDataUntouched };
