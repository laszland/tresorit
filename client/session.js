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

const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
}

message.addEventListener('keypress', () => {
  // BUG: last character appears only a new keypress
  let encryptedMessage = encryptMessage(message.value);
  socket.emit('typing', encryptedMessage);
});
