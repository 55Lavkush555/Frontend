"use client"
import { useState } from "react";

export default function Home() {
  const [chats, setChats] = useState([])
  const [message, setMessage] = useState("")
  const [issending, setIssending] = useState(false)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const handleSend = async () => {
    if (message.trim() === "") return;

    const newChats = [...chats, { role: "user", content: message }];
    setChats(newChats);
    setMessage("");

    try {
      setIssending(true);
      const response = await fetch(`${baseUrl}/api/get-responce`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, chats: newChats}),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Response from server:", data);

      setChats((prevChats) => [
        ...prevChats,
        { role: "assistant", content: data.response },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setChats((prevChats) => [
        ...prevChats,
        { role: "assistant", content: "Sorry, something went wrong." },
      ]);
    }
    setIssending(false);
  }

  return (
    <div className="font-sans">
      <div className="container mx-auto flex flex-col items-center justify-center">
        
        <h1 className="text-3xl text-gray-800 font-bold">Hello, I&apos;m Liyon</h1>

        <div className="chat-area md:w-[80%] w-full rounded-2xl p-4 mt-4 h-[70vh] overflow-y-auto">
          {chats.map((chat, index) => (
            <div key={index} className={`flex w-full ${chat.role === "user" ? "justify-end" : "justify-start"} mb-4`}>
              <p className={`text-lg p-4 md:max-w-[60%] max-w-[70%] ${chat.role === "user"? "bg-[#e0e0e0] text-gray-800 rounded-2xl" : "bg-gray-800 text-white rounded-2xl" }`}>{chat.content}</p>
            </div>
          ))}
          {issending && (
            <div className="flex w-full justify-start mb-4">
              <p className="text-lg p-4 md:max-w-[60%] max-w-[70%] bg-gray-800 text-white rounded-2xl animate-pulse">Generating...</p>
            </div>
          )}
        </div>

        <div className="input-area bg-gray-800 absolute bottom-0 md:w-[65%] w-full rounded-2xl p-4">
          <div className="flex items-center justify-around bg-gray-600 rounded-2xl p-2">
            <img src="./robot-logo.png" alt="" className="md:w-9 w-8 invert" />
            <input type="text" value={message} onChange={(e)=> {setMessage(e.target.value)}} placeholder="Message" className="outline-none text-white text-[18px] md:w-[80%] w-[70%]" />
            <button onClick={()=> {!issending && handleSend(message)}} ><img src={issending ? "generating-icon.png" : "send-icon.png"} alt="" className="md:w-9 w-7 invert cursor-pointer" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}