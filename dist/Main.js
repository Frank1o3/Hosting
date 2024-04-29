"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import's
const http_1 = __importDefault(require("http"));
const Server_1 = require("./Server");
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const path_1 = __importDefault(require("path"));
// Setup http server & express app
const app = (0, express_1.default)();
const TCPServer = http_1.default.createServer(app);
app.set('view engine', 'ejs');
app.use(express_1.default.static(path_1.default.join(__dirname, "views")));
// Setup socket.io
const io = new socket_io_1.default.Server(TCPServer);
// Setup Server
const server = new Server_1.Server(app);
// Setup Comunication Server
const socketserver = new Server_1.SocketServer(io);
