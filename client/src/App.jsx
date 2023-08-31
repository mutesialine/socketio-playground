/* eslint-disable no-unused-vars */
import io from "socket.io-client";
import { useRef, useState } from "react";
import Chat from "./components/Chat";
import Form from "./components/Form";
const socket = io.connect("http://localhost:3001");

const initialMessagesState={
  random :[],
  general:[],
  Jokes:[]
  }

export default function App() {
  const [username, setUsername]=useState("")
  const [currentChat, setCurrentChat]=useState({ischannel:true, chatName:"general",receivedId:""})
  const [allUsers, setAllUsers]=useState([])
  const[connectedRooms, setConnectedRooms]=useState(["general"])
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");
  const[connected, setConnected]=useState(false)
  const socketRef=useRef()

const handleMessage=(event)=>{
  setMessage(event.target.value)
}
const sendMessage=()=>{
  const payload={
    content:message,
    to:currentChat.chatName? currentChat.chatName: currentChat.receivedId,
    chatName:currentChat.chatName,
    ischannel:currentChat.ischannel
  }
   socket.current.emit('send Message',payload)
   const newMessages=(messages, draft=>{
    draft[currentChat.chatName].push({
      sender:username,
      content:message
    })
   })
    setMessage(newMessages)
}

  return (
    <div className="max-w-7xl bg-green-100 mx-auto p-24 space-y-8 w-full">
      { connected ? <Chat
       message = {message}
       currentChat={currentChat}
       connectedRooms={connectedRooms}
       messages={messages[currentChat]}
       allUser={allUsers}
       yourId={socketRef.current? socketRef.current.id : ""}
       /> : <Form username={username}/>}
       
    </div>
  );
}
