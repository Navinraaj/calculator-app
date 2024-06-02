pipeline {
    agent any
    environment {
        // Fetch the SonarQube token from Jenkins credentials
        // Make sure the ID matches exactly what you have configured in Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    bat 'npm install'
                    bat 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Ensure the SonarQube environment variable correctly references the SonarQube server setup in Jenkins
                    // The name 'SonarQube' here should exactly match the name given to the SonarQube server configuration in Jenkins
                    withSonarQubeEnv('SonarQube') {
                        // Execute the SonarQube scanner command using the environment variables
                        // Use the SonarQube scanner installation configured in Jenkins. Make sure 'sonarscanner' is set up correctly under Jenkins Global Tool Configuration
                        // Correct the project key and sources path as needed for your project setup
                        bat 'sonar-scanner.bat -Dsonar.projectKey=calculator-app -Dsonar.sources=src/main/java -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.login=${SONAR_TOKEN}'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    bat 'echo Deploying...'
                }
            }
        }
    }
}
