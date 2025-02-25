import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5500");
console.log("socket", socket?.id);

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("chatMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("chatMessage");
        };
    }, []);


    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("chatMessage", { sender: socket?.id, content: message });
            setMessage("");
        }
    };

    return (
        <div>
            <h2>Chat App</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.sender}: </strong>{msg.content}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
