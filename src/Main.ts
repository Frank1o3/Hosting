// Import's
import { Server, SocketServer } from "./Server.ts";
import socket from "socket.io";
import express from 'express';
import cluster from 'cluster';
import dotenv from 'dotenv';
import http from "http";
import path from 'path';
import os from 'os';
dotenv.config();


const App = express();
const TCPServer = http.createServer(App);
const IO = new socket.Server(TCPServer);

const e = new Server(App);

e.MakeRoutes();

const d = new SocketServer(IO);
d.log();

const PORT = Number(process.env.PORT) || 8080

TCPServer.listen(PORT, "10.0.0.31");