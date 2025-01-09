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

const io = new Server(server);

// Socket.IO events
io.on('connection', (socket) => {
  // console.log('A user connected');
  socket.emit('chat-message', 'Hello World');
  socket.on('send-chat-message', message => {
    console.log(message)
  });
});
