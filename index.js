var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require('mongodb').MongoClient;

var users = [];
mongo.connect('mongodb://127.0.0.1/chat', function(err, db) {
    app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });

    app.get('/css/*', function(req, res){
    res.sendFile(__dirname + req.path);
    });

    app.get('/users', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(users));
    });

    io.on('connection', function(socket){
        socket.on('chat message', function(msg){
            io.emit('chat message', msg);
        });
        socket.on('set nickname', function(nickname) {
            console.log('nickname received', nickname);
            users.push(nickname);
            console.log(users);
        });
        socket.on('disconnect', function () {
            //socket.emit('disconnected');
            console.log('disconnected. should remove user');
        });
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
