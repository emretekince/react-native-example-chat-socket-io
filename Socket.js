'use strict';

window.navigator.userAgent = 'react-native';
const io =  require('socket.io-client/socket.io');

class Socket {
	constructor() {
		this.socket = io('http://localhost:3000', {jsonp: false});
	}

	onConnect(cb){
		this.socket.on('connect', function(){
			cb()
		});
	}
	onError(cb){
		this.socket.on('connect_error', function(err){
			cb(err)
		});
	}

	fetchMessages(cb){
		this.socket.on('chat message', function(msg){
			cb(msg)
		});
	}

	sendMessage(msg){
		this.socket.emit('chat message', msg);
	}
}

module.exports = Socket;   