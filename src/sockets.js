module.exports = io => {
  let n_user = 0;
  let line_history = [];
  io.on('connection', (socket) => {
    n_user=n_user+1;
    console.log('new user connection', socket.id, 'Usuarios conectados: ', n_user);
    //pizarra
    for (let i in line_history) {
      socket.emit('draw_line', { line: line_history[i] });
    }
    socket.on('draw_line', (data) => {
      line_history.push(data.line);
      io.emit('draw_line', data);
    });
    socket.on('disconnect', () => {
      n_user=n_user-1;
      console.log('user disconnected', socket.id, 'Usuarios conectados: ', n_user);
    });
    //chat
    socket.on('chat:message', (data) => {
      io.socket.emit('chat:message', data);
      io.emit('chat:message', data);
    });
  });
  
}