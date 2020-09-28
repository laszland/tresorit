const socket = io.connect(window.location.origin);

let url = document.getElementById('url');
let message = document.getElementById('message');
url.value = window.location.origin + '/reciever'

let copyUrl = () => {
  url.select();
  url.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

message.addEventListener('keypress', () => {
  socket.emit('typing', message.value);
});