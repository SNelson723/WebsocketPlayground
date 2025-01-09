import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MessageInput from './MessageInput';
import './App.css';


const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  /**
   */

  
  // needs to be reworked => maybe try a different component?
  // useEffect(() => {
  //   if (!name) {
  //     const name = prompt('What is your name?');
  //     // setName(name);
  //     socket.emit('new-user', name);
      
  //     socket.on('user-connected', name => {});
  //   }
  // }, []);

  useEffect(() => {
    // Listen for 'chat-message' events from the server
    socket.on('chat-message', (data) => {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off('chat-message');
    };
  }, [message]);

  return (
    <div>
      <h1>Socket.IO Demo</h1>
      <div>
        {messages.map((message, i) => <div key={i}>{`${message} - ${name}`}</div>)}
      </div>
      <MessageInput
        setMessage={setMessage}
        socket={socket}
        message={message}
        messages={messages}
        setMessages={setMessages} />
    </div>
  );
}

export default App;