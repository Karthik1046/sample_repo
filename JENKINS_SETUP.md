# Jenkins CI/CD Setup for Portfolio Project

## Overview
This Jenkinsfile provides a complete CI/CD pipeline for the portfolio React application with automated testing, building, security scanning, and deployment.

## Prerequisites
- Jenkins server with Docker installed
- Required Jenkins plugins:
  - Pipeline
  - Docker Pipeline
  - Git
  - Email Extension
  - HTML Publisher

## Setup Instructions

### 1. Create Jenkins Job
```bash
# Option 1: Use the provided config
curl -X POST -H "Content-Type: application/xml" \
  --data-binary @jenkins-config.xml \
  "http://your-jenkins-server/createItem?name=portfolio-pipeline"

# Option 2: Manual setup
1. Go to Jenkins Dashboard
2. Click "New Item"
3. Enter "portfolio-pipeline" as name
4. Select "Pipeline" and click OK
5. In Pipeline section, select "Pipeline script from SCM"
6. Choose Git as SCM
7. Repository URL: https://github.com/Karthik1046/sample_repo.git
8. Script path: Jenkinsfile
```

### 2. Configure Environment
Add these environment variables in Jenkins job configuration:
- `NODE_VERSION=18`
- `PORT=3000`
- `DOCKER_IMAGE=portfolio-app`
- `DOCKER_TAG=latest`

### 3. Email Notifications (Optional)
Configure email settings in Jenkins > Manage Jenkins > Configure System:
- SMTP server settings
- Default email address
- Update email in Jenkinsfile (line 118, 131)

## Pipeline Stages

### Development Branch (`develop`)
- Checkout code
- Install dependencies
- Run tests with coverage
- Build application
- Security scan
- Deploy to staging (port 3001)

### Production Branch (`main`/`master`)
- All development stages
- Build Docker image
- Deploy to production (port 3000)
- Send success notifications

## Pipeline Commands

### Manual Triggers
```bash
# Trigger pipeline manually
curl -X POST "http://your-jenkins-server/job/portfolio-pipeline/build"

# Trigger with parameters
curl -X POST "http://your-jenkins-server/job/portfolio-pipeline/buildWithParameters"
```

### Local Testing
```bash
# Test pipeline locally
npm run test:ci
npm run build:prod
npm run docker:build
npm run docker:run
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_VERSION` | Node.js version for build | 18 |
| `PORT` | Application port | 3000 |
| `DOCKER_IMAGE` | Docker image name | portfolio-app |
| `DOCKER_TAG` | Docker image tag | latest |
| `NODE_ENV` | Environment mode | production |

## Deployment Strategy

### Staging Environment
- Triggered on `develop` branch pushes
- Runs on port 3001
- Uses `NODE_ENV=staging`

### Production Environment
- Triggered on `main`/`master` branch pushes
- Runs on port 3000
- Requires manual approval before deployment
- Uses `NODE_ENV=production`

## Monitoring and Notifications

### Build Status
- Success: Email notification with build URL
- Failure: Email notification with error details
- Always: Workspace cleanup

### Coverage Reports
- HTML coverage reports published
- Available in Jenkins build artifacts

### Security Scanning
- `npm audit` runs on every build
- High-severity vulnerabilities fail the build

## Troubleshooting

### Common Issues
1. **Docker permission errors**: Ensure Jenkins user has Docker access
2. **Port conflicts**: Check if ports 3000/3001 are available
3. **Node.js version**: Ensure correct Node.js version is installed
4. **Memory issues**: Increase Jenkins JVM memory if needed

### Debug Commands
```bash
# Check Jenkins logs
docker logs jenkins-container

# Check running containers
docker ps -a | grep portfolio

# Clean up failed builds
docker system prune -f
```

## Advanced Configuration

### Multi-branch Pipeline
For more complex workflows, use Multibranch Pipeline:
1. Create Multibranch Pipeline job
2. Add repository URL
3. Jenkins will automatically create pipelines for each branch

### Blue Ocean
Install Blue Ocean plugin for better visualization:
```bash
# Install in Jenkins
Manage Jenkins > Plugins > Available > Blue Ocean
```

### Artifacts
Add artifact publishing to save build outputs:
```groovy
stage('Archive Artifacts') {
    steps {
        archiveArtifacts artifacts: 'build/**/*', fingerprint: true
    }
}
```

## Security Considerations

- Use Jenkins credentials for sensitive data
- Restrict Docker socket access
- Implement branch protection rules
- Use HTTPS for Jenkins communication
- Regular security updates for Jenkins and plugins
