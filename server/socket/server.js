
//web socket
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var chatModel = require('./api/models/chatModel');
users = [];
connections = [];

//server connection
server.listen(process.env.PORT || 3000);
console.log ('Server is running.....');

//routing
app.get ('/', function(req, res){
  res.sendFile(__dirname + '/chatroom.html');
});

//server-socket.io
io.on('connection', function(socket){

        //to connect user
        connections.push(socket);
        console.log('connected: %s user is connected', connections.length);

        //to disconnect user
        socket.on('disconnect',function(data){
          users.splice(users.indexOf(socket.username), 1);
          updateUsernames();
          connections.splice(connections.indexOf(socket), 1);
          console.log('disconnected: %s user is disconnected', connections.length);
        });

        //to boardcast message
        socket.on('send message', function(data){
          console.log(data);
          io.sockets.emit('new message', {msg: data, user: socket.username});
        });

        //to add new users
        socket.on('new user', function (data, callback) {
              callback(true);
              socket.username = data;
              users.push(socket.username);
              updateUsernames();
        });

        function updateUsernames () {
              io.sockets.emit('get users', users);
        };
});

// //connect to mongodb
// mongoose.connect('mongodb://localhost/FotoScoutDB');
//
// mongoose.connection.on('open', function (ref) {
//   console.log('Connected to mongo server.');
// });
// mongoose.connection.on('error', function (err) {
//   console.log('Could not connect to mongo server!');
//   console.log(err);
// });
// module.exports.online=mongoose.model('online',new Schema({
//   handle:String,
//   connection_id:String
// }));
// module.exports.messages=mongoose.model('message',new Schema({
//   message : String,
//   sender  : String,
//   reciever: String,
//   date    : Date
// }));
