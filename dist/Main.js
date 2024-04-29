"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import's
const Server_ts_1 = require("./Server.ts");
const socket_io_1 = __importDefault(require("socket.io"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const App = (0, express_1.default)();
const TCPServer = http_1.default.createServer(App);
const IO = new socket_io_1.default.Server(TCPServer);
const e = new Server_ts_1.Server(App);
e.MakeRoutes();
const d = new Server_ts_1.SocketServer(IO);
d.log();
const PORT = Number(process.env.PORT) || 8080;
TCPServer.listen(3000, "10.0.0.31");
