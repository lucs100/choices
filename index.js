import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: '.'});
});

io.on('connection', (socket) => {
    console.log('new user connected!');
    socket.on('disconnect', () => {
        console.log('user disconnected... :(');
    });
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});