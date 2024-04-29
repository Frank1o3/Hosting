"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch")); // Ensure you have node-fetch installed
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let IP = "0.0.0.0";
(0, node_fetch_1.default)("https://api.ipify.org")
    .then(response => response.text()) // Use .text() instead of .json() for plain text response
    .then(data => {
    console.log(data);
    IP = data;
})
    .catch(error => {
    console.error('Error fetching IP address:', error);
});
// Define the path to your Nginx configuration file
const nginxConfigPath = '/etc/nginx/sites-available/default';
// Define the server block you want to append
const newServerBlock = `
server {
    listen 80;
    server_name ${IP};
    location / {
        proxy_pass http://localhost:${Number(process.env.PORT) || 8080};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;
// Append the new server block to the Nginx configuration file
(0, fs_1.appendFileSync)(nginxConfigPath, newServerBlock);
// Reload Nginx to apply the changes
(0, child_process_1.exec)('sudo nginx -s reload', (error, stdout, stderr) => {
    if (error) {
        console.error(`Error reloading Nginx: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error reloading Nginx: ${stderr}`);
        return;
    }
    console.log(`Nginx reloaded successfully: ${stdout}`);
});
