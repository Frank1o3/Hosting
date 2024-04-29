import { exec } from 'child_process';
import { appendFileSync } from 'fs';
import fetch from 'node-fetch'; // Ensure you have node-fetch installed
import dotenv from 'dotenv';
const os = require('os');

dotenv.config();

function getLocalIP(): string {
    const networkInterfaces = os.networkInterfaces();
    for (const name of Object.keys(networkInterfaces)) {
        for (const netInfo of networkInterfaces[name] || []) {
            if (netInfo.family === 'IPv4' && !netInfo.internal) {
                return netInfo.address;
            }
        }
    }
    return "0.0.0.0";
}

const localIP = getLocalIP();
if (localIP) {
    console.log(`Local IP Address: ${localIP}`);
} else {
    console.log('No local IPv4 address found.');
}

let IP = "0.0.0.0"

fetch("https://api.ipify.org")
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
        proxy_pass http://${localIP}:${Number(process.env.PORT) || 8080};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
`;

// Append the new server block to the Nginx configuration file
appendFileSync(nginxConfigPath, newServerBlock);

// Reload Nginx to apply the changes
exec('sudo nginx -s reload', (error, stdout, stderr) => {
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