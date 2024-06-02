pipeline {
    agent any

    environment {
        // Fetch the SonarQube token from Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
    }

    tools {
        jdk 'jdk-17'
        nodejs 'nodejs-14' // The name should match what you configured in Jenkins
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
        stage('Code Quality Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withEnv(["PATH+SONARQUBE=${tool 'sonarscanner'}/bin"]) {
                        bat 'sonar-scanner -Dsonar.projectKey=calculator-jenkins -Dsonar.sources=. -Dsonar.host.url=http://172.31.112.1:9000 -Dsonar.login=%SONAR_TOKEN%'
                    }
                }
            }
        }
        stage('Deploy to Test Environment') {
            steps {
                script {
                    bat 'docker run -d -p 3000:3000 --name myapp_test myapp:latest'
                }
            }
        }
        stage('Release to Production') {
            steps {
                script {
                    // Stop the test container
                    bat 'docker stop myapp_test && docker rm myapp_test'
                    // Run the production container
                    bat 'docker run -d -p 80:3000 --name myapp_prod myapp:latest'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    bat 'echo Monitoring with Datadog or New Relic'
                    // Add Datadog or New Relic commands here if applicable
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
