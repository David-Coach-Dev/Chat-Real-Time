const socket = io();
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function () {
  console.log({
    username: username.value,
    message: message.value,
  });
  socket.emit('chat:message', {
    id: socket.id,
    username: username.value,
    message: message.value,
  });
});
socket.on('chat:message', function (data) {
  console.log(data);
  output.innerHTML += `
    <p>
      <strong>${data.id}</strong><br/>
      <strong>${data.username}</strong>:  ${data.message}
    </p>
  `;
});
