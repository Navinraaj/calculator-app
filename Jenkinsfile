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
                    // Ensure environment variable correctly references the SonarQube server setup in Jenkins
                    withSonarQubeEnv('SonarQube') {
                        // Use the SonarQube scanner with the proper token
                        bat "sonar-scanner.bat -Dsonar.projectKey=calculator-app -Dsonar.sources=. -Dsonar.host.url=http://your-sonar-url -Dsonar.login=${env['calculator-token']}"
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
