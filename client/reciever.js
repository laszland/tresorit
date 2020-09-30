const { decryptMessage, isDataUntouched } = require('./service');

const socket = io.connect(window.location.origin);

const text = document.getElementById('text-container');
const SECRET_KEY = window.location.hash.substr(1);

socket.on('typing', data => {
  const message = decryptMessage(data.encryptedMessage, SECRET_KEY);
  if (isDataUntouched(message, data.hmac, SECRET_KEY)) {
    text.innerHTML = '<p id="text">' + message + '</p>';
  } else {
    text.innerHTML = '<p class="red"> This is a warning message! The chanel is not secure, please close it! </p>';
  }
});
