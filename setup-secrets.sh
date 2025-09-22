#!/bin/bash

# AutoFix Pro GitHub Secrets Setup Guide
# This script provides instructions for setting up GitHub repository secrets

echo "🔐 GitHub Secrets Setup for AutoFix Pro CI/CD Pipeline"
echo "======================================================="
echo ""
echo "To enable automated deployment, you need to add the following secrets"
echo "to your GitHub repository:"
echo ""
echo "1. Go to your repository on GitHub"
echo "2. Click on 'Settings' tab"
echo "3. Click on 'Secrets and variables' > 'Actions'"
echo "4. Click 'New repository secret' for each of the following:"
echo ""

echo "📋 Required Secrets:"
echo "-------------------"
echo ""

echo "🖥️  DROPLET_HOST"
echo "   Description: Your DigitalOcean droplet's IP address"
echo "   Example: 192.168.1.100"
echo ""

echo "👤 DROPLET_USER"
echo "   Description: SSH username for your droplet"
echo "   Example: root (or your created user)"
echo ""

echo "🔑 DROPLET_SSH_KEY"
echo "   Description: Private SSH key for accessing your droplet"
echo "   To generate: ssh-keygen -t rsa -b 4096 -C 'your-email@example.com'"
echo "   Copy the PRIVATE key content (usually ~/.ssh/id_rsa)"
echo ""

echo "🔧 Optional Secrets (if using external services):"
echo "------------------------------------------------"
echo ""

echo "📧 EMAIL_HOST_PASSWORD"
echo "   Description: Email service password for notifications"
echo ""

echo "🗄️  DATABASE_URL"
echo "   Description: External database connection string"
echo "   Example: postgresql://user:password@host:port/database"
echo ""

echo "🔐 PRODUCTION_SECRET_KEY"
echo "   Description: Django secret key for production"
echo "   Generate with: python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'"
echo ""

echo "📝 Setup Instructions:"
echo "----------------------"
echo ""
echo "1. SSH Key Setup on Droplet:"
echo "   - Copy your public key to the droplet: ssh-copy-id user@your-droplet-ip"
echo "   - Or manually add to ~/.ssh/authorized_keys on the droplet"
echo ""
echo "2. Test SSH Connection:"
echo "   ssh -i ~/.ssh/id_rsa user@your-droplet-ip"
echo ""
echo "3. Verify GitHub Actions:"
echo "   - Push to main branch to trigger deployment"
echo "   - Check 'Actions' tab in your GitHub repository"
echo ""

echo "✅ Once all secrets are configured, your pipeline will:"
echo "   - Run tests on every push/PR"
echo "   - Deploy automatically to your droplet on main branch pushes"
echo "   - Restart all services after successful deployment"