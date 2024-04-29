"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIP = exports.findFreePort = void 0;
const net_1 = require("net");
const os_1 = require("os");
function findFreePort(callback) {
    let port = 1;
    function checkNextPort() {
        const server = (0, net_1.createServer)();
        server.listen(port, () => {
            console.log('Found free port:', port);
            server.close();
            callback(port);
        });
        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
                port++;
                checkNextPort();
            }
            else {
                callback(null, err);
            }
        });
    }
    checkNextPort();
}
exports.findFreePort = findFreePort;
function GetIP() {
    var _a;
    const Interfaces = (0, os_1.networkInterfaces)();
    if (Interfaces) {
        for (let interfece in Interfaces) {
            if (interfece == "wlp1s0") {
                (_a = Interfaces[interfece]) === null || _a === void 0 ? void 0 : _a.forEach(details => {
                    if (details.family == "IPv4") {
                        return details.address;
                    }
                });
            }
        }
    }
}
exports.GetIP = GetIP;
