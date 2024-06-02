pipeline {
    agent any
    
    environment {
        // Fetch the SonarQube token from Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    // Use the SonarQube Scanner from Jenkins tool configuration
                    withEnv(["PATH+SONARQUBE=${tool 'sonarscanner'}/bin"]) {
                        bat 'sonar-scanner -Dsonar.projectKey=calculator-jenkins -Dsonar.sources=src -Dsonar.host.url=http://172.31.112.1:9000 -Dsonar.login=%SONAR_TOKEN%'
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
    post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
    }
}
