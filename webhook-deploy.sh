#!/bin/bash

# AutoFix Pro Webhook Deployment Script
# This script handles automated deployments triggered by GitHub webhooks

set -e  # Exit on any error

LOG_FILE="/var/log/autofix-pro-deploy.log"
APP_DIR="/var/www/autofix-pro"

# Function to log messages
log_message() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Function to send notification (optional)
send_notification() {
    local status="$1"
    local message="$2"
    
    # You can integrate with Slack, Discord, or email here
    log_message "NOTIFICATION: [$status] $message"
}

log_message "🚀 Starting automated deployment..."

# Change to application directory
cd "$APP_DIR" || {
    log_message "❌ Failed to change to application directory: $APP_DIR"
    send_notification "ERROR" "Failed to access application directory"
    exit 1
}

# Pull latest changes
log_message "📥 Pulling latest changes from GitHub..."
if git pull origin main; then
    log_message "✅ Successfully pulled latest changes"
else
    log_message "❌ Failed to pull changes from GitHub"
    send_notification "ERROR" "Failed to pull changes from GitHub"
    exit 1
fi

# Check if there are any changes to deploy
if git diff --quiet HEAD~1 HEAD; then
    log_message "ℹ️ No changes detected, skipping deployment"
    exit 0
fi

# Build and deploy with Docker Compose
log_message "🐳 Building and deploying with Docker Compose..."
if docker-compose down && docker-compose build --no-cache && docker-compose up -d; then
    log_message "✅ Successfully deployed with Docker Compose"
else
    log_message "❌ Failed to deploy with Docker Compose"
    send_notification "ERROR" "Docker deployment failed"
    exit 1
fi

# Wait for services to start
log_message "⏳ Waiting for services to start..."
sleep 30

# Health check
log_message "🔍 Performing health check..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    log_message "✅ Health check passed"
    send_notification "SUCCESS" "Deployment completed successfully"
else
    log_message "⚠️ Health check failed, but deployment may still be starting"
    send_notification "WARNING" "Deployment completed but health check failed"
fi

# Clean up old Docker images
log_message "🧹 Cleaning up old Docker images..."
docker image prune -f

log_message "🎉 Deployment process completed!"

# Optional: Restart Nginx to ensure proper routing
sudo systemctl reload nginx

log_message "📊 Deployment summary:"
log_message "   - Repository: $(git remote get-url origin)"
log_message "   - Commit: $(git rev-parse --short HEAD)"
log_message "   - Author: $(git log -1 --pretty=format:'%an <%ae>')"
log_message "   - Message: $(git log -1 --pretty=format:'%s')"