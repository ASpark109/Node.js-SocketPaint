let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let fs = require('fs');

let bitField = [];

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/staticfile'))

io.on('connection', function(socket) {
    socket.emit('nameSet');

    socket.on('newNameSet', (name) => {
        let time = new Date();
        logDataAppend("New user \"" + name + "\" connected " + 
            time.getHours() + ":" + 
            time.getMinutes() + ":" + 
            time.getSeconds() + " /" + 
            time.getDate() + "/" + 
            time.getMonth() + "/" + 
            time.getFullYear() + "\n");

        socket.broadcast.emit('newUser', name)

        socket.emit('updata', bitField)
   
        socket.on('disconnect', function () {
           console.log('A user disconnected');
        });
    
        socket.on('clickTrue', function (x, UserActName) {
            logDataAppend("U " + UserActName + " (t) " + x + "\n")
            bitField[x] = true;
            io.sockets.emit('broadcast', x, true);
            socket.broadcast.emit('userAction', UserActName, x)
        });

        socket.on('clickFalse', function (x, UserActName) {
            logDataAppend("U " + UserActName + " (f) " + x + "\n")
            bitField[x] = false;
            io.sockets.emit('broadcast', x, false);
            socket.broadcast.emit('userAction', UserActName, x)
        });
    })
 });

http.listen(3000, function() {
    console.log('listening on localhost:3000');
 });


function logDataAppend(data)
{
    fs.appendFile('logfile.txt', data, 'utf-8', (err)=>{
        if(err)
        {
            console.log(err);
        }
    })
}
