"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import's
const os_1 = __importDefault(require("os"));
const http_1 = __importDefault(require("http"));
const Server_1 = require("./Server");
const express_1 = __importDefault(require("express"));
const cluster_1 = __importDefault(require("cluster"));
const socket_io_1 = __importDefault(require("socket.io"));
// Setup http server & express app
const app = (0, express_1.default)();
const TCPServer = http_1.default.createServer(app);
// Setup socket.io
const io = new socket_io_1.default.Server(TCPServer);
// Setup Server
const SER = new Server_1.Server(app, io);
// Setup Cluster
const numCPUs = os_1.default.cpus().length;
if (cluster_1.default.isPrimary) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        console.error(`Error: ${signal || code}`);
        cluster_1.default.fork(); // Create a new worker
    });
}
else {
    SER.MakeRoutes();
}
