const {
  getSecretKey,
  encryptMessage,
  createHmac
} = require('./service');
const socket = io.connect(window.location.origin);

const url = document.getElementById('url');
const message = document.getElementById('message');
const btn = document.getElementById('btn-copy');
const SECRET_KEY = getSecretKey(12);
window.location.hash = SECRET_KEY;
url.value = window.location.origin + '/reciever' + window.location.hash;

btn.addEventListener('click', () => {
  url.select();
  url.setSelectionRange(0, 99999);
  document.execCommand('copy');
});

message.addEventListener('keyup', () => {
  const hmac = createHmac(message.value, SECRET_KEY);
  const encryptedMessage = encryptMessage(message.value, SECRET_KEY);
  socket.emit('typing', { encryptedMessage, hmac });
});
