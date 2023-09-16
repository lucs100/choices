import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io'

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static('static'))

var users = []

app.get('/', (req, res) => {
  res.sendFile('./index.html', {root: '.'});
});

io.on('connection', (socket) => {
    console.log('new user connected! userID: ' + socket.id);
    const playerCount = users.length + 1;
    users[socket.id] = "player" + playerCount;
    console.log(users);
    io.emit('new player', users)
    socket.on('disconnect', () => {
        console.log('user disconnected... :(' + socket.id);
            });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});