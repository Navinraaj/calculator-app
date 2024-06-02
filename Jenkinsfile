pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    // Your build commands
                    sh 'npm install'
                    sh 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests
                    sh 'npm test'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Example with SonarQube
                    sh 'sonar-scanner'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Deploy to a staging environment
                    sh 'docker-compose up -d'
                }
            }
        }
    }
}
