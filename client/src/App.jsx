/* eslint-disable no-unused-vars */
import io from "socket.io-client";
import { useState } from "react";
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
  const [messages, setMessages] = useState(initialMessagesState);
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-7xl bg-green-100 mx-auto p-24 space-y-8 w-full">
       
    </div>
  );
}
