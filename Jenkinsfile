pipeline {
    agent any

    environment {
        // Fetch the SonarQube token and Datadog API key from Jenkins credentials
        SONAR_TOKEN = credentials('calculator-token')
        DATADOG_API_KEY = credentials('datadog') // Add your Datadog API key to Jenkins credentials
    }

    tools {
        jdk 'jdk-17'
        nodejs 'nodejs-14' // Assuming Node.js is installed in Jenkins and named 'nodejs-14'
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
                    // Remove any existing Docker image with the same name
                    bat 'docker rmi -f myapp:latest || true'
                    // Install Node.js dependencies
                    bat 'npm install'
                    // Build the Docker image
                    bat 'docker build -t myapp:latest .'
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    // Run tests with Jest
                    bat 'npm test'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    withEnv(["PATH+SONARQUBE=${tool 'sonarscanner'}/bin"]) {
                        // Run SonarQube analysis
                        bat 'sonar-scanner -Dsonar.projectKey=calculator-jenkins -Dsonar.sources=. -Dsonar.host.url=http://172.31.112.1:9000 -Dsonar.login=%SONAR_TOKEN%'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Stop and remove any existing container with the same name
                    bat 'docker stop myapp-container || true'
                    bat 'docker rm myapp-container || true'
                    // Run the new Docker container
                    bat 'docker run -d --name myapp-container -p 3000:3000 myapp:latest'
                }
            }
        }
        stage('Monitoring and Alerting') {
            steps {
                script {
                    // Capture the build start time and calculate the duration
                    def startTime = currentBuild.startTimeInMillis
                    def currentTime = System.currentTimeMillis()
                    def duration = (currentTime - startTime) / 1000 // Duration in seconds
                    // Determine the user who triggered the build
                    def user = currentBuild.getBuildCauses('hudson.model.Cause$UserIdCause')[0]?.userId ?: "Automated Trigger"
                    echo "Build Duration: ${duration} seconds"
                    echo "Triggered by: ${user}"

                    withCredentials([string(credentialsId: 'datadog', variable: 'DATADOG_API_KEY')]) {
                        // Send deployment notification to Datadog
                        def response = httpRequest (
                            url: "https://api.us5.datadoghq.com/api/v1/events",
                            httpMode: 'POST',
                            customHeaders: [[name: 'Content-Type', value: 'application/json'], [name: 'DD-API-KEY', value: "${DATADOG_API_KEY}"]],
                            requestBody: """{
                                "title": "Deployment Notification",
                                "text": "Deployment of myapp to production was successful.\\nBuild Duration: ${duration} seconds\\nTriggered by: ${user}",
                                "priority": "normal",
                                "tags": ["jenkins","deployment","myapp"]
                            }"""
                        )
                        echo "Datadog event response: ${response.content}"
                    }
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
