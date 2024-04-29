#!/bin/bash

# Fetch the current public IP address
CURRENT_IP=$(curl -s https://api.ipify.org)

# Define the path to your Nginx configuration file
NGINX_CONFIG_FILE="/etc/nginx/sites-available/my-node-app"

# Use sed to replace the IP address in the configuration file
sudo sed -i "s/server_name .*/server_name $CURRENT_IP;/" $NGINX_CONFIG_FILE

# Test the Nginx configuration for syntax errors
sudo nginx -t

# Reload Nginx to apply the changes
sudo systemctl reload nginx