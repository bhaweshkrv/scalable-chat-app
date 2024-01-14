'use client';

import { useState } from 'react';
import { useSocket } from '../context/SocketProvider';

export default function HomePage() {
  const { sendMessage, messages: msgs } = useSocket();
  const [msg, setMsg] = useState('');

  return (
    <main className="main">
      <div className="bg">
        <div className="top">
          <h1>Chat App</h1>
        </div>
        <div className="middle">
          {msgs.map((msg) => (
            <li>{msg}</li>
          ))}
        </div>
        <div className="input">
          <form>
            <input type="text" placeholder="Enter your message" value={msg} onChange={(e) => setMsg(e.target.value)} />
            <button
              onClick={(e) => {
                e.preventDefault();
                sendMessage(msg);
                setMsg('');
              }}
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
