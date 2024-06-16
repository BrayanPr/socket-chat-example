const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        // // If you want to send a message to everyone except for a certain emitting 
        // // socket, we have the broadcast flag for emitting from that socket:

        // socket.broadcast.emit('chat message', 'msg');

        // this will emit the event to all connected sockets
        io.emit('chat message', msg);
        console.log(msg)
    });
});

server.listen(8000, () => {
    console.log('server running at http://localhost:8000');
});