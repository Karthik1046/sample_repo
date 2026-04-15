pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Check Prerequisites') {
            steps {
                sh '''
                    echo "Checking Node.js version..."
                    node --version || exit 1
                    echo "Checking Docker..."
                    docker --version || exit 1
                    echo "Prerequisites check passed!"
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --silent'
            }
        }
        
        stage('Build Application') {
            steps {
                sh 'CI=false npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t portfolio-app .'
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    try {
                        if (env.BRANCH_NAME == 'main') {
                            echo "Deploying to production on port 3000..."
                            sh '''
                                docker stop portfolio-production || true
                                docker rm portfolio-production || true
                                docker run -d --name portfolio-production -p 3000:3000 portfolio-app
                                echo "Production deployment completed!"
                            '''
                        } else if (env.BRANCH_NAME == 'dev') {
                            echo "Deploying to staging on port 3001..."
                            sh '''
                                docker stop portfolio-staging || true
                                docker rm portfolio-staging || true
                                docker run -d --name portfolio-staging -p 3001:3000 portfolio-app
                                echo "Staging deployment completed!"
                            '''
                        } else {
                            echo "Branch ${env.BRANCH_NAME} is not configured for deployment. Skipping deployment."
                        }
                    } catch (Exception e) {
                        echo "Deployment failed: ${e.getMessage()}"
                        error "Deployment failed for branch ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed for branch: ${env.BRANCH_NAME}"
        }
        success {
            echo "SUCCESS: Application deployed successfully on ${env.BRANCH_NAME} branch!"
            script {
                if (env.BRANCH_NAME in ['main', 'dev']) {
                    def port = env.BRANCH_NAME == 'main' ? '3000' : '3001'
                    echo "Application is running on http://localhost:${port}"
                }
            }
        }
        failure {
            echo "FAILURE: Build or deployment failed for branch ${env.BRANCH_NAME}"
            echo "Check the logs above for detailed error information."
        }
    }
}
