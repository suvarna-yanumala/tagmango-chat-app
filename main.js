import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import http from 'http'
import socketio from 'socket.io'

import {addUser,removeUser,getUser,getUserInRoom} from './user/user'

const PORT = 5000;
let app = express()

const server = http.createServer(app);
const io = socketio(server);
let routers = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Serve public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);

routers.get('/', function (req, res) {
    res.sendFile('index.html');
})

io.on('connection', (socket) => {

	socket.on('join', ({name,room},callback) => {
		const{error,user} = addUser({id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}.`});

    socket.broadcast.to(user.room).emit('message',{user: 'admin', text: `${user.name} has joined!`})

    io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});

    callback();
		
	});

	socket.on('sendMessage', (message,callback) =>{
		const user = getUser(socket.id);
	
		io.to(user.room).emit('message', {user: user.name, text: message});
		// io.to(user.room).emit('roomData', {room: user.room, text: message});
	
		callback();
	  });
	
	  socket.on('disconnect',()=>{
		const user = removeUser(socket.id);
		if(user){
		  io.to(user.room).emit('message',{user: 'admin', text: `${user.name} has left`});
		  io.to(user.room).emit('roomData', {room: user.room, users: getUserInRoom(user.room)});
		}
	  })
});


server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

// routers.post("/api/reister", addUser);
// // routers.get("/api/login", signin);
// routers.get("/api/getUsers", getUsers);
