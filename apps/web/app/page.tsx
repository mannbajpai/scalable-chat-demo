"use client"
import React, {useState} from 'react';
import classes from "./page.module.css"
import { useSocket } from '../context/SocketProvider';
const HomePage = () => {
  const {sendMessage} = useSocket();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className={classes["main"]}>
      <h1>Chatroom</h1>
      <div className={classes["chat-container"]}>
        {messages.map((msg, idx) => <p key={idx}>{msg}</p>)}
      </div>
      <div className={classes["input-container"]}>
        <input 
          type="text" 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type your message..." 
          className={classes["chat-input"]} 
        />
        <button 
          className={classes["send-btn"]}
          onClick={() => {
            sendMessage(message);
            setMessages((prev) => [...prev, message]);
            setMessage("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default HomePage;