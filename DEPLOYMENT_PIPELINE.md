# AutoFix Pro - Deployment Pipeline

This document outlines the complete deployment pipeline for AutoFix Pro, including CI/CD setup, Docker configuration, and automated deployment to DigitalOcean.

## 🏗️ Pipeline Overview

The deployment pipeline consists of:

1. **GitHub Actions CI/CD** - Automated testing and deployment
2. **Docker Containerization** - Consistent deployment environment
3. **DigitalOcean Droplet** - Production hosting
4. **Nginx Reverse Proxy** - Load balancing and SSL termination
5. **Automated Webhooks** - Real-time deployment triggers

## 📁 Pipeline Files

### Core Configuration Files

- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `Dockerfile` - Multi-stage Docker build configuration
- `docker-compose.yml` - Service orchestration
- `nginx.conf` - Nginx reverse proxy configuration

### Deployment Scripts

- `deploy-droplet.sh` - Initial droplet setup script
- `deploy.sh` - Docker container startup script
- `webhook-deploy.sh` - Automated deployment webhook handler
- `setup-secrets.sh` - GitHub secrets configuration guide

### Environment Configuration

- `.env.production` - Production environment template
- Uses existing `.env` files from your project

## 🚀 Quick Start Deployment

### 1. Initial Droplet Setup

```bash
# On your DigitalOcean droplet
wget https://raw.githubusercontent.com/cmishler108/autofix-pro-2/main/deploy-droplet.sh
chmod +x deploy-droplet.sh
./deploy-droplet.sh
```

### 2. Configure GitHub Secrets

Run the setup guide:
```bash
./setup-secrets.sh
```

Required secrets:
- `DROPLET_HOST` - Your droplet's IP address
- `DROPLET_USER` - SSH username
- `DROPLET_SSH_KEY` - Private SSH key content

### 3. Deploy with Docker

```bash
# Local development
docker-compose up -d

# Production deployment (automatic via GitHub Actions)
git push origin main
```

## 🔄 Automated Deployment Flow

### GitHub Actions Workflow

1. **Trigger**: Push to `main` branch
2. **Test Phase**:
   - Set up Python 3.11 and Node.js 18
   - Install dependencies for Django backend
   - Install dependencies for both Next.js frontends
   - Build Next.js applications
3. **Deploy Phase** (main branch only):
   - SSH into DigitalOcean droplet
   - Pull latest code
   - Install/update dependencies
   - Build applications
   - Restart services

### Docker Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx Proxy   │    │  Main Frontend  │    │ DoneEZ Frontend │
│   Port 80/443   │────│   Port 3000     │    │   Port 3001     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                └───────────────────────┘
                                          │
                                ┌─────────────────┐
                                │ Django Backend  │
                                │   Port 8000     │
                                └─────────────────┘
```

## 🌐 Service Architecture

### Frontend Services

- **Main Frontend** (`fr/`): Port 3000
- **DoneEZ Frontend** (`fr/doneez_front_end/`): Port 3001

### Backend Service

- **Django API** (`DoneEZ/DoneEZ/`): Port 8000

### Reverse Proxy Routes

- `/` → Main Frontend (3000)
- `/doneez` → DoneEZ Frontend (3001)
- `/api` → Django Backend (8000)
- `/admin` → Django Admin (8000)
- `/static` → Static files

## 🔧 Configuration Details

### Environment Variables

The pipeline uses existing environment files:
- Root `.env` file
- `DoneEZ/DoneEZ/.env` file
- `.env.production` template for production overrides

### Database Configuration

- **No database setup required** (as requested)
- **No migrations run** (as requested)
- Uses existing database configuration from `.env` files

### SSL/HTTPS Setup

```bash
# Install Certbot for SSL certificates
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring and Logs

### View Application Logs

```bash
# Docker logs
docker-compose logs -f

# Individual service logs
docker-compose logs -f app
docker-compose logs -f nginx

# System logs
sudo journalctl -u autofix-pro -f
```

### Health Checks

- Health endpoint: `http://your-domain.com/health`
- Service status: `sudo systemctl status autofix-pro`

## 🔄 Manual Deployment Commands

### Update Application

```bash
cd /var/www/autofix-pro
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Restart Services

```bash
# Restart application
sudo systemctl restart autofix-pro

# Restart Nginx
sudo systemctl restart nginx

# Restart individual containers
docker-compose restart app
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, 8000 are available
2. **Permission issues**: Check file ownership and Docker group membership
3. **Build failures**: Check Docker logs and available disk space
4. **Network issues**: Verify firewall settings and DNS configuration

### Debug Commands

```bash
# Check container status
docker-compose ps

# Check resource usage
docker stats

# Check Nginx configuration
sudo nginx -t

# Check application connectivity
curl -I http://localhost:3000
curl -I http://localhost:8000
```

## 🔐 Security Considerations

- SSH key-based authentication only
- Firewall configured for ports 22, 80, 443
- SSL/TLS encryption for production
- Environment variables for sensitive data
- Regular security updates via automated deployment

## 📈 Scaling Options

### Horizontal Scaling

- Load balancer with multiple droplets
- Database clustering
- CDN for static assets

### Vertical Scaling

- Increase droplet resources
- Optimize Docker resource limits
- Database performance tuning

## 🎯 Next Steps

1. Configure your domain DNS
2. Set up SSL certificates
3. Configure monitoring and alerting
4. Set up backup strategies
5. Implement log aggregation

For support or questions, refer to the project documentation or create an issue in the GitHub repository.