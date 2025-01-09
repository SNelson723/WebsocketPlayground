const MessageInput = ({ setMessage, socket, message }) => {
  const sendMessage = () => {
    console.log('howdy', socket, message);

    // sends the message to the socket in server.js to send to the chat
    socket.emit('send-chat-message', message);
    setMessage('');
  };

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value) } />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;