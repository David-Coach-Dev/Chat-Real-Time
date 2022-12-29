const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
//initialize
const app = express();
const p = 4000;
const server = http.createServer(app);
const io = socketIO(server);
//settings
app.set('port', process.env.PORT || p);
//middleware

//sockets
require('./src/sockets')(io);

//routes

//static files
app.use(express.static('public'));
//starting server
server.listen(app.get('port'),() => {
  console.log('server on port ', p, `http://localhost:${p}`);
});
