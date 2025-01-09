import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import viteExpress from 'vite-express';

const app = express();
const PORT = 3000;

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientPath = path.resolve(__dirname, '../dist');
app.use(express.static(clientPath));


viteExpress.listen(app, PORT, () => {console.log(`Server is listening at ${PORT}`)});