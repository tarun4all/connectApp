var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var shell = require('shelljs');

var execute = (command, i_o) => {
    var a;

    // a = shell.cd(command);
    a = shell.exec(command);
    console.log(a);
    i_o.emit('chat message', a.stdout ? a.stdout : "Done");
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        execute(msg, io);
    });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});