var CryptoJS = require("crypto-js");

const socket = io.connect(window.location.origin);

const text = document.getElementById('text-container');
const SECRET_KEY = window.location.hash.substr(1);

const isDataUntouched = (message, recievedHmac, key) => {
  let ownHmac = CryptoJS.HmacSHA1(message, key).toString();
  console.log("Own Hmac: ", ownHmac);
  console.log(recievedHmac);
  return ownHmac === recievedHmac;
};

socket.on('typing', data => {
  let message = CryptoJS.AES.decrypt(data.encryptedMessage, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  if (isDataUntouched(message, data.hmac, SECRET_KEY)) {
    text.innerHTML = '<p id="text">' + message + '</p>';
  } else {
    text.innerHTML = '<p class="red"> This is a warning message! The chanel is not secure, please close it! </p>';
  };
});
