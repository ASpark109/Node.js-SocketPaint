let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let bitField = [];

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/staticfile'))

io.on('connection', function(socket) {
    console.log('A user connected');
    
    socket.emit('updata', bitField)
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });

    socket.on('clickTrue', function (x) {
        console.log('A user clicked true - ' + x);
        bitField[x] = true;
        io.sockets.emit('broadcast', x, true);
    });
    socket.on('clickFalse', function (x) {
        console.log('A user clicked false - ' + x);
        bitField[x] = false;
        io.sockets.emit('broadcast', x, false);
    });
 });

http.listen(3000, function() {
    console.log('listening on localhost:3000');
 });