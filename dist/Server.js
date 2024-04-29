"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = exports.Server = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class Server {
    constructor(app) {
        this.app = app;
        this.Routes = Array();
    }
    MakeRoutes() {
        const files = fs_1.default.readdirSync("views", { withFileTypes: true })
            .filter(entry => entry.isFile())
            .map(entry => entry.name);
        files.forEach(file => {
            var name = `/${path_1.default.basename(file)}`;
            if (!this.Routes.includes(name) && file.endsWith(".ejs")) {
                let route = name.replace(".ejs", "");
                this.app.get(route, (req, res) => {
                    res.status(200).render(file);
                });
            }
        });
    }
}
exports.Server = Server;
class SocketServer {
    constructor(io) {
        this.io = io;
    }
    log() {
        console.log("HH");
    }
}
exports.SocketServer = SocketServer;
