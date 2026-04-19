# Branch-Based Deployment — Documentation
**Project:** DevOps Sample App  
**Author:** Karthik Kulandaiappan Shanmugam  
**GitHub:** https://github.com/Karthik1046/sample_repo  
**Docker Hub:** kskarthik03/devops-sample-app

---

## Table of Contents
1. [Architecture Overview](#architecture-overview)
2. [Branch Strategy](#branch-strategy)
3. [Prerequisites](#prerequisites)
4. [Jenkins Setup](#jenkins-setup)
5. [Docker Hub Setup](#docker-hub-setup)
6. [GitHub Webhook Setup](#github-webhook-setup)
7. [Environment Variables Reference](#environment-variables-reference)
8. [Running Locally Without Jenkins](#running-locally-without-jenkins)
9. [Pipeline Stages Explained](#pipeline-stages-explained)
10. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

```
GitHub Repository
      │
      ├─── dev branch ──────► Jenkins Pipeline ──► Docker Build ──► Docker Hub
      │                              │                                    │
      │                        APP_ENV=test                        kskarthik03/devops-sample-app:test-N
      │                        PORT=3001                                  │
      │                        CONTAINER=app-test ◄────────── docker run ─┘
      │
      └─── main branch ─────► Jenkins Pipeline ──► Docker Build ──► Docker Hub
                                     │                                    │
                               APP_ENV=production               kskarthik03/devops-sample-app:prod-N
                               PORT=3000                                  │
                               CONTAINER=app-prod ◄──────── docker run ──┘
```

---

## Branch Strategy

| Branch | Environment | Port | Container Name | Image Tag  |
|--------|-------------|------|----------------|------------|
| `main` | production  | 3000 | `app-prod`     | `prod-{BUILD_NUMBER}` |
| `dev`  | test        | 3001 | `app-test`     | `test-{BUILD_NUMBER}` |
| other  | staging     | 3002 | `app-{branch}` | `staging-{BUILD_NUMBER}` |

---

## Prerequisites

### On the Jenkins Server / Agent
- **Jenkins** ≥ 2.400 with the following plugins:
  - Pipeline
  - Git
  - Credentials Binding
  - Blue Ocean (optional, for UI)
- **Docker Engine** installed and the Jenkins user added to the `docker` group:
  ```bash
  sudo usermod -aG docker jenkins
  sudo systemctl restart jenkins
  ```
- **Git** installed

### On Your Machine (for local testing)
- Docker Desktop or Docker Engine
- Node.js ≥ 18
- curl or wget

---

## Jenkins Setup

### Step 1 — Create a Multibranch Pipeline Job
1. Open Jenkins → **New Item**
2. Enter a name (e.g., `devops-sample-app`)
3. Select **Multibranch Pipeline** → **OK**

### Step 2 — Configure Source
1. Under **Branch Sources** click **Add Source → Git**
2. **Project Repository:** `https://github.com/Karthik1046/sample_repo.git`
3. Add credentials if the repo is private

### Step 3 — Add Docker Hub Credentials
1. Go to **Manage Jenkins → Credentials → System → Global credentials**
2. Click **Add Credentials**
3. Kind: **Username with password**
4. Username: `kskarthik03`
5. Password: your Docker Hub password / access token
6. ID: `dockerhub-creds` ← **must match exactly what's in the Jenkinsfile**
7. Save

### Step 4 — Set Jenkinsfile Location
- Under **Build Configuration**, Script Path: `Jenkinsfile`

### Step 5 — Save & Scan
- Click **Save** then **Scan Multibranch Pipeline Now**
- Jenkins will discover `main` and `dev` branches and create pipeline builds

---

## Docker Hub Setup

1. Create a free account at https://hub.docker.com (username: `kskarthik03`)
2. Create a repository named `devops-sample-app`
3. Generate an **Access Token** (Account Settings → Security → New Access Token)
4. Use this token as the password in Jenkins credentials (step 3 above)

---

## GitHub Webhook Setup

To trigger Jenkins automatically on every `git push`:

1. Go to your GitHub repo → **Settings → Webhooks → Add webhook**
2. **Payload URL:** `http://<your-jenkins-url>/github-webhook/`
3. **Content type:** `application/json`
4. **Which events:** Just the `push` event
5. Click **Add webhook**

> **Note:** Jenkins must be publicly accessible (or use ngrok for local development).

---

## Environment Variables Reference

| Variable      | Description                    | Example Values          |
|---------------|-------------------------------|-------------------------|
| `APP_ENV`     | Deployment environment         | `production`, `test`    |
| `PORT`        | Port the server listens on     | `3000`, `3001`          |
| `APP_VERSION` | Semantic version of the app    | `1.0.42`                |
| `BUILD_ID`    | Jenkins build number           | `42`                    |
| `NODE_ENV`    | Node.js environment mode       | `production`            |

These are set automatically by the Jenkins pipeline — you don't need to set them manually.

---

## Running Locally Without Jenkins

### Option A — Node.js directly
```bash
cd devops-jenkins-docker/app
npm install
APP_ENV=test PORT=3001 npm start
# Visit: http://localhost:3001
```

### Option B — Docker (test environment)
```bash
cd devops-jenkins-docker

# Build the image
docker build \
  --build-arg APP_ENV=test \
  --build-arg APP_VERSION=1.0.0 \
  --build-arg BUILD_ID=local \
  -t devops-sample-app:test \
  .

# Run it
docker run -d \
  --name app-test \
  -p 3001:3000 \
  devops-sample-app:test

# Verify
curl http://localhost:3001/
curl http://localhost:3001/health
```

### Option C — Docker (production environment)
```bash
docker build \
  --build-arg APP_ENV=production \
  --build-arg APP_VERSION=1.0.0 \
  --build-arg BUILD_ID=local \
  -t devops-sample-app:prod \
  .

docker run -d \
  --name app-prod \
  -p 3000:3000 \
  devops-sample-app:prod

curl http://localhost:3000/
```

---

## Pipeline Stages Explained

| Stage | What Happens |
|---|---|
| **Set Environment** | Reads `BRANCH_NAME` and sets `APP_ENV`, port, container name, and image tag |
| **Checkout** | Pulls source code from GitHub |
| **Build Docker Image** | Runs `docker build` with build args injecting env/version/build info |
| **Test Container** | Spins up a temporary container and hits `/health` endpoint; fails the build if unhealthy |
| **Push to Docker Hub** | Authenticates with Docker Hub credentials and pushes both a versioned tag and a `latest-env` tag |
| **Deploy** | Stops old container, pulls fresh image, starts new container with `--restart unless-stopped` |
| **Cleanup** | Removes dangling/untagged Docker images to save disk space |

---

## Troubleshooting

### ❌ `Permission denied` when running docker inside Jenkins
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### ❌ `dockerhub-creds` credential not found
- Go to Manage Jenkins → Credentials and verify the ID is exactly `dockerhub-creds`

### ❌ Health check fails in Test Container stage
- Check if port 9999 is already in use: `lsof -i :9999`
- Increase the sleep duration in the Jenkinsfile (default 8s)

### ❌ Webhook not triggering builds
- Verify Jenkins URL is reachable from GitHub
- Check Jenkins log: **Manage Jenkins → System Log**
- Ensure the GitHub webhook plugin is installed

### ❌ Old container won't stop
```bash
docker ps -a                     # see all containers
docker stop app-test             # stop by name
docker rm app-test               # remove
```

### ✅ Verify deployment is live
```bash
# Production
curl http://localhost:3000/

# Test
curl http://localhost:3001/

# Health check
curl http://localhost:3000/health
curl http://localhost:3001/health
```

---

## API Endpoints

| Endpoint  | Method | Description |
|-----------|--------|-------------|
| `/`       | GET    | Returns environment info, version, and timestamp |
| `/health` | GET    | Returns server uptime and health status |
| `/info`   | GET    | Returns Node.js version and platform info |

---

*Generated for GUVI | HCL — Task 19: GitHub Branch Based Deployment*
