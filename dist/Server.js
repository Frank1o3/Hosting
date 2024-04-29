"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor(app, io) {
        this.app = app;
        this.io = io;
        this.Routes = Array();
    }
    MakeRoutes() {
        const files = fs_1.default.readdirSync("views", { withFileTypes: true })
            .filter(entry => entry.isFile())
            .map(entry => entry.name);
        files.forEach(file => {
            var name = `/${path_1.default.basename(file)}`;
            if (!this.Routes.includes(name)) {
                this.Routes.push(name);
            }
        });
        this.Routes.forEach(route => fs_1.default.writeFileSync("Routes.txt", route));
    }
}
exports.Server = Server;
