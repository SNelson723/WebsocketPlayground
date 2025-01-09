import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';
import { Server } from 'socket.io';

const app = express();
const PORT = 3000;

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));

// the server to serve the socket (in this tech stack)
// must be the server the application listens on
const server = viteExpress.listen(app, PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});

const users = {};

// then create a socket.io => a new one is created on a visit to the site => can have multiple
const io = new Server(server);

// Socket.IO events
// io.on('connection', (socket) => {

//   socket.on('new-user', name => {
//     users[socket.id] = name;
//     socket.broadcast.emit('user-connected', name);
//   });

//   // this is working => client side sets the event title and you receive it here
//   // the message is the state handled on the client side and sent here on submit
//   // so send-chat-message is the event title client side that send the message to send
//   // here to the chat
//   socket.on('send-chat-message', message => {
//     console.log(message);
//     // this will send the message to everyone but the sender
//     // it wont send the message back to the OG USER
//     socket.broadcast.emit('chat-message', message)
//   });
// });

// maybe use this instead?
io.on('connection', (socket) => {
  socket.on('new-user', name => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });
  // this is working => client side sets the event title and you receive it here
  // the message is the state handled on the client side and sent here on submit
  // so send-chat-message is the event title client side that send the message to send
  // here to the chat
  socket.on('send-chat-message', message => {
    console.log(message);
    io.emit('chat-message', message);
  });
});
