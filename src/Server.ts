import * as socket from 'socket.io';
import * as express from 'express';
import path from 'path';
import fs from 'fs';

export class Server {
    private app: express.Application;
    private Routes: Array<any>

    constructor(app: express.Application) {
        this.app = app;
        this.Routes = Array()
    }

    MakeRoutes() {
        const files = fs.readdirSync("views", { withFileTypes: true })
            .filter(entry => entry.isFile())
            .map(entry => entry.name);
        files.forEach(file => {
            var name = `/${path.basename(file)}`;
            if (!this.Routes.includes(name) && file.endsWith(".ejs")) {
                let route = name.replace(".ejs", "")
                this.app.get(route, (req, res) => {
                    res.status(200).render(file);
                })
            }
        });
    }
}

export class SocketServer {
    private io: socket.Server;
    constructor(io: socket.Server) {
        this.io = io
    }
    log() {
        console.log("HH")
    }
}