pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = "kskarthik03/devops-sample-app"
        DOCKER_HUB_CREDS = 'dockerhub-creds'
    }
    
    stages {
        stage('Set Environment') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        env.APP_PORT = "3000"
                        env.APP_ENV = "production"
                    } else if (env.BRANCH_NAME == 'dev') {
                        env.APP_PORT = "3001"
                        env.APP_ENV = "test"
                    } else {
                        env.APP_PORT = "3002"
                        env.APP_ENV = "feature"
                    }
                    echo "Deploying to ${env.APP_ENV} on port ${env.APP_PORT}"
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def imageTag = "${env.APP_ENV}-${env.BUILD_NUMBER}"
                    sh "docker build --build-arg APP_ENV=${env.APP_ENV} -t ${DOCKER_IMAGE}:${imageTag} -t ${DOCKER_IMAGE}:${env.APP_ENV}-latest ."
                }
            }
        }

        stage('Test Container') {
            steps {
                script {
                    sh "docker run -d --name test-run-${env.BUILD_NUMBER} -p 9999:3000 ${DOCKER_IMAGE}:${env.APP_ENV}-latest"
                    sleep 5
                    sh "curl -f http://localhost:9999/health || (docker stop test-run-${env.BUILD_NUMBER} && docker rm test-run-${env.BUILD_NUMBER} && exit 1)"
                    sh "docker stop test-run-${env.BUILD_NUMBER} && docker rm test-run-${env.BUILD_NUMBER}"
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "echo \$DOCKER_PASSWORD | docker login -u \$DOCKER_USERNAME --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:${env.APP_ENV}-${env.BUILD_NUMBER}"
                        sh "docker push ${DOCKER_IMAGE}:${env.APP_ENV}-latest"
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def containerName = "app-${env.APP_ENV}"
                    sh "docker stop ${containerName} || true"
                    sh "docker rm ${containerName} || true"
                    sh "docker run -d --name ${containerName} --restart unless-stopped -p ${env.APP_PORT}:3000 ${DOCKER_IMAGE}:${env.APP_ENV}-latest"
                }
            }
        }

        stage('Cleanup') {
            steps {
                sh "docker image prune -f"
            }
        }
    }
}
