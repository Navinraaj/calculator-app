pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Dummy test command
                    sh 'echo "Running Tests..."'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Dummy deploy command
                    sh 'echo "Deploying to staging environment..."'
                }
            }
        }
    }
}
