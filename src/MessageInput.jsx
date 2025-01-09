const MessageInput = ({ setMessage, socket, message, messages, setMessages }) => {
  const sendMessage = () => {
    console.log('howdy', socket, message);
    socket.emit('send-chat-message', message);
    setMessage('');
  };
  
  return (
    <div>
      <input type="text" onChange={(e) => setMessage(e.target.value) } />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;