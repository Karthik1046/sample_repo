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

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Free Port') {
            steps {
                sh """
                fuser -k ${PORT}/tcp || true
                """
            }
        }

        stage('Run React App') {
            steps {
                sh """
                nohup PORT=${PORT} npm start > app.log 2>&1 &
                """
            }
        }
    }
}