pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        PORT = '3000'
        DOCKER_IMAGE = 'portfolio-app'
        DOCKER_TAG = 'latest'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Setup Node.js') {
            steps {
                script {
                    // Install Node.js if not available
                    sh '''
                        node --version || curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
                        node --version || sudo apt-get install -y nodejs
                    '''
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test -- --coverage --watchAll=false'
            }
            post {
                always {
                    // Publish test results if available
                    script {
                        if (fileExists('coverage/lcov.info')) {
                            publishHTML([
                                allowMissing: false,
                                alwaysLinkToLastBuild: true,
                                keepAll: true,
                                reportDir: 'coverage',
                                reportFiles: 'lcov-report/index.html',
                                reportName: 'Coverage Report'
                            ])
                        }
                    }
                }
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'npm run build'
            }
            post {
                success {
                    echo 'Build completed successfully'
                }
                failure {
                    error 'Build failed'
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                script {
                    // Run npm audit for security vulnerabilities
                    sh 'npm audit --audit-level high'
                }
            }
        }
        
        stage('Build Docker Image') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    sh '''
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh '''
                        # Stop existing container if running
                        docker stop portfolio-staging || true
                        docker rm portfolio-staging || true
                        
                        # Run new container
                        docker run -d \
                            --name portfolio-staging \
                            -p 3001:3000 \
                            -e NODE_ENV=staging \
                            ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    input message: 'Deploy to production?', ok: 'Deploy'
                    
                    sh '''
                        # Stop existing container if running
                        docker stop portfolio-production || true
                        docker rm portfolio-production || true
                        
                        # Run new container
                        docker run -d \
                            --name portfolio-production \
                            -p 3000:3000 \
                            -e NODE_ENV=production \
                            --restart unless-stopped \
                            ${DOCKER_IMAGE}:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
    
    post {
        always {
            // Clean up workspace
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
            
            // Send notification (optional)
            script {
                if (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'master') {
                    emailext (
                        subject: "Portfolio Deployment Success - ${env.BUILD_NUMBER}",
                        body: "The portfolio application has been successfully deployed to production.\n\nBuild: ${env.BUILD_URL}\nBranch: ${env.BRANCH_NAME}",
                        to: "your-email@example.com"
                    )
                }
            }
        }
        failure {
            echo 'Pipeline failed!'
            
            // Send failure notification
            emailext (
                subject: "Portfolio Build Failed - ${env.BUILD_NUMBER}",
                body: "The portfolio application build failed.\n\nBuild: ${env.BUILD_URL}\nBranch: ${env.BRANCH_NAME}",
                to: "your-email@example.com"
            )
        }
    }
}
