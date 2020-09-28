const socket = io.connect(window.location.origin);

let text = document.getElementById('text-container');

socket.on('typing', data => {
  text.innerHTML =  '<p id="text">' + data + '</p>';
});