import io from "socket.io-client"; 
import { useEffect } from "react";
const socket = io.connect("http://localhost:3001");

const sendMessage = ()=>{
socket.emit("send_message",{ message:"hello" })
}

 export default function App() {
     useEffect(()=>{
     socket.on("receive_message",(data)=>{
     alert(data.message)
     })
     },[])

  return (
   <div className="max-w-7xl mx-auto p-24 flex justify-between gap-8">
    <input placeholder="Message..." className="px-4 py-4 w-full outline-none border border-gray-500 rounded-md"/>
    <button onClick={sendMessage} className="rounded-full p-4 bg-green-600">send the message</button>
   </div>
  )
}


