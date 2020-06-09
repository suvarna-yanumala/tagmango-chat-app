import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import {addUser,getUsers} from './user/user'

const PORT = 5000;
let app = express()

const http = require('http').Server(app);
const io = require('socket.io')(http);
let routers = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Serve public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routers);

routers.get('/', function (req, res) {
    res.sendFile('index.html');
})

io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', message => {
		console.log('message: ' + message);
		//Broadcast the message to everyone
		io.emit('message', message);
	});
});


app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

routers.post("/api/reister", addUser);
// routers.get("/api/login", signin);
routers.get("/api/getUsers", getUsers);
