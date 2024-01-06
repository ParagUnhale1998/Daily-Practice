const http = require("http")
const express = require("express")
const cors = require("cors")
const socketIo = require("socket.io")

const app = express()

const port = process.env.PORT || 4500; // Correct the port selection

const sever = http.createServer(app)

const users = [
    {}
]

const io = socketIo(sever)
io.sockets.setMaxListeners(15);

app.use(cors())
app.get("/", (req, res) => {
    res.send("hello Its Working")
})
 
io.on("connection", (socket) => {  //1
    console.log('Socket Connected Backend')
    //get data.user or use destructuring like {user}
    //emit = data send 
    //on = data recive

    socket.on('joined', ({ user }) => { //2
        users[socket.id] = user
        console.log(user + ' has joined');
        socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]} has Joined`}) //5
    });
    socket.on('message',({message,id}) => { //6
        // io = for all circit message goes
     io.emit('sendMessage',{ user: users[socket.id],message,id})
    })
    socket.emit('Welcome', { user: 'Admin ', message: `Welcome to the chat` }) //3
    // broadcast = message send for all other users not you  
    socket.on('disconnect',() => { //4
        socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]} has left`})
        console.log('user left')
    })
    // socket.on('disconnect', () => {
    //     const leftUser = users[socket.id];
    //     if (leftUser) {
    //         delete users[socket.id];
    //         io.emit('userLeft', { user: "Admin", message: `${leftUser} has left the chat` });
    //     }
    // });
    
})
sever.listen(port, () => {
    console.log("server is working on Local Host:" + port)
})
