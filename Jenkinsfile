pipeline {
    agent any
    
    environment {
        // Fetch the SonarQube token from Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
    }

    stages {
        stage('Sonar Analysis') {
            steps {
                    withSonarQubeEnv('SonarQube') {
                        sh 'mvn clean package sonar:sonar'
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
