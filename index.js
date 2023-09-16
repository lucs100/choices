import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

var userNames = {}

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: '.'});
});

io.on('connection', (socket) => {
    console.log('new user connected! userID: ' + socket.id);
    socket.emit('new player', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected... :(' + socket.id);
    });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});