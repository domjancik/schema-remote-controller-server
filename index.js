var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static('public'));

// app.get('/background.png', function(req, res){
//   res.sendFile(__dirname + '/background.png');
// });

io.on('connection', function(socket){
  console.log('user joined');
  // REFWD MESSAGE PAYLOAD
  socket.on('sendMeSomething', function(msg){
    console.log('Received ' + msg + ' from client, refowarding ...');
    io.emit('serverTalking', {message: msg, username: "asd"});
  });

  socket.on('listGroups', () => {
    console.log("Request groups list");
    socket.broadcast.emit('listGroups')
  })

  socket.on('listContent', () => {
    console.log("Request content list");
    socket.broadcast.emit('listContent')
  })

  socket.on('listStacks', () => {
    console.log("Request content list");
    socket.broadcast.emit('listStacks')
  })

  socket.on('loadContent', msg => {
    console.log("Request content load: " + JSON.stringify(msg));
    socket.broadcast.emit('loadContent', msg)
  })

  socket.on('assignStack', msg => {
    console.log("Request stack assign: " + JSON.stringify(msg));
    socket.broadcast.emit('assignStack', msg)
  })

  socket.on('groups', msg => {
    console.log('groups: ' + msg);
    socket.broadcast.emit('groups', msg)
  })

  socket.on('content', msg => {
    console.log('content: ' + msg);
    socket.broadcast.emit('content', msg)
  })

  socket.on('stacks', msg => {
    console.log('stacks: ' + msg);
    socket.broadcast.emit('stacks', msg)
  })

  // DISCONNECT
  socket.on('disconnect', function(){
    console.log('user left');
  });
});

http.listen(port, function(){
  console.log("Welcome to the Schéma Remote Controller server");
  console.log('listening on : ' + port);
});
