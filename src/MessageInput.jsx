const MessageInput = ({ setMessage, socket, message }) => {
  const sendMessage = () => {
    console.log('howdy', socket, message);
    socket.emit('send-chat-message', message);
    setMessage('');
  };
  return (
    <div>
      This will be the message input
      <input type="text" onChange={(e) => setMessage(e.target.value) } />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageInput;