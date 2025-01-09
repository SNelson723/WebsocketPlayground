import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import MessageInput from './MessageInput';
import './App.css';


const socket = io('http://localhost:3000');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  /**
   * TODO:
   * 1. Figure out if I need to set up a database to keep track of who logs in 
   * 2. If so, then see if you can figure out a form of logging in aside from Google OAuth, or maybe use both?
   * 3. Once the user is confirmed, attach their name and time sent to the messages
   * 4. Leave this as a group chat board at first so everyone can talk?
   * 5. Then start getting specific with personal chats, smaller group chats, topics, etc
   * 6. Are profiles necessary or is this just being treated as a forum?
   * 7. That's enough tasks for now
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