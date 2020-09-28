let url = document.getElementById('url');
url.value = window.location.origin + '/reciever'

let copyUrl = () => {
  url.select();
  url.setSelectionRange(0, 99999);
  document.execCommand("copy");
}