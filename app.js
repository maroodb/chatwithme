

var http = require('http');
var fs = require('fs');



var server = http.createServer(function(req, res) {

    fs.readFile('./index.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});


var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket) {
    console.log('new client is connected..');

    socket.on('new_user', function(username) {
		socket.username = username ; 
		socket.broadcast.emit('notification', "...... "+username + " join the chatroom.") ;
	});

    socket.on('chatroom', function(message) {
		username = socket.username ; 
		socket.broadcast.emit('message', username + ": "+message) ;
	});

});







server.listen(8080); 