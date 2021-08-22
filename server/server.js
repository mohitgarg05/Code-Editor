const express = require('express'); 
const app = express();
const server = require("http").Server(app)    
const io = require('socket.io')(server , {
    cors : {
        origin : "http://localhost:3000",
    },
});

const cors = require('cors');
const bodyParser = require('body-parser');
const {v4: uuidV4}  = require('uuid');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.get("/",(req,res)=>{
    console.log("hello");
})

// app.post('/get/room',(req,res)=>{
//     console.log(req.body);
//     roomId = req.body.roomId
// })
io.on('connection',socket=>{
    socket.on('join-room',(roomId,userId)=>{
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId)
    })
})

server.listen(4000)