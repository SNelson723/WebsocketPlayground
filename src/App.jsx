import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MessageInput from './MessageInput';
import './App.css';


const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listen for 'chat-message' events from the server
    socket.on('chat-message', (data) => {
      setMessage(data);
      console.log(data);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('chat-message');
    };
  }, []);

  return (
    <div>
      <h1>Socket.IO Demo</h1>
      <p>Message from server: {message}</p>
      <MessageInput setMessage={setMessage} socket={socket} message={message} />
    </div>
  );
}

export default App;