// Import's
import http from "http";
import { Server, SocketServer } from "./Server"
import express from 'express';
import socket from "socket.io";
import path from 'path';

// Setup http server & express app
const app = express();
const TCPServer = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "views")));

// Setup socket.io
const io = new socket.Server(TCPServer);

// Setup Server
const server = new Server(app)

// Setup Comunication Server
const socketserver = new SocketServer(io);
