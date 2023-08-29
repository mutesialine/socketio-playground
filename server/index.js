const express = require("express")
const app = express()
const http= require("http")
const {Server}=require("socket.io")
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

const messages ={
    random :[],
    general:[],
    Jokes:[]
}

let users=[]
 io.on("connection", socket=>{
    // socket.on("send_message", data => {
    // socket.broadcast.emit("receive_message",data)
    //  })
   socket.on('send message',({content,to , sender, chatName,isChannel})=>{
    if (isChannel){
        const payload={
            content,
            chatName,
            sender
        }
        socket.to(to).emit("new message",payload)
    }
    else{
        const payload={
            content,
            chatName:sender,
            sender
        }
        socket.to(to).emit("new message",payload)
    }
    if(messages[chatName]){
        messages[chatName].push({
            sender,
            content
        })
    }
   })

   socket.on("disonnect", ()=>{
    users=users.filter(u=>u.id !== socket.id)
    io.emit("new users",users)
   })

    socket.on('join server' ,username=>{
        const user ={
            username,
            id:socket.id
        }
        users.push(user)
        io.emit("new user", users)
    })

    socket.on("join room",(roomName , cb)=>{
        socket.join(roomName),
        cb(messages[roomName])
        socket.emit("joined",messages[roomName])
    })

 })


server.listen(3001,()=>{
    console.log('server is running')
}) 
