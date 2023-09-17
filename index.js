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
    const playerCount = users.length;
    var newUser = new Object();
    newUser.id = socket.id;
    newUser.name = socket.id;
    users[playerCount] = newUser;
    console.log(users);
    io.emit('player update', users);
    socket.on('disconnect', () => {
        console.log('user disconnected... :( ' + socket.id);
        var targetUser = users.find((element) => element.id == socket.id)
        users.splice(users.indexOf(targetUser), 1); //remove 1 item at index of id
        io.emit('player update', users);
        console.log(users);
    });
});

io.on('connection', (socket) => {
  console.log("name change watcher ready");
  socket.on('name change', (pkg) => {
    console.log("Name change: " + pkg.id + " changed name to " + pkg.name);
    var targetIdx = users.findIndex((element) => element.id == pkg.id);
    users[targetIdx] = pkg;
    console.log("USERS!");
    console.log(users);
    io.emit('player update', users);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});