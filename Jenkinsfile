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
        stage('Sonar Analysis') {
            steps {
                script {
                    // Retrieve the scanner installation from Jenkins' global tool configuration
                    def scannerHome = tool name: 'sonarscanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
                    withSonarQubeEnv('SonarQube') {  // Use the name of your SonarQube server configuration in Jenkins
                        // Execute the SonarQube scanner using the environment variables
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner" ^
                            -Dsonar.projectKey=calculator-app ^
                            -Dsonar.projectName="Calculator App" ^
                            -Dsonar.projectVersion=1.0 ^
                            -Dsonar.sources=src ^
                            -Dsonar.exclusions=**/node_modules/**,src/**/*.spec.js ^
                            -Dsonar.tests=src ^
                            -Dsonar.test.inclusions=**/*.spec.js, **/*.test.js ^
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info ^
                            -Dsonar.login=${SONAR_TOKEN}
                        """
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
