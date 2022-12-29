const socket = io();
let id = 0;
let message = document.getElementById("message");
let username = document.getElementById("username");
let btn = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

btn.addEventListener("click", function () {
  console.log(socket.id);
  socket.emit("chat:message", {
    id: socket.id,
    username: username.value,
    message: message.value,
  });
});
message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});
socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  username.value = "";
  message.value = "";
  output.innerHTML += `
    <p>
      <strong>Id: ${data.id}</strong>
      <strong>User: ${data.username}</strong>
      Message: ${data.message}
    </p>
  `;
});
socket.on("chat:typing", function (data) {
  actions.innerHTML = `
    <p>
      <em>${data} is typing a message</em>
    </p>
  `;
});
