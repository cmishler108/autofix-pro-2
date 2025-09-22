# Multi-stage build for Next.js frontends
FROM node:18-alpine AS frontend-builder

# Build main frontend
WORKDIR /app/frontend
COPY fr/package*.json ./
RUN npm ci
COPY fr/ ./
RUN npm run build

# Build doneez frontend
WORKDIR /app/doneez-frontend
COPY fr/doneez_front_end/package*.json ./
RUN npm ci
COPY fr/doneez_front_end/ ./
RUN npm run build

# Django backend build
FROM python:3.11-slim AS backend-builder

WORKDIR /app/backend
COPY DoneEZ/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY DoneEZ/DoneEZ/ ./
RUN python manage.py collectstatic --noinput

# Production image
FROM node:18-alpine AS production

# Install Python for Django backend
RUN apk add --no-cache python3 py3-pip

# Copy frontend builds
WORKDIR /app/frontend
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/package*.json ./
COPY --from=frontend-builder /app/frontend/next.config.mjs ./

WORKDIR /app/doneez-frontend
COPY --from=frontend-builder /app/doneez-frontend/.next ./.next
COPY --from=frontend-builder /app/doneez-frontend/public ./public
COPY --from=frontend-builder /app/doneez-frontend/package*.json ./
COPY --from=frontend-builder /app/doneez-frontend/next.config.mjs ./

# Copy backend
WORKDIR /app/backend
COPY --from=backend-builder /app/backend ./

# Install production dependencies
WORKDIR /app/frontend
RUN npm ci --only=production

WORKDIR /app/doneez-frontend
RUN npm ci --only=production

# Create startup script
WORKDIR /app
COPY deploy.sh ./
RUN chmod +x deploy.sh

EXPOSE 3000 3001 8000
CMD ["./deploy.sh"]