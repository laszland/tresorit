var CryptoJS = require("crypto-js");

const socket = io.connect(window.location.origin);

const text = document.getElementById('text-container');
const SECRET_KEY = window.location.hash.substr(1);

socket.on('typing', data => {
  console.log(SECRET_KEY);
  let message = CryptoJS.AES.decrypt(data, SECRET_KEY).toString(CryptoJS.enc.Utf8);
  text.innerHTML = '<p id="text">' + message + '</p>';
});
