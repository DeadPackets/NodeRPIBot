  /*
TODO:
*/

var express = require('express');
const colors = require('colors');
var app = express();
var http = require('http')
var httpport = 80;



//Logging functions
var log = {
    error: function(data) {
        var date = new Date();
        console.log('ERROR'.red, data);
    },
    info: function(data) {
        var date = new Date();
        console.log('INFO'.green, data);
    },
    warn: function(data) {
        var date = new Date();
        console.log('WARN'.yellow, data);
    },
    debug: function(data) {
        console.log('DEBUG'.blue, data);
    }
}

var serverhttp = http.createServer(app).listen(httpport, function() {
    log.info("Express server listening on port " + httpport);
});
serverhttp.listen(80);

//SOCKET.IO INIT
var io = require('socket.io')(serverhttp)

app.use(express.static(__dirname + '/web'));

app.get('/', function(req, res) {
    log.debug(req.connection.remoteAddress + " GET /")
    res.sendFile('file');
});

//Custom 404
app.use(function(req, res) {
    res.send('404: Page not Found').status(404);
    log.warn(req.connection.remoteAddress + " [404] GET " + req.url)
});

io.on('connection', function(socket, next) {
    log.info(socket.handshake.address + " has connected.")
})

