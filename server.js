'use strict';

const http = require('http');

var server = http.createServer(function(request, response){
	response.writeHead(200, {"Content-Type": "text/html"});
	response.end("this is socket server");
});

const io = require('socket.io').listen(server);

io.on('connection', function(socket){  
	console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log('incoming msg: ' + JSON.stringify(msg))
		io.emit('chat message', msg);
	});
	
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

server.listen(3000);
console.log('listening on *:3000');