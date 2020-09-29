var CryptoJS = require("crypto-js");
const { getSecretKey } =  require('./service');
const socket = io.connect(window.location.origin);

const url = document.getElementById('url');
const message = document.getElementById('message');
const btn = document.getElementById('btn-copy');
const SECRET_KEY = getSecretKey(12);
window.location.hash = SECRET_KEY;
console.log(window.location);
url.value = window.location.origin + '/reciever' + window.location.hash;

btn.addEventListener('click', () => {
  url.select();
  url.setSelectionRange(0, 99999);
  document.execCommand('copy');
})

const encryptMessage = (message, key) => {
  return CryptoJS.AES.encrypt(message, key).toString();
}

const createHmac = (message, key) => {
  return CryptoJS.HmacSHA1(message, key).toString();
};

message.addEventListener('keypress', () => {
  // BUG: last character appears only a new keypress
  let hmac = createHmac(message.value, SECRET_KEY);
  let encryptedMessage = encryptMessage(message.value, SECRET_KEY);
  socket.emit('typing', { encryptedMessage, hmac });
});
