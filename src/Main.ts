// Import's
import os from 'os';
import http from "http";
import { Server, SocketServer } from "./Server"
import express from 'express';
import cluster from 'cluster';
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

// Setup Cluster
const numCPUs = os.cpus().length

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i =  0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} died`);
      console.error(`Error: ${signal || code}`);
      cluster.fork(); // Create a new worker
    });
} else {
    // Todo
}