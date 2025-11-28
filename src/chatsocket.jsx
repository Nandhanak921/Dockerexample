import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
});

export default function Chatsocket() {
  const [username, setusername] = useState('');
  const [room, setroom] = useState('');
  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);
  const [joined, setjoined] = useState(false);

  useEffect(() => {
    const handler = (msg) => {
      setchat((prev) => [...prev, msg]);
    };

    socket.on("receivemessage", handler);

    return () => {
      socket.off("receivemessage", handler);
    };
  }, []);

  const joinroom = () => {
    if (username && room) {
      socket.emit("join", room);
      setjoined(true);
    }
  };

  const sendmessage = () => {
    socket.emit("sendmessage", {
      room,
      sender: username,
      message,
    });
    setmessage("");
  };

  return (
    <div style={{ padding: '30px' }}>
      {!joined ? (
        <div>
          <h2>Join ChatRoom</h2>
          <input
            type='text'
            placeholder='enter your name'
            onChange={(e) => setusername(e.target.value)}
          /><br />

          <input
            type='text'
            placeholder='Room'
            onChange={(e) => setroom(e.target.value)}
          /><br />

          <button onClick={joinroom}>Join</button>
        </div>
      ) : (
        <div>
          <h2>Room: {room}</h2>

          <div
            style={{
              border: "1px solid #333",
              height: '300px',
              padding: 10,
              overflowY: 'scroll'
            }}
          >
            {chat.map((m, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: m.sender === username ? "flex-end" : "flex-start",
                  marginBottom: "8px"
                }}
              >
                <div
                  style={{
                    background: m.sender === username ? '#4f46e5' : '#e5e7eb',
                    color: m.sender === username ? 'white' : 'black',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    maxWidth: '60%'
                  }}
                >
                  <strong>
                    {m.sender !== username ? m.sender + ": " : ""}
                  </strong>
                  {m.message}
                </div>
              </div>
            ))}
          </div>

          <br />

          <input
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            placeholder='message...'
          />
          <button onClick={sendmessage}>send</button>
        </div>
      )}
    </div>
  );
}
