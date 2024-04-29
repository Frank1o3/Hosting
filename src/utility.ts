import { createServer } from "net";
import { networkInterfaces} from "os";

export function findFreePort(callback: (port: number | null, err?: Error) => void) {
    let port = 1;
    function checkNextPort() {
        const server = createServer();
        server.listen(port, () => {
            console.log('Found free port:', port);
            server.close();
            callback(port);
        });
        server.on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
                port++;
                checkNextPort();
            } else {
                callback(null, err);
            }
        });
    }
    checkNextPort();
}

export function GetIP() {
    const Interfaces = networkInterfaces();
    if (Interfaces) {
        for (let interfece in Interfaces) {
            if (interfece == "wlp1s0") {
                Interfaces[interfece]?.forEach(details => {
                    if (details.family == "IPv4") {
                        return details.address
                    }
                });
            }
        }
    }
}