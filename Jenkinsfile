pipeline {
    agent any

    environment {
        // Fetch the SonarQube token from Jenkins credentials
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
        stage('Monitoring and Alerting') {
            steps {
                withCredentials([string(credentialsId: 'datadog', variable: 'DATADOG_API_KEY')]) {
                    script {
                        def response = httpRequest (
                            url: "https://api.datadoghq.com/api/v1/events",
                            httpMode: 'POST',
                            customHeaders: [[name: 'Content-Type', value: 'application/json'], [name: 'DD-API-KEY', value: "${DATADOG_API_KEY}"]],
                            requestBody: '''{
                                "title": "Deployment Notification",
                                "text": "Deployment of myapp to production was successful.",
                                "priority": "normal",
                                "tags": ["jenkins","deployment","myapp"]
                            }'''
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
