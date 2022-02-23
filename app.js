var express = require('express');
var app = express();
var cors = require('cors')

///////////////////////////////////////////////////////////////
// var ExpressPeerServer = require('peer').ExpressPeerServer;

app.use(cors())

var server = require('http').createServer(app);
// var io = require('socket.io')(server);

app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/custom_modules'));


var options = {
    debug: true
}
////////////////////////////////////////////////////////
// app.use('/api', ExpressPeerServer(server, options));


app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');

});

// app.get('/:tagId', function(req, res) {
//   // res.send("tagId is set to " + req.params.tagId);
//   res.sendFile(__dirname + '/test.html');
// });
// io.on('connection', function(client) {
//     console.log('Hello..tan.');
//
//     client.on('join', function(data) {
//         console.log(data);
//         // client.emit('messages', 'Hello from server bitch');
//
//     });
//
//     client.on('messages', function(data) {
//             client.emit('broad', data);
//             client.broadcast.emit('broad',data);
//      });
//
//
//       });
///////////////////////////////////////////////////////////
// server.on('connection', function(id) {
//   console.log("Connect called");
//   console.log(id);
//   console.log(".................................................................");
//   // console.log(id);
// });
//
// server.on('disconnect', function(id) {
//   console.log("Disconnect called");
//   // console.log(id);
// });

server.listen(9000);
