pipeline {
    agent any

    environment {
        PORT = ""
    }

    stages {
        stage('Set Port Based on Branch') {
            steps {
                script {
                    if (env.BRANCH_NAME == "main") {
                        env.PORT = "3000"
                    } else if (env.BRANCH_NAME == "dev") {
                        env.PORT = "3001"
                    } else if (env.BRANCH_NAME == "test") {
                        env.PORT = "3002"
                    } else {
                        env.PORT = "4000"
                    }
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run App') {
            steps {
                sh """
                PORT=${PORT} nohup npm start &
                """
            }
        }
    }
}