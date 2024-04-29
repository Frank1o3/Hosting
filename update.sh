#!/bin/bash

source .env

# Fetch the current public IP address
CURRENT_IP=$(curl -s https://api.ipify.org)

LOCAL_IP=$(hostname -I | awk '{print $1}')

URL=$"http://$LOCAL_IP:$PORT"

# Define the path to your Nginx configuration file
NGINX_CONFIG_FILE="/etc/nginx/sites-available/my-node-app"

# Use sed to replace the IP address in the configuration file

echo "LOCAL IP: $LOCAL_IP PORT: $PORT PUBLIC IP: $CURRENT_IP URL: $URL"

sudo sed -i "s|server_name .*|server_name $CURRENT_IP;|" $NGINX_CONFIG_FILE

sudo sed -i "s|proxy_pass .*|proxy_pass $URL;|" $NGINX_CONFIG_FILE

# Test the Nginx configuration for syntax errors
sudo nginx -t

# Reload Nginx to apply the changes
sudo systemctl reload nginx