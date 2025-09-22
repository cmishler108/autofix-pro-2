#!/bin/bash

# AutoFix Pro DigitalOcean Droplet Deployment Script
# This script deploys the application using Docker on a DigitalOcean droplet

set -e  # Exit on any error

echo "🚀 Starting AutoFix Pro deployment on DigitalOcean droplet..."

# Update system packages
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker and Docker Compose
echo "🐳 Installing Docker..."
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Install Docker Compose
echo "📋 Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add current user to docker group
sudo usermod -aG docker $USER

# Install Nginx for reverse proxy
echo "🌐 Installing Nginx..."
sudo apt install -y nginx

# Create application directory
APP_DIR="/var/www/autofix-pro"
echo "📁 Setting up application directory: $APP_DIR"
sudo mkdir -p $APP_DIR
sudo chown $USER:$USER $APP_DIR
cd $APP_DIR

# Clone or update repository
if [ -d ".git" ]; then
    echo "🔄 Updating existing repository..."
    git pull origin main
else
    echo "📥 Cloning repository..."
    git clone https://github.com/cmishler108/autofix-pro-2.git .
fi

# Create Nginx configuration
echo "⚙️ Configuring Nginx..."
sudo tee /etc/nginx/sites-available/autofix-pro > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Main frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # DoneEZ frontend
    location /doneez {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Django API
    location /api {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Django admin
    location /admin {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Static files
    location /static {
        proxy_pass http://localhost:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOF

# Enable the site
sudo ln -sf /etc/nginx/sites-available/autofix-pro /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Create systemd service for the application
echo "🔧 Creating systemd service..."
sudo tee /etc/systemd/system/autofix-pro.service > /dev/null <<EOF
[Unit]
Description=AutoFix Pro Application
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$APP_DIR
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF

# Enable and start services
echo "🚀 Starting services..."
sudo systemctl daemon-reload
sudo systemctl enable autofix-pro
sudo systemctl start autofix-pro
sudo systemctl enable nginx
sudo systemctl restart nginx

# Setup firewall
echo "🔒 Configuring firewall..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "✅ Deployment completed successfully!"
echo ""
echo "📍 Your application should be accessible at:"
echo "   - Main Frontend: http://your-domain.com"
echo "   - DoneEZ Frontend: http://your-domain.com/doneez"
echo "   - Django Admin: http://your-domain.com/admin"
echo "   - API: http://your-domain.com/api"
echo ""
echo "🔧 Next steps:"
echo "   1. Update your domain DNS to point to this droplet's IP"
echo "   2. Replace 'your-domain.com' in /etc/nginx/sites-available/autofix-pro with your actual domain"
echo "   3. Install SSL certificate with: sudo certbot --nginx -d your-domain.com"
echo "   4. Check application status with: sudo systemctl status autofix-pro"
echo "   5. View logs with: docker-compose logs -f"