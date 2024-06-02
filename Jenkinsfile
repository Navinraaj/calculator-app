pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    // Use bat command for Windows batch script
                    bat 'npm install'
                    // Assume creating a Docker image if applicable - Adjust or remove as necessary
                    bat 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Running tests - Customize with your actual test command
                    bat 'npm test'
                }
            }
        }
        stage('Code Quality Analysis') {
            steps {
                script {
                    // Example: Running SonarQube scanner - Ensure sonar-scanner is configured for Windows
                    // You may need to specify the path to the sonar-scanner.bat if not in PATH
                    bat 'sonar-scanner.bat'
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Example deployment command - adjust to your deployment method
                    // For example, using Docker Compose or copying files to a server
                    bat 'docker-compose up -d'
                }
            }
        }
    }
}
