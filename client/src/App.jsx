import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

export default function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="max-w-7xl bg-green-100 mx-auto p-24 space-y-8 w-full relative ">
       <div className="space-y-6">
        <h1 className="text-2xl font-bold">Message:</h1>
        <p>{messageReceived}</p>
      </div>
      <div className="flex gap-x-6">
        <input
          placeholder="Message..."
          className="px-4 py-4 w-full outline-none border border-gray-500 rounded-md"
          onChange={(event) => setMessage(event.target.value)}
        />
        <button onClick={sendMessage} className="rounded-full p-4 bg-green-600">
          send
        </button>
      </div>
    </div>
  );
}
