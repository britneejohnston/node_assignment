var http = require('http');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var logger = new EventEmitter();

logger.on('error', function(message) {
	console.log('ERROR: ' + message);
});

logger.on('info', function(message) {
	console.log('INFO: ' + message);
});

http.createServer(function(request, response) {
	fs.readFile('index.html', function(err, content) {
		if (err) {
			response.write(500, 'text/plain');
			logger.emit('error', err);
			response.end('ERROR');
		} else {
			response.writeHead(200, 'text/html');
			logger.emit('info', 'Rendered index.html');
			response.end(content);
		}
	});
	
}).listen(8080);

console.log("Server running at http://localhost:8080");
