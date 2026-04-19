# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 – Dependencies
# ─────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS deps

WORKDIR /app

# Copy only package files first for layer caching
COPY devops-jenkins-docker/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production && npm cache clean --force

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 – Final Runtime Image
# ─────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS runner

# Build-time arguments – injected by Jenkins pipeline per branch
ARG APP_ENV=production
ARG APP_VERSION=1.0.0
ARG BUILD_ID=local

# Expose as runtime environment variables
ENV APP_ENV=${APP_ENV}
ENV APP_VERSION=${APP_VERSION}
ENV BUILD_ID=${BUILD_ID}
ENV PORT=3000
ENV NODE_ENV=production

WORKDIR /app

# Copy installed deps from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY devops-jenkins-docker/app/server.js ./server.js
COPY devops-jenkins-docker/app/package.json ./package.json

# Create non-root user for security best practices
RUN addgroup -g 1001 -S appgroup && \
    adduser  -u 1001 -S appuser -G appgroup && \
    chown -R appuser:appgroup /app

USER appuser

# Expose application port
EXPOSE 3000

# Health check – Jenkins deploy stage polls this before marking success
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the Express server
CMD ["node", "server.js"]
