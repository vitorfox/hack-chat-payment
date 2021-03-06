var app = require('express')();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var payment = require('./modules/payment.js');

var users_online = [];

app.get('/dist/scripts/*', function(req, res){
    res.sendFile(__dirname + req.path);
});

app.get('/dist/images/*', function(req, res){
    res.sendFile(__dirname + req.path);
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/dist/css/*', function(req, res){
    res.sendFile(__dirname + req.path);
});

app.get('/css/*', function(req, res){
    res.sendFile(__dirname + req.path);
});

app.get('/users', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(users));
});

io.on('connection', function(socket){
    var session_id = socket.id;

    socket.on('chat message', function(msg){
        io.emit('chat message', {"message": msg, "session_id": session_id});
    });
    socket.on('set nickname', function(data) {

        io.sockets.connected[session_id].emit('session info', {"id" : session_id});

        console.log('nickname received', data.nickname);
        // var users = db.collection("users");
        // users.find({ "nickname": data.nickname }).count(function(err, count){
        //     if (count == 0) {
        //         users.insert({ "nickname": data.nickname });
        //     }
        var nicknameIsPresent = false;
        for (var i = 0; i < users_online.length; i++) {
            if (data.nickname == users_online[i].nickname) {
                nicknameIsPresent = true;
                users_online[i].session_id = session_id;
            }
        }

        if (!nicknameIsPresent) {
            users_online.push({ "nickname": data.nickname, "session_id": session_id });
        }
        console.log(users_online);
        //});
    });

    socket.on('send charge', function(data) {
        console.log('on send charge', data);

        io.sockets.connected[session_id].emit('charge sent message', data);

        users_online.forEach(function(obj, idx) {
            if (obj.session_id !== session_id) {
                console.log(obj.session_id);
                io.sockets.connected[obj.session_id].emit('charge message', data);
            }
        });
    });

    socket.on('send payment', function(data) {
        payment.pay().then(function(){
            users_online.forEach(function(obj, idx) {
                io.sockets.connected[obj.session_id].emit('payment finished', data);
            });
        }).catch(function(){
            console.log('Fail to pay!');
        });
    });

    socket.on('disconnect', function () {
        console.log('disconnected. should remove user');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
