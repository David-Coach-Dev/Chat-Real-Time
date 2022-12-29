module.exports = (io) => {
  let n_user = 0;
  let chat_history = [];
  io.on("connection", (socket) => {
    n_user = n_user + 1;
    console.log(
      "new user connection",
      socket.id,
      "Usuarios conectados: ",
      n_user
    );
     for (let i in chat_history) {
       socket.emit('chat:message', { chat: chat_history[i] });
      }
    //chat
       socket.on("chat:message", function (data) {
      chat_history.push(data);
      io.sockets.emit("chat:message", data);
    });
    socket.on("chat:typing", function (data) {
      socket.broadcast.emit("chat:typing", data);
    });
    socket.on("disconnect", () => {
      n_user = n_user - 1;
      console.log(
        "user disconnected",
        socket.id,
        "Usuarios conectados: ",
        n_user
      );
    });
  });
};
