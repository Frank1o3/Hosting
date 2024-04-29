// Import's
import { Server, SocketServer } from "./Server"
import socket from "socket.io";
import express from 'express';
import cluster from 'cluster';
import http from "http";
import path from 'path';
import os from 'os';

const App = express();
const TCPServer = http.createServer(App);
const IO = new socket.Server(TCPServer);

const e = new Server(App);

e.MakeRoutes();

const d = new SocketServer(IO);
d.log();


TCPServer.listen(3000,"10.0.0.31");