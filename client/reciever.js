const { decryptMessage, isDataUntouched } = require('./service');

const socket = io.connect(window.location.origin);

const text = document.getElementById('text-container');
const warning = document.getElementById('warning');
const SECRET_KEY = window.location.hash.substr(1);

if (SECRET_KEY === '' || SECRET_KEY === undefined) {
  warning.innerHTML = '<p class="warning" data-test="noAccessMessage"> You have no access to any chanel. </p>';
  socket.close();
}

socket.on('typing', data => {
  const message = decryptMessage(data.encryptedMessage, SECRET_KEY);
  if (isDataUntouched(message, data.hmac, SECRET_KEY)) {
    text.innerHTML = '<p id="text" data-test="messageText">' + message + '</p>';
  } else {
    warning.innerHTML = '<p class="warning"> This is a warning message! The chanel is not secure, please close it! </p>';
    socket.close();
  }
});
